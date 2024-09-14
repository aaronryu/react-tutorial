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
  const [valid, setValid] = useState({
    maximum: false,
    minimum: false,
    required: false,
  })
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
  console.log('- 매번 입력할때마다 rerender 발생. 상태를 객체로 단일화하자 useRef 사용 이유를 잃음')
  return (
    <div>
      Password :{' '}
      <input
        type='password'
        ref={reference}
        onChange={(e) => {
          const input = e.currentTarget.value
          setValid({
            maximum: input.length <= 10,
            minimum: input.length > 5,
            required: input.length > 0,
          })
        }}
      />
      <button onClick={changeMode}>🔓 보이기</button>
      {valid.maximum || <div style={{ color: 'red' }}>비밀번호는 10글자를 넘을 수 없습니다.</div>}
      {valid.minimum || <div style={{ color: 'red' }}>비밀번호는 5글자를 넘어야합니다.</div>}
      {valid.required || <div style={{ color: 'red' }}>비밀번호를 입력해주세요.</div>}
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
