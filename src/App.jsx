import Header from './components/Header.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Courses from './sections/Courses.jsx'
import CourseVideos from './sections/CourseVideos.jsx'
import Footer from './sections/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Testimonials from './sections/Testimonials.jsx'

import aboutBackground from './assets/images/Background Sobre Mim.png'
import './styles/about-video-scene.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero>
          <Courses />
        </Hero>
        <Testimonials />
        <div className="about-video-scene">
          <div className="about-video-scene__background" aria-hidden="true">
            <img src={aboutBackground} alt="" loading="lazy" />
          </div>
          <div className="about-video-scene__content">
            <About />
            <CourseVideos />
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
