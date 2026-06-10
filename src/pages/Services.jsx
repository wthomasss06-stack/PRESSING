import AnimatedIcon from '../components/AnimatedIcon'
import CtaBanner from '../components/CtaBanner'
import './Services.css'

const SERVICES = [
  {
    icon: 'local_laundry_service',
    variant: 'pulse',
    title: 'Laver & Plier',
    desc: 'Vos vêtements sont lavés, séchés et pliés avec soin. Idéal pour le linge du quotidien.',
    price: 'À partir de 500 F/kg',
  },
  {
    icon: 'dry_cleaning',
    variant: 'float',
    title: 'Nettoyage à Sec',
    desc: 'Pour les tissus délicats, costumes, robes et vêtements qui nécessitent un traitement spécial.',
    price: 'Sur devis',
  },
  {
    icon: 'iron',
    variant: 'pulse',
    title: 'Repassage',
    desc: 'Repassage soigné à la main pour un rendu impeccable. Chemises, pantalons, robes et plus.',
    price: 'À partir de 400 F/pièce',
  },
  {
    icon: 'bed',
    variant: 'float',
    title: 'Linge de Maison',
    desc: 'Draps, couettes, serviettes et nappes — traités avec les produits adaptés à chaque matière.',
    price: 'À partir de 1.500 F/pièce',
  },
  {
    icon: 'checkroom',
    variant: 'pulse',
    title: 'Pressing Express',
    desc: 'Besoin urgent ? Notre service express garantit la livraison en moins de 24h.',
    price: 'Majoration +30%',
  },
  {
    icon: 'local_shipping',
    variant: 'float',
    title: 'Collecte & Livraison',
    desc: 'Gratuite avec tout pack mensuel. Disponible à domicile, bureau ou tout point de votre choix.',
    price: 'Gratuit avec un pack',
  },
]

export default function Services() {
  return (
    <main className="services-page">
      {/* Page Hero */}
      <section className="services-hero">
        <div className="services-hero__inner">
          <span className="section-eyebrow">Notre Expertise</span>
          <h1 className="section-title services-hero__title">Nos Services</h1>
          <p className="services-hero__sub">
            Du linge du quotidien aux pièces les plus délicates — nous avons le service qu'il vous faut.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="services-grid-section">
        <div className="services-grid-inner">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <AnimatedIcon icon={s.icon} variant={s.variant} size="lg" />
                <div className="service-card__body">
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                  <span className="service-card__price">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
