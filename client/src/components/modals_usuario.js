
import React from 'react'
import { removerAlertas, exibirFundo, borrarFundo } from './funcoes'
import svgCruz from '../img/cruz.svg'
import plusSvg from '../img/plus.svg'
import { gerarAlerta } from '../components/funcoes'
import axios from 'axios';
import '../styles/usuario.css'

export const exibir_modal_showProdUsr = (prod) => {
    document.querySelector('#tituloShowProdUsr').innerHTML = prod.nome
    document.querySelector('#descricaoShowProdUsr').innerHTML = "Descrição: " + prod.descricao
    document.querySelector('#usadoShowProdUsr').innerHTML = prod.servico ? null : (prod.usado ? "Produto Usado" : "Produto Novo") 
    document.querySelector('#negociavelShowProdUsr').innerHTML = prod.negociavel ? "Valor Negociavel" : "Valor Fixo"
    document.querySelector('#valorShowProdUsr').innerHTML = "Valor Base " + prod.valor + " R$"
    document.querySelector("#emailVendorShowProdUsr").innerHTML = prod.email

    document.querySelector('#modal-showProdUsr').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modal-showProdUsr').style.opacity = '1';
    }, 150)    
    borrarFundo()
}

const ocultar_modal_showProdUsr = () => {
    removerAlertas();
    document.querySelector('#modal-showProdUsr').style.display = 'none';
    document.querySelector('#modal-showProdUsr').style.opacity = '0';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

// funcoes especificas do componente usuarioDados
const ocultar_modal_showMsg = () => {
    removerAlertas();
    document.querySelector('#modShowMsg').style.display = 'none';
    document.querySelector('#modShowMsg').style.opacity = '0';
    document.querySelector('#tituloShowMsg').innerHTML = '';
    document.querySelector('#contatoShowMsg').innerHTML = '';
    document.querySelector('#dataHoraShowMsg').innerHTML = '';
    document.querySelector('#textoShowMsg').innerHTML = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_produto = () => {
    document.querySelector('#modProduto').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modProduto').style.opacity = '1';
    }, 150)    
    borrarFundo()
}

const ocultar_modal_produto = () => {
    removerAlertas();
    document.querySelector('#modProduto').style.display = 'none';
    document.querySelector('#modProduto').style.opacity = '0';
    document.querySelector("#nomeAddProduto").value = ""
    document.querySelector("#textoAddProduto").value = ""
    document.querySelector("#valorAddProduto").value = ""
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_mensagem = () => {
    document.querySelector('#modMensagem').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modMensagem').style.opacity = '1';
    }, 150)    
    borrarFundo()
}

const ocultar_modal_mensagem = () => {
    removerAlertas();
    document.querySelector('#modMensagem').style.display = 'none';
    document.querySelector('#modMensagem').style.opacity = '0';
    document.querySelector('#tituloMsg').value = '';
    document.querySelector('#textoMsg').value = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}


const ocultar_modal_nome = () => {
    removerAlertas();
    document.querySelector('#modAlterNome').style.display = 'none';
    document.querySelector('#modAlterNome').style.opacity = '0';
    document.querySelector('#alterNome').value = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_nome = () => {
    document.querySelector('#modAlterNome').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modAlterNome').style.opacity = '1';
    }, 150)    
    borrarFundo()
}

const ocultar_modal_email = () => {
    removerAlertas();
    document.querySelector('#modAlterEmail').style.display = 'none'
    document.querySelector('#modAlterEmail').style.opacity = '0'
    document.querySelector('#alterEmail').value = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_email = () => {
    document.querySelector('#modAlterEmail').style.display = 'flex';    
    setTimeout(() => {
        document.querySelector('#modAlterEmail').style.opacity = '1';
    }, 150)
    borrarFundo()
}

const ocultar_modal_senha = () => {
    removerAlertas();
    document.querySelector('#modAlterSenha').style.display = 'none'
    document.querySelector('#modAlterSenha').style.opacity = '0'
    document.querySelector('#senhaAnterior').value = '';
    document.querySelector('#novaSenha1').value = '';
    document.querySelector('#novaSenha2').value = '';
    setTimeout(() => {
        exibirFundo()
        document.querySelector('#alertas').innerHTML = ""
    }, 100)
}

export const exibir_modal_senha = () => {
    document.querySelector('#modAlterSenha').style.display = 'flex'
    setTimeout(() => {
        document.querySelector('#modAlterSenha').style.opacity = '1';
    }, 150)
    borrarFundo()
}

const ocultar_modal_cidade = () => {
    document.querySelector('#modAlterCidade').style.display = 'none'
    document.querySelector('#modAlterCidade').style.opacity = '0'
    ocultarListaCidades()
    ocultarListaEstados()
    removerAlertas()
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

const exibir_modal_cidade = () => {
    document.querySelector('#modAlterCidade').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modAlterCidade').style.opacity = '1';
    }, 150)
    borrarFundo()
}

export const exibir_Confirmacao = () => {
    document.querySelector("#alertaApagar").style.display = "flex";
    setTimeout(() => {
        document.querySelector('#alertaApagar').style.opacity = '1';
    }, 150)
    borrarFundo()
}

const ocultar_confirmacao = () => {
    document.querySelector('#alertaApagar').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('#alertaApagar').style.display = 'none';
    }, 100)
    exibirFundo()
}

const ocultar_modal_bairro = () => {
    removerAlertas();
    document.querySelector('#modAlterBairro').style.display = 'none';
    document.querySelector('#modAlterBairro').style.opacity = '0'
    document.querySelector('#alterBairro').value = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_bairro = () => {
    document.querySelector('#modAlterBairro').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modAlterBairro').style.opacity = '1';
    }, 150)
    borrarFundo()
}

const ocultar_modal_endereco = () => {
    removerAlertas();
    document.querySelector('#modAlterEndereco').style.display = 'none';
    document.querySelector('#alterEndereco').value = '';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

export const exibir_modal_endereco = () => {
    document.querySelector('#modAlterEndereco').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#modAlterEndereco').style.opacity = '1';
    }, 150)
    borrarFundo()
}


// FUNÇOES ESPECIFICAS PARA O MODAL QUE ALTERA CIDADES


const exibirListaEstados = () => {
    const containerlistaEstados = document.querySelector('.containerOpEstados')
    containerlistaEstados.classList.add('containerAtivo')
    ocultarListaCidades()
}
const ocultarListaEstados = () => {
    const containerlistaEstados = document.querySelector('.containerOpEstados')
    containerlistaEstados.classList.remove('containerAtivo')
}

const AlterCidadeBtnEstado = () => {
    if (document.querySelector('.containerOpEstados').classList.contains('containerAtivo')) {
        ocultarListaEstados()
    } else {
        exibirListaEstados()
    }
}

const exibirListaCidades = () => {
    const containerlistaCidades = document.querySelector('.containerOpCidades')
    containerlistaCidades.classList.add('containerAtivo')
}

const ocultarListaCidades = () => {
    const containerlistaCidades = document.querySelector('.containerOpCidades')
    containerlistaCidades.classList.remove('containerAtivo')
}

const AlterCidadeBtnCidade = () => {
    if (document.querySelector('.containerOpCidades').classList.contains('containerAtivo')) {
        ocultarListaCidades()
    } else {
        exibirListaCidades()
    }    
}

 // busca pela lista de estados
 const getEstados = async () => {
    const url = "http://18.231.108.8:7777/consulta/estados";
    const response = await fetch(url);
    const resjson = await response.json();
    return resjson;
};


// busca pela lista de cidades de um estado
const getCidades = async (uf) => {
    const url = "http://18.231.108.8:7777/consulta/cidades/" + uf;
    const response = await fetch(url);
    const resjson = await response.json();
    return resjson;
};

// carrega uma lista de estados nas opçoes do formulario
const estadosLoad = () => new Promise ( async (resolve) => {
    const jsonEstados = await getEstados();
    const container = document.querySelector(".containerOpEstados");
    container.innerHTML = "";
    await jsonEstados.data.estados.forEach(item => {
        //div container
        const estadoContainer =  document.createElement('div');
        estadoContainer.className = "opcaoEstado opcaoLocal";


        // estado
        const estado =  document.createElement('div');
        estado.innerHTML = item["uf"]
        estado.style.padding =  "5px 10px";
        estado.style.cursor = "pointer";
        estado.style.width = "100%";
        estado.onclick = (e) => {
            let selecionado = document.querySelector(".estadoSelecionado")
            selecionado.innerHTML = e.target.innerHTML
            cidadesLoad(selecionado.innerHTML)
            ocultarListaEstados()
            setTimeout(() => {
                exibirListaCidades()
            }, 200)
        }
        
        estadoContainer.appendChild(estado);
        container.appendChild(estadoContainer)
    })
    // definição do primeiro estado da resposta como estado selecionado
    document.querySelector(".estadoSelecionado").innerHTML = jsonEstados.data.estados[0].uf
    resolve();
})

const cidadesLoad = async (uf) => {
    const jsonCidades = await getCidades(uf)
    const container = document.querySelector('.containerOpCidades')
    container.innerHTML = "";
    await jsonCidades.data.cidades.forEach(item => {
        // div container
        const cidadeContainer = document.createElement('div')
        cidadeContainer.className = 'opcaoCidade opcaoLocal'

        // cidade 
        const cidade = document.createElement('div')
        cidade.innerHTML = item["nome_cidade"]
        cidade.style.padding =  "5px 10px";
        cidade.style.cursor = "pointer";
        cidade.style.width = "100%";
        cidade.onclick = (e) => {
            let selecionada = document.querySelector(".cidadeSelecionada")
            selecionada.innerHTML = e.target.innerHTML
            ocultarListaCidades()
        }

        cidadeContainer.appendChild(cidade)
        container.appendChild(cidadeContainer)
    })
    document.querySelector(".cidadeSelecionada").innerHTML = jsonCidades.data.cidades[0].nome_cidade
}


export const clickCidadeModal = () => {
    exibir_modal_cidade()
    // carregamento dos estados que em sequencia carrega as cidades
    estadosLoad().then(() => {
        const estadoSel = document.querySelector(".estadoSelecionado").innerHTML
        cidadesLoad(estadoSel)
    })
}

// funcoes especificas do componente usuarioContatos

// COMPONENTE USUARIO - funções que exibem ou ocultam o modal para adicionar chip 
export const exibirModalAddContato = () => {
    borrarFundo() 
    document.querySelector('.modalAddContato').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.modalAddContato').style.opacity = '1';
    }, 150)    
}


function ocultarModalAddContato() {
    removerAlertas();
    document.querySelector('#emailContato').value = ''
    document.querySelector('.modalAddContato').style.opacity = '0';
    document.querySelector('.modalAddContato').style.display = 'none';
    setTimeout(() => {
        exibirFundo()
    }, 100)
}

const ModalsUsuario = (props) => {

    const { usrDestino } = props
    const { setUsrDestino } = props
    const { selectedContatos } = props
    const { setSelectedContatos } = props
    const { setRefreshUsr } = props
    const { setShowAuth } = props
    const { setAuth } = props

    // Envio de uma mensagem
    const postMensagem = (event) => {
        event.preventDefault()
        removerAlertas()
        props.setLoading(true)

        let titulo = document.querySelector("#tituloMsg").value
        let mensagem = document.querySelector("#textoMsg").value

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }

        if (titulo === "") {
            gerarAlerta("Informe um título para a mensagem.", "alert-danger", "permanente")
            document.querySelector('#modMensagem').style.opacity = '1';
            props.setLoading(false)
        } else if (mensagem === "") {
            gerarAlerta("Informe um texto para a mensagem", "alert-danger", "permanente")
            document.querySelector('#modMensagem').style.opacity = '1';
            props.setLoading(false)
        } else {
            axios.post("http://18.231.108.8:7777/adicionar/mensagem", { destinatario: usrDestino, titulo: titulo, mensagem: mensagem }, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Mensagem enviada com sucesso", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_mensagem()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                props.setLoading(false)
                setTimeout(() => {
                   deslogar()
                }, 2000)
            })
        }
    }

    // MODAL ADD CONTATO - função responsável por enviar um formulário com com o email do contato
    //  ao servidor a adição de um novo chip
    
    const submitAddContato = (event) => {
        event.preventDefault()
        removerAlertas()
        props.setLoading(true)
        document.querySelector('.modalAddContato').style.opacity = '0';
        
        // verificação simples nos dados informados
        const email = document.querySelector("#emailContato").value

        if (email === "") {
            gerarAlerta("O Campo de email não deve ficar em branco.", "alert-danger", "permanente")
            props.setLoading(false)
            document.querySelector('.modalAddContato').style.opacity = '1';
        } else {
            // Envio dos dados ao servidor
            let token = localStorage.getItem('token');
            let config = {
                headers: {
                    token: token
                },
            }
            axios.post("http://18.231.108.8:7777/adicionar/contato", {"email": email}, config)
            .then((response) => {
                if (response.status === 200) {                    
                    setTimeout(() => {
                        gerarAlerta(response.data.status, "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultarModalAddContato()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                props.setLoading(false)
                document.querySelector('.modalAddContato').style.opacity = '1';
                if (error.response.status === 400) {
                    gerarAlerta(error.response.data.error, "alert-danger", "permanente")
                } else {
                    gerarAlerta(error.response.data.error, "alert-danger", "permanente")
                    setTimeout(() => {
                        localStorage.removeItem("token");
                        setShowAuth(showAuth => ({...showAuth, exibir: true}))
                        setAuth(false)
                    })
                }
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função que força uma desconecção por parte do cliente
    const deslogar = () => {
        removerAlertas()
        props.setAuth(false)
        localStorage.removeItem("token");
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de nome ao servidor
    const submitAlterNome = (e) => {
        e.preventDefault()
        removerAlertas()
        let NovoNome = document.querySelector("#alterNome").value;
        let NomeAtual = document.querySelector("#tdNome").innerHTML
        NovoNome = NovoNome.trim()
        NomeAtual = NomeAtual.trim()
        document.querySelector('#modAlterNome').style.opacity = '0';
        props.setLoading(true)

        if (NovoNome === '') {
            gerarAlerta("Nome: Campo em branco", "alert-danger", "permanente")
            document.querySelector('#modAlterNome').style.opacity = '1';
            props.setLoading(false)
        } else if (NovoNome === NomeAtual) {
            gerarAlerta("O Nome inserido é igual ao autal", "alert-danger", "permanente")
            document.querySelector('#modAlterNome').style.opacity = '1';
            props.setLoading(false)
        } else {
            let token = localStorage.getItem('token');
            let config = {
                headers: {
                    token: token
                },
            }
            axios.post("http://18.231.108.8:7777/alterar/nome", {nome: NovoNome}, config)
            .then((response) => {
                if (response.status === 200) {                    
                    setTimeout(() => {
                        gerarAlerta("Nome alterado com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_nome()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                props.setLoading(false)
                gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                setTimeout(() => {
                    deslogar()
                }, 2000)
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de email ao servidor
    const submitAlterEmail = (e) => {
        e.preventDefault()
        removerAlertas()
        let NovoEmail = document.querySelector("#alterEmail").value;
        let EmailAtual = document.querySelector("#tdEmail").innerHTML
        document.querySelector('#modAlterEmail').style.opacity = '0';
        props.setLoading(true)
        NovoEmail = NovoEmail.replace(/\s/g, '')
        EmailAtual = EmailAtual.replace(/\s/g, '')

        if (NovoEmail === '') {
            gerarAlerta("Email: Campo em branco", "alert-danger", "permanente")
            document.querySelector('#modAlterEmail').style.opacity = '1';
            props.setLoading(false)
        } else if (NovoEmail === EmailAtual) {
            gerarAlerta("O Email inserido é igual ao autal", "alert-danger", "permanente")
            document.querySelector('#modAlterEmail').style.opacity = '1';
            props.setLoading(false)
        } else {
            let token = localStorage.getItem('token');
            let config = {
                headers: {
                    token: token
                },
            }
            axios.post("http://18.231.108.8:7777/alterar/email", {email: NovoEmail}, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Email alterado com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_email()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                props.setLoading(false)
                if (error.response.data.status === "Email em Uso") {
                    gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                    document.querySelector('#modAlterEmail').style.opacity = '1';
                    props.setLoading(false)
                } else if (error.response.data.status === "Email invalido") {
                    gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                    document.querySelector('#modAlterEmail').style.opacity = '1';
                    props.setLoading(false)                    
                } else {
                    props.setLoading(false)
                    gerarAlerta(error.response.data.status , "alert-danger", "permanente")
                    setTimeout(() => {
                        deslogar()
                    }, 2000)
                }
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de senha ao servidor
    const submitAlterSenha = (e) => {
        e.preventDefault()
        removerAlertas()
        let SenhaAnterior = document.querySelector("#senhaAnterior").value
        let NovaSenha1 = document.querySelector("#novaSenha1").value
        let NovaSenha2 = document.querySelector("#novaSenha2").value
        document.querySelector('#modAlterSenha').style.opacity = '0';
        props.setLoading(true)

        if (SenhaAnterior === "") {
            gerarAlerta("A Senha anterior não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modAlterSenha').style.opacity = '1';
            props.setLoading(false)
        } else if (NovaSenha1 === ""){
            gerarAlerta("A Nova senha não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modAlterSenha').style.opacity = '1';
            props.setLoading(false)
        } else if (NovaSenha2 === "") {
            gerarAlerta("A Confirmação da nova senha não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modAlterSenha').style.opacity = '1';
            props.setLoading(false)
        } else if (NovaSenha1 !== NovaSenha2) {
            gerarAlerta("A Nova senha e a confirmação da nova senha devem ser iguais.", "alert-danger", "permanente")
            document.querySelector('#modAlterSenha').style.opacity = '1';
            props.setLoading(false)
        } else {
            let token = localStorage.getItem('token');
            let config = {
                headers: {
                    token: token
                },
            }
            axios.post("http://18.231.108.8:7777/alterar/senha", {
                SenhaAnterior: SenhaAnterior,
                NovaSenha: NovaSenha1
            }, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Senha alterada com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_senha()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                if (error.response.data.status === "Senha Atual inválida, logue-se novamente." |
                    error.response.data.status === "Autenticação ou senha inválida.") {
                        gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                        props.setLoading(false)
                        setTimeout(() => {
                            deslogar()
                        }, 2000)
                } else {
                    gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                    document.querySelector('#modAlterSenha').style.opacity = '1';
                    props.setLoading(false)
                }
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de cidade ao servidor
    const submitAlterCidade = (e) => {
        e.preventDefault()
        removerAlertas()
        props.setLoading(true)
        document.querySelector('#modAlterCidade').style.opacity = '0';

        const uf = document.querySelector(".estadoSelecionado").innerHTML
        const cidade  = document.querySelector(".cidadeSelecionada").innerHTML
        
        const strAnterior = document.querySelector("#tdCidade").innerHTML
        let CidadeAnterior =  ""
        for (let i = 0; i < strAnterior.length; i++) {            
            if (strAnterior[i] + strAnterior[i+1] === " -") {
                i = strAnterior.length
            } else {
                CidadeAnterior += strAnterior[i]
            }
        }
        
        let UfAnterior = strAnterior.slice(-2)
        if ((CidadeAnterior === cidade) & (UfAnterior === uf)) {
            gerarAlerta("A cidade selecionada é a mesma que a atual.", "alert-danger", "permanente")
            document.querySelector('#modAlterCidade').style.opacity = '1';
            props.setLoading(false)
        } else {
            let token = localStorage.getItem('token');
            let config = {
                headers: {
                    token: token
                },
            } 
            axios.post("http://18.231.108.8:7777/alterar/cidade", {
                cidade: cidade,
                estado: uf
            }, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Cidade alterada com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_cidade()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                props.setLoading(false)
                setTimeout(() => {
                    deslogar()
                }, 2000)
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de bairro ao servidor
    const submitAlterBairro = (e) => {
        e.preventDefault()
        removerAlertas()
        props.setLoading(true)
        document.querySelector('#modAlterBairro').style.opacity = '0';

        const bairro = document.querySelector("#alterBairro").value.trim()
        const bairroAnterior = document.querySelector("#tdBairro").innerHTML.trim()

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        } 

        if (bairro === "") {
            gerarAlerta("O Bairro não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modAlterBairro').style.opacity = '1';
            props.setLoading(false)
        } else if (bairro === bairroAnterior) {
            gerarAlerta("O Bairro informado é o mesmo que o atual.", "alert-danger", "permanente")
            document.querySelector('#modAlterBairro').style.opacity = '1';
            props.setLoading(false)
        } else {
            axios.post("http://18.231.108.8:7777/alterar/bairro", { bairro: bairro }, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Bairro alterado com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_bairro()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                props.setLoading(false)
                setTimeout(() => {
                    deslogar()
                }, 2000)
            })
        }
    }

    // MODAIS DE ALTERAÇÃO - função responsável por enviar um formulário de alteração de endereço ao servidor
    const submitAlterEndereco = (e) => {
        e.preventDefault()
        removerAlertas()
        props.setLoading(true)
        document.querySelector('#modAlterEndereco').style.opacity = '0';

        const endereco = document.querySelector("#alterEndereco").value.trim()
        const enderecoAnterior = document.querySelector("#tdEndereco").innerHTML.trim()

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        } 
        if (endereco === "") {
            gerarAlerta("O Endereço não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modAlterEndereco').style.opacity = '1';
            props.setLoading(false)       
        } else if (endereco === enderecoAnterior) {
            gerarAlerta("O Endereço informado é o mesmo que o atual.", "alert-danger", "permanente")
            document.querySelector('#modAlterEndereco').style.opacity = '1';
            props.setLoading(false)
        } else {
            axios.post("http://18.231.108.8:7777/alterar/endereco", { endereco: endereco }, config)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        gerarAlerta("Endereço alterado com sucesso !", "alert-success", "permanente")
                        props.setLoading(false)
                    }, 300);
                    setTimeout(() => {
                        ocultar_modal_endereco()
                        setRefreshUsr(true)
                    }, 1000)
                }
            })
            .catch((error) => {
                gerarAlerta(error.response.data.status, "alert-danger", "permanente")
                props.setLoading(false)
                setTimeout(() => {
                    deslogar()
                }, 2000)
            })
        }    
    }

    const disociarContatos = () => {        
        removerAlertas()
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }
        axios.post("http://18.231.108.8:7777/remover/contatos", { contatos: selectedContatos }, config)
        .then((response) => {
            gerarAlerta(response.data.status, "alert-success", "permanente")
            setTimeout(() => {
                setSelectedContatos([])
                removerAlertas()
                ocultar_confirmacao()
                setRefreshUsr(true)
            }, 1000)
        })
        .catch((error) => {
            gerarAlerta(error.response.data.error, "alert-danger", "permanente")
            setTimeout(() => {
                localStorage.removeItem("token");
                setShowAuth(showAuth => ({...showAuth, exibir: true}))
                setAuth(false)
            }, 1000)
        })
    }

    const criarProduto = (e) => {
        e.preventDefault()
        removerAlertas()
        props.setLoading(true)
        document.querySelector('#modProduto').style.opacity = '0';

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                token: token
            },
        }

        const nome = document.querySelector("#nomeAddProduto").value
        const descricao = document.querySelector("#textoAddProduto").value
        const valor = document.querySelector("#valorAddProduto").value
        const usado = document.querySelector("#usadoAddProduto").checked
        const servico = document.querySelector("#servicoAddProduto").checked
        const negociavel = document.querySelector("#negociavelAddProduto").checked

        if (nome === "") {
            gerarAlerta("O Nome não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modProduto').style.opacity = '1';
            props.setLoading(false)

        } else if (descricao === "") {
            gerarAlerta("A descrição não deve ficar em branco.", "alert-danger", "permanente")
            document.querySelector('#modProduto').style.opacity = '1';
            props.setLoading(false)

        } else if (isNaN(valor)) {
            gerarAlerta("O valor informado é inválido.", "alert-danger", "permanente")
            document.querySelector('#modProduto').style.opacity = '1';
            props.setLoading(false)

        } else {
            axios.post("http://18.231.108.8:7777/adicionar/produto", { nome: nome, descricao: descricao, valor: valor, usado: usado, servico: servico, negociavel:negociavel }, config)
            .then((response) => {
                gerarAlerta(response.data.status, "alert-success", "permanente")
                setTimeout(() => {
                    props.setLoading(false)
                    removerAlertas()
                    ocultar_modal_produto()
                    setRefreshUsr(true)
                }, 1000)
            })
            .catch((error) => {
                gerarAlerta(error.response.data.error, "alert-danger", "permanente")
                setTimeout(() => {
                    document.querySelector('#modProduto').style.opacity = '1';
                    props.setLoading(false)
                    localStorage.removeItem("token");
                    setShowAuth(showAuth => ({...showAuth, exibir: true}))
                    setAuth(false)
                }, 1000)
            })
        }
    }

    const montarContato = () => {
        const vendedor = document.querySelector("#emailVendorShowProdUsr").innerHTML
        const titulo = "Olá tenho interesse, no seu Produto"
        setUsrDestino(vendedor)
        
        ocultar_modal_showProdUsr()
        document.querySelector('#tituloMsg').value = titulo;

        setTimeout(() => {
            exibir_modal_mensagem()
        }, 500);
    }

    const montarResposta = () => {
        const destinatario = document.querySelector('#contatoShowMsg').innerHTML
        const titulo = "RE: " + document.querySelector('#tituloShowMsg').innerHTML
        setUsrDestino(destinatario)
        
        ocultar_modal_showMsg()
        document.querySelector('#tituloMsg').value = titulo;

        setTimeout(() => {
            exibir_modal_mensagem()
        }, 500);
    }

    const SelectedContatosMap = selectedContatos.map((contato) => {
        return (
            <li key={contato + "selected"} className="alert alerta-aviso">{contato}</li>
        )
    })

    return (
        <div className="modalsContainer">
            {/* modais que alteram os dados do submodulo clienteDados */}

            {/* modal para alterar o nome */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterNome">
                <div className="fechar" id="fechar_ModAlterNome" onClick={ocultar_modal_nome}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterNome" onSubmit={submitAlterNome} autoComplete="off">
                    <div>
                        <label htmlFor="alterNome">Novo Nome (completo) </label>
                        <input
                            type="text"
                            className="form-control usr_form"
                            id="alterNome"
                            placeholder="Ex: Clovis Adamastor Pilha"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: Clovis Adamastor Pilha"}
                        />
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn1"><span>ALTERAR</span></button>
                    </div>       
                </form>
            </div>

            {/* modal para alterar email */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterEmail">
                <div className="fechar" id="fechar_ModAlterEmail" onClick={ocultar_modal_email}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterEmail" onSubmit={submitAlterEmail} autoComplete="off">
                    <div>
                        <label htmlFor="alterEmail">Novo endereço de Email</label>
                        <input
                            type="text"
                            name="alterEmail"
                            className="form-control usr_form"
                            id="alterEmail"
                            placeholder="Ex: usuario@email.com"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: usuario@email.com"}
                        />
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn2"><span>ALTERAR</span></button>
                    </div>       
                </form>
            </div>

            {/* modal para alterar senha */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterSenha">
                <div className="fechar" id="fechar_ModAlterSenha" onClick={ocultar_modal_senha}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterSenha" onSubmit={submitAlterSenha} autoComplete="off">
                    <div>
                        <label htmlFor="senhaAnterior">Senha Anterior</label>
                        <input
                            type="password"
                            name="oldPass"
                            className="form-control usr_form"
                            id="senhaAnterior"
                            placeholder="●●●●●●●●●●"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                        />
                    </div>
                    <div>
                        <label htmlFor="novaSenha1">Nova Senha</label>
                        <input
                            type="password"
                            name="newPass1"
                            className="form-control usr_form"
                            id="novaSenha1"
                            placeholder="●●●●●●●●●●"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                        />
                    </div>
                    <div>
                        <label htmlFor="novaSenha2">Confirmação da Nova Senha</label>
                        <input
                            type="password"
                            name="newPass1"
                            className="form-control usr_form"
                            id="novaSenha2"
                            placeholder="●●●●●●●●●●"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                        />
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn2"><span>ALTERAR</span></button>
                    </div>       
                </form>
            </div>

            {/* modal para alterar cidade */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterCidade">
                <div className="fechar" id="fechar_ModAlterCidade" onClick={ocultar_modal_cidade}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterCidade" onSubmit={submitAlterCidade} autoComplete="off">                
                    <div className="divSel" id="divSelEstado">
                        <span>
                            <label>Estado</label>
                        </span>    
                        <div className="containerSelectRaiz" >
                            <div className="containerOpEstados containerOpcao">
                                {/* lista de estados inseridos dinamicamente */}
                            </div>
                            <div className="estadoSelecionado opcaosel" onClick={AlterCidadeBtnEstado}>Selecione um Estado</div>
                        </div>
                    </div>
                    <div className="divSel" id="divSelCidade">
                        <span>
                            <label>Cidade</label>
                        </span>    
                        <div className="containerSelectRaiz" >
                            <div className="containerOpCidades containerOpcao">
                                {/* lista de cidades inseridas dinamicamente */}
                            </div>
                            <div className="cidadeSelecionada opcaosel" onClick={AlterCidadeBtnCidade}>Selecione uma Cidade</div>     
                        </div>
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn1"><span>ALTERAR</span></button>
                    </div>
                </form>
            </div>

            {/* modal para alterar bairro */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterBairro">
                <div className="fechar" id="fechar_ModAlterBairro" onClick={ocultar_modal_bairro}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterBairro" onSubmit={submitAlterBairro} autoComplete="off">
                    <div>
                        <label htmlFor="alterBairro">Nome do Bairro</label>
                        <input
                            type="text" name="alterBairro"
                            className="form-control usr_form"
                            id="alterBairro"
                            placeholder="Ex: Jaguaribe"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: Jaguaribe"}
                        />
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn1"><span>ALTERAR</span></button>
                    </div>       
                </form>
            </div>

            {/* modal para alterar endereco */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modAlterEndereco">
                <div className="fechar" id="fechar_ModAlterEndereco" onClick={ocultar_modal_endereco}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formAlterEndereco" onSubmit={submitAlterEndereco} autoComplete="off">
                    <div>
                        <label htmlFor="alterEndereco">Novo Endereço</label>
                        <input
                            type="text"
                            name="alterEndereco"
                            className="form-control usr_form"
                            id="alterEndereco"
                            placeholder="Ex: Avenida Primeiro de Maio, 404"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: Avenida Primeiro de Maio, 404"}
                        />              
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn1"><span>ALTERAR</span></button>
                    </div>       
                </form>
            </div>
            
            {/* modais que alteram os dados no componente usuario contatos */}
            
            {/* modal para adicao de um novo contato */}
            <div className="modalAddContato bg-cor2 bshadow5">
                <div className="addChipContainer">
                    <form method="POST" id="addChipForm" autoComplete="off">
                        <div className="fechar" id="fechar_AddChip" onClick={ocultarModalAddContato}>
                            <img src={svgCruz} className="fechar_btn" alt ="" />
                        </div>
                        <div className="adicionarContato">
                            <label htmlFor="emailContato" className="texto_claro">Email do Contato</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control usr_form"
                                id="emailContato"
                                placeholder="contato@email.com"
                                onFocus={(e) => e.target.placeholder = ""} 
                                onBlur={(e) => e.target.placeholder = "contato@email.com"}
                            />
                        </div>
                        <div className="flexEndBtn">
                            <button type="submit" className="btn custombtn1" onClick={submitAddContato}>
                                <img src={plusSvg} alt="" />
                                    <span>ADICIONAR</span>
                            </button>
                        </div>                    
                    </form>
                </div>
            </div>

            {/* modal de confirmação para a desassociação de de contatos do usuário */}
            <div id="alertaApagar" className="bgleve">
                <p> Deseja mesmo dissociar os contatos selecionados da conta ?</p>
                <ul>
                    {SelectedContatosMap}
                </ul>
                <div id="AlertaApagarBtns">
                    <button className="btn custombtn5 btn-lg" onClick={disociarContatos}>SIM</button>
                    <button className="btn custombtn2 btn-lg" onClick={ocultar_confirmacao}><span>NÃO</span></button>
                </div>
            </div>

            {/* modal para enviar mensagem */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modMensagem">
                <div className="fechar" id="fechar_ModMensagem" onClick={ocultar_modal_mensagem}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formEnviarMsg" autoComplete="off">
                    <div>
                        <label htmlFor="tituloMsg">Assunto</label>
                        <input
                            type="text"
                            className="form-control usr_form"
                            id="tituloMsg"
                            placeholder="Tenho interesse em produto anunciado"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: Olá tenho interesse no produto anunciado"}
                        />
                        <label htmlFor="textoMsg">Texto</label>
                        <textarea
                            className="form-control usr_form"
                            id="textoMsg"
                        />
                    </div>
                    <div className="flexEndBtn">
                        <button type="submit" className="btn custombtn1" onClick={postMensagem}>
                            <span>ENVIAR</span>
                        </button>
                    </div>       
                </form>
            </div>

            {/* modais que estão relacionados aos produtos do usuário */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modProduto">
                <div className="fechar" id="fechar_ModMensagem" onClick={ocultar_modal_produto}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <form method="POST" id="formCriarProduto" autoComplete="off">
                    <div>
                        <label htmlFor="nomeAddProduto">Nome</label>
                        <input
                            type="text"
                            className="form-control usr_form"
                            style={{"width":"350px"}}
                            id="nomeAddProduto"
                            placeholder="Ex: Bicicleta Aro 26"
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "Ex: Bicicleta Aro 26"}
                        />
                        <label htmlFor="textoAddProduto" style={{"marginTop":".8rem"}}>Descrição do Produto/Serviço</label>
                        <textarea
                            className="form-control usr_form"
                            id="textoAddProduto"
                        />
                        <label htmlFor="valorAddProduto"style={{"marginTop":".8rem"}}>Valor</label>
                        <input
                            type="text"
                            className="form-control usr_form"
                            id="valorAddProduto"
                            placeholder="256,64"
                            style={{"width":"350px"}}
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "256,64"}
                        />
                        <div className="produto_check">
                            <input className="form-check-input" type="checkbox" value="" id="usadoAddProduto"/>
                            <label className="form-check-label" htmlFor="usadoAddProduto">
                                Usado (Em caso de produto)
                            </label>
                        </div>
                        <div className="produto_check">
                            <input className="form-check-input" type="checkbox" value="" id="servicoAddProduto"/>
                            <label className="form-check-label" htmlFor="servicoAddProduto">
                                Serviço
                            </label>
                        </div>
                        <div className="produto_check">
                            <input className="form-check-input" type="checkbox" value="" id="negociavelAddProduto"/>
                            <label className="form-check-label" htmlFor="negociavelAddProduto">
                                Valor Negociavel
                            </label>
                        </div>
                        
                    </div>
                    <div>
                        <button type="submit" className="btn custombtn1" onClick={criarProduto}>
                            <span>CRIAR</span>
                        </button>
                    </div>       
                </form>
            </div>


            {/* modais que estão relacionados aos produtos do usuário */}
            <div className="modalAlteracao bg-cor2 bshadow5" id="modShowMsg">
                <div className="fechar" id="fechar_ModShowMsg" onClick={ocultar_modal_showMsg}>
                    <img src={svgCruz} className="fechar_btn" alt="" />
                </div>
                <div id="dadosMsg" className='texto_claro'>
                    <h4 id='tituloShowMsg' style={{"width":"350px"}}>Assunto MSG</h4>
                    <p id='contatoShowMsg' style={{"marginTop":"1rem"}}></p>
                    <p id='dataHoraShowMsg' style={{"marginBottom":"2rem"}}></p>
                    <p id='textoShowMsg' style={{"marginBottom":"2rem", "width":"350px"}}></p>
                    <button type="submit" className="btn custombtn1" onClick={montarResposta}>
                        <span>RESPONDER</span>
                    </button>
                </div>
            </div>


            {/* modal para exibicao de dados do produto */}
            <div className="modal-showProdUsr" id='modal-showProdUsr' style={{"width":"480px"}}>
                <div className="fechar" id="fechar-showProdUsr" onClick={ocultar_modal_showProdUsr}>
                    <img src={svgCruz} className="fechar_btn" alt="fechar modal showProdUsr" />
                </div>
                <div className="headerbox bg-cor1" id='tituloShowProdUsr'></div>
                
                <div style={{"padding":"1rem"}}>
                    <p id='descricaoShowProdUsr'></p>
                    <span>Email do Vendedor: </span>
                    <strong><span id="emailVendorShowProdUsr" style={{"marginBottom": "5px"}}></span></strong>
                    <br/>
                    <p id='usadoShowProdUsr'></p>
                    <p id='negociavelShowProdUsr' style={{"marginBottom": "5px"}}></p>
                    
                    <p id='valorShowProdUsr'></p>
                    <hr/>
                    <button type="submit" className="btn custombtn1" onClick={montarContato}>
                        <span>Contatar Vendedor</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalsUsuario