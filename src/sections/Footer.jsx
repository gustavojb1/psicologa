import '../styles/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__main">
          <div className="footer__identity">
            <h2 className="footer__name">Dra. Tais Maciel</h2>
            <p className="footer__profession">Médica Psiquiatra</p>
            <p className="footer__registration">CRM MG 69035 | RQE 50426</p>
          </div>

          <nav className="footer__nav" aria-label="Links do rodapé">
            <h3 className="footer__nav-title">Links rápidos</h3>
            <ul className="footer__links">
              <li><a href="#cursos">Cursos</a></li>
              <li><a href="#relatos">Relatos</a></li>
              <li><a href="#sobre">Sobre mim</a></li>
              <li><a href="#videos">Vídeos</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>
        </div>

        <p className="footer__copyright">
          © 2026 Dra. Tais Maciel. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
