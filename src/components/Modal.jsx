export default function Modal({
  type = 'info',
  title = undefined,
  content = undefined,
  onConfirm,
  onClose,
}) {
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
      <button onClick={(e) => onConfirm()}>확인</button>
    </dialog>
  )
}
