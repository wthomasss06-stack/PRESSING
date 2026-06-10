import { useState } from 'react'
import AnimatedIcon from '../components/AnimatedIcon'
import './Contact.css'

const INFOS = [
  { icon: 'location_on',  variant: 'pulse', label: 'Adresse',  value: 'Carrefour Angré, près de la Pharmacie Actuelle, Abidjan' },
  { icon: 'call',         variant: 'float', label: 'Téléphone', value: '07 57 02 10 89 / 07 97 54 32 83' },
  { icon: 'schedule',     variant: 'pulse', label: 'Horaires',  value: 'Lun – Sam : 7h00 – 20h00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to EmailJS / Resend / backend endpoint
    setSent(true)
  }

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <span className="section-eyebrow">On est à l'écoute</span>
          <h1 className="section-title contact-hero__title">Contactez-Nous</h1>
          <p className="contact-hero__sub">
            Pour une collecte, un devis ou une simple question — répondons ensemble.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="contact-body">
        <div className="contact-body__inner">
          {/* Info cards */}
          <div className="contact-infos">
            {INFOS.map((info) => (
              <div key={info.label} className="contact-info-card">
                <AnimatedIcon icon={info.icon} variant={info.variant} size="md" />
                <div>
                  <p className="contact-info-card__label">{info.label}</p>
                  <p className="contact-info-card__value">{info.value}</p>
                </div>
              </div>
            ))}

            {/* CTA téléphonique rapide */}
            <div className="contact-calls">
              <a href="tel:0757021089" className="cta-btn">
                <span className="material-symbols-outlined">call</span>
                07 57 02 10 89
              </a>
              <a href="tel:0797543283" className="ghost-btn">
                <span className="material-symbols-outlined">call</span>
                07 97 54 32 83
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-form-sent">
                <span className="material-symbols-outlined material-symbols-filled" style={{ fontSize: '3rem', color: 'var(--clr-primary)' }}>
                  check_circle
                </span>
                <h3>Message envoyé !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Envoyer un Message</h2>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jean Kouassi"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="07 XX XX XX XX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label>Email (optionnel)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="vous@exemple.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form__field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre besoin (type de linge, quantité, zone de collecte…)"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="cta-btn contact-form__submit">
                  Envoyer le message
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
