export default function Header() {
  return (
    <header className="appbar">
      <div className="appbar-row">
        <a href="/" className="logo-wrap">TILERSHUB</a>
        <nav className="nav-menu">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/estimator">Estimator</a>
        </nav>
      </div>
    </header>
  )
}
