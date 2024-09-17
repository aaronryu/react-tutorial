import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/App.css'

const ModalContext = createContext({ show: (content) => {}, close: () => {} })

function ModalContextProvider({ children }) {
  const [modal, setModal] = useState({ open: false, content: <></> })

  function show(content) {
    setModal({ open: true, content })
  }

  function close() {
    setModal({ open: false, content: <></> })
  }

  return (
    <ModalContext.Provider value={{ show, close }}>
      {children}
      {modal.open &&
        createPortal(
          <dialog open>
            {modal.content}
            <button onClick={(e) => close()}>닫기</button>
          </dialog>,
          document.body,
        )}
    </ModalContext.Provider>
  )
}

function Modal1Button() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show(<h3>Modal 1</h3>)}>1 열기</button>
}

function Modal2Button() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show(<h3>Modal 2</h3>)}>2 열기</button>
}

function Modal3Button() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show(<h3>Modal 3</h3>)}>3 열기</button>
}

function App() {
  return (
    <ModalContextProvider>
      <Modal1Button />
      <Modal2Button />
      <Modal3Button />
    </ModalContextProvider>
  )
}

export default App
