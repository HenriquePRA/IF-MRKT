import React, { useEffect, useState }from 'react'
import axios from 'axios';
import svgEditarbranco from '../img/editar-branco.svg'
import { 
    exibir_modal_nome,
    exibir_modal_email,
    exibir_modal_senha,
    clickCidadeModal,
    exibir_modal_bairro,
    exibir_modal_endereco
} from "./modals_usuario";


const UsuarioDados = (props) => {
    
    const { refreshUsr } = props
    const { setRefreshUsr } = props

    // dados do usuario
    let [ nome, setNome ] = useState("");
    let [ email, setEmail ] = useState("");
    let [ cidade, setCidade ] = useState("");
    let [ bairro, setBairro ] = useState("");
    let [ endereco, setEndereco ] = useState("");

    // função que busca os dados do usuário;
    const getUserData = async () => {
        let token = localStorage.getItem('token');
        let config = {
            headers: {
            token: token
            }
        }
        await axios.get('http://localhost:7777/consulta/usuarioDados', config)
        .then(response => {
            setNome(response.data.data.nome)
            setEmail(response.data.data.email)
            setCidade(response.data.data.cidade + " - " + response.data.data.uf)
            setBairro(response.data.data.bairro)
            setEndereco(response.data.data.endereco)
        })
        .catch(error => console.error("Erro ao solicitar dados do usuário ao servidor."))
    }
    useEffect(() => {
        if (refreshUsr) {
            getUserData()
            setRefreshUsr(false)
        }
    }, [refreshUsr, setRefreshUsr])

    useEffect(() => {
        getUserData()
    }, [])
    
    return (
        <div id="clienteDados" className="bshadow5">
            <div className="basicHeader1 borda-custom font600">
                <p>DADOS DO USUÁRIO</p>
            </div>
            <table className="table table-borderless table_borda alC">
                <colgroup>
                    <col style={{"width":"25%"}} />
                    <col style={{"width":"53%"}} />
                    <col style={{"width":"22%"}} />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row" className="alE pl-4">Nome</th>
                        <td id="tdNome" className="alE">{nome}</td>
                        <td className="rowBotao alR pr-2">
                            <button 
                                className="btn custombtn1"
                                id="tdAlterNome"
                                onClick={exibir_modal_nome}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>   
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="alE pl-4">E-Mail</th>
                        <td id="tdEmail" className="alE">{email}</td>
                        <td className="rowBotao alR pr-2">
                            <button 
                                className="btn custombtn1"
                                id="tdAlterEmail"
                                onClick={exibir_modal_email}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>                                
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="alE pl-4">Senha</th>
                        <td className="alE">************</td>
                        <td className="rowBotao alR pr-2">
                            <button 
                                className="btn custombtn1"
                                id="tdAlterSenha"
                                onClick={exibir_modal_senha}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>      
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="alE pl-4">Cidade</th>
                        <td id="tdCidade" className="alE">{cidade}</td>
                        <td className="rowBotao alR pr-2">
                            <button 
                                className="btn custombtn1"
                                id="tdAlterCidade"
                                onClick={clickCidadeModal}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>   
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="alE pl-4">Bairro</th>
                        <td id="tdBairro" className="alE">{bairro}</td>
                        <td className="rowBotao alR pr-2">
                            <button
                                className="btn custombtn1"
                                id="tdAlterBairro"
                                onClick={exibir_modal_bairro}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>   
                            </button>
                        </td>
                    </tr>

                    <tr style={{"borderBottom":"none"}}>
                        <th scope="row" className="alE pl-4">Endereço</th>
                        <td id="tdEndereco" className="alE">{endereco}</td>
                        <td className="rowBotao alR pr-2">
                            <button 
                                className="btn custombtn1"
                                id="tdAlterEndereco"
                                onClick={exibir_modal_endereco}>
                                <span>
                                    ALTERAR
                                </span>                                
                                <img src={svgEditarbranco} alt=""/>   
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UsuarioDados
