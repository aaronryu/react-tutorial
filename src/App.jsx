import { forwardRef, useRef, useState } from 'react'
import '@/App.css'

const FormWithValidation = forwardRef(({ label, required = false, length = undefined }, ref) => {
  const [requiredValid, setRequiredValid] = useState(true)
  const [lengthValid, setLengthValid] = useState(true)

  console.log('- rerendered : ' + label)
  return (
    <>
      <div>
        {label} :{' '}
        <input
          ref={ref}
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
})

function App() {
  const references = {
    name: useRef(),
    desc: useRef(),
    mail: useRef(),
  }

  function submit() {
    console.log({
      name: references?.name?.current?.value,
      desc: references?.desc?.current?.value,
      mail: references?.mail?.current?.value,
    })
  }

  console.log('- rerendered')
  return (
    <>
      <FormWithValidation ref={references.name} label='이름' required />
      <FormWithValidation ref={references.desc} label='설명' length={10} />
      <FormWithValidation ref={references.mail} label='메일' required />
      <button onClick={submit}>제출</button>
    </>
  )
}

export default App
