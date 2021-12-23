import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { borrarFundo } from './funcoes';

const Header = (props) => {

    const { login } = props.showAuth
    const [ headerMsg, setHeadermsg ] = useState("")

    useEffect(() => {
        if (!(login === "")) {
            setHeadermsg("Olá, " + login)
        }
    }, [login, setHeadermsg])

    const ocultarDados = () => {
        props.setExibirCompras(!props.exibirCompras)
    }

    const ExibirModalAuth = () => {
        props.setShowAuth(showAuth => ({...showAuth, exibir: true}))
    }

    const ExibirModalSobre = () => {
        document.querySelector(".modal-sobre").style.display = "flex";
        borrarFundo();
        setTimeout(() => {
            document.querySelector(".modal-sobre").style.opacity = "1";
        }, 200)
    }

    const desconectar = () => {
        localStorage.removeItem("token");
        props.setShowAuth(showAuth => ({...showAuth, exibir: false}))
        props.setAuth(false)
    }

    if (props.history.location.pathname === "/usuario") {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-cor1" id="header">
                <div className="container">
                    <Link to="/" className="navbar-brand"><span id="ltr">IF</span> MRKT</Link>
                    <div className="navbar-collapse flexi" id="navbarNavAltMarkup">
                        <ul className="navbar-nav text-light ml-auto">
                            <li className="headerUsr"><span>{headerMsg}</span></li>
                            <li>
                                <button 
                                    type="button" 
                                    className="btn custombtn1 mr-2" 
                                    onClick={ocultarDados}>
                                        {props.exibirCompras ? "MEUS DADOS" : "COMPRAR"}
                                </button>
                            </li>
                            <li><button 
                                    type="button"
                                    className="btn custombtn2"
                                    style={{"fontSize": "14px"}}
                                    onClick={desconectar} >SAIR
                                </button>
                            </li>
                        </ul>
                    </div> 
                </div>
            </nav>
        )
    } else if (props.history.location.pathname === "/cadastro") {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-cor1">
                <div className="container">
                    <Link to="/" className="navbar-brand"><span id="ltr">IF</span> MRKT</Link>
                </div>
            </nav>
        )
    } else if (props.history.location.pathname === "/") {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-cor1" id="header">
                <div className="container">
                    <Link to="/" className="navbar-brand"><span id="ltr">IF</span> MRKT</Link>                 
                    <div className="navbar-collapse flexi" id="navbarNavAltMarkup">
                        <ul className="navbar-nav text-light ml-auto">
                            <li><button id="conectar" type="button" className="btn custombtn1 mr-2" onClick={ExibirModalAuth}>ENTRAR</button></li>
                            <li><button id="sobre"  type="button" className="btn custombtn1 mr-2" onClick={ExibirModalSobre}>SOBRE</button></li>
                            <li><Link to="/cadastro" type="button" className="btn custombtn1 mr-2">CRIAR CONTA</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default withRouter(Header)
