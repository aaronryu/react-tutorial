import { createSlice } from '@reduxjs/toolkit'

class CustomError extends Error {
  constructor(detail) {
    super('Custom Error 발생')
    this.detail = detail
  }
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: undefined,
    data: undefined,
  },
  reducers: {
    fetchUsers: (states) => {
      if (states.status !== 'idle') {
        // 1. already fetched
        console.log("already fetched! we don't need to fetch any api")
        return
      }
      states.status = 'loading'
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
          states.status = 'succeeded'
          states.data = fetchedUsers
        })
        .catch((error) => {
          console.log('에러 객체', error.detail)
          console.log('3) API 호출 실패 시 에러 관련 데이터 반환 : ' + error)
          states.status = 'failed'
          states.error = JSON.stringify(error.detail)
        })
    },
  },
})

export const { fetchUsers } = userSlice.actions

export default userSlice.reducer
