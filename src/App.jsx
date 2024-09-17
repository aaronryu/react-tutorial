import { useReducer, useState } from 'react'
import '@/App.css'

/**
 * Reducer : 상태 변경 로직 모음
 * @param {*} previousState : 이전 상태
 * @param {*} action : 상태 변경 요청
 * @returns
 */
function reducer(previousState, action) {
  // - previousState = 이전 상태
  // - action = 상태를 어떻게 변경할지? = { type, data }
  //    - type
  //      - 10 증가할래 : INCREASE_TEN
  //      - 10 감소할래 : DECREASE_TEN
  switch (action.type) {
    case 'INCREASE_TEN':
      // setState 변경 방법 2개 : (1) 값 (2) 함수 = 이 reducer 함수는 (2)번에 해당
      return previousState + 10
    case 'DECREASE_TEN':
      return previousState - 10
    default:
      throw new Error('정의되어있지 않은 action 입니다.')
  }
}

function App() {
  // const [count, setCount] = useState(0)
  const [count, dispatch] = useReducer(reducer, 0 /* 초기 상태 = initial state */)
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
      {/* dispatch : 상태 변경 요청 호출 */}
      {/* action   : 상태 변경 요청 */}
      <button onClick={() => dispatch({ type: 'INCREASE_TEN' })}>증가</button>
      <button onClick={() => dispatch({ type: 'DECREASE_TEN' })}>감소</button>
    </>
  )
}

export default App
