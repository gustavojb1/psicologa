import { motion, useReducedMotion } from 'framer-motion'
import background from '../assets/images/Background-Bloco3-Feedback.png'
import '../styles/testimonials.css'

// Relatos temporários: substituir pelos depoimentos reais aprovados pela cliente antes da publicação final.
const testimonials = [
  {
    id: 1,
    rating: 5,
    text: 'Eu achava que conseguiria parar quando quisesse. O curso me fez entender que o problema era muito maior do que simplesmente ter força de vontade.',
    name: 'Lucas M.',
    role: 'Aluno da A Virada — Apostas',
    avatar: null,
  },
  {
    id: 2,
    rating: 5,
    text: 'Pela primeira vez consegui entender meus gatilhos e perceber o que acontecia comigo antes de voltar a apostar. O conteúdo é direto, prático e realmente transformador.',
    name: 'Amanda R.',
    role: 'Aluna da A Virada — Apostas',
    avatar: null,
  },
  {
    id: 3,
    rating: 5,
    text: 'O curso me ajudou a reconstruir minha relação com o dinheiro e com minha rotina. Hoje me sinto muito mais consciente e no controle das minhas escolhas.',
    name: 'Paulo F.',
    role: 'Aluno da A Virada — Apostas',
    avatar: null,
  },
]

function Testimonials() {
  const prefersReducedMotion = useReducedMotion()
  const reveal = prefersReducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id="relatos" className="testimonials" aria-labelledby="testimonials-title">
      <img className="testimonials__background" src={background} alt="" aria-hidden="true" />
      <div className="container testimonials__content">
        <motion.header className="testimonials__header" {...reveal}>
          <span className="testimonials__rule" aria-hidden="true" />
          <h2 id="testimonials-title">Histórias de <span>Virada</span></h2>
          <p>Pessoas reais. Histórias reais. Novos caminhos.</p>
        </motion.header>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              className="testimonials__card"
              key={testimonial.id}
              {...reveal}
              transition={prefersReducedMotion ? undefined : { ...reveal.transition, delay: index * 0.08 }}
            >
              <div className="testimonials__stars" aria-label={`${testimonial.rating} de 5 estrelas`}>
                <span aria-hidden="true">{'★'.repeat(testimonial.rating)}</span>
              </div>
              <blockquote>
                <span className="testimonials__quote-mark" aria-hidden="true">“</span>
                <p>“{testimonial.text}”</p>
              </blockquote>
              <figcaption className="testimonials__author">
                <span className="testimonials__avatar" aria-hidden="true">
                  {testimonial.avatar ? <img src={testimonial.avatar} alt="" /> : testimonial.name.split(' ').map((part) => part[0]).join('')}
                </span>
                <span className="testimonials__author-text">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
