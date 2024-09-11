import { useState } from 'react'
import '@/App.css'

const ADULT = { valid: true, entrance: 20000 }
const NON_ADULT = { valid: false, entrance: 10000 }

function App() {
  const [age, setAge] = useState(0)
  // const [valid, setValid] = useState(false)
  // const [entrance, setEntrance] = useState(FEE_NON_ADULT)
  const [calculate, setCalculate] = useState(NON_ADULT)

  return (
    <>
      <input
        type='number'
        value={age}
        onChange={(event) => {
          const changed = Number(event.currentTarget.value)
          // setAge(changed)
          // setValid(changed >= 19)
          // 성년이 되어도 15000원이 되지 않습니다. 여러분들이 각자 한번 풀어보세요.
          // setEntrance(valid ? FEE_ADULT : FEE_NON_ADULT)
          setAge(changed)
          setCalculate(changed >= 19 ? ADULT : NON_ADULT)
        }}
      />
      {calculate.valid ? <div>성년입니다.</div> : <div style={{ color: 'red' }}>미성년입니다.</div>}
      <div>{`${calculate.entrance}원`}</div>
    </>
  )
}

export default App
