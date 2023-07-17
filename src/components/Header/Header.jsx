import "./Header.css"

const Header = ({ mainTitle }) => {
  return (
    <div className="header">
      <img src="/NASA_logo.svg" alt="NASA insignia" className="header-logo" />
      <h1>{mainTitle}</h1>
    </div>
  )
}

export default Header
