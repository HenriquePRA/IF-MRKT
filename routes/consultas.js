require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../db");


// retorna um json com os estados existentes no banco de dados
router.get("/estados", async function(req, res) {
    try {
        const results = await db.query("SELECT * FROM estado;");
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data: {
                estados: results.rows
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    };
});

// recebe um json contendo o nome de um estado e retorna um
// json com as cidades pertinentes ao mesmo
router.get("/cidades/:uf", async (req, res) => {
    try {
        const uf = req.params.uf.toUpperCase()
        const results = await db.query("SELECT * FROM cidade ci WHERE ci.uf_cidade = $1;", [uf])
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data: {
                cidades: results.rows
            },
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }    
})


// recebe um token jwt
router.get("/usuarioDados", async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                const usr_id = tkValido.user
                const queryString = 
                `
                SELECT 
                usr.email, 
                usr.nome,
                usr.bairro,
                usr.endereco,
                cid.nome_cidade AS cidade,
                cid.uf_cidade AS uf
                FROM usuario usr
                INNER JOIN cidade cid ON usr.cidade = cid.id_cidade
                WHERE usr.id_usr = $1
                `

                const usuarioDados = await db.query(queryString, [usr_id])
                return res.status(200).json({
                    status:"success",
                    data: usuarioDados.rows[0]
                })
            } else {
                return res.status(400).json({"error": "Não foi possível buscar pelos dados do usuário"})
            }
        } else {
            return res.status(400).json({"error": "Não foi possível buscar pelos dados do usuário"})
        }
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})

// recebe um token jwt
router.get("/usuarioContatos", async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                const usr_id = tkValido.user
                const queryString = 
                `
                SELECT uc.id_usr_c AS idcont, u.email, u.nome 
                FROM usuario_contato uc
                INNER JOIN usuario u ON uc.id_contato = u.id_usr
                WHERE uc.id_usr = $1
                `

                const usuarioDados = await db.query(queryString, [usr_id])
                return res.status(200).json({
                    status:"success",
                    data: usuarioDados.rows
                })
            } else {
                return res.status(400).json({"error": "Não foi possível buscar pelos contatos do usuário"})
            }
        } else {
            return res.status(400).json({"error": "Não foi possível buscar pelos contatos do usuário"})
        }
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})

// retorna um json com os estados existentes no banco de dados
router.get("/produtos", async function(req, res) {
    try {
        const queryString = `
        SELECT usr.email, pr.*
        FROM produto pr INNER JOIN usuario usr ON pr.id_vendedor = usr.id_usr;
        `
        const results = await db.query(queryString);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    };
});

// recebe um token jwt
router.get("/usuarioProdutos", async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                const usr_id = tkValido.user
                const queryString = 
                `
                SELECT * FROM produto pr
                WHERE pr.id_vendedor = $1
                `
                const produtos = await db.query(queryString, [usr_id])
                return res.status(200).json({
                    status:"success",
                    data: produtos.rows
                })
            } else {
                return res.status(400).json({"error": "Não foi possível buscar pelos produtos do usuário"})
            }
        } else {
            return res.status(400).json({"error": "Não foi possível buscar pelos produtos do usuário"})
        }
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})

// recebe um token jwt
router.get("/usuarioMensagens", async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                const usr_id = tkValido.user
                const queryString = 
                `
                SELECT 
                msg.id_mensagem,
                (msg.id_remetente = $1) AS enviado,
                msg.id_remetente,
                msg.id_destinatario,
                usr1.email as email_remetente,
                usr2.email as email_dest,
                msg.titulo,
                msg.mensagem,
                msg.datahora
                FROM mensagem msg 
                INNER JOIN usuario usr1 ON (msg.id_remetente = usr1.id_usr) 
                INNER JOIN usuario usr2 ON (msg.id_destinatario = usr2.id_usr) 
                WHERE msg.id_remetente = $1 OR msg.id_destinatario = $1
                `
                const mensagens = await db.query(queryString, [usr_id])
                return res.status(200).json({
                    status:"success",
                    data: mensagens.rows
                })
            } else {
                return res.status(400).json({"error": "Não foi possível buscar pelas mensagens do usuário"})
            }
        } else {
            return res.status(400).json({"error": "Não foi possível buscar pelas mensagens do usuário"})
        }
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})


module.exports = router;