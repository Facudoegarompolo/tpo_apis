import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import './ProductList.css'


function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  // const [category, setCategory] = useState('')
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          credentials: 'include',
          mode: 'cors'
        })
        if (!response.ok) throw new Error('Error al cargar los productos')
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="productos__status">Cargando productos...</div>
  if (error)   return <div className="productos__status productos__status--error">Error: {error}</div>


  return (
    <div className="productos">
      <h1 className="productos__title">Lista de Productos</h1>
      {products.length === 0 ? (
        <p className="productos__status">No hay productos.</p>
      ) : (
        <div className="productos__grid">
          {products.map((product, index) => {
            const id = product.id ?? product._id ?? product.codigo ?? index
            return <ProductCard key={id} product={product} />
          })}
        </div>
      )}
    </div>
  )
}

export default ProductList
