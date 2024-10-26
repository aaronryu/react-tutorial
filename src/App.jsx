import '@/App.css'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { store } from '@/app/store'
import { change, modify } from '@/features/theme/slice'
import { ReduxProvider } from '@/providers/ReduxProvider'

function ThemeText() {
  // 4.1. Store 전역 상태에 대한 Getter
  const themeColor = useAppSelector((state) => state['theme'].color)
  // + immer 덕분에 color 값만 바뀌었을때 리렌더된다
  console.log("Theme'Text' Rerendered !")
  return <div style={{ color: themeColor }}>Hello, World!</div>
}

function ThemeDescription() {
  // 4.1. Store 전역 상태에 대한 Getter
  const themeDesc = useAppSelector((state) => state['theme'].desc)
  // + immer 덕분에 color 값만 바뀌었을때 리렌더된다
  console.log("Theme'Description' Rerendered !")
  return <div>{themeDesc}</div>
}

const dispatchWithLog = (store) => (next) => (action) => {
  console.log('- 이전 State : ', store.getState())
  console.log('- Action : ', action)
  next(action)
  console.log('- 이후 State : ', store.getState())
}

function ChangeButton() {
  // 4.2. Store 전역 상태에 대한 Setter
  const dispatch = useAppDispatch()
  console.log('Display Rerendered !')
  return <button onClick={() => dispatchWithLog(store)(dispatch)(change())}>변경 버튼</button>
}

function ModifyButton({ color, desc }) {
  // 4.2. Store 전역 상태에 대한 Setter
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatchWithLog(store)(dispatch)(modify({ color, desc }))}>
      <span style={{ color }}>테마 변경</span>
    </button>
  )
}

function App() {
  return (
    <ReduxProvider>
      {/* 3. Provider 로 전역 상태들을 사용할 범주 설정 */}
      <>
        <h2>테마 바꾸기 Context API 예제</h2>
        {/* 4. 전역 상태들을 사용하는 컴포넌트 정의 */}
        <ThemeText />
        <ThemeDescription />
        <ChangeButton />
        <ModifyButton color='red' desc='빨강빨강 테마' />
        <ModifyButton color='green' desc='초롱초롱 테마' />
      </>
    </ReduxProvider>
  )
}

export default App
