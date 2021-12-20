
import { cardsVisible } from '../components/funcoes'
import React, { useCallback, useEffect, useState } from 'react'
import { exibir_modal_showProdHome } from '../components/modals_home'
import axios from 'axios';

const Home = () => {

    const [ products, setProducts ] = useState([])

    const getAllProducts = useCallback(() => new Promise((resolve) => {
        axios.get("http://localhost:7777/consulta/produtos")
        .then((response) => {
            setProducts(response.data)
            resolve()
        })
        .catch(() => console.error("Erro ao solicitar a lista de produtos disponiveis."))
    }), [])

    const mapProds = (products).map((prod) => {
        return (
            <div className="card border-0 mb-3 is-visible" key={prod.id_produto} >
                <div className="card-body bg-cor4 texto_escuro">
                <h5 className="card-title">{prod.nome}</h5>
                <p className="card-text texto_secundario">{prod.descricao}</p>
                </div>
                <div className="card-footer bg-cor3 texto_escuro" onClick={() => exibir_modal_showProdHome(prod)}>VER MAIS</div>
            </div>
        )
    }) 
    
    useEffect(() => {
        getAllProducts().then(cardsVisible())
    }, [getAllProducts])

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
}

export default Home