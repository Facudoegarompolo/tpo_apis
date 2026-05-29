# tpo_apis

Frontend React/Vite para el TPO de APIs.

## Levantar el proyecto

```bash
npm install
npm run dev
```

El front queda disponible en `http://localhost:5173`.

## Backend

El listado de productos consume:

```text
http://localhost:8080/api/productos
```

Para ver productos reales, el backend debe estar levantado en el puerto `8080`.

## Carrito

El carrito permite:

- agregar productos desde el listado o el detalle
- ver la cantidad en la navbar
- sumar, restar o eliminar items
- ver el total
- persistir el carrito en `localStorage`
