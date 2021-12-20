import React from 'react';
import { exibirFundo } from './funcoes';

import cruzSvg from '../img/cruz.svg';
import javascriptSvg from '../img/tools/javascript.svg';
import reactSvg from '../img/tools/react.svg';
import nodeSvg from '../img/tools/nodejs.svg'
import expressSvg from '../img/tools/express.svg'
import css3Svg from '../img/tools/css.svg';
import botstrapSvg from '../img/tools/bootstrap.svg';
import postgreSvg from '../img/tools/postgresql.svg';



const Sobre = () => {

    const ocultarModalSobre = () => {    
        document.querySelector(".modal-sobre").style.display = "none";
        document.querySelector(".modal-sobre").style.opacity = "0";
        setTimeout(function(){
            exibirFundo()
        }, 50)
    }

    return (
        <div className="modal-sobre">
            <div className="fechar" id="fechar-sobre" onClick={ocultarModalSobre}>
                <img src={cruzSvg} className="fechar_btn" alt="fechar modal sobre" />
            </div>
            <div className="headerbox bg-cor1">SOBRE O IF MRKT</div>
            <div id="texto-sobre">
                Projeto final das disciplinas gerencia de projetos de Software e comércio eletronico, o IF Marketplace (MRKT) 
                é o maior projeto de faculdade que fiz até hoje por se tratar de um projeto de disciplinas que beiram o fim do 
                curso (CTSI IFPB 5º Periodo), nele fiz uso de várias técnicas e ferramentas aprendidas durante o curso 
                ou aprendidas por conta própria, esse projeto faz uso das seguintes tecnologias e ferramentas:
            </div>
            <div id="texto-tec">
                <div className="minicardcont">
                    <div className="minicardSobre">
                        <img src={postgreSvg} alt="postgresql logo" />
                        <span className="texto_claro bg-postgres">PostgreSQL</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={expressSvg} alt="expressjs logo" />
                        <span className="texto_claro bg-express">Express API</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={reactSvg} alt="react js logo" />
                        <span className="texto_claro bg-react">React JS</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={nodeSvg} alt="nodejs logo" />
                        <span className="texto_claro bg-node">Node JS</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={botstrapSvg} alt="bootstrap 4 logo" />
                        <span className="texto_claro bg-bootstrap">Bootstrap 4</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={css3Svg} alt="css 3 logo" />
                        <span className="texto_claro bg-css3">CSS3</span>
                    </div>
                    <div className="minicardSobre">
                        <img src={javascriptSvg} alt="javascript logo" />
                        <span className="texto_escuro bg-js">Javascript</span>
                    </div>
                </div>
            </div>
            <div id="sobre-footer" className="texto_secundario">
                Este projeto possúi todos os seus códigos e documentação no link abaixo.<br />
                <a href="https://github.com/HenriquePRA">Link do repositório</a>
            </div>
        </div>
    )
}

export default Sobre;
