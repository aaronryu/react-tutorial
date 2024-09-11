import '@/App.css'
import { useEffect, useRef } from 'react'

function App() {
  const reference = useRef(null)

  console.log('렌더링 전 : ')
  console.log(reference.current)
  console.log(reference.current?.innerText)

  useEffect(() => {
    console.log('렌더링 후 : ')
    console.log(reference.current)
    console.log(reference.current.innerText)
  }, [])

  return (
    <>
      <div ref={reference}>apple</div>
    </>
  )
}

export default App
