import '@/App.css'
import { useRef } from 'react'

function App() {
  const reference = useRef(null)

  console.log('- rerendered')

  return (
    <>
      <div ref={reference}>apple</div>
      <button onClick={(e) => (reference.current.style.color = 'red')}>변경</button>
    </>
  )
}

export default App
