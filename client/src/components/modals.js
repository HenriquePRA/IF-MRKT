import React from 'react'
import { withRouter } from 'react-router-dom'
import ModalsHome from './modals_home'
import ModalsUsuario from './modals_usuario'
import ModalsCadastro from './modals_cadastro'

const Modals = (props) => {
    if (props.location.pathname === "/") {
        return (
            <ModalsHome
                setAuth={props.setAuth}
                showAuth={props.showAuth}
                verifyToken={props.verifyToken}
                setShowAuth={props.setShowAuth}
                isLoading={props.isLoading}
                setLoading={props.setLoading}
                addEscPilha={props.addEscPilha}
                removeEscPilha={props.removeEscPilha}
                closeModalAuth={props.closeModalAuth}
            />
        )        
    } else if (props.location.pathname === "/cadastro") {
        return (
            <ModalsCadastro 
                showAuth={props.showAuth}
                setShowAuth={props.setShowAuth}
                history={props.history}
            />
        )
    } else if (props.location.pathname === "/usuario") {
        return (
            <ModalsUsuario 
                isLoading={props.isLoading}
                setLoading={props.setLoading}
                setAuth={props.setAuth}
                setShowAuth={props.setShowAuth}
                showAuth={props.showAuth}
                addEscPilha={props.addEscPilha}
                removeEscPilha={props.removeEscPilha}
                setRefreshUsr={props.setRefreshUsr}
                showPlanos={props.showPlanos}
                setShowPlanos={props.setShowPlanos}
                selectedContatos={props.selectedContatos}
                setSelectedContatos={props.setSelectedContatos}
                usrDestino={props.usrDestino}
                setUsrDestino={props.setUsrDestino}
            />
        )
    }
}

export default withRouter(Modals)
