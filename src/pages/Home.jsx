import { useEffect } from 'react'
import HeroSlider from '../components/HeroSlider'
import PacksSection from '../components/PacksSection'
import WhyUs from '../components/WhyUs'
import CtaBanner from '../components/CtaBanner'
import './Home.css'

export default function Home() {
  // Re-enable scroll when past hero, disable inside it
  useEffect(() => {
    document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <main className="home">
      {/* ── HERO: full-screen slider (GSAP Observer intercepts scroll here) */}
      <div className="home__hero-wrapper">
        <HeroSlider />
      </div>

      {/* ── REST OF PAGE: normal scroll ─────────────────────────────────── */}
      <div className="home__content">
        <PacksSection />

        {/* Services highlight */}
        <section className="home-services">
          <div className="home-services__inner">
            <div className="home-services__img-col">
              <div className="home-services__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1517677208171-0bc9125f0f2c?w=800&q=80"
                  alt="Service de pressing professionnel"
                />
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
                    <span className="material-symbols-outlined material-symbols-filled">check_circle</span>
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

        <WhyUs />
        <CtaBanner />
      </div>
    </main>
  )
}
