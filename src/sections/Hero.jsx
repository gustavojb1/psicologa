import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import heroBackground from '../assets/images/hero-background.jpeg'
import heroPerson from '../assets/images/hero-person.png'
import '../styles/hero.css'

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
  const foregroundY = useTransform(scrollYProgress, [0, 0.46, 0.7, 1], [0, prefersReducedMotion ? 0 : -geometry.foreground, prefersReducedMotion ? 0 : -geometry.foreground - geometry.height * 0.08, prefersReducedMotion ? 0 : -geometry.foreground - geometry.height * 0.2])

  return (
    <div className="hero-transition">
      <div ref={trackRef} className="hero-transition__track" aria-hidden="true" />
      <section id="home" ref={viewportRef} className="hero__viewport" aria-label="Apresentação">
        <motion.div className="hero__background" style={{ y: backgroundY }}>
          <img src={heroBackground} alt="" aria-hidden="true" />
        </motion.div>
        <motion.div className="hero__foreground" style={{ y: foregroundY }}>
          <img ref={personRef} src={heroPerson} alt="Psicóloga Lavínia" />
        </motion.div>
      </section>
      <div className="hero-transition__runway" aria-hidden="true" />
      {children}
    </div>
  )
}

export default Hero

