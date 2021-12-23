import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { exibirFundo, borrarFundo, removerAlertas, gerarAlerta } from './funcoes';

import cruzSvg from '../img/cruz.svg';


function ModuloAuth (props) {

    // states do modulo e reduções de caminho para acessar uma prop
    const [ senha, setSenha ] = useState("");
    const { setShowAuth } = props
    const { verifyToken } = props
    const { exibir } = props.showAuth


    // funções que realizam mudança nos inputs do formulario
    const setLogin = (event) => {
        setShowAuth({
            login: event.target.value,
            exibir: exibir
        });
    }
    const alterSenha = (event) => {
        setSenha(event.target.value);
    }


    // função que fecha o modal de autenticação
    const closeModalAuth = useCallback(() => {
        document.querySelector(".formAutenticao").style.opacity = "0";
        setTimeout(() => {
            setSenha("");
            exibirFundo();
            removerAlertas();
            document.querySelector('#customSwitch1').checked = false;
            document.querySelector('.formAutenticao').style.display = "none";
        }, 200);
        setShowAuth(showAuth => ({...showAuth, exibir: false}));
    }, [setShowAuth]);


    // exibe ou não o event listener toda vez que a propriedade exibir for alterada
    useEffect(() => {
        if (exibir) {
            borrarFundo();
            document.querySelector('.formAutenticao').style.display = "flex";
            setTimeout(() => {
                document.querySelector(".formAutenticao").style.opacity = "1";
            }, 200);
        }
    }, [exibir])


    // verifica se os campos do formulario estão em branco
    const verificacao = (login, senha) => {        
        removerAlertas()
        let alertasOn = false
        if (login === "") {
            gerarAlerta("Login: Campo em branco", "alert-danger", "permanente")
            alertasOn = true
        } if (senha === "") {
            gerarAlerta("Senha: Campo em branco", "alert-danger", "permanente")
            alertasOn = true
        }
        if (alertasOn) {
            return false
        }
        return true
    } 


    // submissão de formulário
    const submitHandler = e => {
        e.preventDefault()
        if (verificacao(props.showAuth.login, senha)) {
            props.setLoading(true)
            document.querySelector("#login_form").style.opacity = "0";
            setTimeout(() => {
                const manterAuth = document.querySelector('#customSwitch1').checked
                axios.post('/login',
                {
                    login: props.showAuth.login,
                    senha: senha,
                    manterAuth: manterAuth
                })
                .then((response) => {
                    if (response.statusText === "OK") {
                        localStorage.setItem("token", response.data.token)
                        props.setLoading(false)
                        gerarAlerta("Login realizado com sucesso !", "alert-success", "temporario", exibirFundo)
                        setTimeout(() => {
                            verifyToken()
                        }, 1300)
                    }
                }).catch((error) => {
                    props.setLoading(false)
                    document.querySelector("#login_form").style.opacity = "1";
                    if (error.response.statusText === "Unauthorized") {
                        gerarAlerta("Login ou Senha incorretos", "alert-danger", "permanente")
                    }
                })
            }, 300)
        }
    }


    return (
        <form method="POST" className="modal-content formAutenticao" id="login_form" onSubmit={submitHandler} autoComplete="off">
            <div className="fechar" id="fechar-auth" onClick={closeModalAuth}>
                <img src={cruzSvg} className="fechar_btn" alt="fechar modal" />
            </div>
            <div className="headerbox bg-cor1">INICIAR SESSÃO</div>
            <div className="form-group">
                <label htmlFor="log_usr">Nome da Conta</label>
                <input
                    type="text"
                    name="login"
                    className="form-control"
                    id="log_usr"
                    placeholder="usuario123"
                    value={props.showAuth.login}
                    onChange={setLogin}
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "usuario123"}
                />
                <label htmlFor="log_pass">Senha</label>
                <input 
                    type="password"
                    name="senha"
                    className="form-control"
                    id="log_pass"
                    placeholder="●●●●●●●●●●"
                    value={senha}
                    onChange={alterSenha}
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                />
            </div>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                <label className="custom-control-label" htmlFor="customSwitch1">Me manter conectado</label>
            </div>
            <div>
                <button type="submit" className="btn btn-primary noBorder" id="enviar">ENTRAR</button>
            </div>
        </form>
    )

}

export default ModuloAuth;