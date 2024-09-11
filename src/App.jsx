import '@/App.css'
import { useRef } from 'react'

function App() {
  const reference = useRef(null)
  const sources = [
    'https://vjs.zencdn.net/v/oceans.mp4',
    'https://lamberta.github.io/html5-animation/examples/ch04/assets/movieclip.mp4',
  ]

  console.log('- rerendered')

  return (
    <>
      <video ref={reference} autoPlay controls width={500} />
      <div>
        <button onClick={() => (reference.current.src = sources[0])}>전환 1</button>
        <button onClick={() => (reference.current.src = sources[1])}>전환 2</button>
      </div>
    </>
  )
}

export default App
