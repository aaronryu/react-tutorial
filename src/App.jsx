import '@/App.css'
import { configureStore, createSlice } from '@reduxjs/toolkit' // * RTK 에서 제공하는 간편 코드
import { Provider, useDispatch, useSelector } from 'react-redux'

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
        // previousState.desc = '하얀하얀 테마' - immer 적용에 따른 부분 렌더링 확인을 위해 주석처리
      } else {
        // return { color: 'black', desc: '검정검정 테마' }
        previousState.color = 'black'
        // previousState.desc = '검정검정 테마' - immer 적용에 따른 부분 렌더링 확인을 위해 주석처리
      }
    },
  },
})

// 2. 전역 Store 설정 (configureStore) <- Reducer(Reducer + InitialState) 넣으면 끝
const store = configureStore({
  reducer: {
    // Store 내 (초기) State 뿐만 아니라 상태전이를 위한 Reducer 대입
    theme: themeSlice.reducer,
    // cart: cartSlice.reducer,
    // payment: paymentSlice.reducer,
    // account: accountSlice.reducer,
  },
})

function ThemeText() {
  // 4.1. Store 전역 상태에 대한 Getter
  const themeColor = useSelector((state) => state['theme'].color)
  // + immer 덕분에 color 값만 바뀌었을때 리렌더된다
  console.log("Theme'Text' Rerendered !")
  return <div style={{ color: themeColor }}>Hello, World!</div>
}

function ThemeDescription() {
  // 4.1. Store 전역 상태에 대한 Getter
  const themeDesc = useSelector((state) => state['theme'].desc)
  // + immer 덕분에 color 값만 바뀌었을때 리렌더된다
  console.log("Theme'Description' Rerendered !")
  return <div>{themeDesc}</div>
}

function ChangeButton() {
  // 4.2. Store 전역 상태에 대한 Setter
  const dispatch = useDispatch()
  console.log('Display Rerendered !')
  return <button onClick={() => dispatch(themeSlice.actions.change())}>변경 버튼</button>
}

function App() {
  return (
    <Provider store={store}>
      {/* 3. Provider 로 전역 상태들을 사용할 범주 설정 */}
      <>
        <h2>테마 바꾸기 Context API 예제</h2>
        {/* 4. 전역 상태들을 사용하는 컴포넌트 정의 */}
        <ThemeText />
        <ThemeDescription />
        <ChangeButton />
      </>
    </Provider>
  )
}

export default App
