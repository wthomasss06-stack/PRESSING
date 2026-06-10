import { useState } from 'react'
import AnimatedIcon from '../components/AnimatedIcon'
import './Contact.css'

const SERVICES = [
  'Laver & Plier',
  'Nettoyage à Sec',
  'Repassage',
  'Linge de Maison',
  'Pressing Express',
  'Pack Mensuel',
  'Autre',
]

const INFOS = [
  {
    icon: 'location_on',
    variant: 'pulse',
    label: 'Adresse',
    value: 'Carrefour Angré, près de la Pharmacie Actuelle, Abidjan',
  },
  {
    icon: 'call',
    variant: 'float',
    label: 'Téléphone',
    value: '01 42 50 77 50',
    href: 'tel:0142507750',
  },
  {
    icon: 'schedule',
    variant: 'pulse',
    label: 'Horaires',
    value: 'Lun – Sam : 7h00 – 20h00',
  },
]

const INIT = { name: '', phone: '', email: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm]     = useState(INIT)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrMsg(data.error || 'Une erreur est survenue.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(INIT)
    } catch (err) {
      setErrMsg('Impossible de joindre le serveur. Vérifiez votre connexion.')
      setStatus('error')
    }
  }

  return (
    <main className="contact-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <span className="section-eyebrow">On est à l'écoute</span>
          <h1 className="section-title contact-hero__title">Contactez-Nous</h1>
          <p className="contact-hero__sub">
            Pour une collecte, un devis ou une simple question — répondons ensemble.
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="contact-body">
        <div className="contact-body__inner">

          {/* ── Infos ──────────────────────────────────────── */}
          <div className="contact-infos">
            {INFOS.map((info) => (
              <div key={info.label} className="contact-info-card">
                <AnimatedIcon icon={info.icon} variant={info.variant} size="md" />
                <div>
                  <p className="contact-info-card__label">{info.label}</p>
                  {info.href
                    ? <a href={info.href} className="contact-info-card__value contact-info-card__value--link">{info.value}</a>
                    : <p className="contact-info-card__value">{info.value}</p>
                  }
                </div>
              </div>
            ))}

            <a href="tel:0142507750" className="cta-btn contact-call-btn">
              <span className="material-symbols-outlined">call</span>
              01 42 50 77 50
            </a>

            {/* Map placeholder */}
            <div className="contact-map">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                alt="Carte localisation"
              />
              <div className="contact-map__overlay">
                <span className="material-symbols-outlined">location_on</span>
                Carrefour Angré
              </div>
            </div>
          </div>

          {/* ── Formulaire ────────────────────────────────── */}
          <div className="contact-form-wrap">

            {status === 'success' ? (
              <div className="contact-form-sent">
                <div className="contact-form-sent__icon">
                  <span className="material-symbols-outlined material-symbols-filled">
                    check_circle
                  </span>
                </div>
                <h3>Message envoyé !</h3>
                <p>
                  Merci <strong>{form.name || 'à vous'}</strong>. Nous vous répondrons très vite.
                  {form.email && <> Un email de confirmation a été envoyé à <strong>{form.email}</strong>.</>}
                </p>
                <button
                  className="ghost-btn"
                  onClick={() => setStatus('idle')}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Envoyer un Message</h2>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Nom complet <span className="req">*</span></label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jean Kouassi"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="01 XX XX XX XX"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label>Email (pour recevoir une confirmation)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="vous@exemple.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="contact-form__field">
                  <label>Service souhaité</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  >
                    <option value="">— Choisissez un service —</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-form__field">
                  <label>Message <span className="req">*</span></label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre besoin (type de linge, quantité, zone de collecte…)"
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-form__error">
                    <span className="material-symbols-outlined">error</span>
                    {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="cta-btn contact-form__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="contact-form__spinner" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
