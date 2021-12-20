import React, { useCallback, useState, useEffect } from 'react'
import { exibir_modal_produto } from './modals_usuario'
import { gerarAlerta, removerAlertas, exibirFundo, borrarFundo } from './funcoes'
import imgProduct from '../img/calendario de pagamentos.svg'
import svgPlus from '../img/plus.svg'
import axios from 'axios';

const UsuarioProdutos = (props) => {
    const [ produtos, setProdutos ] = useState([])
    const [ noProducts, setNoProducts ] = useState(false)
    const { setLoading } = props
    const { setAuth } = props
    const { setShowAuth } = props
    const { refreshUsr } = props
    const { setRefreshUsr } = props

    // carregamento dos contatos associados ao usuário
    const getUserProdutos = useCallback(() => new Promise((resolve, reject) => {
        
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }
        axios.get("http://18.231.108.8:7777/consulta/usuarioProdutos", config)
        .then((response) => {
            setProdutos(response.data.data) 
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

    const rmProdRequest = (idProd) => {
        props.setLoading(true)
        removerAlertas()
        borrarFundo()

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }

        axios.post("http://18.231.108.8:7777/remover/produto", { idproduto: idProd }, config)
        .then((response) => {
            gerarAlerta(response.data.status, "alert-success", "permanente")
            props.setLoading(false)
            setTimeout(() => {
                exibirFundo()
                removerAlertas()
                setRefreshUsr(true)
            }, 1000)
        })
        .catch((error) => {
            gerarAlerta(error.response.data.error, "alert-danger", "permanente")
            props.setLoading(false)
            setTimeout(() => {
                exibirFundo()
                localStorage.removeItem("token");
                setShowAuth(showAuth => ({...showAuth, exibir: true}))
                setAuth(false)
            }, 1000)
        })
    }

    // para cada contato guardado nas props retorna uma tr em jsx com as informações do mesmo
    const produtosMap = (produtos).map((produto) => {
        return (
            <tr key={produto.id_produto+"_prod"}>
                <td className="pt15">
                    {produto.nome}
                </td>
                <td className="pt15">
                    {produto.valor}
                </td>
                <td className="pt15">
                    {produto.valor_negociavel ? "SIM" : "NÃO"}
                </td>
                <td className="pt15">
                    {produto.servico ? "SIM" : "NÃO"}
                </td>
                <td className="rowBotao">
                    <button className="btn custombtn5 btn-lg" onClick={(e) => {rmProdRequest(produto.id_produto)}}><span>REMOVER</span></button>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        //não ha contatos
        if (produtos.length < 1) {
            setNoProducts(true)
        } else { 
            setNoProducts(false) 
        }
    }, [produtos])

    useEffect(() => {
        if (refreshUsr) {
            getUserProdutos()
            setRefreshUsr(false)
        }
    }, [refreshUsr, setRefreshUsr, getUserProdutos])

    useEffect(() => {
        getUserProdutos()
    }, [getUserProdutos])

    return (
        <div id="HistoricoLigacoes" className="bshadow5">
            <div style={ noProducts ? {"display": "none"} : {"display": "block"}}>
                <div className="basicHeader2">
                    <p>SEUS ANUNCIOS</p>
                </div>
                <table className="table table-borderless table_borda alC">
                    <colgroup>
                        <col span="1" style={{"width":"30%"}} />
                        <col span="1" style={{"width":"17.5%"}} />
                        <col span="1" style={{"width":"17.5%"}} />
                        <col span="1" style={{"width":"17.5%"}} />
                        <col span="1" style={{"width":"17.5%"}} />
                        
                    </colgroup>
                    <thead id="headerhistligacoes">
                        <tr>
                            <th><span>NOME</span></th>
                            <th><span>VALOR</span></th>
                            <th><span>NEGOCIAVEL</span></th>
                            <th><span>SERVIÇO</span></th>
                            <th className="rowBotao">
                                <button className="btn custombtn3" id="btnAddProduto" onClick={exibir_modal_produto}>
                                    <img src={svgPlus} alt="" />
                                    <span className="btnAddProd">
                                        PRODUTO
                                    </span>
                                </button>
                            </th>
                        </tr>
                    </thead>  
                    <tbody id="AnunciosTable">
                        {/* conteudo inserido dinamicamente  */}
                        {produtosMap}
                    </tbody>
                </table>
            </div>
            
            <div id="noProducts" style={ noProducts ? {"display": "flex", "opacity": "1"} : {"display": "none", "opacity": "0"}}>
                <img src={imgProduct} alt="" />
                <h5>Sem Produtos</h5>
                <p className="texto_secundario">
                    Você ainda não anunciou nenhum produto
                    <button className="btn custombtn1" id="btnAddProduto" onClick={exibir_modal_produto}>
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

export default UsuarioProdutos
