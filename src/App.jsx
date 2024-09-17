import { createContext, useContext, useState } from 'react'
import '@/App.css'

function LC() {
  console.log('- A.4. Fourth Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Fourth Component
    </div>
  )
}

function TC() {
  const count = useContext(CreatedContext)
  console.log('- A.3. Third Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Third Component : {count}
      <LC />
    </div>
  )
}

function SC() {
  console.log('- A.2. Second Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Second Component
      <TC />
    </div>
  )
}

function FC() {
  console.log('- A.1. First Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      First Component
      <SC />
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

/* 1. Context 사용하겠습니다 - 공표 */
const defaultValue = -10
const CreatedContext = createContext(defaultValue /* DV : default value */)

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
      <CreatedContext.Provider value={count /* IV : initial value */}>
        {/* 2. Context.Provider 감쌀 영역 = 전역 상태를 사용할 범주 정의 */}
        <FC />
        <ButtonComponent onClick={() => setCount((prev) => prev + 1)} />
      </CreatedContext.Provider>
      <NonContextComponent count={defaultValue} />
    </div>
  )
}

export default App
