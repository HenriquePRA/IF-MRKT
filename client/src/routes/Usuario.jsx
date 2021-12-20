import React, { useCallback, useEffect, useState } from 'react'
import UsuarioDados from '../components/usuarioDados'
import UsuarioContatos from '../components/usuarioContatos'
import UsuarioProdutos from '../components/usuarioProdutos'
import UsuarioMensagem from '../components/usuarioMensagem'
import { exibir_modal_showProdUsr } from '../components/modals_usuario'
import axios from 'axios';
import { cardsVisible } from '../components/funcoes'
import '../styles/usuario.css'

const Usuario = (props) => {

    const [ expandLigacoes, setExpandLigacoes ] = useState(false)
    const [ products, setProducts ] = useState([])
    const exibirCompras = props.exibirCompras
    
    const getAllProducts = useCallback(() => new Promise((resolve) => {
        axios.get("http://18.231.108.8:7777/consulta/produtos")
        .then((response) => {
            setProducts(response.data)
            resolve()
        })
        .catch(() => console.error("Erro ao solicitar a lista de produtos disponiveis."))
    }), [])

    const fadeExpand = (estado) => {
        if (estado) {
            document.querySelector("#funcoes").style.opacity = .2
        } else {
            document.querySelector("#funcoes").style.opacity = 1
        }
    }

    const mapProds = (products).map((prod) => {
        return (
            <div className="card border-0 mb-3 is-visible" key={prod.id_produto} >
                <div className="card-body bg-cor4 texto_escuro">
                <h5 className="card-title">{prod.nome}</h5>
                <p className="card-text texto_secundario">{prod.descricao}</p>
                </div>
                <div className="card-footer bg-cor3 texto_escuro"  onClick={() => exibir_modal_showProdUsr(prod)}>VER MAIS</div>
            </div>
        )
    }) 

    useEffect(() => {
        if (exibirCompras) {
            getAllProducts().then(cardsVisible())
        }
    }, [getAllProducts, exibirCompras])

    if (exibirCompras) {
        return (
            <div className="container">
                <div className="pt-5 pb-5 temas">
                    <div className="card-container containerView">
                        {/* conteudo inserido dinamicamente */}
                        {mapProds}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div 
                id="funcoes" 
                className="container"
                style = {
                        exibirCompras ? {"display" : "none"} : (
                            ((window.innerWidth > 1100) & !expandLigacoes) ? {
                                "gridTemplateAreas": '"clDa chDa""HiLi HiLi""fat fat"',
                                "gridTemplateColumns": "1fr 1.2fr",
                                "display": "grid"
                            } : {
                                "gridTemplateAreas": '"clDa""chDa""HiLi""fat"',
                                "gridTemplateColumns": "1fr",
                                "display": "grid"
                            }
                        )
                }
            >
                {/* carregamento do submodulo com os dados do usuario */}
                <UsuarioDados 
                    refreshUsr={props.refreshUsr}
                    showAuth={props.showAuth}
                    setShowAuth={props.setShowAuth}
                    setRefreshUsr={props.setRefreshUsr}
                />

                {/* carregamento do submodulo com os contatos do usuario */}
                <UsuarioContatos 
                    refreshUsr={props.refreshUsr}
                    setRefreshUsr={props.setRefreshUsr}
                    expandLigacoes={expandLigacoes}
                    fadeExpand={fadeExpand}
                    setExpandLigacoes={setExpandLigacoes}
                    setLoading={props.setLoading}
                    setShowPlanos={props.setShowPlanos}
                    setShowAuth={props.setShowAuth}
                    setAuth={props.setAuth}
                    showAuth={props.showAuth}
                    selectedContatos={props.selectedContatos}
                    setSelectedContatos={props.setSelectedContatos}
                    setUsrDestino={props.setUsrDestino}
                />

                {/* carregamento do submodulo com as ligacoes dos chips sob auditoria usuario */}
                <UsuarioProdutos 
                    refreshUsr={props.refreshUsr}
                    setRefreshUsr={props.setRefreshUsr}
                    setLoading={props.setLoading}
                    setAuth={props.setAuth}
                    setShowAuth={props.setShowAuth}
                />

                {/* carregamento do submodulo com as mensagens do usuario */}
                <UsuarioMensagem
                    refreshUsr={props.refreshUsr}
                    setRefreshUsr={props.setRefreshUsr}
                    setLoading={props.setLoading}
                    setAuth={props.setAuth}
                    setShowAuth={props.setShowAuth}
                />                
            </div>
        )
    }
}

export default Usuario