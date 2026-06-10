import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import './HeroSlider.css'

gsap.registerPlugin(useGSAP, Observer)

/* ─── SLIDE DATA ─────────────────────────────────────────────── */
const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=1920&q=80',
    eyebrow: 'Bienvenue',
    headline: 'Votre linge,\nnotre métier',
    sub: 'Gagnez du temps libre — nous nous occupons de tout.',
    cta: { label: 'Nos packs', href: '/services' },
  },
  {
    img: 'https://images.unsplash.com/photo-1517677208171-0bc9125f0f2c?w=1920&q=80',
    eyebrow: 'Qualité Pro',
    headline: 'Lavage &\nRepassage',
    sub: 'Équipements industriels, résultat impeccable à chaque fois.',
    cta: { label: 'Voir les services', href: '/services' },
  },
  {
    img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=1920&q=80',
    eyebrow: 'Collecte gratuite',
    headline: 'On vient\nchercher',
    sub: 'Livraison 24-48h garantie, à domicile ou au bureau.',
    cta: { label: 'Nous contacter', href: '/contact' },
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    eyebrow: 'Sans engagement',
    headline: 'Packs\nMensuels',
    sub: 'De 7 000 F à 40 000 F/mois — pour toute la famille.',
    cta: { label: 'Choisir un pack', href: '/services' },
  },
]

export default function HeroSlider() {
  const containerRef = useRef(null)
  const currentIndex = useRef(-1)
  const animating = useRef(false)

  useGSAP(() => {
    const sections    = gsap.utils.toArray('.hs-section',   containerRef.current)
    const bgs         = gsap.utils.toArray('.hs-bg',        containerRef.current)
    const outers      = gsap.utils.toArray('.hs-outer',     containerRef.current)
    const inners      = gsap.utils.toArray('.hs-inner',     containerRef.current)
    const headlines   = gsap.utils.toArray('.hs-headline',  containerRef.current)
    const eyebrows    = gsap.utils.toArray('.hs-eyebrow',   containerRef.current)
    const subs        = gsap.utils.toArray('.hs-sub',       containerRef.current)
    const ctaBtns     = gsap.utils.toArray('.hs-cta',       containerRef.current)
    const wrap        = gsap.utils.wrap(0, sections.length)

    // Initial positions
    gsap.set(outers, { yPercent: 100 })
    gsap.set(inners, { yPercent: -100 })

    function gotoSection(rawIndex, direction) {
      const index = wrap(rawIndex)
      animating.current = true
      const dFactor = direction === -1 ? -1 : 1
      const prev = currentIndex.current

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => { animating.current = false },
      })

      if (prev >= 0) {
        gsap.set(sections[prev], { zIndex: 0 })
        tl.to(bgs[prev], { yPercent: -15 * dFactor })
          .set(sections[prev], { autoAlpha: 0 })
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })

      tl.fromTo(
          [outers[index], inners[index]],
          { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
          { yPercent: 0 },
          0
        )
        .fromTo(bgs[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        // Eyebrow
        .fromTo(eyebrows[index],
          { autoAlpha: 0, y: 30 * dFactor },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.15
        )
        // Headline chars — split manually with inline spans rendered below
        .fromTo(
          headlines[index].querySelectorAll('.hs-char'),
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: { each: 0.022, from: 'random' },
          },
          0.2
        )
        // Sub + CTA
        .fromTo(
          [subs[index], ctaBtns[index]],
          { autoAlpha: 0, y: 24 * dFactor },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 },
          0.55
        )

      currentIndex.current = index
    }

    Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => !animating.current && gotoSection(currentIndex.current - 1, -1),
      onUp:   () => !animating.current && gotoSection(currentIndex.current + 1,  1),
      tolerance: 10,
      preventDefault: true,
      target: containerRef.current,
    })

    gotoSection(0, 1)
  }, { scope: containerRef })

  return (
    <div className="hs-root" ref={containerRef}>
      {SLIDES.map((slide, i) => (
        <section key={i} className="hs-section">
          <div className="hs-outer">
            <div className="hs-inner">
              <div
                className="hs-bg"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="hs-overlay" />
                <div className="hs-content">
                  <span className="hs-eyebrow section-eyebrow">{slide.eyebrow}</span>

                  {/* Split headline into chars for GSAP */}
                  <h2 className="hs-headline">
                    {slide.headline.split('\n').map((line, li) => (
                      <span key={li} className="hs-line">
                        {line.split('').map((char, ci) => (
                          <span key={ci} className="hs-char">
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                        {li < slide.headline.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h2>

                  <p className="hs-sub">{slide.sub}</p>

                  <a href={slide.cta.href} className="cta-btn hs-cta">
                    {slide.cta.label}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Slide indicator dots */}
      <div className="hs-dots" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <span key={i} className="hs-dot" data-index={i} />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="hs-scroll-hint">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </div>
  )
}
