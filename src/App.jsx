import { useEffect, useState } from 'react'
import '@/App.css'

function App() {
  const [selected, setSelected] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  async function fetchCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    const data = await response.json()
    return data
  }

  async function fetchProducts(category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    async function fetches() {
      const categories = await fetchCategories()
      setCategories(categories)
      setSelected(categories[0])
    }
    fetches()
  }, [])

  useEffect(() => {
    async function fetches() {
      const products = await fetchProducts(selected)
      setProducts(products)
    }
    fetches()
  }, [selected])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select defaultValue={selected} onChange={(e) => setSelected(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
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
