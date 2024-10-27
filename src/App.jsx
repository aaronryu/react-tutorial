import '@/App.css'
import { ModalProvider } from '@/providers/ModalProvider'
import { useAppDispatch } from '@/app/hook'
import { show } from '@/features/modal/slice'
import { ReduxProvider } from '@/providers/ReduxProvider'

function InformationModalButton() {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={(e) => dispatch(show({ type: 'info', title: '안내', content: '안내 관련 노출' }))}
    >
      안내
    </button>
  )
}

function SuccessModalButton() {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={(e) => dispatch(show({ type: 'success', title: '성공', content: '성공 관련 노출' }))}
    >
      성공
    </button>
  )
}

function WarningModalButton() {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={(e) => dispatch(show({ type: 'warn', title: '경고', content: '경고 관련 노출' }))}
    >
      경고
    </button>
  )
}

function ErrorModalButton() {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={(e) => dispatch(show({ type: 'error', title: '에러', content: '에러 관련 노출' }))}
    >
      에러
    </button>
  )
}

function TypeSaveButton() {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={(e) =>
        dispatch(show({ type: 'SUCCESS_SAVE' /* , onConfirm: () => window.location.reload() */ }))
      }
    >
      저장
    </button>
  )
}

function TypeErrorButton() {
  const dispatch = useAppDispatch()
  return <button onClick={(e) => dispatch(show({ type: 'WARN_TYPEERROR' }))}>저장</button>
}

function TypeUnknownButton() {
  const dispatch = useAppDispatch()
  return <button onClick={(e) => dispatch(show({ type: 'ERROR_UNKNOWN' }))}>저장</button>
}

function App() {
  return (
    <ReduxProvider>
      <ModalProvider>
        <div style={{ display: 'flex', gap: 10 }}>
          <InformationModalButton />
          <SuccessModalButton />
          <WarningModalButton />
          <ErrorModalButton />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10, justifyContent: 'center' }}>
          <TypeSaveButton />
          <TypeErrorButton />
          <TypeUnknownButton />
        </div>
      </ModalProvider>
    </ReduxProvider>
  )
}

export default App
