import React, { useEffect, useCallback } from 'react';
import SucessoSvg from '../img/sucesso.svg';
import ErroSvg from '../img/exclamacao.svg';
import { exibirFundo } from './funcoes'

// função que retorna os modais de erro e sucesso em um cadastro
const ModalsCadastro = (props) => {

    const retornoInicio = () => {
        props.history.push("/")
    }

    const ocultarErros = useCallback(() => {
        exibirFundo();
        const lista = document.querySelector("#listaErros");
        document.querySelector("#modalErros").style.display = "none";
        lista.innerHTML = "";
    }, []);

    useEffect(() => {
        // função que detecta detecta a tecla esc e fecha os modal
        const LST_erros_escape = (event) => { 
            if (event.key === 'Escape'){
                ocultarErros()
            }
        }
        // event listener
        window.addEventListener("keydown", LST_erros_escape)

        // remocao do event listener ao desmontar o componente
        return() => {
            window.removeEventListener("keydown", LST_erros_escape)
        }
    }, [ocultarErros])


    return (
        <div className="modalsContainer">
            {/* modal que mostra sucesso com as informações da conta */}
            <div id="modalSucesso">
                <div className="modalImg">
                    <img src={SucessoSvg} alt="Sucesso"/>
                </div>
                <h4>Sua conta foi criada com sucesso !</h4>
                <p>Você será redirecionado a página principal em <strong><span id="cadCount">20</span></strong> segundos</p>
                <ul>
                    <li className="alert alert-success" id="logLi"><strong>Login: &nbsp;&nbsp;</strong></li>
                    <li className="alert alert-success" id="emailLi"><strong>E-mail: &nbsp;</strong></li>            
                </ul>
                <span onClick={retornoInicio} id="sucessFooter">
                    <span className="footer-texto">
                        Ir a página principal
                    </span>
                </span>
            </div>

            {/* <!-- modal que mostra os erros no formulário --> */}
            <div className="modal-erros" id="modalErros">
                <div className="modalImg">
                    <img src={ErroSvg} alt="Erro !"/>
                </div>
                <p>Não foi possível completar o registro<br />devido aos erros abaixo</p>
                <ul id="listaErros">

                </ul>
                <div id="errosFooter" onClick={ocultarErros}>
                    <span className="footer-texto text-light">
                        FECHAR
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ModalsCadastro
