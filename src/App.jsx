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
    if (reference.current.type === 'password') {
      reference.current.type = 'text'
      e.currentTarget.innerText = '🔒 감추기'
    } else if (reference.current.type === 'text') {
      reference.current.type = 'password'
      e.currentTarget.innerText = '🔓 보이기'
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
    const initial = {}
    if (max) initial.maximum = false
    if (min) initial.minimum = false
    if (required) initial.required = false
    const [valid, setValid] = useState(initial)

    const criteria = {}
    if (max) criteria.maximum = { type: 'maximum', value: max.value, message: max.message ?? '' }
    if (min) criteria.minimum = { type: 'minimum', value: min.value, message: min.message ?? '' }
    if (required) criteria.required = { type: 'required', message: required.message ?? '' }

    function validate(input) {
      const changed = produce(valid, (draft) => {
        if (max && valid.maximum !== input.length <= 10) draft.maximum = input.length <= 10
        if (min && valid.minimum !== input.length > 5) draft.minimum = input.length > 5
        if (required && valid.required !== input.length > 0) draft.required = input.length > 0
      })
      if (!changed.maximum || !changed.minimum || !changed.required) ref.current?.focus()
      setValid(changed)
    }

    const error = {}
    if (max && !valid.maximum) error.maximum = { message: max.message }
    if (min && !valid.minimum) error.minimum = { message: min.message }
    if (required && !valid.required) error.required = { message: required.message }

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
    for (let label of Object.keys(forms.current)) {
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
