import '@/App.css'
import { useState } from 'react'

function ListItem({ name, age, desc, setDesc }) {
  const [activated, setActivate] = useState(false)
  const [input, setInput] = useState(desc)
  return (
    <li style={{ textAlign: 'left' }} onClick={(e) => setActivate((previous) => !previous)}>
      {name} | {age} |{' '}
      {activated ? (
        <>
          <input
            value={input}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActivate((previous) => !previous)
              setDesc(input)
            }}
          >
            확인
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActivate((previous) => !previous)
            }}
          >
            취소
          </button>
        </>
      ) : (
        <span>{desc}</span>
      )}
    </li>
  )
}

function UnorderedList({ items, setItems }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem
          key={index}
          name={item.name}
          age={item.age}
          desc={item.desc}
          setDesc={(input) => {
            const updated = [...items]
            updated[index].desc = input
            setItems(updated)
          }}
        />
      ))}
    </ul>
  )
}

function App() {
  const [items, setItems] = useState([
    { name: 'Aaron', age: 10, desc: '안녕하세요' },
    { name: 'Baron', age: 30, desc: '반갑습니다' },
    { name: 'Caron', age: 22, desc: '처음뵙겠습니다' },
    { name: 'Daron', age: 17, desc: '보고싶었습니다' },
  ])
  return (
    <>
      <div>
        {/* ul = Unordered List */}
        <UnorderedList items={items} setItems={setItems} />
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
