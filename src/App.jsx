import { useAppDispatch, useAppSelector } from '@/app/hook'
import { fetchUsers } from '@/features/users/slice'
import { ReduxProvider } from '@/providers/ReduxProvider'
import './App.css'

function UserTable() {
  const users = useAppSelector((state) => state['users'].data)
  const status = useAppSelector((state) => state['users'].status)
  return (
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
  )
}

function UserFetchButton() {
  const dispatch = useAppDispatch()

  return (
    <button style={{ marginTop: 10 }} onClick={(e) => dispatch(fetchUsers())}>
      조회하기
    </button>
  )
}

function App() {
  return (
    <ReduxProvider>
      <UserTable />
      <UserFetchButton />
    </ReduxProvider>
  )
}

export default App
