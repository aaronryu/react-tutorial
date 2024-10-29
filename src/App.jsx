import '@/App.css'
import { useForm } from 'react-hook-form'

function App() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  function send(data) {
    console.log('- 검증이 완료된 데이터 : ', data)
  }

  console.log('- 비제어 컴포넌트 원리 기반의 React Hook Form 은 <input> 입력 시 리렌더링 미발생')
  return (
    <>
      <h3 style={{ margin: 0 }}>유저 추가하기</h3>
      <form className='form-wrapper' onSubmit={handleSubmit(send)}>
        <input className='input' {...register('username')} />
        {/* <form> 요소 내 submit 이벤트를 trigger 하는 요소는 2가지 : <button type='submit'> (type 생략 가능) 과 <input type='submit'> */}
        <button type='button'>저장안됨</button>
        <button type='submit'>저장하기</button>
        <input type='submit' value='저장하기' />
      </form>
    </>
  )
}

export default App
