import { useRef, useState } from 'react'
import '@/App.css'

function FormWithValidation({ label, required = false, length = undefined }) {
  const nameRef = useRef()

  const [requiredValid, setRequiredValid] = useState(true)
  const [lengthValid, setLengthValid] = useState(true)

  console.log('- rerendered : ' + label)
  return (
    <>
      <div>
        {label} :{' '}
        <input
          ref={nameRef}
          onChange={(e) => {
            if (required) setRequiredValid(e.currentTarget.value.length !== 0)
            if (length) setLengthValid(e.currentTarget.value.length <= length)
          }}
        />
      </div>
      {lengthValid || <div style={{ color: 'red' }}>{label}의 길이는 10를 넘어선 안됩니다.</div>}
      {requiredValid || <div style={{ color: 'red' }}>{label}은 필수 입력값입니다.</div>}
    </>
  )
}

function App() {
  console.log('- rerendered')
  return (
    <>
      <FormWithValidation label='이름' required />
      <FormWithValidation label='설명' length={10} />
      <FormWithValidation label='메일' required />
    </>
  )
}

export default App
