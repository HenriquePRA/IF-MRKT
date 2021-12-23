const db = require("../db")

const gerarFaturas = async () => {

    // busca pelos chips
    const chips = await db.query('SELECT numero, plano FROM cliente_chip;');
    chips.rows.forEach(async (chip) => {
        //busca pelo plano do chip
        let plano = await db.query("SELECT * FROM planos_valores pl where pl.id_plano = $1 limit 1", [chip.plano])

        // busca pela ligação mais antiga de um chip
        let qrLigacaoAntiga = 
        `
        SELECT data_hora FROM ligacao
        WHERE num_emissor = $1
        ORDER BY data_hora
        limit 1
        `
        // busca pelo cliente do chip
        const queryCli = `
        SELECT cliente FROM cliente_chip WHERE numero = $1 LIMIT 1;
        `
        const getCli = await db.query(queryCli, [chip.numero])
        const cliente = getCli.rows[0].cliente

        const dataPrimeiraLiga = await db.query(qrLigacaoAntiga, [chip.numero]);
        let anoPL = dataPrimeiraLiga.rows[0].data_hora.getFullYear()

        for (let ano = anoPL; ano <= 2020; ano++) {
            if (ano === 2020) {
                for (let mes = 0; mes <= 6; mes++){
                    let dataIni = new Date(ano, mes, 1, 0, 0, 0)
                    let dataFim = new Date(ano, mes, getDaysInMonth(dataIni), 0, 0, 0)
                    gerarFatura(cliente, chip, plano.rows[0], dataIni, dataFim)
                }
            } else if (ano === 2017) {
                for (let mes = 5; mes <= 11; mes++){
                    let dataIni = new Date(ano, mes, 1, 0, 0, 0)
                    let dataFim = new Date(ano, mes, getDaysInMonth(dataIni), 0, 0, 0)
                    gerarFatura(cliente, chip, plano.rows[0], dataIni, dataFim)
                }
            } else {
                for (let mes = 0; mes <= 11; mes++){
                    let dataIni = new Date(ano, mes, 1, 0, 0, 0)
                    let dataFim = new Date(ano, mes, getDaysInMonth(dataIni), 0, 0, 0)
                    gerarFatura(cliente, chip, plano.rows[0], dataIni, dataFim)
                }
            }
        }
    });

}

// gera as fatura de um determinado número para uma determinada data
const gerarFatura = async (cliente, chip, plano, datainicio, datafim) => {
    // criacao de um objeto modelo plano baseado no plano atual do chip
    

    // busca pelas ligações feitas no periodo pelo chip
    let numero = chip.numero
    const buscaLigacao = 
    `
    SELECT * FROM ligacao li 
    WHERE li.num_emissor = $1 AND (li.data_hora >= $2 AND li.data_hora <= $3);
    `
    let ligacoesPeriodo = await db.query(buscaLigacao, [numero, datainicio, datafim])    

    function updatePl (ligacoesPeriodo) {

        let Objetoplano = new ModeloPlano(plano)

        new Promise ( async (resolve) => {
            // uso das ligacoes pelo chip

            for (let i = 0; i < ligacoesPeriodo.rows.length; i++) {

                let tipo = await tipoLigacao(ligacoesPeriodo.rows[i])
                let eh_roaming = await ehRoaming(ligacoesPeriodo.rows[i])

                let lHora = parseFloat(ligacoesPeriodo.rows[i].duracao.substring(0, 2))
                let lMin = parseFloat(ligacoesPeriodo.rows[i].duracao.substring(3, 5))
                let lSeg = parseFloat(ligacoesPeriodo.rows[i].duracao.substring(6, 8))
                

                // transformacao das horas em minutos
                lMin += lHora * 60

                // transformacao dos segundos em minutos
                if (lSeg >= 30){
                    lMin += 1
                }

                // debitacao dos minutos
                if (tipo === 'if-if') {
                    if (lMin >= Objetoplano.minIn) {
                        lMin -= Objetoplano.minIn
                        Objetoplano.minIn = 0
                        Objetoplano.addLigaU += Objetoplano.addLigaV * lMin
                    } else {
                        Objetoplano.minIn -= lMin
                    }
                } else if (tipo === 'if-outro') {
                    if (lMin >= Objetoplano.minOut) {
                        lMin -= Objetoplano.minOut
                        Objetoplano.minOut = 0
                        Objetoplano.addLigaU += Objetoplano.addLigaV * lMin
                    } else {
                        Objetoplano.minOut -= lMin
                    }
                }

                if (eh_roaming) {
                    Objetoplano.roamingU += Objetoplano.roamingV   
                }
            }

            resolve()
        }).then( async () => {

            //criacao da fatura baseada no objeto
            const minIn_Usado = await plano.fmin1_dispo - Objetoplano.minIn
            const minOut_usado = await plano.fmin2_dispo - Objetoplano.minOut
            const minExed = Objetoplano.addLigaU.toFixed(4)
            const tx_roaming = Objetoplano.roamingU.toFixed(4)
            const valorTotal = Objetoplano.getValorCalc().toFixed(4)

            const criacao = `
            INSERT INTO fatura(referencia, numero, cliente, fmin1_usado, fmin2_usado, val_m_exced, val_roaming, total, pago)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
            `
            await db.query(criacao, [datainicio, numero, cliente, minIn_Usado, minOut_usado, minExed, tx_roaming, valorTotal, true])        
        })
    }

    updatePl(ligacoesPeriodo)
}

// retorna o número de dias em um mes
const getDaysInMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


// classe fatura temporaria
class ModeloPlano {
    constructor(plano) {
        this.minIn = parseFloat(plano.fmin1_dispo)       // minin
        this.minOut = parseFloat(plano.fmin2_dispo)      // minout
        this.addLigaV = parseFloat(plano.tx_add_liga)    // valor do addLiga
        this.addLigaU = 0.000                            // valor acumulado pelo addLiga
        this.roamingV = parseFloat(plano.tx_roaming)     // valor do roaming
        this.roamingU = 0.000                            // valor acululado pelo roaming
        this.valor = parseFloat(plano.valor)             // valor fixo do plano
    }

    getValorCalc() {
        return this.addLigaU + this.roamingU +  this.valor
    }
}

// Recebe um objeto do tipo Ligação, caso o receptor esteja na base de dados do ifmobile
// retorna a string 'if-if' caso contrário retorna 'if-outro
const tipoLigacao = async (ligacao) => {
    const buscatipo = await db.query("SELECT * FROM chip WHERE numero = $1", [ligacao.num_receptor]) 
    if (buscatipo.rowCount > 0) {
        return 'if-if'
    } else {
        return 'if-outro'
    }
}

// Recebe um objeto do tipo Ligação, Retorna true caso a ligação 
// esteja em roaming e false caso contrário
const ehRoaming = async (ligacao) => {
    const emissorUF = ligacao.num_emissor.substring(0, 2)
    const receptorUF = ligacao.num_receptor.substring(0, 2)
    
    const area_emissor = await db.query("SELECT estado FROM area_cod WHERE codigo = $1", [emissorUF]) 
    const area_receptor = await db.query("SELECT estado FROM area_cod WHERE codigo = $1", [receptorUF])

    return !(area_emissor.rows[0].estado === area_receptor.rows[0].estado)
}

gerarFaturas()