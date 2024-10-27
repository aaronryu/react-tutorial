import { useAppDispatch, useAppSelector } from '@/app/hook'
import { loading, success, failed, CustomError } from '@/features/users/slice'
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
  const status = useAppSelector((state) => state['users'].status)

  function fetchUsers() {
    if (status !== 'idle') {
      // 1. already fetched
      console.log("already fetched! we don't need to fetch any api")
      return
    }
    dispatch(loading())
    // 2. fetch
    fetch('/api/users')
      .then((result) => {
        console.log('1) API 호출 결과 : ' + result)
        if (!result.ok) {
          throw new CustomError({ status: result.status, statusText: result.statusText })
        }
        return result.json()
      })
      .then((fetchedUsers) => {
        console.log('2) API 호출 성공 시 유저 데이터 정상 반환 : ' + fetchedUsers)
        // 3. setState
        dispatch(success(fetchedUsers))
      })
      .catch((error) => {
        console.log('에러 객체', error.detail)
        console.log('3) API 호출 실패 시 에러 관련 데이터 반환 : ' + error)
        dispatch(failed(error.detail))
      })
  }

  return (
    <button style={{ marginTop: 10 }} onClick={(e) => fetchUsers()}>
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
