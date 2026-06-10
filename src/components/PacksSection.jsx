import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PacksSection.css'

gsap.registerPlugin(ScrollTrigger)

const PACKS = [
  {
    name: 'Pack Semaine',
    sub: '20 habits & 1 couette',
    price: '7.000',
    features: ['20 habits', '1 couette', 'Collecte & livraison'],
    popular: false,
  },
  {
    name: 'Pack Solo',
    sub: '40 habits & 1 couette',
    price: '13.000',
    features: ['40 habits', '1 couette', 'Collecte & livraison'],
    popular: false,
  },
  {
    name: 'Pack Couple',
    sub: '80 habits',
    price: '25.000',
    features: ['80 habits', 'Repassage inclus', 'Collecte & livraison'],
    popular: true,
  },
  {
    name: 'Pack Famille',
    sub: '140 habits',
    price: '40.000',
    features: ['140 habits', 'Service prioritaire', 'Collecte & livraison'],
    popular: false,
  },
]

export default function PacksSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.pack-card', {
      y: 60,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section className="packs" ref={sectionRef}>
      <div className="packs__inner">
        <div className="packs__header">
          <span className="section-eyebrow">Économiques</span>
          <h2 className="section-title packs__title">Packs Mensuels</h2>
          <p className="packs__sub">Sans engagement. Collecte &amp; livraison incluses.</p>
        </div>

        <div className="packs__grid">
          {PACKS.map((pack) => (
            <div
              key={pack.name}
              className={`pack-card ${pack.popular ? 'pack-card--popular' : ''}`}
            >
              {pack.popular && (
                <div className="pack-card__badge">Populaire</div>
              )}

              <div className="pack-card__header">
                <h3 className="pack-card__name">{pack.name}</h3>
                <p className="pack-card__sub">{pack.sub}</p>
              </div>

              <div className="pack-card__price">
                <span className="pack-card__amount">{pack.price}</span>
                <span className="pack-card__currency">F/mois</span>
              </div>

              <ul className="pack-card__features">
                {pack.features.map((f) => (
                  <li key={f}>
                    <span className="material-symbols-outlined">check</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`pack-card__cta ${pack.popular ? 'pack-card__cta--primary' : ''}`}
              >
                Choisir ce pack
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
