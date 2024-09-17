import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/App.css'

function Modal({ type = 'info', title = undefined, content = undefined, onClose }) {
  const color = (type) => {
    switch (type) {
      case 'info':
        return 'blue'
      case 'success':
        return 'green'
      case 'warn':
        return 'orange'
      case 'error':
        return 'red'
      default:
        throw new Error('존재하지 않는 모달 타입 입니다.')
    }
  }
  return (
    <dialog open style={{ borderColor: color(type) }}>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={(e) => onClose()}>닫기</button>
    </dialog>
  )
}

const ModalContext = createContext({ show: (content) => {}, close: () => {} })

/**
 *
 * @param {*} previousState
 * @param {*} action
 * @returns
 */
function reducer(previousState, action /* 타입(뭘 수행할지) + 페이로드(유저가 전달한 파라미터) */) {
  switch (action.type.toUpperCase()) {
    case 'SUCCESS_SAVE':
      return {
        open: true,
        type: 'success',
        title: '저장 완료',
        content: '저장이 완료되었습니다.',
      }
    case 'WARN_TYPEERROR':
      return {
        open: true,
        type: 'warn',
        title: '타입 에러 발생',
        content: '다시 입력해 주세요.',
      }
    case 'ERROR_UNKNOWN':
      return {
        open: true,
        type: 'error',
        title: '알수없는 에러 발생',
        content: '고객 센터에 문의하세요.',
      }
    default:
      return {
        open: action.open,
        type: action.type,
        title: action.title,
        content: action.content,
      }
  }
}

function ModalContextProvider({ children }) {
  const CLOSED = { open: false, type: 'info', title: undefined, content: undefined }
  const [modal, dispatch] = useReducer(reducer, CLOSED)

  function show({ type, title, content }) {
    dispatch({ open: true, type, title, content })
  }

  function close() {
    dispatch(CLOSED)
  }

  return (
    <ModalContext.Provider value={{ show, close }}>
      {children}
      {modal.open &&
        createPortal(
          // Non-modal Dialog : 외부와의 인터렉션 허용 (backdrop 미존재)
          <Modal type={modal.type} title={modal.title} content={modal.content} onClose={close} />,
          document.body,
        )}
    </ModalContext.Provider>
  )
}

function InformationModalButton() {
  const { show } = useContext(ModalContext)
  return (
    <button onClick={(e) => show({ type: 'info', title: '안내', content: '안내 관련 노출' })}>
      안내
    </button>
  )
}

function SuccessModalButton() {
  const { show } = useContext(ModalContext)
  return (
    <button onClick={(e) => show({ type: 'success', title: '성공', content: '성공 관련 노출' })}>
      성공
    </button>
  )
}

function WarningModalButton() {
  const { show } = useContext(ModalContext)
  return (
    <button onClick={(e) => show({ type: 'warn', title: '경고', content: '경고 관련 노출' })}>
      경고
    </button>
  )
}

function ErrorModalButton() {
  const { show } = useContext(ModalContext)
  return (
    <button onClick={(e) => show({ type: 'error', title: '에러', content: '에러 관련 노출' })}>
      에러
    </button>
  )
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
      <div style={{ display: 'flex', gap: 10, marginTop: 10, justifyContent: 'center' }}>
        <ModalContext.Consumer>
          {({ show }) => <button onClick={(e) => show({ type: 'SUCCESS_SAVE' })}>저장</button>}
        </ModalContext.Consumer>
        <ModalContext.Consumer>
          {({ show }) => <button onClick={(e) => show({ type: 'WARN_TYPEERROR' })}>타입</button>}
        </ModalContext.Consumer>
        <ModalContext.Consumer>
          {({ show }) => <button onClick={(e) => show({ type: 'ERROR_UNKNOWN' })}>에러</button>}
        </ModalContext.Consumer>
      </div>
    </ModalContextProvider>
  )
}

export default App
