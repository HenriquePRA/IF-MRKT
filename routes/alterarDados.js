const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

function senhaInsegura (senha) {
    const letras_minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letras_maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789'
    const especiais = '!@#$%¨&*()_'

    let count_num = 0
    let count_esp = 0
    let count_ltr_min = 0
    let count_ltr_mai = 0 

    for (let i = 0; i < senha.length; i++) {
        if (letras_minusculas.indexOf(senha.charAt(i)) != -1) {
            count_ltr_min += 1 
        } else if (letras_maiusculas.indexOf(senha.charAt(i)) != -1) {
            count_ltr_mai += 1
        } else if (numeros.indexOf(senha.charAt(i)) != -1) {
            count_num += 1
        } else if (especiais.indexOf(senha.charAt(i)) != -1) {
            count_esp += 1
        }
    }
    if ((count_ltr_min === 0) | (count_ltr_mai === 0) | (count_num === 0) | (count_esp === 0) | (senha.length < 8)) {
        return true
    } else {
        return false
    }
}


router.post("/nome", async (req, res) => {
    const jwtToken = req.headers.token
    const NovoNome = req.body.nome
    if (jwtToken && NovoNome) {
        try {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                const usr_id = tkValido.user
                let query = 
                `UPDATE usuario u
                SET nome = $1
                WHERE u.id_usr = $2;
                `
                await db.query(query, [NovoNome, usr_id]);
                return res.status(200).json({status: "Nome alterado com sucesso"})
            }         
        } catch (error) {
            return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
        }
    } else {
        return res.status(401).json({status: "Nome ou Autenticação inválidos."})
    }
})


router.post("/email", async (req, res) => {
    const jwtToken = req.headers.token
    const NovoEmail = req.body.email
    if (jwtToken && NovoEmail) {
        try {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {             
                const buscaEmail = await db.query("SELECT * FROM usuario usr WHERE usr.email = $1", [NovoEmail])
                if (buscaEmail.rowCount != 0) {
                    return res.status(401).json({status: "Email em Uso"})
                }
                else if ((NovoEmail.indexOf("@") === -1) | (NovoEmail.length < 3)) {
                    return res.status(401).json({status: "Email invalido"})
                }
                else {
                    const usr_id = tkValido.user
                    let query =
                    `UPDATE usuario usr
                    SET email = $1
                    WHERE usr.id_usr = $2;`   
                    await db.query(query, [NovoEmail, usr_id]);
                    return res.status(200).json({status: "sucesso"})
                }
            }
        } catch (error) {
            return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
        }
    } else {
        return res.status(401).json({status: "Email ou Autenticação inválidos."})
    }
})


router.post("/senha", async (req, res) => {
    const jwtToken = req.headers.token
    const SenhaAnterior = req.body.SenhaAnterior
    const SenhaNova = req.body.NovaSenha

    // autenticar-se com a nova senha
    try {
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
        if (tkValido) {
            const usr = await db.query("SELECT * FROM usuario usr WHERE usr.id_usr = $1;", [tkValido.user])
            const senhaValida = await bcrypt.compare(SenhaAnterior, usr.rows[0].senha)
            if (!senhaValida) {
                return res.status(401).json({status: "Senha Atual inválida, logue-se novamente."})
            } else if (senhaInsegura(SenhaNova)){
                let retorno = 
                `A Nova senha deve ter 8 caracteres ou mais,
                 possuir: letra minúscula, letra maiúscula, 
                 número e caractere especial`
                return res.status(401).json({status: retorno})
            } else {
                const HashSenhaNova = await bcrypt.hash(SenhaNova, 11);
                let query =
                `UPDATE usuario usr
                SET senha = $1
                WHERE usr.id_usr = $2;`
                await db.query(query, [HashSenhaNova, tkValido.user])
                return res.status(200).json({status: "Senha Alterada com sucesso."})
            }
        }
    } catch (error) {
        return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
    }
})

router.post("/cidade", async (req, res) => {    
    const uf = req.body.estado
    const cidade = req.body.cidade
    const jwtToken = req.headers.token

    try {
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
        if (tkValido) {
            const queryCidade = 
            `SELECT id_cidade FROM cidade cid
            WHERE cid.uf_cidade = $1 
            AND cid.nome_cidade = $2;`
            const idCidade = await db.query(queryCidade, [uf, cidade])
            
            if (idCidade.rowCount > 0) {
                const queryUsuario = 
                `UPDATE usuario u
                SET cidade = $1
                WHERE u.id_usr = $2;`
                await db.query(queryUsuario, [idCidade.rows[0].id_cidade, tkValido.user])
                return res.status(200).json({status: "Cidade Alterada com sucesso."})
            }
        }
    } catch (error) {
        return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
    }
})

router.post("/bairro", async (req, res) => {
    const bairro = req.body.bairro
    const jwtToken = req.headers.token

    try {
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
        if (tkValido) {
            let query = `
            UPDATE usuario u
            SET bairro = $1
            WHERE u.id_usr = $2;`
            await db.query(query, [bairro, tkValido.user])
            return res.status(200).json({status: "Bairro alterado com sucesso."})
        }
    } catch (error) {
        return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
    }
})


router.post("/endereco", async (req, res) => {
    const endereco = req.body.endereco
    const jwtToken = req.headers.token

    try {
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
        if (tkValido) {
            let query = `
            UPDATE usuario u
            SET endereco = $1
            WHERE u.id_usr = $2;`
            await db.query(query, [endereco, tkValido.user])
            return res.status(200).json({status: "Endereço alterado com sucesso."})
        }
    } catch (error) {
        return res.status(401).json({status: "Autenticação inválida, logue-se novamente."})
    }
})

module.exports = router;