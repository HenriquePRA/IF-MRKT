import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { borrarFundo } from '../components/funcoes'


// função que lida com as respostas de submissão de cadastro
const cadastroHandler = (response) => new Promise((resolve, reject) => {
    if (response.data.status === "error") {
        exibirErros(response.data.errors).then(reject)
    } else {
        exibirSucesso(response.data.dados).then(resolve)
    }
})


// função que exibe erros em um modal
const exibirErros = (erros) => new Promise((resolve) => {
    borrarFundo();
    const lista = document.getElementById("listaErros");
    for (const [key, value] of Object.entries(erros)) {
        var erroritem = document.createElement('li');
        erroritem.className = "alert alert-danger";
        erroritem.innerHTML = "<strong>" + key + "</strong>: " + value;
        lista.appendChild(erroritem);
    }
    document.querySelector("#modalErros").style.display = "flex";
    resolve()
})


// função que exibe o modal de sucesso
const exibirSucesso = (dados) => new Promise ((resolve) => {
    borrarFundo()
    document.getElementById("modalSucesso").style.display = "flex"
    document.getElementById("logLi").innerHTML += dados["login"]
    document.getElementById("emailLi").innerHTML += dados["email"]
    resolve()
})


 // busca pela lista de estados
const getEstados = async () => {
    const url = "/consulta/estados";
    const response = await fetch(url);
    const resjson = await response.json();
    return resjson;
};


// busca pela lista de cidades de um estado
const getCidades = async (uf) => {
    const url = "/consulta/cidades/" + uf;
    const response = await fetch(url);
    const resjson = await response.json();
    return resjson;
};


// carrega uma lista de estados nas opçoes do formulario
const estadosLoad = () => new Promise ( async (resolve) => {
    const jsonEstados = await getEstados();
    const selectEstado = document.querySelector("#selectEstado");
    selectEstado.innerHTML = "";
    await jsonEstados.data.estados.forEach(item => {
        let uf = item["uf"];
        selectEstado.innerHTML += "<option>" + uf  +"</option>";
    })
    resolve();
}) 


// carrega uma lista de cidades nas opçoes do formulario
const cidadesLoad = () => new Promise ( async (resolve) => {
    const selectEstado = document.querySelector("#selectEstado");
    const ufsel = selectEstado.options[selectEstado.selectedIndex].value;
    const jsonCidades = await getCidades(ufsel);
    const selectCidade = document.querySelector("#selectCidade");
    selectCidade.innerHTML = "";
    await jsonCidades.data.cidades.forEach(item => {
        let nome = item["nome_cidade"];
        selectCidade.innerHTML += "<option>" + nome + "</option>";
    });
    resolve()
})


const Cadastro = (props) => {

    // redução de caminho para acessar uma prop
    const { setShowAuth } = props;

    // campos do formulario
    const [ Nome, setNome ] = useState("");
    const [ Sobrenome, setSobrenome ] = useState("");
    const [ Email, setEmail ] = useState("");
    const [ Login, setLogin ] = useState("");
    const [ Senha, setSenha ] = useState("");
    const [ Confirmação, setConfirmação ] = useState("");
    const [ Endereço, setEndereço ] = useState("");
    const [ Bairro, setBairro ] = useState("");
    const [ Estado, setEstado ] = useState("");
    const [ Cidade, setCidade ] = useState("");


    // lida diretamente com a submissão de um formulário de cadastro
    const submitHandler = e => {

        const formulario = {
            Nome: Nome,
            Sobrenome: Sobrenome,
            Email: Email,
            Login: Login,
            Senha: Senha,
            Confirmação: Confirmação,
            Endereço: Endereço,
            Bairro: Bairro,
            Estado: Estado,
            Cidade: Cidade
        }

        e.preventDefault()
        
        axios.post('/cadastro/usuario', formulario)
        .then(response => {
            cadastroHandler(response).then(() => {
                setShowAuth({
                    exibir: true,
                    login: Login
                });
                const cadCount = document.querySelector("#cadCount");
                let count = 20;
                setInterval(() => {
                    if (count > 0) count -= 1;
                    cadCount.innerHTML = count;
                }, 1000);
                setTimeout(() => {
                    if (props.history.location.pathname === '/cadastro') {
                        props.history.push("/");
                    }
                }, 20000);
            }).catch(() => {
                console.error("Cadastro inválido");
            })
        })
    }

    // função que lida com a troca estado no campo "estado" do formulario
    // em cadeia carrega as cidades desse estado
    const estadosChange = (event) => {
        event.persist();
        const selectEstado = document.querySelector("#selectEstado");
        const estado_sel = selectEstado.options[selectEstado.selectedIndex].value;
        cidadesLoad(estado_sel).then(() => {
            estadoUpdate(event);
        }).then(() => {
            let cidade = document.querySelector("#selectCidade");
            cidadeUpdate(cidade, true);
        });
    }


    // funçõo que realiza mudança na propriedade "estado" do modulo de acordo com um evento
    // no formulário ou a partir de uma rotina de carga
    const estadoUpdate = useCallback((e, targetless = false) => new Promise ((resolve) => {
        if (targetless) {
            setEstado(e.options[e.selectedIndex].value);
        } else {
            setEstado(e.target.options[e.target.selectedIndex].value);
        }
        resolve();
    }), [setEstado]);


    // funçõo que realiza mudança na propriedade "cidade" do modulo de acordo com um evento
    // no formulário ou a partir de uma rotina de carga
    const cidadeUpdate = useCallback((e, targetless = false)  => new Promise ((resolve) => {
        if (targetless) {
            setCidade(e.options[e.selectedIndex].value);
        } else {
            setCidade(e.target.options[e.target.selectedIndex].value);
        }
        resolve();
    }), [setCidade]);


    // ao montar o o componente carrega a lista de estados e em cadeia carrega
    // as cidades desse mesmo estado
    useEffect(() => {
        estadosLoad().then(async () => {
            await cidadesLoad();;
        }).then(() => {
            const estado = document.querySelector("#selectEstado");
            estadoUpdate(estado, true);
        }).then(() => {
            const cidade = document.querySelector("#selectCidade");
            cidadeUpdate(cidade, true);
        })
    }, [estadoUpdate, cidadeUpdate]);


    useEffect(() => {
        document.querySelector("#backgroundForm").style.opacity = "1";
    }, [])

    return (
        <div>
            <div className="absolut_index" id="div_abs">
                <div id="backgroundForm">
                    <form 
                        method="POST"
                        className="registro"
                        id="regForm"
                        onSubmit={submitHandler}
                        autoComplete="off"
                    >
                        <div id="Formbackground"></div>
                        <div id="sombra1">
                            <div id="part1">
                                <div className="bloco1">
                                    <label htmlFor="Nome" className="customlabel">Nome</label>
                                    <input 
                                        type="text"
                                        name="Nome"
                                        className="form-control customInput1"
                                        id="regNome"
                                        placeholder="Clovis" 
                                        value={Nome}
                                        onChange={e=>setNome(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "Clovis"}
                                    />              
                                    <label htmlFor="Sobrenome" className="customlabel">Sobrenome</label>
                                    <input 
                                        type="text"
                                        name="Sobrenome"
                                        className="form-control customInput1"
                                        placeholder="Adamastor Pilha"
                                        id="regSobreNome"
                                        value={Sobrenome}
                                        onChange={e=>setSobrenome(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "Adamastor Pilha"}
                                    />                             
                                </div>
                                <div className="bloco2">
                                    <label htmlFor="Email" className="customlabel">Email</label>
                                    <input 
                                        type="Email"
                                        name="Email"
                                        className="form-control customInput1"
                                        placeholder="usuario@email.com"
                                        id="regEmail"
                                        value={Email}
                                        onChange={e=>setEmail(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "usuario@email.com"}
                                    />                     
                                </div>
                                <div className="bloco3">
                                    <label htmlFor="Login" className="customlabel">Login</label>
                                    <input 
                                        type="text"
                                        name="Login"
                                        className="form-control customInput1"
                                        placeholder="usuario123"
                                        id="regUsr"
                                        value={Login}
                                        onChange={e=>setLogin(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "usuario123"}
                                    />                    
                                </div>

                                <div className="bloco4">
                                    <label htmlFor="password1" className="customlabel">Senha</label>
                                    <input 
                                        type="password"
                                        name="Senha"
                                        className="form-control customInput1"
                                        placeholder="●●●●●●●●●●"
                                        id="regPassword1"
                                        value={Senha}
                                        onChange={e=>setSenha(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                                    />
                                    <label htmlFor="password2" className="customlabel">Confirmação Senha</label>
                                    <input 
                                        type="password"
                                        name="Confirmação"
                                        className="form-control customInput1"
                                        placeholder="●●●●●●●●●●"
                                        id="regPassword2"
                                        value={Confirmação}
                                        onChange={e=>setConfirmação(e.target.value)}
                                        onFocus={(e) => e.target.placeholder = ""} 
                                        onBlur={(e) => e.target.placeholder = "●●●●●●●●●●"}
                                    />                    
                                </div>
                            </div>
                        </div>

                        <div id="part2">
                            <div className="bloco5">
                                <label htmlFor="Endereço" className="customlabel texto_escuro">Endereço</label>
                                <input 
                                    type="text"
                                    name="Endereço"
                                    className="form-control customInput2"
                                    placeholder="Av. Exemplo, 404"
                                    id="regEndereco"
                                    value={Endereço}
                                    onChange={e=>setEndereço(e.target.value)}
                                    onFocus={(e) => e.target.placeholder = ""} 
                                    onBlur={(e) => e.target.placeholder = "Av. Exemplo, 404"}
                                />
                                <label htmlFor="Bairro" className="customlabel texto_escuro">Bairro</label>
                                <input
                                    type="text"
                                    name="Bairro"
                                    className="form-control customInput2"
                                    placeholder="Bairro Exemplo"
                                    id="regBairro"
                                    value={Bairro}
                                    onChange={e=>setBairro(e.target.value)}
                                    onFocus={(e) => e.target.placeholder = ""} 
                                    onBlur={(e) => e.target.placeholder = "Bairro Exemplo"}
                                />
                                <label className="customlabel texto_escuro">Estado</label><br />
                                <select
                                    className="form-control customInput2"
                                    id="selectEstado"
                                    onChange={estadosChange}
                                >
                                </select>
                                <label className="customlabel texto_escuro">Cidade</label><br />
                                <select 
                                    className="form-control customInput2"
                                    id="selectCidade"
                                    onChange={cidadeUpdate}
                                >
                                </select>
                            </div>
                            <div className="bloco6">
                                <p className="texto_secundario">
                                    Ao clicar em Cadastrar-se, confirmo que li e concordo com os <span className="linkTxt">Termos de serviço</span>,
                                    a <span className="linkTxt">Política de privacidade</span>, e desejo receber e-mails e atualizações.
                                </p>
                            </div>
                            <button type="submit" className="btn btn-lg custombtnCadastro">CADASTRAR-SE</button>
                        </div>            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cadastro
