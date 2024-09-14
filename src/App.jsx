import { useRef } from 'react'
import '@/App.css'

function UsernameInput() {
  return (
    <div>
      Username : <input />
    </div>
  )
}

function PasswordInput() {
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

  return (
    <div>
      Password : <input type='password' ref={reference} />
      <button onClick={changeMode}>🔓 보이기</button>
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
