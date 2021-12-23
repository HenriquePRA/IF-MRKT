import React from 'react'
import { Link } from 'react-router-dom';
import facebookSvg from '../img/facebook.svg';
import instagramSvg from '../img/instagram.svg';
import twitterSvg from '../img/twitter.svg';
import pinterestSvg from '../img/pinterest.svg';    
import linkedInSvg from '../img/linkedin.svg';
import youtubeSvg from '../img/youtube.svg';


const mdl_footer = () => {
    return (
        <div className="bg-cor1" id="footer">            
            <nav className="footerLinks container navbar-dark">
                <div className="FL_bloco1 texto_semiTransparente">
                    <Link to="/" className="navbar-brand" id="footerLogo"><span id="ltr">IF</span> MRKT</Link>
                    <p className="tagline">Seu marketplace seguro</p>
                    <h5 className="texto_claro">Sobre nós</h5>
                    <p>Somos uma empresa de compra e venda de produtos ficticia em intividade sobre todo território brasileiro.</p>
                </div>
                <div className="FL_bloco2 texto_semiTransparente">
                    <h5 className="texto_claro">Links Úteis</h5>
                    <Link to="/">Suporte Técnico</Link><br />                    
                    <Link to="/">Termos de serviço</Link><br />
                    <Link to="/">Politica de Privacidade</Link><br />
                    <h5 className="texto_claro">Contato</h5>
                    <span className="texto_claro">Telefone: </span><span>(00) 0000-0000</span><br />
                    <span className="texto_claro">E-mail: </span><span>sac@ifmrkt.com</span>
                </div>
                <div className="FL_bloco3">
                    <h5 className="texto_claro">Midias Sociais</h5>
                    <div id="FSocial">
                        <img src={facebookSvg} alt="Facebook icon"></img>
                        <img src={instagramSvg} alt="Instagram icon"></img>
                        <img src={twitterSvg} alt="Twitter icon"></img>
                        <img src={pinterestSvg} alt="Pinterest icon"></img>
                        <img src={linkedInSvg} alt="Linkedin icon"></img>
                        <img src={youtubeSvg} alt="Youtube icon"></img>
                    </div>
                </div>
            </nav>
            <hr />
            <div className="text-center py-3 texto_claro"> &copy; 2021 Copyright IF MRKT </div>
        </div>
    )
}

export default mdl_footer
