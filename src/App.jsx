import { useEffect, useState } from 'react'
import '@/App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {products.map((product) => (
        <div key={product.id} style={{ textAlign: 'start' }}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div style={{ color: 'orange' }}>{product.price}</div>
        </div>
      ))}
    </div>
  )
}

export default App
