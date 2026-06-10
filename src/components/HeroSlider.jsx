import { useRef } from 'react'
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
    img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920&q=80',
    eyebrow: 'Qualité Pro',
    headline: 'Lavage &\nRepassage',
    sub: 'Équipements industriels, résultat impeccable à chaque fois.',
    cta: { label: 'Voir les services', href: '/services' },
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    eyebrow: 'Collecte gratuite',
    headline: 'On vient\nchercher',
    sub: 'Livraison 24-48h garantie, à domicile ou au bureau.',
    cta: { label: 'Nous contacter', href: '/contact' },
  },
  {
    img: 'https://images.unsplash.com/photo-1517677208171-0bc9125f0f2c?w=1920&q=80',
    eyebrow: 'Sans engagement',
    headline: 'Packs\nMensuels',
    sub: 'De 7 000 F à 40 000 F/mois — pour toute la famille.',
    cta: { label: 'Choisir un pack', href: '/services' },
  },
]

export default function HeroSlider({ onExitBottom }) {
  const containerRef = useRef(null)
  const currentIndex = useRef(-1)
  const animating = useRef(false)
  const observerRef = useRef(null)

  useGSAP(() => {
    const sections  = gsap.utils.toArray('.hs-section',  containerRef.current)
    const bgs       = gsap.utils.toArray('.hs-bg',       containerRef.current)
    const outers    = gsap.utils.toArray('.hs-outer',    containerRef.current)
    const inners    = gsap.utils.toArray('.hs-inner',    containerRef.current)
    const headlines = gsap.utils.toArray('.hs-headline', containerRef.current)
    const eyebrows  = gsap.utils.toArray('.hs-eyebrow',  containerRef.current)
    const subs      = gsap.utils.toArray('.hs-sub',      containerRef.current)
    const ctaBtns   = gsap.utils.toArray('.hs-cta',      containerRef.current)
    const lastIndex = sections.length - 1

    // Initial positions
    gsap.set(outers, { yPercent: 100 })
    gsap.set(inners, { yPercent: -100 })

    function gotoSection(rawIndex, direction) {
      // Clamp — no wrap, linear from 0 → last
      const index = Math.max(0, Math.min(rawIndex, lastIndex))
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
        .fromTo(
          eyebrows[index],
          { autoAlpha: 0, y: 30 * dFactor },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.15
        )
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
        .fromTo(
          [subs[index], ctaBtns[index]],
          { autoAlpha: 0, y: 24 * dFactor },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 },
          0.55
        )

      currentIndex.current = index
    }

    observerRef.current = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      target: containerRef.current,

      onDown: () => {
        if (animating.current) return
        const next = currentIndex.current + 1
        if (next > lastIndex) {
          // Last slide passed → hand off scroll to the page
          observerRef.current.disable()
          containerRef.current.style.overflow = 'visible'
          onExitBottom?.()
          return
        }
        gotoSection(next, 1)
      },

      onUp: () => {
        if (animating.current) return
        gotoSection(currentIndex.current - 1, -1)
      },
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
    </div>
  )
}
