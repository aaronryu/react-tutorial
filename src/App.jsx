import { useState } from 'react'
import '@/App.css'

function UserTable({ isLoading, isSuccess, users = [] }) {
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
          {isLoading && (
            <tr style={{ backgroundColor: '#c94c4c' }}>
              <td colSpan={4}>Loading</td>
            </tr>
          )}
          {isSuccess &&
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
    </>
  )
}

function FetchButton({ refetch }) {
  return (
    <button style={{ marginTop: 10 }} onClick={(e) => refetch()}>
      조회하기
    </button>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [users, setUsers] = useState()

  function refetch() {}

  return (
    <>
      <UserTable isLoading={isLoading} isSuccess={isSuccess} users={users} />
      <FetchButton refetch={refetch} />
    </>
  )
}

export default App
