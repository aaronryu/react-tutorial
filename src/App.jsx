import { ReduxProvider } from '@/providers/ReduxProvider'
import { useGetUsersQuery, useLazyGetUsersQuery } from '@/features/api/slice'
import './App.css'

function UserTable() {
  // const { refetch, data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()
  const [trigger, { data: users, isLoading, isSuccess, isError, error }, lastPromiseInfo] = useLazyGetUsersQuery()

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
      <button style={{ marginTop: 10 }} onClick={(e) => trigger({}, true)}>
        조회하기
      </button>
    </>
  )
}

function App() {
  return (
    <ReduxProvider>
      <UserTable />
    </ReduxProvider>
  )
}

export default App
