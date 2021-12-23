import React from 'react';
import cruzSvg from '../img/cruz.svg';
import { exibirFundo, borrarFundo, removerAlertas } from './funcoes';
import ModalAcesso from './auth';
import ModalSobre from './sobre';


export const exibir_modal_showProdHome = (prod) => {
    document.querySelector('#tituloShowProdHome').innerHTML = prod.nome
    document.querySelector('#descricaoShowProdHome').innerHTML = "Descrição: " + prod.descricao
    document.querySelector('#usadoShowProdHome').innerHTML = prod.servico ? null : (prod.usado ? "Produto Usado" : "Produto Novo") 
    document.querySelector('#negociavelShowProdHome').innerHTML = prod.negociavel ? "Valor Negociavel" : "Valor Fixo"
    document.querySelector('#valorShowProdHome').innerHTML = "Valor Base " + prod.valor + " R$"

    document.querySelector('#modal-showProdHome').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modal-showProdHome').style.opacity = '1';
    }, 150)    
    borrarFundo()
}

const modalsHome = (props) => {

    const ocultar_modal_showProdHome = () => {
        removerAlertas();
        document.querySelector('#modal-showProdHome').style.display = 'none';
        document.querySelector('#modal-showProdHome').style.opacity = '0';
        setTimeout(() => {
            exibirFundo()
        }, 100)
    }

    return (
        <div className="modalsContainer">
            {/* modal de acesso */}
            <ModalAcesso
                showAuth={props.showAuth}
                setShowAuth={props.setShowAuth}
                verifyToken={props.verifyToken}
                isLoading={props.isLoading}
                setLoading={props.setLoading}
                addEscPilha={props.addEscPilha}
                removeEscPilha={props.removeEscPilha}
            />

            {/* modal sobre */}
            <ModalSobre 
                addEscPilha={props.addEscPilha}
                removeEscPilha={props.removeEscPilha}
            />

            {/* modal com os dados de um anuncio */}
            <div className="modal-showProdHome" id='modal-showProdHome' style={{"width":"480px"}}>
                <div className="fechar" id="fechar-showProdHome" onClick={ocultar_modal_showProdHome}>
                    <img src={cruzSvg} className="fechar_btn" alt="fechar modal showProdHome" />
                </div>
                <div className="headerbox bg-cor1" id='tituloShowProdHome'></div>
                
                <div style={{"padding":"1rem"}}>
                    <p id='descricaoShowProdHome'></p>
                    <p id='usadoShowProdHome'></p>
                    <p id='negociavelShowProdHome' style={{"marginBottom": "5px"}}></p>
                    <p id='valorShowProdHome'></p>
                    <p style={{"color":"red"}}>Acesse a plataforma e fale com o vendedor,<br/> O cadastro é gratuito :)</p>
                </div>
            </div>
        </div>
    )
}

export default modalsHome