import '@/App.css'

function ListItem({ children = undefined }) {
  return <li>{children}</li>
}

function UnorderedList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </ul>
  )
}

function App() {
  const items = ['Unordered List Item 1', 'Unordered List Item 2', 'Unordered List Item 3']
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
