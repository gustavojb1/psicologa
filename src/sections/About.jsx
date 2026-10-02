import { motion, useReducedMotion } from 'framer-motion'
import doctorPortrait from '../assets/images/Médica pensativa.png'
import '../styles/about.css'

// Replace when the checkout URL is available.
const startUrl = '#'

function AboutIcon({ kind }) {
  const paths = {
    doctor: <><circle cx="20" cy="10" r="6" /><path d="M14 9c3 0 5-2 6-3 1 2 3 3 6 3M15 19l5 6 5-6M13 20c-5 2-8 6-8 13v3h30v-3c0-7-3-11-8-13M13 21v7m-3 0h6m11-7v6a3 3 0 1 1-6 0v-2M20 30v6" /></>,
    brain: <><path d="M20 8c-2-5-8-4-9 1-5-1-8 4-6 8-5 3-3 9 1 10-2 5 3 9 7 7 2 4 7 3 7-1V8Zm0 0c2-5 8-4 9 1 5-1 8 4 6 8 5 3 3 9-1 10 2 5-3 9-7 7-2 4-7 3-7-1V8Z" /><path d="M11 9v7l4 3M6 17l5 3v6M6 27h6l3 4M29 9v7l-4 3M34 17l-5 3v6M34 27h-6l-3 4M15 10v3m10-3v3M15 24v3m10-3v3" /></>,
    people: <><circle cx="20" cy="12" r="6" /><path d="M9 35v-5c0-6 4-10 11-10s11 4 11 10v5M8 10a5 5 0 0 0 0 10M32 10a5 5 0 0 1 0 10M7 24c-4 2-5 5-5 9m31-9c4 2 5 5 5 9" /></>,
    strategy: <><path d="M4 28h6v9H4zM17 22h6v15h-6zM30 15h6v22h-6zM5 21l12-8 7 2L34 5m-6 0h6v6" /></>,
  }
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[kind]}</svg>
}

const benefits = [
  { icon: 'brain', text: <>Saúde mental<br />baseada em ciência</> },
  { icon: 'people', text: <>Acolhimento<br />sem julgamentos</> },
  { icon: 'strategy', text: <>Estratégias<br />para a vida real</> },
]

function About() {
  const reducedMotion = useReducedMotion()
  const reveal = (direction = 'y') => ({
    initial: reducedMotion ? false : { opacity: 0, [direction]: 16 },
    whileInView: { opacity: 1, [direction]: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.65, ease: 'easeOut' },
  })

  return (
    <section id="sobre" className="about" aria-labelledby="about-title">
      <div className="about__layout">
        <motion.div className="about__content" {...reveal()}>
          <header>
            <span className="about__rule" aria-hidden="true" />
            <p className="about__eyebrow">QUEM VAI TE ACOMPANHAR NESSA VIRADA</p>
            <h2 id="about-title">Sobre <span>mim</span></h2>
          </header>
          <div className="about__identity">
            <AboutIcon kind="doctor" />
            <div><h3>Dra. Tais Maciel</h3><p>Médica Psiquiatra</p></div>
          </div>
          <div className="about__copy">
            <p className="about__lead">A mudança começa quando entendemos o que está por trás das nossas escolhas.</p>
            <p>Sou a Dra. Tais Maciel, médica psiquiatra, e acredito que comportamentos difíceis de controlar não devem ser vistos apenas como falta de força de vontade.</p>
            <p>No A Virada, meu objetivo é ajudar você a compreender os mecanismos envolvidos no ciclo das apostas, reconhecer seus gatilhos e desenvolver estratégias para construir uma relação mais consciente com suas escolhas, sua rotina e seu dinheiro.</p>
            <p>Informação, consciência e estratégia podem ser o começo de um novo caminho.</p>
          </div>
          <p className="about__registration">CRM MG 69035 {'\\'} RQE 50426</p>
          <ul className="about__benefits" aria-label="Destaques do acompanhamento">
            {benefits.map(({ icon, text }) => <li key={icon}><AboutIcon kind={icon} /><span>{text}</span></li>)}
          </ul>
          <a className="about__cta" href={startUrl}><span>COMECE A SUA VIRADA</span><span aria-hidden="true">→</span></a>
        </motion.div>
        <motion.div className="about__portrait" {...reveal('x')}>
          <img src={doctorPortrait} alt="Dra. Tais Maciel, médica psiquiatra, sentada à mesa com as mãos sob o queixo" loading="lazy" />
        </motion.div>
      </div>
      <div className="about__index" aria-hidden="true">
        <span className="about__index-chevron" />
        <span>01</span>
        <span className="about__index-line" />
        <span>15</span>
        <span className="about__index-chevron about__index-chevron--down" />
      </div>
    </section>
  )
}

export default About
