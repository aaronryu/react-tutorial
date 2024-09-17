import { memo, useMemo, useState } from 'react'
import '@/App.css'

const Validation = memo(function Validation({ valid }) {
  console.log('- rerendered : Validation')
  return <div>{valid ? <p>성년입니다</p> : <p style={{ color: 'red' }}>미성년입니다</p>}</div>
})

function Button({ onClick }) {
  console.log('- rerendered : Button')
  return <button onClick={onClick}>증가</button>
}

function App() {
  const [age, setAge] = useState(0)

  /* 무거운 계산이 필요한 값의 경우 useMemo 통해 계산 횟수를 최소화할 수 있다. */
  const valid = useMemo(() => {
    console.log('calculated')
    return age >= 19 ? true : false
  }, [age >= 19])

  return (
    <>
      <p>{age}</p>
      <Validation valid={valid} />
      <Button onClick={() => setAge(age + 1)} />
    </>
  )
}

export default App
