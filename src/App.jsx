// @ts-nocheck
import { forwardRef, useRef, useState } from 'react'
import '@/App.css'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

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
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  function onClickClose() {
    dialog.current.close()
  }

  function onClickConfirm(data) {
    dialog.current.close()
    create(data)
  }

  console.log('현재 <input> 간의 에러 모음 : ', errors)

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
        <form className='form-wrapper' onSubmit={handleSubmit(onClickConfirm)}>
          <UsernameInput register={register} error={errors?.username} />
          <EmailInput register={register} error={errors?.email} />
          <AgeInput register={register} error={errors?.age} />
          <JobInput register={register} error={errors?.job} />
          <SpecialtyInput register={register} error={errors?.specialty} />
          <button type='button' onClick={onClickClose}>
            닫기
          </button>
          <button type='submit'>저장하기</button>
        </form>
      </dialog>
    </>
  )
}

const Input = forwardRef(function ({ label, error, ...others }, ref) {
  return (
    <div>
      <label className='input-label'>{label} : </label>
      <span className='input-area'>
        <input ref={ref} className={clsx('input', error && 'error-border')} {...others} />
      </span>
    </div>
  )
})

function UsernameInput({ register, error = undefined }) {
  return (
    <div>
      <Input
        label={'유저이름'}
        {...register('username', {
          required: { value: true, message: '아이디를 입력해주세요' },
          maxLength: {
            value: 10,
            message: '아이디는 10자 이상이 될 수 없습니다',
          },
        })}
      />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function EmailInput({ register, error = undefined }) {
  return (
    <div>
      <Input
        label={'이메일'}
        {...register('email', {
          required: { value: true, message: '이메일을 입력해주세요' },
          pattern: {
            value: /^\S+@\S+$/i,
            message: '이메일 형식이 올바르지 않습니다',
          },
        })}
      />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function AgeInput({ register, error = undefined }) {
  return (
    <div>
      <Input
        label={'나이'}
        type='number'
        {...register('age', {
          required: { value: true, message: '나이를 입력해주세요' },
          min: 10,
        })}
      />
      <div className={clsx(error && 'error-text')}>
        {error?.type === 'min' && '나이는 10세 이상의 유저만 받을 수 있습니다'}
        {error?.message}
      </div>
    </div>
  )
}

function JobInput({ register, error = undefined }) {
  return (
    <div>
      <Input
        label={'직업'}
        {...register('job', {
          required: { value: true, message: '직업을 입력해주세요' },
        })}
      />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function SpecialtyInput({ register, error = undefined }) {
  return (
    <div>
      <Input
        label={'직무'}
        {...register('specialty', {
          required: { value: true, message: '직무를 입력해주세요' },
        })}
      />
      <div className={clsx(error && 'error-text')}>
        {error?.type === '_type_' && '_message_'}
        {error?.message}
      </div>
    </div>
  )
}

function App() {
  const {
    isLoading,
    isSuccess,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
  })

  function create({ username, email, age, job, specialty }) {
    console.log('회원가입 정보', { username, email, age, job, specialty })
  }

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
