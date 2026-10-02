import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '../styles/course-videos.css'

// Each course has its own video file URL, poster image and checkout link.
export const courseVideos = [{
  id: 1,
  course: 'A Virada — Apostas',
  title: 'Talvez a sua virada comece aqui.',
  description: 'Antes de decidir, assista a esta mensagem da Dra. Tais Maciel e entenda por que compreender o ciclo das apostas pode ser o primeiro passo para mudar sua relação com o jogo.',
  videoUrl: '',
  poster: null,
  ctaLabel: 'QUERO COMEÇAR A MINHA VIRADA',
  ctaUrl: '#',
}]

// Native video today; future embed integrations can replace this branch.
function VideoPlayer({ videoUrl, poster, course }) {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  return <div className="course-video__player">
    {playing && videoUrl ? <>
      <video controls autoPlay playsInline preload="metadata" poster={poster || undefined} aria-label={`Vídeo: ${course}`} onError={() => setFailed(true)}>
        <source src={videoUrl} />Seu navegador não suporta este vídeo.
      </video>
      {failed && <p className="course-video__error" role="status">Não foi possível carregar o vídeo. Tente novamente mais tarde.</p>}
    </> : <>
      {poster ? <img className="course-video__poster" src={poster} alt={`Capa do vídeo: ${course}`} /> : <div className="course-video__placeholder">
        <span className="course-video__course">{course}</span>
        <span className="course-video__placeholder-label">Capa do vídeo</span>
        <span className="course-video__signature">Uma mensagem da Dra. Tais Maciel</span>
      </div>}
      <button className="course-video__play" type="button" aria-label={videoUrl ? `Reproduzir vídeo: ${course}` : `Vídeo de ${course} em breve`} aria-disabled={!videoUrl} onClick={() => { if (videoUrl) setPlaying(true) }}>
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 5 27 16 10 27Z" /></svg>
      </button>
    </>}
  </div>
}

function CourseVideos() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const item = courseVideos[activeIndex]
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay },
  })
  const changeVideo = step => setActiveIndex(index => (index + step + courseVideos.length) % courseVideos.length)
  if (!item) return null
  return <section id="videos" className="course-videos" aria-labelledby="course-video-title">
    <div className="course-videos__container">
      <motion.div className="course-videos__eyebrow" {...reveal()}><span className="course-videos__rule" aria-hidden="true" /><p>CONHEÇA A VIRADA</p></motion.div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article key={item.id} initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -12 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
          <motion.h2 id="course-video-title" {...reveal(0.05)}>{item.title.split(/(virada)/gi).map((part, index) => part.toLowerCase() === 'virada' ? <span key={index}>{part}</span> : part)}</motion.h2>
          <motion.p className="course-videos__description" {...reveal(0.1)}>{item.description}</motion.p>
          <motion.div {...reveal(0.15)}><VideoPlayer videoUrl={item.videoUrl} poster={item.poster} course={item.course} /></motion.div>
          <motion.p className="course-videos__message" {...reveal(0.05)}>Você não precisa esperar perder mais para começar a mudar.</motion.p>
          <motion.div {...reveal(0.1)}><a className="course-videos__cta" href={item.ctaUrl}>{item.ctaLabel}<span aria-hidden="true">→</span></a></motion.div>
        </motion.article>
      </AnimatePresence>
      {courseVideos.length > 1 && <nav className="course-videos__controls" aria-label="Vídeos dos cursos">
        <button type="button" onClick={() => changeVideo(-1)} aria-label="Vídeo anterior">←</button>
        <span role="status" aria-live="polite" aria-atomic="true">{String(activeIndex + 1).padStart(2, '0')} / {String(courseVideos.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => changeVideo(1)} aria-label="Próximo vídeo">→</button>
      </nav>}
    </div>
  </section>
}
export default CourseVideos
