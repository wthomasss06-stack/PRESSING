import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__inner">
        <h2 className="cta-banner__title">Essayez dès aujourd'hui !</h2>
        <p className="cta-banner__sub">Dites adieu au stress du linge !</p>
        <div className="cta-banner__btns">
          <a href="tel:0757021089" className="cta-banner__btn cta-banner__btn--dark">
            <span className="material-symbols-outlined">call</span>
            07 57 02 10 89
          </a>
          <a href="tel:0797543283" className="cta-banner__btn cta-banner__btn--white">
            <span className="material-symbols-outlined">call</span>
            07 97 54 32 83
          </a>
        </div>
      </div>
    </section>
  )
}
