const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/usuario", async (req, res) => {

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

    try {

        const erros = {}
        const campos = req.body

        // verificacao se todos os campos necessarios para o cadastro existem existem
        // retorna true se todos os campos estiverem presentes
        const listaObjetos = [
            "Nome", "Sobrenome", "Email", "Login", "Senha", "Confirmação",
            "Endereço", "Bairro", "Estado", "Cidade"
        ]
        let retorno = false
        for (campo of listaObjetos) {
            if (!(campo in campos)) {
                retorno = true
            }
        }
        if (retorno) {
            return res.status(400).json({
                status:"error",
                dados: {
                    Erro: "Bad request"
                }
            })
        }

        // verificacao se nenhum campo informado foi deixado em branco
        for (let campo in campos) {
            if (campos[campo] === "") {
                erros[campo] = "Campo vazio"
            }
        }

        // busca por erros nos campos informados
        // -- busca por erros na senha 
        if ((erros["Senha"] === undefined) && (erros["Confirmação"] === undefined)) {
            if (campos.Senha != campos.Confirmação) {
                erros["Senhas"] = "As Senhas divergem"
            } else if (senhaInsegura(campos.Senha)) {
                erros["Senhas"] = "As Senhas devem tery 8 caracteres ou mais, possuir: letra minúscula, letra maiúscula, número e caractere especial"
            }
        }
        // -- verificacao se o nome possúim 3 caracteres ou mais
        if(erros["Nome"] == undefined) {
            if (campos.Nome.length < 3) {
                erros["nome"] = "O nome do usuário deve possuir 3 caracteres ou mais"
            }
        }        
        // -- verificacao se o login do usuário possúi menos de 6 caracteres / se existe no banco de dados
        if (erros["Login"] === undefined) {
            if (campos.Login.length <= 5) {
                erros["Login"] = "O login do usuário deve possuir mais de 6 caracteres."
            }
        } else {
            const busca = await db.query("SELECT * FROM usuario usr WHERE usr.usr_login = $1;", [campos.Login])
            if (busca.rowCount != 0) {
                erros["Login"] = "Login indisponível"
            }
        }
        // -- verificação básica no email
        if (erros["Email"] === undefined) {
            if ((campos.Email.indexOf("@") === -1) | (campos.Email.length < 3)) {
                erros["Email"] = "Endereço de email inválido"
            } else {
                const buscaEmail = await db.query("SELECT * FROM usuario usr WHERE usr.email = $1", [campos.Email])
                if (buscaEmail.rowCount != 0) {
                    erros["Email"] = "Email indisponível"
                }
            }
        }

        // realizacao do cadastro
        if (Object.keys(erros).length === 0) {
            // criação do cliente
            const cidade_cli = await db.query("SELECT * FROM cidade ci WHERE ci.uf_cidade = $1 AND ci.nome_cidade = $2", [campos.Estado, campos.Cidade])
            if (cidade_cli.rowCount == 0) {
                return res.status(406).json({
                    status:"error",
                    dados: {
                        Erro: "Erro inesperado, cidade não encontrada tente novamente ou contate o suporte"
                    }
                })
            } else {
                // criação do usuário
                const nomeCli = campos.Nome + " " + campos.Sobrenome;
                const idcidade = cidade_cli.rows[0].id_cidade
                const senhaHash = await bcrypt.hash(campos.Senha, 11);                
                await db.query("INSERT INTO usuario(usr_login, email, nome, endereco, cidade, bairro, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING usr_login, email;",
                [campos.Login, campos.Email, nomeCli, campos.Endereço, idcidade, campos.Bairro, senhaHash])
            }

            // retorna um json contendo o email e o login do usuario
            return res.status(200).json({
                status:"success",
                dados: {
                    login: campos.Login,
                    email: campos.Email
                }
            })
        } else {
            return res.status(200).json({
                status: "error",
                errors: erros
            })
        }
    } catch (error) {
        console.error("! Erro: ",error.message, " !");
        return res.status(500).json("Server Error");
    }
})

module.exports = router;