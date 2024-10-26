import { createSlice } from '@reduxjs/toolkit'

export const THEME = {
  DEFAULT: 'system',
  DARK: 'dark',
  LIGHT: 'light',
}

// 1. Slice 생성 (createSlice) = Reducer + Action 설정
const themeSlice = createSlice({
  name: 'theme',
  // React 에서의 useReducer 사용할때도 2개의 파라미터가 필요했다 : useReducer((1) Reducer, (2) InitialState)
  // (2) InitialState
  initialState: { theme: localStorage.getItem('theme') ?? THEME.DEFAULT },
  // (1) Reducer
  reducers: {
    // React 에서의 useReducer 처럼 새로운 상태를 return 하지않고, immer 사용했을때와 동일하게 변경할 상태만 골라서 변경하면되어, 간편하다.
    change: (previousState, { payload, type }) => {
      previousState.theme = payload
    },
  },
})

export const { change } = themeSlice.actions

export default themeSlice.reducer
