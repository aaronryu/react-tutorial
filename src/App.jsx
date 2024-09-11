import { useState } from 'react'
import '@/App.css'

function App() {
  const [age, setAge] = useState(0)
  const [valid, setValid] = useState(false /* 성년 여부 */)

  function handleInput(event) {
    const changed = event.currentTarget.value
    setAge(changed)
    setValid(changed >= 19)
  }

  return (
    <>
      <input type='number' value={age} onChange={handleInput} />
      {/* 1. 단일 컴포넌트 내 표기할 값 변경 */}
      {/* - valid === true 일때 뒤엣것을 표기하고, false 일때 boolean false 를 반환하나 JSX 에선 undefined, null, false, true 모두 표기하지 않음 */}
      {undefined}
      {null}
      {false}
      {true}
      {/* <div>{valid && '성년입니다.'}</div> */}
      {/* 2. 상태값에 따라 다른 컴포넌트 노출 (삼항연산자) */}
      {valid ? <div>성년입니다.</div> : <div style={{ color: 'red' }}>미성년입니다.</div>}
    </>
  )
}

export default App
