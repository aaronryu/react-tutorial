import '@/App.css'

function UsernameInput() {
  return (
    <div>
      Username : <input />
    </div>
  )
}

function PasswordInput() {
  return (
    <div>
      Password : <input type='password' />
      <button>🔓 보이기</button>
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
