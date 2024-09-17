import { useReducer, useState } from 'react'
import '@/App.css'

function 상태변경_경우의수_2개(상태, 상태변경요청) {
  // - 상태 = 이전 상태
  // - 상태변경요청 = 상태를 어떻게 변경할지? = { type, data }
  //    - type
  //      - 10 증가할래 : INCREASE_TEN
  //      - 10 감소할래 : DECREASE_TEN
  switch (상태변경요청.type) {
    case 'INCREASE_TEN':
      // setState 변경 방법 2개 : (1) 값 (2) 함수 = 이 상태변경_경우의수_2개 함수는 (2)번에 해당
      return 상태 + 10
    case 'DECREASE_TEN':
      return 상태 - 10
  }
}

function App() {
  // const [count, setCount] = useState(0)
  const [count, setCount] = useReducer(상태변경_경우의수_2개, 0 /* 초기 상태 = initial state */)
  /**
   * 우리가 필요한것 = useReducer 의 2개의 파라미터
   *  - 2가지 경우의 수
   *  - 상태에는 항상 초기값이 필요
   */

  // 상태 변경 경우의 수 2개 : 10 증가, 10 감소 => 만약에 count 를 무조건 10씩 증가 혹은 감소만하고싶다면?
  //  - 문제점 : setCount 는 넣는값마다 다 변경할 수 있다는 "자율성"
  //  - 내가 원하는것 : count 상태 변경에 제약을 두가지 경우의 수로만
  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount({ type: 'INCREASE_TEN' })}>증가</button>
      <button onClick={() => setCount({ type: 'DECREASE_TEN' })}>감소</button>
    </>
  )
}

export default App
