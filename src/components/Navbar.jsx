import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',         label: 'Accueil'  },
  { to: '/a-propos', label: 'À Propos' },
  { to: '/services', label: 'Services' },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__brand">
        <img src={logoImg} alt="Laverie Plus" className="navbar__logo-img" />
      </Link>

      {/* Desktop nav */}
      <nav className="navbar__links">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Link to="/contact" className="cta-btn navbar__cta">
        Contactez-nous
      </Link>

      {/* Burger (mobile) */}
      <button
        className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        <img src={logoImg} alt="Laverie Plus" className="navbar__drawer-logo" />
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/contact" className="cta-btn" onClick={() => setOpen(false)}>
          Contactez-nous
        </Link>
      </div>
    </header>
  )
}
