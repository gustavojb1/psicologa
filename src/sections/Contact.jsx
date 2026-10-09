import { motion, useReducedMotion } from 'framer-motion'
import '../styles/contact.css'

const contactLinks = [
  { id: 'instagram', label: 'Instagram', value: '@drataismaciel.psiquiatra', href: 'https://www.instagram.com/drataismaciel.psiquiatra/' },
]

function Contact() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : delay },
  })

  return (
    <section id="contato" className="contact" aria-labelledby="contact-title">
      <div className="container contact__content">
        <motion.header className="contact__heading" {...reveal()}>
          <p id="contact-title" className="contact__eyebrow">CONTATO</p>
        </motion.header>
        <ul className="contact__links">
          {contactLinks.map((link, index) => {
            return (
              <motion.li key={link.id} {...reveal(0.06 + index * 0.07)}>
                <a
                  className="contact__link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact__details">
                    <span className="contact__label">{link.label}</span>
                    <span className="contact__value">{link.value}</span>
                  </span>
                  <svg className="contact__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Contact
