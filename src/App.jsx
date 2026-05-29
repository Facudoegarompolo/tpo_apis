import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/productos" element={<ProductList />} />

          <Route path="/productos/:id" element={<ProductDetail />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registro" element={<Register />} />

          <Route path="/carrito" element={<Cart />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
