const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/criar_token");

router.post("/", async (req, res) => {
    try {
        //1. "pegar" os dados do req.body
        const {login, senha, manterAuth} = req.body;

        //2. checa se o usuario existe(se não existir gerar erro)
        const usr = await pool.query("SELECT * FROM usuario WHERE usr_login = $1", [login]);
        if (usr.rows.length === 0) {
            return res.status(401).json({
                status:"error",
                dados: {
                    Erro: "Erro, usuário ou senha incorretos."
                }
            });
        };
        
        //3. checa se a senha é válida
        const senhaValida = await bcrypt.compare(senha, usr.rows[0].senha);
        if (!senhaValida) {
            return res.status(401).json({
                status:"error",
                dados: {
                    Erro: "Erro, usuário ou senha incorretos."
                }
            });
        }
        //4. retorna o token
        const token = jwtGenerator(usr.rows[0].id_usr, manterAuth);
        res.json({token})


    } catch (error) {
        console.log(error)
    }
})

module.exports = router;