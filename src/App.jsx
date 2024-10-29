// @ts-nocheck
import { forwardRef, useRef, useState } from 'react'
import '@/App.css'
import clsx from 'clsx'

function UserTable({ isLoading, isSuccess, users = [] }) {
  return (
    <>
      <table>
        <colgroup>
          <col style={{ backgroundColor: '#89a795' }} width={80} />
          <col style={{ backgroundColor: '#89a795' }} width={100} />
          <col style={{ backgroundColor: '#89a795' }} width={120} />
          <col style={{ backgroundColor: '#65796d' }} width={180} />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: 'gray' }}>
            <th>이름</th>
            <th>직업</th>
            <th>직무</th>
            <th>회원가입일</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr style={{ backgroundColor: '#c94c4c' }}>
              <td colSpan={4}>Loading</td>
            </tr>
          )}
          {isSuccess &&
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.job}</td>
                <td>{user.specialty}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

function FetchButton({ refetch }) {
  return <button onClick={(e) => refetch()}>조회하기</button>
}

function ModalButton({ create }) {
  const dialog = useRef(null)

  function onClickClose() {
    dialog.current.close()
  }

  function onClickConfirm() {
    dialog.current.close()
    create()
  }

  return (
    <>
      {/* <dialog> 는 Non-modal Dialog 와 backdrop 이 있는 Modal Dialog 로 나뉘고, 후자는 showModal() 로 오픈 */}
      <button onClick={(e) => dialog.current.showModal()}>추가하기</button>
      <dialog
        ref={dialog}
        onCancel={() => console.log('esc 버튼을 눌렀을때 닫히는 경우')}
        onClose={() => console.log('close 이벤트를 발생 = (1) esc 혹은 (2) 버튼')}
      >
        <h3 style={{ margin: 0 }}>유저 추가하기</h3>
        <form className='form-wrapper' onSubmit={() => {}}>
          <UsernameInput />
          <EmailInput />
          <AgeInput />
          <JobInput />
          <SpecialtyInput />
          <button onClick={(e) => {}}>닫기</button>
          <button onClick={(e) => {}}>저장하기</button>
        </form>
      </dialog>
    </>
  )
}

const Input = forwardRef(function ({ label, error }, ref) {
  return (
    <div>
      <label className='input-label'>{label} : </label>
      <span className='input-area'>
        <input ref={ref} className={clsx('input', error && 'error-border')} />
      </span>
    </div>
  )
})

function UsernameInput({ error = undefined }) {
  return (
    <div>
      <Input label={'유저이름'} />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function EmailInput({ error = undefined }) {
  return (
    <div>
      <Input label={'이메일'} />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function AgeInput({ error = undefined }) {
  return (
    <div>
      <Input label={'나이'} type='number' />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function JobInput({ error = undefined }) {
  return (
    <div>
      <Input label={'직업'} />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function SpecialtyInput({ error = undefined }) {
  return (
    <div>
      <Input label={'직무'} />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [users, setUsers] = useState()

  function refetch() {}

  function create({ username, email, age, job, specialty }) {}

  console.log('- 비제어 컴포넌트 : 매번 입력해도 rerender 미발생')
  return (
    <>
      <UserTable isLoading={isLoading} isSuccess={isSuccess} users={users} />
      <div style={{ marginTop: 10 }}>
        <FetchButton refetch={refetch} />
        <ModalButton create={create} />
      </div>
    </>
  )
}

export default App
