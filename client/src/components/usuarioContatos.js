import React, { useCallback, useEffect, useState } from 'react'
import { borrarFundo, exibirFundo, gerarAlerta } from './funcoes'
import { exibirModalAddContato } from './modals_usuario'
import { exibir_Confirmacao } from './modals_usuario'
import { exibir_modal_mensagem } from "./modals_usuario";
import axios from 'axios';

import svgLixo from '../img/lixo.svg'
import svgSetaBaixo from '../img/seta-baixo.svg'
import svgPlus from '../img/plus.svg'
import imgAviso from '../img/exclamacao aviso.svg'


const UsuarioContatos = (props) => {

    const [ contactsData, setContactsData ] = useState([])
    const [ noContacts, setNoContacts ] = useState(false)
    const [ expandTable, setExpandTable ] = useState(false)
    const { fadeExpand } = props
    const { setUsrDestino } = props
    const { setLoading } = props
    const { setAuth } = props
    const { setShowAuth } = props
    const { refreshUsr } = props
    const { setRefreshUsr } = props
    const { expandLigacoes } = props
    const { setExpandLigacoes } = props
    const { selectedContatos } = props
    const { setSelectedContatos } = props


    // carregamento dos contatos associados ao usuário
    const getUserContacts = useCallback((quantidade = null) => new Promise((resolve, reject) => {
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }
        axios.get("/consulta/usuarioContatos", config)
        .then((response) => {
            if (quantidade === 6) {
                let contatos = []
                if (response.data.data.length > 0) {
                    if (response.data.data.length > 6) {
                        for (let i = 0; i < 6; i++) {
                            contatos.push(response.data.data[i])
                        }                        
                    } else {
                        for (let i = 0; i < response.data.data.length; i++) {
                            contatos.push(response.data.data[i])
                        }
                    }
                    setContactsData(contatos)
                }
            } else {
                setContactsData(response.data.data)
            }
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

    // função que realiza as mudanças entre os estados expandido e reduzido do componente
    const tableChange = (expandir) => {

        borrarFundo()
        setLoading(true)
        fadeExpand(true)

        setTimeout(() => {
            if (expandir) {
                getUserContacts().then(() => {
                    setTimeout(() => {
                        setLoading(false)
                        fadeExpand(false)
                        exibirFundo()
                        setExpandLigacoes(expandir)
                    }, 500)
                })
            } else {
                getUserContacts(6).then(() => {
                    setTimeout(() => {
                        setLoading(false)
                        fadeExpand(false)
                        exibirFundo()
                        setExpandLigacoes(expandir)
                    }, 500)
                })
            }
        }, 500)
    }

    // função que adiciona ou remove um chip do array com chips selecionados
    const selecionarRow = (e) => {
        e.currentTarget.parentElement.parentElement.className = e.target.checked ? 'bgleve' : '';
        const email_sel = e.currentTarget.parentElement.parentElement.children[2].innerHTML
        const inclui =  selectedContatos.includes(email_sel)
        
        if (e.target.checked) {
            // adiciona o chip caso não esteja nas props da aplicação
            if (!inclui) {
                setSelectedContatos(selectedContatos => [...selectedContatos, email_sel])
            }
        } else {
            // remove o chip caso esteja nas props da aplicação
            if (inclui) {
                const novoProps = selectedContatos.filter(numero => numero !== email_sel)
                setSelectedContatos(novoProps) 
            }
        }
    }

    const trashBtnHandle = () => {
        if (selectedContatos.length > 0) {
            exibir_Confirmacao()
        } else {
            console.error("Nenhum chip selecionado")
        }
    }

    const criarMensagem = (e) => {
        setUsrDestino(e.currentTarget.parentElement.parentElement.children[2].innerHTML)
        exibir_modal_mensagem()
    }

    // para cada contato guardado nas props retorna uma tr em jsx com as informações do mesmo
    const contactsMap = (contactsData).map((contato) => {
        return (
            <tr key={contato.idcont}>
                <td className="selectRow pt15">
                    <input type="checkbox" onClick={selecionarRow} />
                </td>
                <td className="pt15">
                    {contato.nome}
                </td>
                <td className="pt15" style={{"textAlign":"left"}}>
                    {contato.email}
                </td>
                <td className="rowBotao">
                    <button className="btn custombtn2 btn-lg" onClick={criarMensagem}><span>MENSAGEM</span></button>
                </td>
            </tr>
        )
    })

    // effect que aplica mudanças ao modal dependendo da quantidade de chips
    useEffect(() => {
        //não ha contatos
        if (contactsData.length < 1) {
            setNoContacts(true)
            setExpandTable(false) 
        } else { setNoContacts(false) }
        
        //há menos de 6 contatos
        if (contactsData.length < 6) {
            setExpandTable(false)  
        } else { setExpandTable(true) }

    }, [contactsData])

    // effect que busca os 6 primeiros chips associados ao usuario ao carregar
    // o componente

    useEffect(() => {
        if (refreshUsr) {
            getUserContacts(6)
            setRefreshUsr(false)
        }
    }, [refreshUsr, setRefreshUsr, getUserContacts])

    useEffect(() => {
        getUserContacts(6)
    }, [getUserContacts])

    return (
        <div id="chipDados"  className="bshadow5">
            <div
                className="tableHeader font600"
                id="headerChipDados"
                style={ noContacts ? {"display": "none"} : {"display": "flex"}
            }>
                <div className="rowBotao lixoBtn pl1 Headeritem" style={{"width":"9%"}}>
                    <button 
                        className="btn"
                        id="lixeira"
                        onClick={trashBtnHandle} 
                        style={(selectedContatos.length > 0) ? 
                            {
                                "cursor":"pointer",
                                "backgroundColor": "#ff8800",
                                "border": "0px solid #ff8800",
                                "boxShadow": "0 2px 4px rgba(40,48,64,0.19), 0 2px 5px rgba(40,48,64,0.23)"
                            }
                         : 
                            {
                                "cursor":"auto",
                                "backgroundColor": "#ffffff",
                                "border": "0px solid #ffffff",
                                "boxShadow": "none"
                            }
                        }
                    >
                        <img src={svgLixo} alt="lixeira"/>
                    </button>
                </div>
                <div className="Headeritem" style={{"width":"32%"}}><span>Nome</span></div>
                <div className="Headeritem" style={{"width":"35%"}}><span>Email</span></div>
                <div className="rowBotao Headeritem" style={{"width":"33%"}}>
                    <button className="btn custombtn3" id="btnAddChip" onClick={exibirModalAddContato} >
                        <img src={svgPlus} alt="" />
                        <span>
                            CONTATO
                        </span>
                    </button>
                </div>
            </div>
            <table className="table table-borderless table_borda alC">
                <colgroup>
                    <col style={{"width":"9%"}} />
                    <col style={{"width":"29%"}} />
                    <col style={{"width":"32%"}} />
                    <col style={{"width":"30%"}} />
                </colgroup>
                <tbody id="chipsTable">
                    {/* conteudo inserido dinamicamente */}
                    {contactsMap}
                </tbody>
            </table>

            <div id="noChips" style={ noContacts ? {"display": "flex", "opacity": "1"} : {"display": "none", "opacity": "0"}}>
                <img src={imgAviso} alt="" />
                <h5>Sem Contatos</h5>
                <p className="texto_secundario">
                    Não foi encontrado nenhum contato associado a sua conta
                    <button className="btn custombtn1" id="addPrimeiroContato" onClick={exibirModalAddContato}>
                        <img src={svgPlus} alt=""/><span>ADICIONAR CONTATO</span>
                    </button>
                </p>
            </div>

            <div 
                className="tableFooter"
                id="btnExpandirChip"
                style={{
                    "display": (expandTable ? "flex" : "none"),
                    "position": (expandLigacoes ? "initial" : "absolute")
                }} 
                onClick={() => tableChange(!expandLigacoes)}
            >
                <button className="btn noShadowF" >
                    <img 
                        id="imgExpand"
                        src={svgSetaBaixo}
                        alt="seta para baixo" 
                        style={{"transform": (expandLigacoes ? "scaleY(-1)" : "none")}}
                    />
                    <span className="texto_cinza" id="txtExpandirChips">
                        { expandLigacoes ? "VER MENOS" : "VER MAIS"}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default UsuarioContatos
