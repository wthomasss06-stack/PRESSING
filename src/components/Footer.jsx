import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand-col">
          <div className="footer__logo">MD Laverie Pressing</div>
          <p className="footer__tagline">
            Votre linge, notre métier. Service professionnel de lavage et pressing.
          </p>
          <div className="footer__address">
            <span className="material-symbols-outlined">location_on</span>
            <span>Carrefour Angré, près de la Pharmacie Actuelle</span>
          </div>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h5 className="footer__col-title">Services</h5>
          <ul className="footer__list">
            <li><Link to="/services">Laver et Plier</Link></li>
            <li><Link to="/services">Nettoyage à Sec</Link></li>
            <li><Link to="/services">Repassage</Link></li>
            <li><Link to="/services">Packs Mensuels</Link></li>
          </ul>
        </div>

        {/* Nav */}
        <div className="footer__col">
          <h5 className="footer__col-title">Liens</h5>
          <ul className="footer__list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h5 className="footer__col-title">Contact</h5>
          <div className="footer__contacts">
            <a href="tel:0142507750" className="footer__contact-link">
              <span className="material-symbols-outlined">call</span>
              01 42 50 77 50
            </a>
          </div>
          <div className="footer__socials">
            <a href="#" className="footer__social-btn" aria-label="Partager">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="#" className="footer__social-btn" aria-label="Email">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
            <a href="#" className="footer__social-btn" aria-label="WhatsApp">
              <span className="material-symbols-outlined">chat</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2024 MD Laverie Pressing. Tous droits réservés.</p>
        <p className="footer__credit">
          Fait avec <span style={{ color: 'var(--clr-primary)' }}>♥</span> par AKATech
        </p>
      </div>
    </footer>
  )
}
