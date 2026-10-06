import { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/icone.png'
import '../styles/header.css'

const links = [
  { label: 'Cursos', href: '#cursos' },
  { label: 'Relatos', href: '#relatos' },
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Contato', href: '#contato' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const breakpoint = window.matchMedia('(max-width: 800px)')
    const closeOnDesktop = () => { if (!breakpoint.matches) setOpen(false) }
    breakpoint.addEventListener('change', closeOnDesktop)
    return () => breakpoint.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-header__container">
        <a className="site-header__logo" href="#home" aria-label="A Virada — início" onClick={() => setOpen(false)}>
          <img src={logo} alt="A Virada" width="34" height="34" />
        </a>
        <nav className="site-header__desktop" aria-label="Navegação principal">
          <ul>{links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>
        <button ref={toggleRef} className="site-header__toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="header-mobile-menu" onClick={() => setOpen(value => !value)}>
          <span /><span /><span />
        </button>
        <nav id="header-mobile-menu" className="site-header__mobile" aria-label="Navegação principal mobile" hidden={!open} onBlur={event => {
          if (!headerRef.current?.contains(event.relatedTarget)) setOpen(false)
        }}>
          <ul>{links.map(link => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)}>{link.label}</a></li>)}</ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
