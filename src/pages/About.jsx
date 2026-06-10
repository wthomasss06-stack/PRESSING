import AnimatedIcon from '../components/AnimatedIcon'
import CtaBanner from '../components/CtaBanner'
import './About.css'

const STATS = [
  { value: '500+', label: 'Clients Satisfaits' },
  { value: '3 ans', label: "D'Expérience" },
  { value: '24h',   label: 'Délai de Livraison' },
  { value: '100%',  label: 'Satisfaction Garantie' },
]

const VALUES = [
  { icon: 'handshake', variant: 'pulse',  title: 'Confiance',    desc: 'Vos vêtements sont entre de bonnes mains. Nous traitons chaque pièce avec respect.' },
  { icon: 'eco',       variant: 'float',  title: 'Responsabilité', desc: 'Produits biodégradables et processus optimisé pour réduire notre empreinte.' },
  { icon: 'bolt',      variant: 'pulse',  title: 'Réactivité',   desc: 'Collecte et livraison dans les délais promis, sans exception.' },
]

export default function About() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__inner">
          <span className="section-eyebrow">Notre Histoire</span>
          <h1 className="section-title about-hero__title">À Propos de Nous</h1>
          <p className="about-hero__sub">
            MD Laverie Pressing est née d'une conviction simple : vous méritez du temps libre.
            Fondée à Abidjan, nous apportons un service de pressing professionnel directement à votre porte.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stats__inner">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat__value">{s.value}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story__inner">
          <div className="about-story__img">
            <img
              src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80"
              alt="Notre équipe"
            />
          </div>
          <div className="about-story__text">
            <span className="section-eyebrow">Notre Mission</span>
            <h2 className="section-title about-story__title">
              Vous libérer des corvées ménagères
            </h2>
            <p>
              Carrefour Angré, près de la Pharmacie Actuelle — c'est là que tout a commencé.
              Nous avons voulu créer un service qui combine la qualité professionnelle d'un pressing
              haut de gamme avec la commodité d'une collecte et livraison à domicile.
            </p>
            <p>
              Aujourd'hui, des centaines de familles et de professionnels nous font confiance
              chaque mois pour gérer leur linge. Notre équipe formée utilise des équipements
              industriels et des produits certifiés pour rendre à vos vêtements leur éclat d'origine.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values__inner">
          <div className="about-values__header">
            <span className="section-eyebrow">Ce Qui Nous Guide</span>
            <h2 className="section-title about-values__title">Nos Valeurs</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div key={v.title} className="about-value-card">
                <AnimatedIcon icon={v.icon} variant={v.variant} size="lg" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
