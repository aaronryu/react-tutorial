import { useAppDispatch, useAppSelector } from '@/app/hook'
import Modal from '@/components/Modal'
import { close } from '@/features/modal/slice'
import { createPortal } from 'react-dom'

export function ModalProvider({ children }) {
  const modal = useAppSelector((state) => state['modal'])
  const dispatch = useAppDispatch()
  return (
    <>
      {children}
      {modal.open &&
        createPortal(
          // Non-modal Dialog : 외부와의 인터렉션 허용 (backdrop 미존재)
          <Modal
            type={modal.type}
            title={modal.title}
            content={modal.content}
            onConfirm={() => {
              modal.onConfirm && modal.onConfirm()
              dispatch(close())
            }}
            onClose={() => {
              modal.onCancel && modal.onCancel()
              dispatch(close())
            }}
          />,
          document.body,
        )}
    </>
  )
}
