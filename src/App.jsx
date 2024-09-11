import '@/App.css'
import { useState } from 'react'

function ListItem({ name, age, desc }) {
  const [activated, setActivate] = useState(false)
  return (
    <li style={{ textAlign: 'left' }} onClick={(e) => setActivate(!activated)}>
      {name} | {age} |{' '}
      {activated ? (
        <input value={desc} onClick={(e) => e.stopPropagation()} />
      ) : (
        <span>{desc}</span>
      )}
    </li>
  )
}

function UnorderedList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={index} name={item.name} age={item.age} desc={item.desc} />
      ))}
    </ul>
  )
}

function App() {
  const items = [
    { name: 'Aaron', age: 10, desc: '안녕하세요' },
    { name: 'Baron', age: 30, desc: '반갑습니다' },
    { name: 'Caron', age: 22, desc: '처음뵙겠습니다' },
    { name: 'Daron', age: 17, desc: '보고싶었습니다' },
  ]
  return (
    <>
      <div>
        {/* ul = Unordered List */}
        <UnorderedList items={items} />
        {/* ol = Ordered List */}
        <ol>
          {/* li = List Item */}
          <li>Ordered List Item 1</li>
          <li>Ordered List Item 2</li>
          <li>Ordered List Item 3</li>
        </ol>
      </div>
    </>
  )
}

export default App
