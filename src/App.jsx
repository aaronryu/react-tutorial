import { useState } from 'react'
import '@/App.css'

function LC() {
  console.log('- A.4. Fourth Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Fourth Component
    </div>
  )
}

function TC({ count }) {
  console.log('- A.3. Third Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Third Component : {count}
      <LC />
    </div>
  )
}

function SC({ count }) {
  console.log('- A.2. Second Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Second Component
      <TC count={count} />
    </div>
  )
}

function FC({ count }) {
  console.log('- A.1. First Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      First Component
      <SC count={count} />
    </div>
  )
}

function ButtonComponent({ onClick }) {
  console.log('- B. Button Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Button Component
      <div>
        <button onClick={onClick}>증가</button>
      </div>
    </div>
  )
}

function NonContextComponent({ count }) {
  console.log('- C. Non-Context Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Non-Context Component : {count}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <div
      className='section-box'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        padding: 10,
      }}
    >
      <FC count={count} />
      <ButtonComponent onClick={() => setCount((prev) => prev + 1)} />
      <NonContextComponent count={count} />
    </div>
  )
}

export default App
