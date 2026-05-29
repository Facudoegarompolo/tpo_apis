import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useContext/CartContext';
import defaultImage from '../assets/imgXdefault.jpg';

const formatPrice = (value) => Number(value ?? 0).toLocaleString('es-AR');

const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <p>
            Tienes {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en el carrito
          </p>

          <div style={{ marginBottom: '2rem' }}>
            {cartItems.map(item => (
              <div 
                key={item.id} 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid #eee'
                }}
              >
                <img 
                  src={item.imagen || defaultImage}
                  alt={item.nombre}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.nombre}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#666' }}>Cantidad:</span>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p style={{ margin: '0.5rem 0', color: '#2D3277', fontWeight: 'bold' }}>
                    ${formatPrice(item.precio * item.quantity)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '0.5rem',
                    background: 'none',
                    border: '1px solid #ff4444',
                    color: '#ff4444',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <strong>Total</strong>
            <strong>${formatPrice(cartTotal)}</strong>
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          to="/productos"
          style={{
            backgroundColor: '#2D3277',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          Seguir comprando
        </Link>
        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            style={{
              backgroundColor: '#fff',
              color: '#2D3277',
              padding: '0.5rem 1rem',
              border: '1px solid #2D3277',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Vaciar carrito
          </button>
        )}
        {cartItems.length > 0 && (
          <Link 
            to="/checkout"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            Pagar
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
