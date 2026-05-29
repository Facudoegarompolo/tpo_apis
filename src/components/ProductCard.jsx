import './ProductCard.css'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useContext/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const id    = product.id ?? product._id ?? product.codigo
  const name  = product.nombre ?? product.name ?? 'Sin nombre'
  const desc  = product.descripcion ?? product.description ?? ''
  const price = product.precio ?? product.price ?? 0
  const img   = product.imagen ?? product.image ?? ''

  return (
    <article className="product-card">
      {img && (
        <Link to={`/productos/${id}`} className="product-card__media">
          <img src={img} alt={name} className="product-card__img" />
        </Link>
      )}
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          ${Number(price).toLocaleString('es-AR')}
        </p>
        {desc && <p className="product-card__desc">{desc}</p>}
        <div className="product-card__actions">
          <Link to={`/productos/${id}`} className="product-card__link">
            Ver detalle
          </Link>
          <button
            type="button"
            className="product-card__button"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
