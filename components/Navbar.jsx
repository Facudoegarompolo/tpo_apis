import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          TIENDA
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">
                Ofertas
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">

            <Link
              to="/login"
              className="btn btn-outline-light"
            >
              Ingresar
            </Link>

            <Link
              to="/registro"
              className="btn btn-primary"
            >
              Registrarse
            </Link>

            <Link
              to="/carrito"
              className="btn btn-outline-light"
            >
              🛒
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar