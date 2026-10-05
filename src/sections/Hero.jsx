import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import heroBackground from '../assets/images/hero-background.jpeg'
import heroPerson from '../assets/images/hero-person.png'
import heroPersonMobile from '../assets/images/hero-person-mobile.png'
import '../styles/hero.css'

// Both files contain the complete approved composition for their aspect ratio.
const heroImages = { desktop: heroPerson, mobile: heroPersonMobile }

function Hero({ children }) {
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const personRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [geometry, setGeometry] = useState({ height: 0, background: 0, foreground: 0 })

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const person = personRef.current
    const measure = () => {
      const height = viewport.clientHeight
      const styles = getComputedStyle(viewport)
      const background = height * Number(styles.getPropertyValue('--hero-background-travel'))
      const desiredForeground = height * Number(styles.getPropertyValue('--hero-foreground-travel'))
      const foregroundTopGap = Number(styles.getPropertyValue('--hero-foreground-top-gap'))
      // The image's own positioning transform is independent of the animated parent.
      // Protect the entire PNG box, even when its intrinsic size changes after loading.
      const shift = new DOMMatrixReadOnly(getComputedStyle(person).transform).m42
      const clearance = height - person.getBoundingClientRect().height + shift
      const foreground = Math.min(desiredForeground, Math.max(0, clearance - foregroundTopGap))
      setGeometry({ height, background, foreground })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(person)
    person.addEventListener('load', measure)
    measure()
    return () => {
      observer.disconnect()
      person.removeEventListener('load', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Continue animating while Courses enters over the sticky scene.
    offset: ['start start', `end ${geometry.height}px`],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 0.46, 1], [0, prefersReducedMotion ? 0 : -geometry.background * 0.6, prefersReducedMotion ? 0 : -geometry.background])
  // Courses starts covering the scene immediately. Keep foreground travel
  // slower than that cover, without the old late upward jump exposing its base.
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -geometry.foreground])

  return (
    <div className="hero-transition">
      <div ref={trackRef} className="hero-transition__track" aria-hidden="true" />
      <section id="home" ref={viewportRef} className="hero__viewport" aria-label="Apresentação">
        <motion.div className="hero__background" style={{ y: backgroundY }}>
          <img src={heroBackground} alt="" aria-hidden="true" />
        </motion.div>
        <motion.div className="hero__foreground" style={{ y: foregroundY }}>
          <picture>
            <source media="(max-width: 620px)" srcSet={heroImages.mobile} />
            <img ref={personRef} src={heroImages.desktop} alt="A Virada — Pare. Vire. Recomece." fetchPriority="high" />
          </picture>
        </motion.div>
      </section>
      {children}
    </div>
  )
}

export default Hero

