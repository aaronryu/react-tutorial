import { createSlice } from '@reduxjs/toolkit'

const CLOSED = {
  open: false,
  type: 'info',
  title: undefined,
  content: undefined,
  // onConfirm: undefined,
  // onCancel: undefined,
}

// 1. Slice 생성 (createSlice) = Reducer + Action 설정
const modalSlice = createSlice({
  name: 'modal',
  // React 에서의 useReducer 사용할때도 2개의 파라미터가 필요했다 : useReducer((1) Reducer, (2) InitialState)
  // (2) InitialState
  initialState: CLOSED,
  // (1) Reducer
  reducers: {
    // React 에서의 useReducer 처럼 새로운 상태를 return 하지않고, immer 사용했을때와 동일하게 변경할 상태만 골라서 변경하면되어, 간편하다.
    show: (previousState, { payload, type }) => {
      const modalType = payload.type.toUpperCase()
      console.log(modalType)
      switch (modalType) {
        case 'SUCCESS_SAVE':
          return {
            open: true,
            type: 'success',
            title: '저장 완료',
            content: '저장이 완료되었습니다.',
            // onConfirm: payload.onConfirm,
            // onCancel: payload.onCancel,
          }
        case 'WARN_TYPEERROR':
          return {
            open: true,
            type: 'warn',
            title: '타입 에러 발생',
            content: '다시 입력해 주세요.',
            // onConfirm: payload.onConfirm,
            // onCancel: payload.onCancel,
          }
        case 'ERROR_UNKNOWN':
          return {
            open: true,
            type: 'error',
            title: '알수없는 에러 발생',
            content: '고객 센터에 문의하세요.',
            // onConfirm: payload.onConfirm,
            // onCancel: payload.onCancel,
          }
        default:
          return {
            open: true,
            type: payload.type,
            title: payload.title,
            content: payload.content,
            // onConfirm: payload.onConfirm,
            // onCancel: payload.onCancel,
          }
      }
    },
    close: (previousState, { payload, type }) => {
      return CLOSED
    },
  },
})

export const { show, close } = modalSlice.actions

export default modalSlice.reducer
