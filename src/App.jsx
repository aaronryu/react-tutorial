import { useRef, useState } from 'react'
import '@/App.css'

function UsernameInput() {
  return (
    <div>
      Username : <input />
    </div>
  )
}

function PasswordInput() {
  const [maximumValid, setMaximumValid] = useState(false)
  const [minimumValid, setMinimumValid] = useState(false)
  const [requiredValid, setRequiredValid] = useState(false)
  const reference = useRef(null)

  function changeMode(e) {
    if (reference.current.type === 'password') {
      reference.current.type = 'text'
      e.currentTarget.innerText = '🔒 감추기'
    } else if (reference.current.type === 'text') {
      reference.current.type = 'password'
      e.currentTarget.innerText = '🔓 보이기'
    }
  }
  console.log('- 매번 입력해도 rerender 미발생. 객체 프로퍼티 단위 불변성을 유지하며 리렌더 방지')
  return (
    <div>
      Password :{' '}
      <input
        type='password'
        ref={reference}
        onChange={(e) => {
          const input = e.currentTarget.value
          setMaximumValid(input.length <= 10)
          setMinimumValid(input.length > 5)
          setRequiredValid(input.length > 0)
        }}
      />
      <button onClick={changeMode}>🔓 보이기</button>
      {maximumValid || <div style={{ color: 'red' }}>비밀번호는 10글자를 넘을 수 없습니다.</div>}
      {minimumValid || <div style={{ color: 'red' }}>비밀번호는 5글자를 넘어야합니다.</div>}
      {requiredValid || <div style={{ color: 'red' }}>비밀번호를 입력해주세요.</div>}
    </div>
  )
}

function App() {
  function registration() {}

  return (
    <section style={{ textAlign: 'start', width: 400 }}>
      <UsernameInput />
      <PasswordInput />
      <button onClick={registration}>회원가입 완료</button>
    </section>
  )
}

export default App
