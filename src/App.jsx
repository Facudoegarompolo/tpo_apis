import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/productos" element={<Productos />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registro" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App