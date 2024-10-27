import { useState } from 'react'
import './App.css'

class CustomError extends Error {
  constructor(detail) {
    super('Custom Error 발생')
    this.detail = detail
  }
}

function App() {
  const [users, setUsers] = useState(undefined)
  const [status, setStatus] = useState('idle')
  // status: 'idle' | 'loading' | 'succeeded' | 'failed',

  function fetchUsers() {
    if (status !== 'idle') {
      // 1. already fetched
      console.log("already fetched! we don't need to fetch any api")
      return
    }
    setStatus('loading')
    // 2. fetch
    fetch('/api/users')
      .then((result) => {
        console.log(result)
        if (!result.ok) {
          throw new CustomError({ status: result.status, statusText: result.statusText })
        }
        return result.json()
      })
      .then((fetchedUsers) => {
        // 3. setState
        setUsers(fetchedUsers)
        setStatus('succeeded')
      })
      .catch((error) => {
        console.log('에러 객체', error.detail)
        console.log(error)
        setStatus('failed')
      })
  }

  return (
    <>
      <table>
        <colgroup>
          <col style={{ backgroundColor: '#89a795' }} width={80} />
          <col style={{ backgroundColor: '#89a795' }} width={100} />
          <col style={{ backgroundColor: '#89a795' }} width={120} />
          <col style={{ backgroundColor: '#65796d' }} width={180} />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: 'gray' }}>
            <th>이름</th>
            <th>직업</th>
            <th>직무</th>
            <th>회원가입일</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && (
            <tr style={{ backgroundColor: '#c94c4c' }}>
              <td colSpan={4}>Loading</td>
            </tr>
          )}
          {status !== 'idle' &&
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.job}</td>
                <td>{user.specialty}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button style={{ marginTop: 10 }} onClick={fetchUsers}>
        조회하기
      </button>
    </>
  )
}

export default App
