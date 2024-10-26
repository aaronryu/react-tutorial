import '@/App.css'
import { createSlice } from '@reduxjs/toolkit' // * RTK 에서 제공하는 간편 코드

// 1. Slice 생성 (createSlice) = Reducer + Action + (초기) State 설정
const themeSlice = createSlice({
  name: 'theme',
  // React 에서의 useReducer 사용할때도 2개의 파라미터가 필요했다 : useReducer((1) Reducer, (2) InitialState)
  // (2) InitialState
  initialState: { color: 'black', desc: '검정검정 테마' },
  // (1) Reducer
  reducers: {
    // React 에서의 useReducer 처럼 새로운 상태를 return 하지않고, immer 사용했을때와 동일하게 변경할 상태만 골라서 변경하면되어, 간편하다.
    change: (previousState) => {
      if (previousState.color === 'black') {
        // return { color: 'white', desc: '하얀하얀 테마' }
        previousState.color = 'white'
        previousState.desc = '하얀하얀 테마'
      } else {
        // return { color: 'black', desc: '검정검정 테마' }
        previousState.color = 'black'
        previousState.desc = '검정검정 테마'
      }
    },
  },
})

function App() {
  return <></>
}

export default App
