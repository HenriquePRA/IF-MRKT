export const gerarAlerta = (mensagem, tipoAlerta, tipo, funcaoSecundaria) => {
    // seleção da div dos alertas
    const containerAlerta = document.querySelector('#alertas');
    if (tipo === "temporario") {
        // exibição do alerta
        let alerta =  document.createElement('div');
        alerta.className = "alert "+ tipoAlerta;
        alerta.id = "alertaTemporario"
        alerta.innerHTML = mensagem;
        // adição do alerta ao modal de alertas
        containerAlerta.innerHTML = ""
        containerAlerta.appendChild(alerta)

        // ocultamento do alerta
        setTimeout(function(){
            document.querySelector('#div_abs').classList.remove('filtro');
        }, 800)

        // ocultamento da mensagem de sucesso
        setTimeout(function(){
            document.querySelector("#alertaTemporario").style.opacity = "0";
        }, 1000)

        setTimeout(function(){
            if (funcaoSecundaria instanceof Function) {
                funcaoSecundaria()
            }
            containerAlerta.innerHTML = "";
        }, 1200)
        
    } else if (tipo === "permanente") {
        // exibição do alerta
        let alerta =  document.createElement('div');
        alerta.className = "alert "+ tipoAlerta;
        alerta.id = "alCidade"
        alerta.innerHTML = mensagem;
        containerAlerta.appendChild(alerta);
    }
}

//ocultar ou exibir os modais
export let exibirFundo = () => {
    document.querySelector('#div_abs').classList.remove('filtro');
    document.querySelector('.bg-modal').style.display = 'none';
}

export let borrarFundo = () => {
    document.querySelector('#div_abs').classList.add('filtro');
    document.querySelector('.bg-modal').style.display = 'flex';
}

export let removerAlertas = () => {
    let tempvar = document.querySelector("#alertas");
    if (tempvar != null) {
        tempvar.innerHTML = "";
    };
};

export let cardsVisible = () => {
    const cardsContainer = document.querySelector(".card-container");
    cardsContainer.classList.add("containerView");
    const cards = document.querySelectorAll(".card");
    let i = 0
    cards.forEach((card) => {
        i += 150
        setTimeout(() => {
            card.classList.add('is-visible');
        }, 200 + i);
    });
};

