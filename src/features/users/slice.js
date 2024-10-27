import { createSlice } from '@reduxjs/toolkit'
export class CustomError extends Error {
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
    loading: (states, { payload, type }) => {
      states.status = 'loading'
    },
    success: (states, { payload, type }) => {
      states.status = 'succeeded'
      states.data = payload
    },
    failed: (states, { payload, type }) => {
      states.status = 'failed'
      states.error = JSON.stringify(payload)
    },
  },
})

export const { loading, success, failed } = userSlice.actions

export default userSlice.reducer
