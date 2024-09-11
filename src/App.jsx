import '@/App.css'

function UnorderedList() {
  return (
    <ul>
      {/* li = List Item */}
      <li>Unordered List Item 1</li>
      <li>Unordered List Item 2</li>
      <li>Unordered List Item 3</li>
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
