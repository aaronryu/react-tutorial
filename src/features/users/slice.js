import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
export class CustomError extends Error {
  constructor(detail) {
    super('Custom Error 발생')
    this.detail = detail
  }
}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const result = await fetch('/api/users')
  if (!result.ok) {
    throw new CustomError({ status: result.status, statusText: result.statusText })
  }
  return result.json()
})

const userSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: undefined,
    data: undefined,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, { payload, type }) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, { payload, type }) => {
        state.status = 'succeeded'
        state.data = payload
      })
      .addCase(fetchUsers.rejected, (state, { payload, type }) => {
        state.status = 'failed'
        state.error = JSON.stringify(payload)
      })
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
