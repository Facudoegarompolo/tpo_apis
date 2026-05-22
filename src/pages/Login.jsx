import { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch(
        'http://localhost:8080/api/usuarios/login',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email,
            password
            })
        }
        )

        if (!response.ok) {
        throw new Error('Credenciales incorrectas')
        }

        const data = await response.json()

        console.log(data)

        localStorage.setItem('token', data.token)

        alert('Login exitoso')

        window.location.href = '/'
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
    }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Ingresar
        </button>

        <p className="login-register">
          ¿No tenés cuenta? <Link to="/registro">Registrarse</Link>
        </p>
      </form>
    </div>
  )
}

export default Login