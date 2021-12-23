import React, { useCallback, useState, useEffect } from 'react'
import { gerarAlerta, borrarFundo } from './funcoes'
import imgExclamacao from '../img/exclamacao aviso.svg'
import svgPlus from '../img/plus.svg'
import axios from 'axios';

const UsuarioMensagem = (props) => {
    const [ mensagens, setMensagens ] = useState([])
    const [ noMsg, setNoMsg ] = useState(false)
    const { setLoading } = props
    const { setAuth } = props
    const { setShowAuth } = props
    const { refreshUsr } = props
    const { setRefreshUsr } = props


    const exibir_modal_showMsg = (mensagem  ) => {
        document.querySelector('#modShowMsg').style.display = 'flex';
        document.querySelector('#tituloShowMsg').innerHTML = mensagem.titulo;
        document.querySelector('#contatoShowMsg').innerHTML = (mensagem.enviado ? mensagem.email_dest : mensagem.email_remetente);
        document.querySelector('#dataHoraShowMsg').innerHTML = mensagem.datahora.replaceAll('-', '/').replace('T', ' - ').slice(0, 18);
        document.querySelector('#textoShowMsg').innerHTML = mensagem.mensagem;
        setTimeout(() => {
            document.querySelector('#modShowMsg').style.opacity = '1';
        }, 150)    
        borrarFundo()
    }
    
    // carregamento dos contatos associados ao usuário
    const getUserMensagens = useCallback(() => new Promise((resolve, reject) => {
        
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }
        axios.get("/consulta/usuarioMensagens", config)
        .then((response) => {
            setMensagens(response.data.data) 
            resolve()
        })
        .catch((error) => {
            gerarAlerta(error.response.data.error, "alert-danger", "permanente")
            setLoading(false)
            setTimeout(() => {
                localStorage.removeItem("token");
                setShowAuth(showAuth => ({...showAuth, exibir: true}))
                setAuth(false)
            }, 1000)
            reject()
        })
    }), [setAuth, setShowAuth, setLoading])


    // para cada contato guardado nas props retorna uma tr em jsx com as informações do mesmo
    const mensagensMap = (mensagens).map((mensagen) => {
        return (
            <tr key={mensagen.id_mensagem+"_msg"} id={mensagen.id_mensagem+"_idmsg"} className=''>
                <td className="pt15">
                    {mensagen.enviado ? "Enviado" : "Recebido"}
                </td>
                <td className="pt15">
                    {(mensagen.titulo.length >= 22) ? (mensagen.titulo.slice(0, 22) + "...") : mensagen.titulo}
                </td>
                <td className="pt15">
                    {mensagen.enviado ? mensagen.email_dest : mensagen.email_remetente}
                </td>                
                <td className="pt15">
                    {mensagen.datahora.replaceAll('-', '/').replace('T', ' - ').slice(0, 18)}
                </td>
                <td className="rowBotao">
                    <button className="btn custombtn1 btn-lg" onClick={() => exibir_modal_showMsg(mensagen)}><span>VER MENSAGEM</span></button>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        //não ha contatos
        if (mensagens.length < 1) {
            setNoMsg(true)
        } else { 
            setNoMsg(false) 
        }
    }, [mensagens])

    useEffect(() => {
        if (refreshUsr) {
            getUserMensagens()
            setRefreshUsr(false)
        }
    }, [refreshUsr, setRefreshUsr, getUserMensagens])

    useEffect(() => {
        getUserMensagens()
    }, [getUserMensagens])

    return (
        <div id="HistoricoMensagens" className="bshadow5">
            <div style={ noMsg ? {"display": "none"} : {"display": "block"}}>
                <div className="basicHeader2">
                    <p>SUAS MENSAGENS</p>
                </div>
                <table className="table table-borderless table_borda alC">
                    <colgroup>
                        <col span="1" style={{"width":"10%"}} />
                        <col span="1" style={{"width":"20%"}} />
                        <col span="1" style={{"width":"19.5%"}} />
                        <col span="1" style={{"width":"16.5%"}} />
                        <col span="1" style={{"width":"16.5%"}} />
                    </colgroup>
                    <thead id="headerhistligacoes">
                        <tr>
                            <th><span>TIPO</span></th>
                            <th><span>ASSUNTO</span></th>
                            <th><span>CONTATO</span></th>
                            <th><span>DATA</span></th>
                            <th></th>
                        </tr>
                    </thead>  
                    <tbody id="AnunciosTable">
                        {/* conteudo inserido dinamicamente  */}
                        {mensagensMap}
                    </tbody>
                </table>
            </div>
            
            <div id="noProducts" style={ noMsg ? {"display": "flex", "opacity": "1"} : {"display": "none", "opacity": "0"}}>
                <img src={imgExclamacao} alt="" />
                <h5>Sem Mensagens</h5>
                <p className="texto_secundario">
                    Você não possui nenhuma mensagem na sua caixa de entrada
                    <button className="btn custombtn1">
                        <img src={svgPlus} alt="" />
                        <span className="btnAddProd">
                            ADICIONAR PRODUTO
                        </span>
                    </button>
                </p>
            </div>
        </div>
    )
}

export default UsuarioMensagem
