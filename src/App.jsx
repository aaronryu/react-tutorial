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

function PasswordInput({ reference, valid, validate }) {
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
      <input type='password' ref={reference} onChange={(e) => validate(e.target.value)} />
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
  const [passwordValid, setPasswordValid] = useState({
    maximum: false,
    minimum: false,
    required: false,
  })

  function passwordValidate(input) {
    const changed = produce(passwordValid, (draft) => {
      if (passwordValid.maximum !== input.length <= 10) draft.maximum = input.length <= 10
      if (passwordValid.minimum !== input.length > 5) draft.minimum = input.length > 5
      if (passwordValid.required !== input.length > 0) draft.required = input.length > 0
    })
    setPasswordValid(changed)
  }

  function registration() {
    const request = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }
    passwordValidate(request.password)
    console.log(request)
  }

  return (
    <section style={{ textAlign: 'start', width: 400 }}>
      <UsernameInput reference={usernameRef} />
      <PasswordInput reference={passwordRef} valid={passwordValid} validate={passwordValidate} />
      <button onClick={registration}>회원가입 완료</button>
    </section>
  )
}

export default App
