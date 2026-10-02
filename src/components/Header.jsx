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

// Substituir pelo número real e por um link tel: ou https://wa.me/.
const phone = { label: '(00) 00000-0000', href: '#' }

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z" />
  </svg>
}

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

  const onPhoneClick = (event) => {
    if (phone.href === '#') event.preventDefault()
    setOpen(false)
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-header__container">
        <a className="site-header__logo" href="#home" aria-label="A Virada — início" onClick={() => setOpen(false)}>
          <img src={logo} alt="A Virada" width="34" height="34" />
        </a>
        <nav className="site-header__desktop" aria-label="Navegação principal">
          <ul>{links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>
        <a className="site-header__phone" href={phone.href} onClick={onPhoneClick}>
          <PhoneIcon /><span>{phone.label}</span>
        </a>
        <button ref={toggleRef} className="site-header__toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="header-mobile-menu" onClick={() => setOpen(value => !value)}>
          <span /><span /><span />
        </button>
        <nav id="header-mobile-menu" className="site-header__mobile" aria-label="Navegação principal mobile" hidden={!open} onBlur={event => {
          if (!headerRef.current?.contains(event.relatedTarget)) setOpen(false)
        }}>
          <ul>{links.map(link => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)}>{link.label}</a></li>)}</ul>
          <a className="site-header__mobile-phone" href={phone.href} onClick={onPhoneClick}><PhoneIcon /><span>WhatsApp / telefone <small>{phone.label}</small></span></a>
        </nav>
      </div>
    </header>
  )
}

export default Header
