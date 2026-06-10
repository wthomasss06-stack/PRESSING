import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedIcon from './AnimatedIcon'
import './WhyUs.css'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  {
    icon: 'schedule',
    variant: 'pulse',
    title: 'Gain de Temps',
    desc: 'Passez vos week-ends à faire ce que vous aimez. Nous gérons le ramassage, le lavage et la livraison.',
  },
  {
    icon: 'high_quality',
    variant: 'float',
    title: 'Qualité Professionnelle',
    desc: 'Nos équipements industriels offrent un nettoyage en profondeur supérieur aux appareils domestiques.',
  },
  {
    icon: 'local_shipping',
    variant: 'pulse',
    title: 'Collecte & Livraison',
    desc: 'Service gratuit à domicile ou au bureau. Plus besoin de vous déplacer.',
  },
  {
    icon: 'eco',
    variant: 'float',
    title: 'Produits Écologiques',
    desc: 'Détergents premium biodégradables, respectueux de vos tissus et de l\'environnement.',
  },
  {
    icon: 'verified',
    variant: 'pulse',
    title: 'Garantie Satisfaction',
    desc: 'Résultat insatisfaisant ? On relève le linge et on le refait, gratuitement.',
  },
  {
    icon: 'payments',
    variant: 'float',
    title: 'Tarifs Transparents',
    desc: 'Packs mensuels sans engagement, aucun frais caché. Vous savez exactement ce que vous payez.',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.why-item', {
      y: 50,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
    gsap.from('.why__title', {
      y: 30,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section className="why" ref={sectionRef}>
      <div className="why__inner">
        <div className="why__header">
          <span className="section-eyebrow">Notre Différence</span>
          <h2 className="section-title why__title">Pourquoi Nous Choisir ?</h2>
        </div>

        <div className="why__grid">
          {REASONS.map((r) => (
            <div key={r.title} className="why-item">
              <AnimatedIcon icon={r.icon} variant={r.variant} size="md" />
              <div className="why-item__body">
                <h4 className="why-item__title">{r.title}</h4>
                <p className="why-item__desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
