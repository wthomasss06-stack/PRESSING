import PacksSection from '../components/PacksSection'
import WhyUs from '../components/WhyUs'
import CtaBanner from '../components/CtaBanner'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      {/* ── HERO simple ──────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <span className="section-eyebrow">Bienvenue</span>
          <h1 className="section-title home-hero__title">
            Votre linge,<br />notre métier
          </h1>
          <p className="home-hero__sub">
            Service professionnel de lavage, repassage et pressing à Abidjan.
            Collecte gratuite, livraison 24–48h garantie.
          </p>
          <div className="home-hero__actions">
            <a href="/services" className="cta-btn">
              Nos services
              <span className="material-symbols-outlined">chevron_right</span>
            </a>
            <a href="/contact" className="cta-btn cta-btn--ghost">
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTENT: normal page scroll ─────────────────────── */}
      <div className="home__content">

        {/* Packs Mensuels */}
        <PacksSection />

        {/* ── Services highlight ───────────────────────────── */}
        <section className="home-services">
          <div className="home-services__inner">

            {/* Image grid — vraies photos lavage */}
            <div className="home-services__img-col">
              <div className="home-services__img-grid">
                <div className="hs-img hs-img--tall">
                  <img
                    src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=700&q=80"
                    alt="Machine à laver professionnelle"
                  />
                </div>
                <div className="hs-img">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80"
                    alt="Linge repassé propre"
                  />
                </div>
                <div className="hs-img">
                  <img
                    src="https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=500&q=80"
                    alt="Service pressing qualité"
                  />
                </div>
              </div>
            </div>

            <div className="home-services__text-col">
              <span className="section-eyebrow">Notre Expertise</span>
              <h2 className="section-title home-services__title">
                Lavage &amp; Repassage Professionnels
              </h2>
              <p className="home-services__desc">
                Nous ne lavons pas seulement — nous revitalisons. Notre processus multi-étapes
                assure que chaque fibre est traitée avec la température et l'agitation appropriées.
              </p>
              <ul className="home-services__list">
                {[
                  'Collecte à domicile gratuite',
                  'Détergents Premium écologiques',
                  'Repassage soigné à la main',
                  'Livraison 24-48h garantie',
                ].map((item) => (
                  <li key={item}>
                    <span className="material-symbols-outlined material-symbols-filled">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/services" className="cta-btn">
                Tous nos services
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Process strip ────────────────────────────────── */}
        <section className="home-process">
          <div className="home-process__inner">
            <div className="home-process__header">
              <span className="section-eyebrow">Simple comme bonjour</span>
              <h2 className="section-title home-process__title">Comment ça marche</h2>
            </div>
            <div className="home-process__steps">
              {[
                { icon: 'phone_in_talk', num: '01', title: 'Appelez-nous',  desc: 'Un coup de fil ou un message suffit pour planifier votre collecte.' },
                { icon: 'local_shipping', num: '02', title: 'On récupère',  desc: "Notre équipe vient chercher votre linge à l'adresse et au créneau souhaité." },
                { icon: 'dry_cleaning',  num: '03', title: 'On traite',    desc: 'Lavage, séchage, repassage dans nos locaux avec des équipements pros.' },
                { icon: 'home',          num: '04', title: 'Livraison',    desc: 'Votre linge impeccable, livré chez vous sous 24 à 48h.' },
              ].map((step) => (
                <div key={step.num} className="home-process__step">
                  <div className="home-process__step-num">{step.num}</div>
                  <div className="home-process__step-icon">
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <h4 className="home-process__step-title">{step.title}</h4>
                  <p className="home-process__step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ───────────────────────────────────────── */}
        <WhyUs />

        {/* ── Gallery strip ────────────────────────────────── */}
        <section className="home-gallery">
          {[
            'https://images.unsplash.com/photo-1517677208171-0bc9125f0f2c?w=600&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
            'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80',
            'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=600&q=80',
          ].map((src, i) => (
            <div key={i} className="home-gallery__item">
              <img src={src} alt={`Pressing photo ${i + 1}`} />
            </div>
          ))}
        </section>

        <CtaBanner />
      </div>
    </main>
  )
}
