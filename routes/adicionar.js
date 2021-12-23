const router = require("express").Router()
const jwt = require("jsonwebtoken")
const db = require("../db")

router.post("/contato", async(req, res) => {
    try {
        const jwtToken = req.headers.token
        const email = req.body.email

        // verificação se o token / usuário são válidos
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);

        if (tkValido) {
            const qrContato = `
            SELECT usr.id_usr FROM usuario usr
            WHERE usr.email = $1
            `
            const contato = await db.query(qrContato, [email])
            if (contato.rowCount > 0) {
                if (tkValido.user == contato.rows[0].id_usr) {
                    return res.status(401).json({"error": "Erro, informe um email diferente do seu."})
                } else {
                    const qrCriarContato = `
                    INSERT INTO usuario_contato(id_usr, id_contato)
                    VALUES ($1, $2)
                    `
                    await db.query(qrCriarContato, [tkValido.user, contato.rows[0].id_usr])
                    return res.status(200).json({"status": "Contato associado a conta com sucesso !"})
                }
            } else {
                return res.status(400).json({"error": "Usuário não encontrado"})
            }
        }
    } catch (error) {
        return res.status(401).json({"error": "Erro ao adicionar o contato, logue-se novamente."})
    }
})

router.post("/mensagem", async(req, res) => {
    try {
        const jwtToken = req.headers.token
        const destinatario = req.body.destinatario
        const titulo = req.body.titulo
        const msg = req.body.mensagem

        // verificação se o token / usuário são válidos
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);

        if (tkValido) {
            const qrContato = `
            SELECT usr.id_usr FROM usuario usr
            WHERE usr.email = $1
            `
            const contato = await db.query(qrContato, [destinatario])

            if (contato.rowCount > 0) {
                const qrCriarContato = `
                INSERT INTO mensagem(id_remetente, id_destinatario, datahora, titulo, mensagem)
                VALUES ($1, $2, now(), $3, $4);
                `
                await db.query(qrCriarContato, [tkValido.user, contato.rows[0].id_usr, titulo, msg])
                return res.status(200).json({"status": "Mensagem enviada com sucesso !"})
            } else {
                return res.status(400).json({"error": "Usuário não encontrado"})
            }
        }
    } catch (error) {
        return res.status(401).json({"error": "Erro ao enviar a mensagem, logue-se novamente."})
    }
})

router.post("/produto", async(req, res) => {
    try {
        const jwtToken = req.headers.token
        const nome = req.body.nome
        const descricao = req.body.descricao
        const valor = (req.body.valor === "") ? 0 : req.body.valor
        const usado = req.body.usado
        const negociavel = req.body.negociavel
        const servico = req.body.servico

        // verificação se o token / usuário são válidos
        const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);

        if (tkValido) {
            
            const qrAddProduto = `
            INSERT INTO produto(id_vendedor, nome, descricao, usado, valor_negociavel, valor, servico)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `
            await db.query(qrAddProduto, [tkValido.user, nome, descricao, usado, negociavel, valor, servico])

            return res.status(200).json({"status": "Produto adicionado com sucesso !"})
        }
    } catch (error) {
        return res.status(401).json({"error": "Erro ao adicionar o produto, logue-se novamente."})
    }
})


module.exports = router;