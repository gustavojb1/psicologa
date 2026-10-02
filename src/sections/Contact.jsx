import { motion, useReducedMotion } from 'framer-motion'
import '../styles/contact.css'

// Substituir value e href pelos dados reais da cliente.
// WhatsApp: https://wa.me/55DDDNUMERO (somente dígitos).
// Instagram: https://instagram.com/usuario; Facebook: URL da página/perfil.
const contactLinks = [
  { id: 'whatsapp', label: 'WhatsApp', value: '(00) 00000-0000', href: '#' },
  { id: 'instagram', label: 'Instagram', value: '@usuario', href: '#' },
  { id: 'facebook', label: 'Facebook', value: 'facebook.com/perfil', href: '#' },
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
      <div className="container">
        <motion.header className="contact__heading" {...reveal()}>
          <p className="contact__eyebrow">CONTATO</p>
          <h2 id="contact-title">Vamos conversar?</h2>
        </motion.header>
        <ul className="contact__links">
          {contactLinks.map((link, index) => {
            const isPlaceholder = link.href === '#'
            return (
              <motion.li key={link.id} {...reveal(0.06 + index * 0.07)}>
                <a
                  className="contact__link"
                  href={link.href}
                  target={isPlaceholder ? undefined : '_blank'}
                  rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                  onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
                >
                  <span className="contact__label">{link.label}</span>
                  <span className="contact__value">{link.value}</span>
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
