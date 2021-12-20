import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios'

import Home from './routes/Home'
import Cadastro from './routes/Cadastro'
import Usuario from './routes/Usuario'
import Header from './components/header'
import Footer from './components/footer'
import Modals from './components/modals'

import './styles/bootstrap.css'
import './styles/main.css'
import './styles/cadastro.css'



const App = () => {

  // estados do componente principal
  const [ isAuth, setAuth ] = useState(false)
  const [ isLoading, setLoading ] = useState(false)
  const [ usrDestino, setUsrDestino ] = useState("")
  const [ refreshUsr, setRefreshUsr ] = useState(false)
  const [ exibirCompras, setExibirCompras ] = useState(false)
  const [ selectedContatos, setSelectedContatos ] = useState([])
  const [ showPlanos, setShowPlanos ] = useState({
    exibir: false,
    chip: ""
  })
  const [ showAuth, setShowAuth ] = useState({
    exibir: false,
    login: ""
  });

  // função que verifica no servidor a validade do token
  const verifyToken = useCallback(async () => {
    let token = localStorage.getItem('token');
    let config = {headers: {token: token}}
    
    if (token != null) {
      await axios.get("http://18.231.108.8:7777/verificarToken", config)
      .then((response) => {
        if (response.data.status === "valido") {
          // o token existnte é válido
          if (!isAuth) {
            setAuth(true)
          }
        }
      })
      .catch(() => {
        // o token existente é inválido
        if (isAuth) {
          setAuth(false);
        }
        localStorage.removeItem("token");
      })
    }

    else {
      // o token não existe
      if (isAuth) {
        setAuth(false);
      }
    }
  }, [isAuth, setAuth])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])


  useEffect(() => {
    if (isLoading) {
      document.querySelector('#loading').firstElementChild.style.display = "flex";
    } else {
      document.querySelector('#loading').firstElementChild.style.display = "none";
    }
  },[isLoading]);


  return (
    <div className="App">
      <BrowserRouter>
        <div className="absolut_index" id="div_abs">

          <Header
            setAuth={setAuth}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
            exibirCompras={exibirCompras}
            setExibirCompras={setExibirCompras}
          />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={
                    props =>
                    !isAuth ? (
                      <Home {...props} verifyToken={verifyToken} />
                    ) : (
                    <Redirect to="/usuario" />
                    )
                  }
                />

                <Route
                  exact
                  path="/cadastro"
                  render={
                    props =>
                    !isAuth ? (
                      <Cadastro 
                        {...props}
                        verifyToken={verifyToken}
                        showAuth={showAuth}
                        setShowAuth={setShowAuth}
                        isLoading={isLoading}
                        setLoading={setLoading}
                      />
                    ) : (
                      <Redirect to="/usuario" />
                    )
                  }
                />

                <Route 
                  exact
                  path="/usuario"
                  render={
                    props => 
                    isAuth ? (
                      <Usuario 
                        {...props} 
                        verifyToken={verifyToken}
                        isLoading={isLoading}
                        setLoading={setLoading}
                        refreshUsr={refreshUsr}
                        setRefreshUsr={setRefreshUsr}
                        setShowPlanos={setShowPlanos}
                        setShowAuth={setShowAuth}
                        showAuth={showAuth}
                        setAuth={setAuth}
                        selectedContatos={selectedContatos}
                        setSelectedContatos={setSelectedContatos}
                        setUsrDestino={setUsrDestino}
                        exibirCompras={exibirCompras}
                        setExibirCompras={setExibirCompras}
                      />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
              </Switch>

          <Footer />
        </div>

        {/* o componente modals estará presente por toda aplicação */}
        <div className="bg-modal" id="bg-modal">
            <Modals 
              verifyToken={verifyToken}
              showAuth={showAuth}
              setAuth={setAuth}
              setShowAuth={setShowAuth}
              isLoading={isLoading}
              setLoading={setLoading}
              setRefreshUsr={setRefreshUsr}
              showPlanos={showPlanos}
              setShowPlanos={setShowPlanos}
              selectedContatos={selectedContatos}
              setSelectedContatos={setSelectedContatos}
              usrDestino={usrDestino}
              setUsrDestino={setUsrDestino}
            />

            {/* container de alertas */}
            <div id="alertas"></div>
            
            {/* spinner de carregamento */}
            <div id="loading">
                <svg>
                    <circle cx="40" cy="40" r="40"></circle>
                </svg>
            </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
