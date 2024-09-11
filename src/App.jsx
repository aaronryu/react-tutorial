import { useRef, useState } from 'react'
import '@/App.css'

function App() {
  const [count, setCount] = useState(0)

  const countReference = useRef(0)
  // Rerender 가 일어날때마다 표기 | countReference 를 '조작'하고, '표기'했을때 어떠한 Rerender 도 발생하지 않음
  console.log('- rerendered')

  return (
    <>
      {/* 1. 표기 View */}
      <div>State 값 : {count}</div>
      <div>Reference 값 : {countReference.current}</div>
      {/* 2. 조작 Controller */}
      <button onClick={() => setCount(count + 1)}>State 값 증가</button>
      <button onClick={() => (countReference.current += 1)}>Reference 값 증가</button>
      <button onClick={() => console.log('지금 값은 : ', countReference.current)}>표기</button>
    </>
  )
}

export default App
