import '@/App.css'

function ListItem({ children = undefined }) {
  return <li>{children}</li>
}

function UnorderedList() {
  return (
    <ul>
      {/* li = List Item */}
      <ListItem>Unordered List Item 1</ListItem>
      <ListItem>Unordered List Item 2</ListItem>
      <ListItem>Unordered List Item 3</ListItem>
    </ul>
  )
}

function App() {
  return (
    <>
      <div>
        {/* ul = Unordered List */}
        <UnorderedList />
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
