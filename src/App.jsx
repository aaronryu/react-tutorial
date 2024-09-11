import { useRef, useState } from 'react'
import '@/App.css'

function App() {
  const nameRef = useRef()

  const [requiredValid, setRequiredValid] = useState(true)
  const [lengthValid, setLengthValid] = useState(true)

  console.log('- rerendered')
  return (
    <>
      <div>
        이름 :{' '}
        <input
          ref={nameRef}
          onChange={(e) => {
            setRequiredValid(e.currentTarget.value.length !== 0)
            setLengthValid(e.currentTarget.value.length <= 10)
          }}
        />
      </div>
      {lengthValid || <div style={{ color: 'red' }}>이름의 길이는 10를 넘어선 안됩니다.</div>}
      {requiredValid || <div style={{ color: 'red' }}>이름은 필수 입력값입니다.</div>}
    </>
  )
}

export default App
