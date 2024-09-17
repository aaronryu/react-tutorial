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
  // const { count } = useContext(CreatedContext)
  console.log('- A.3. Third Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Third Component :{' '}
      <CreatedContext.Consumer>{({ count }) => <>{count}</>}</CreatedContext.Consumer>
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

function ButtonComponent() {
  // const { setCount } = useContext(CreatedContext)
  console.log('- B. Button Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Button Component
      <div>
        <CreatedContext.Consumer>
          {({ setCount }) => <button onClick={() => setCount((prev) => prev + 1)}>증가</button>}
        </CreatedContext.Consumer>
      </div>
    </div>
  )
}

function NonContextComponent() {
  const { count } = useContext(CreatedContext)
  console.log('- C. Non-Context Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Non-Context Component : {count}
    </div>
  )
}

/* 1. Context 사용하겠습니다 - 공표 */
const defaultValue = -10
const CreatedContext = createContext(
  { count: defaultValue, setCount: (state) => {} } /* DV : default value */,
)

function CreatedContextProvider({ children }) {
  const [count, setCount] = useState(0)

  return (
    <CreatedContext.Provider value={{ count, setCount } /* IV : initial value */}>
      {/* 2. Context.Provider 감쌀 영역 = 전역 상태를 사용할 범주 정의 */}
      {children}
    </CreatedContext.Provider>
  )
}

function App() {
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
      <CreatedContextProvider>
        {/* 2. Context.Provider 감쌀 영역 = 전역 상태를 사용할 범주 정의 */}
        <FC />
        <ButtonComponent />
      </CreatedContextProvider>
      <NonContextComponent />
    </div>
  )
}

export default App
