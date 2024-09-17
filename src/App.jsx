import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/App.css'

const ModalContext = createContext({ show: (content) => {}, close: () => {} })

function ModalContextProvider({ children }) {
  const [modal, setModal] = useState({ open: false, title: undefined, content: undefined })

  function show({ title, content }) {
    setModal({ open: true, title, content })
  }

  function close() {
    setModal({ open: false, title: undefined, content: undefined })
  }

  return (
    <ModalContext.Provider value={{ show, close }}>
      {children}
      {modal.open &&
        createPortal(
          // Non-modal Dialog : 외부와의 인터렉션 허용 (backdrop 미존재)
          <dialog open>
            <h3>{modal.title}</h3>
            <p>{modal.content}</p>
            <button onClick={(e) => close()}>닫기</button>
          </dialog>,
          document.body,
        )}
    </ModalContext.Provider>
  )
}

function InformationModalButton() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show({ title: '안내', content: '안내 관련 노출' })}>안내</button>
}

function SuccessModalButton() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show({ title: '성공', content: '성공 관련 노출' })}>성공</button>
}

function WarningModalButton() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show({ title: '경고', content: '경고 관련 노출' })}>경고</button>
}

function ErrorModalButton() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show({ title: '에러', content: '에러 관련 노출' })}>에러</button>
}

function App() {
  return (
    <ModalContextProvider>
      <div style={{ display: 'flex', gap: 10 }}>
        <InformationModalButton />
        <SuccessModalButton />
        <WarningModalButton />
        <ErrorModalButton />
      </div>
    </ModalContextProvider>
  )
}

export default App
