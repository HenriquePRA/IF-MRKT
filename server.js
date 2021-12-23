require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();

// middleware //
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
    // serve static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

// consultas generalistas que não necessitam de autenticação
app.use("/consulta", require("./routes/consultas.js"))

// cadastro
app.use("/cadastro", require("./routes/cadastro.js"))

// login
app.use("/login", require("./routes/login.js"))

// alterar dados do usuário
app.use("/alterar", require("./routes/alterarDados.js"))

// adicionar/criar itens ou eventos
app.use("/adicionar", require("./routes/adicionar.js"))

// remover itens ou eventos
app.use("/remover", require("./routes/remover.js"))

// // remover itens ou eventos
// app.use("/gerar", require("./utils/criar_fatura.js"))

// consulta pela validade de um token
app.get("/verificarToken", async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        if (jwtToken) {
            const tkValido = jwt.verify(jwtToken, process.env.jwtSecret);
            if (tkValido) {
                return res.status(200).json({"status": "valido"})
            } else {
                return res.status(401).json({"status": "invalido tkvalido"})
            }
        }
    } catch (error) {
        console.error(error.message)
        return res.status(401).json({"status": "invalido invalido error"})
    }
})

// execução do servidor
const porta = process.env.PORT || 7777
app.listen(porta, ()=> {
    console.log(`Servidor IF-Mrkt online na porta ${porta}`);
});
