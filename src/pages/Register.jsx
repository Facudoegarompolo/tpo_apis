import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
    const response = await fetch(
        'http://localhost:8080/api/usuarios/registro',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            email,
            password
        })
        }
    )

    const text = await response.text()

    console.log('STATUS:', response.status)
    console.log('RESPONSE:', text)

    if (!response.ok) {
        throw new Error('Error en el registro')
    }

    alert('Te registraste correctamente')
    navigate('/login')

    } catch (err) {
    console.error(err)
    setError(err.message)
    }
finally {    setLoading(false)
}
  }
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Crear Cuenta</h1>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="register-login">
          ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
