import { useRef, useState } from 'react'
import '@/App.css'

function App() {
  const [valid, setValid] = useState(false)
  const ageReference = useRef()

  console.log('- rerendered')
  return (
    <>
      <input
        ref={ageReference}
        type='number'
        onChange={(e) => setValid(Number(e.currentTarget.value) >= 19)}
      />
      {valid ? <div>성년입니다</div> : <div style={{ color: 'red' }}>미성년입니다</div>}
    </>
  )
}

export default App
