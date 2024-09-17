import { createContext, useContext, useState } from 'react'
import '@/App.css'

const ModalContext = createContext({ show: () => {}, close: () => {} })

function ModalContextProvider({ children }) {
  const [open, setOpen] = useState(false)

  function show() {
    setOpen(true)
  }

  function close() {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ show, close }}>
      {children}
      <dialog open={open}>
        <h3>Modal</h3>
        <button onClick={(e) => close()}>닫기</button>
      </dialog>
    </ModalContext.Provider>
  )
}

function ModalButton() {
  const { show } = useContext(ModalContext)
  return <button onClick={(e) => show()}>열기</button>
}

function App() {
  return (
    <ModalContextProvider>
      <ModalButton />
    </ModalContextProvider>
  )
}

export default App
