const router = require("express").Router()
const jwt = require("jsonwebtoken")
const db = require("../db")


router.post("/contatos", async (req, res) => {
    try {
        const jwtToken = req.headers.token
        const contatos = req.body.contatos
        // verificacao se o token é valido
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                contatos.forEach(async (contato) => {
                    const qrUc = `
                        SELECT uc.id_usr_c FROM usuario_contato uc
                        INNER JOIN usuario u ON uc.id_contato = u.id_usr
                        WHERE u.email = $1;
                    `
                    const idContato = await db.query(qrUc, [contato])
                    
                    const qrDel = `
                        DELETE FROM usuario_contato
                        WHERE id_usr_c = $1;
                    `
                    await db.query(qrDel, [idContato.rows[0].id_usr_c])
                });

                return res.status(200).json({"status": "dissociação feita com sucesso !"})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({"error": "Erro ao dissociar os contatos do cliente, logue-se novamente."})
    }
})

router.post("/produto", async (req, res) => {
    try {
        const jwtToken = req.headers.token
        const idProduto = req.body.idproduto

        // verificacao se o token é valido
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
        
            if (tkValido) {
                
                const qrDel = `
                    DELETE FROM produto
                    WHERE id_produto = $1;
                `
                await db.query(qrDel, [idProduto])
                
                return res.status(200).json({"status": "Produto removido com sucesso !"})
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({"error": "Erro ao remover o produto, logue-se novamente."})
    }
})

module.exports = router;