import { motion, useReducedMotion } from 'framer-motion'
import mainCourseImage from '../assets/images/Background-Imagem1-Bloco2.png'
import cycleImage from '../assets/images/Background-Imagem2-Bloco2.png'
import changeImage from '../assets/images/Background-Imagem3-Bloco2.png'
import '../styles/courses.css'

const highlights = [
  { icon: 'book', title: 'Programa completo', description: 'Aulas organizadas passo a passo' },
  { icon: 'play', title: 'Acesso online', description: 'Assista no seu ritmo' },
  { icon: 'person', title: 'Com especialista', description: 'Conteúdo conduzido por psiquiatra' },
]

const modules = [
  {
    number: 'MÓDULO 1',
    title: 'Entenda o ciclo',
    subtitle: 'Por que é tão difícil parar?',
    description: 'Você vai compreender como as apostas afetam seu cérebro, emoções, comportamento e finanças, e por que o ciclo se mantém tão forte.',
    image: cycleImage,
    imageAlt: 'Homem em perfil integrado a uma paisagem de montanhas',
  },
  {
    number: 'MÓDULO 2',
    title: 'Construa a virada',
    subtitle: 'Estratégias para recuperar o controle.',
    description: 'Aprenda ferramentas práticas para lidar com gatilhos, mudar hábitos, organizar suas finanças e construir uma vida com mais liberdade e propósito.',
    image: changeImage,
    imageAlt: 'Homem diante de uma paisagem de montanhas ao amanhecer',
  },
]

function HighlightIcon({ type }) {
  return <span className={`courses__highlight-icon courses__highlight-icon--${type}`} aria-hidden="true" />
}

function Courses() {
  const prefersReducedMotion = useReducedMotion()
  const reveal = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: prefersReducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <section id="cursos" className="courses" aria-labelledby="courses-title">
      <div className="container courses__grid">
        <motion.article className="courses__main" {...reveal}>
          <img
            className="courses__main-image"
            src={mainCourseImage}
            alt="Mockup do programa A Virada Apostas em uma paisagem de montanhas"
          />
          <div className="courses__main-content">
            <header className="courses__title-group">
              <p className="courses__label"><span>CURSO ONLINE</span></p>
              <h2 id="courses-title">A VIRADA</h2>
              <p className="courses__title-accent">APOSTAS</p>
            </header>

            <p className="courses__lead">
              Recupere o controle. Reconstrua sua relação com o dinheiro e com você.
            </p>
            <p className="courses__description">
              Um programa desenvolvido para ajudar você a compreender os mecanismos por trás das apostas,
              identificar seus gatilhos e construir estratégias práticas para interromper esse ciclo.
            </p>

            <ul className="courses__highlights" aria-label="Informações do programa">
              {highlights.map((highlight) => (
                <li key={highlight.title}>
                  <HighlightIcon type={highlight.icon} />
                  <strong>{highlight.title}</strong>
                  <span>{highlight.description}</span>
                </li>
              ))}
            </ul>

            {/* Substituir futuramente o href pela URL da Hotmart e adicionar target="_blank" e rel="noopener noreferrer". */}
            <a className="courses__cta" href="#">
              <span>CONHEÇA O PROGRAMA</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.article>

        <div className="courses__modules" aria-label="Pilares do programa A Virada Apostas">
          {modules.map((module, index) => (
            <motion.article
              className="courses__module"
              key={module.number}
              {...reveal}
              transition={{ ...reveal.transition, delay: prefersReducedMotion ? 0 : 0.12 + index * 0.1 }}
            >
              <img className="courses__module-image" src={module.image} alt={module.imageAlt} />
              <div className="courses__module-shade" aria-hidden="true" />
              <div className="courses__module-content">
                <p className="courses__label"><span>{module.number}</span></p>
                <h3>{module.title}</h3>
                <p className="courses__module-subtitle">{module.subtitle}</p>
                <p className="courses__module-description">{module.description}</p>
                <button className="courses__module-button" type="button" aria-label={`${module.title}: em breve`}>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
