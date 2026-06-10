import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__inner">
        <h2 className="cta-banner__title">Essayez dès aujourd'hui !</h2>
        <p className="cta-banner__sub">Dites adieu au stress du linge !</p>
        <div className="cta-banner__btns">
          <a href="tel:0142507750" className="cta-banner__btn cta-banner__btn--dark">
            <span className="material-symbols-outlined">call</span>
            01 42 50 77 50
          </a>
          <a href="/contact" className="cta-banner__btn cta-banner__btn--white">
            <span className="material-symbols-outlined">mail</span>
            Nous écrire
          </a>
        </div>
      </div>
    </section>
  )
}
