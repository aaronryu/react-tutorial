import { useRef, useState } from 'react'
import '@/App.css'
import { produce } from 'immer'

function UsernameInput({ reference }) {
  return (
    <div>
      Username : <input ref={reference} />
    </div>
  )
}

function PasswordInput({ reference }) {
  const [valid, setValid] = useState({
    maximum: false,
    minimum: false,
    required: false,
  })

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
          const changed = produce(valid, (draft) => {
            if (valid.maximum !== input.length <= 10) draft.maximum = input.length <= 10
            if (valid.minimum !== input.length > 5) draft.minimum = input.length > 5
            if (valid.required !== input.length > 0) draft.required = input.length > 0
          })
          setValid(changed)
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
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  function registration() {}

  return (
    <section style={{ textAlign: 'start', width: 400 }}>
      <UsernameInput reference={usernameRef} />
      <PasswordInput reference={passwordRef} />
      <button onClick={registration}>회원가입 완료</button>
    </section>
  )
}

export default App
