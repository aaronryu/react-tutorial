import { useRef, useState } from 'react'
import '@/App.css'
import { produce } from 'immer'

function UsernameInput({ reference, error = undefined, validate }) {
  return (
    <div>
      Username : <input ref={reference} onChange={(e) => validate(e.target.value)} />
      <div style={{ color: 'red' }}>
        {error?.maximum ? <div>{error?.maximum?.message}</div> : <></>}
        {error?.minimum ? <div>{error?.minimum?.message}</div> : <></>}
        {error?.required ? <div>{error?.required?.message}</div> : <></>}
      </div>
    </div>
  )
}

function PasswordInput({ reference, error = undefined, validate }) {
  function changeMode(e) {
    switch (reference.current.type) {
      case 'password':
        reference.current.type = 'text'
        e.currentTarget.innerText = '🔒 감추기'
        return
      case 'text':
        reference.current.type = 'password'
        e.currentTarget.innerText = '🔓 보이기'
        return
    }
  }
  console.log('- 매번 입력해도 rerender 미발생. 객체 프로퍼티 단위 불변성을 유지하며 리렌더 방지')
  return (
    <div>
      Password :{' '}
      <input type='password' ref={reference} onChange={(e) => validate(e.target.value)} />
      <button onClick={changeMode}>🔓 보이기</button>
      <div style={{ color: 'red' }}>
        {error?.maximum ? <div>{error?.maximum?.message}</div> : <></>}
        {error?.minimum ? <div>{error?.minimum?.message}</div> : <></>}
        {error?.required ? <div>{error?.required?.message}</div> : <></>}
      </div>
    </div>
  )
}

function useForm() {
  const forms = useRef({})

  function register(
    label,
    { maximum: max = undefined, minimum: min = undefined, required = undefined },
  ) {
    const ref = useRef(null)
    const [valid, setValid] = useState({
      ...(max && { maximum: false }),
      ...(min && { minimum: false }),
      ...(required && { required: false }),
    })

    const criteria = {
      ...(max && { maximum: { type: 'maximum', value: max.value, message: max.message ?? '' } }),
      ...(min && { minimum: { type: 'minimum', value: min.value, message: min.message ?? '' } }),
      ...(required && { required: { type: 'required', message: required.message ?? '' } }),
    }

    function validate(input) {
      const changed = produce(valid, (draft) => {
        if (max && valid.maximum !== input.length <= 10) draft.maximum = input.length <= 10
        if (min && valid.minimum !== input.length > 5) draft.minimum = input.length > 5
        if (required && valid.required !== input.length > 0) draft.required = input.length > 0
      })
      if (!changed.maximum || !changed.minimum || !changed.required) ref.current?.focus()
      setValid(changed)
    }

    // 2. <input> 혹은 리액트 컴포넌트에 Props 로 넘겨줄 Ref 와 State 상태 반환
    const error = {
      ...(!valid.maximum && criteria.maximum && { maximum: criteria.maximum }),
      ...(!valid.minimum && criteria.minimum && { minimum: criteria.minimum }),
      ...(!valid.required && criteria.required && { required: criteria.required }),
    }

    // 1. useForm 내 중앙관리 변수 form
    const form = {
      ref,
      value: ref.current?.value,
      formState: { error },
      validate,
    }

    // 2.1. 중앙관리 변수 form -> forms 에 추가
    forms.current[label] = form

    // 2.2. 중앙관리 변수 form -> <input> 혹은 리액트 컴포넌트에 Props 로 전달
    return {
      reference: form.ref,
      error: form.formState.error,
      validate: form.validate,
    }
  }

  function handleSubmit(callback) {
    const values = {}

    for (let label in forms.current) {
      const value = forms.current[label].ref.current?.value
      forms.current[label].validate(value)
      values[label] = {
        ...forms.current[label],
        value: value,
      }
    }
    callback(values)
  }

  return { register, handleSubmit }
}

function App() {
  const { register, handleSubmit } = useForm()

  function registration(request) {
    console.log('request : ', request)
  }

  return (
    <section style={{ textAlign: 'start', width: 400 }}>
      <UsernameInput
        {...register('username', {
          maximum: { value: 15, message: '아이디는 15글자를 넘을 수 없습니다.' },
          required: { message: '아이디를 입력해주세요.' },
        })}
      />
      <PasswordInput
        {...register('password', {
          maximum: { value: 10, message: '패스워드는 최대 10글자를 넘을 수 없습니다.' },
          minimum: { value: 5, message: '패스워드는 최소 5글자를 넘어야합니다.' },
          required: { message: '패스워드를 입력해주세요.' },
        })}
      />
      <button onClick={() => handleSubmit(registration)}>회원가입 완료</button>
    </section>
  )
}

export default App
