import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'tienda_carrito'

const getProductId = (product) => product?.id ?? product?._id ?? product?.codigo

const getPositiveQuantity = (quantity) => {
  const parsedQuantity = Number(quantity)
  return Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1
}

const normalizeProduct = (product) => ({
  id: getProductId(product),
  nombre: product?.nombre ?? product?.name ?? 'Producto',
  descripcion: product?.descripcion ?? product?.description ?? '',
  precio: Number(product?.precio ?? product?.price ?? 0),
  imagen: product?.imagen ?? product?.image ?? '',
  quantity: getPositiveQuantity(product?.quantity),
})

const isSameProduct = (item, productId) => String(item.id) === String(productId)

const getInitialCart = () => {
  if (typeof window === 'undefined') return []

  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY)
    if (!storedCart) return []

    const parsedCart = JSON.parse(storedCart)
    if (!Array.isArray(parsedCart)) return []

    return parsedCart
      .map(normalizeProduct)
      .filter((item) => item.id !== undefined && item.id !== null)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    const item = normalizeProduct(product)
    if (item.id === undefined || item.id === null) return

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => isSameProduct(cartItem, item.id))

      if (existingItem) {
        return prevItems.map((cartItem) =>
          isSameProduct(cartItem, item.id)
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        )
      }

      return [...prevItems, item]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => !isSameProduct(item, productId)))
  }

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        isSameProduct(item, productId) ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          isSameProduct(item, productId) ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0)

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
