import './ProductCard.css'

function ProductCard({ product }) {
  const id    = product.id ?? product._id ?? product.codigo
  const name  = product.nombre ?? product.name ?? 'Sin nombre'
  const desc  = product.descripcion ?? product.description ?? ''
  const price = product.precio ?? product.price ?? 0
  const img   = product.imagen ?? product.image ?? ''

  return (
    <a href={`/productos/${id}`} className="product-card">
      {img && (
        <img src={img} alt={name} className="product-card__img" />
      )}
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          ${Number(price).toLocaleString('es-AR')}
        </p>
        {desc && <p className="product-card__desc">{desc}</p>}
        <span className="product-card__link">Ver detalle →</span>
      </div>
    </a>
  )
}

export default ProductCard
