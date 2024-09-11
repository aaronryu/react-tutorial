import { useState } from 'react'
import '@/App.css'

function App() {
  const [count, setCount] = useState(0)

  /**
   * 1. React.Fragment : JSX 단위는 무조건 단일 태그로 감싸져야하기때문 <- JSX 식에는 부모 요소가 하나 있어야 합니다.ts(2657)
   *  - <React.Fragment></React.Fragment>
   *  - <Fragment></Fragment>
   *  - <></>
   */
  return (
    <>
      <div style={{ marginBottom: 10 }}>{count}</div>
      {/* 2. 버튼 태그 2가지 : <button/>, <input type="button"/> */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <button
          // 3. JSX 에서는 class 가 JS 의 예약어(문법)이기에 클래스명 표기를 위해 className 으로 사용해야한다
          className='increase-button'
          onClick={(e) => {
            /**
             * 4. JSX 에서는 Event 처리를 위해 target 이 아닌 currentTarget 프로퍼티로 처리
             *  - X : console.log(e.target.className)
             *  - O : console.log(e.currentTarget.className)
             */
            console.log(e.currentTarget.className)
            /**
             * 6. SetState 사용법 2가지 : (1) 새로운 상태"값" (2) 새로운 상태값 생성 "함수"
             *  - setCount(count + 1)
             *  - setCount((previousCount) => previousCount + 1)
             */
            setCount((previousCount) => previousCount + 1)
          }}
        >
          증가
        </button>
        {/* 5. click, change 같은것들은 이벤트라고 부르고 event 객체에 이벤트 관련된 값들을 다 담고있다. */}
        {/* onClick, onChange 같은것들의 파라미터는 Callback 함수(수행할것) */}
        <button
          className='decrease-button'
          onClick={(e) => {
            setCount((previousCount) => previousCount - 1)
          }}
        >
          감소
        </button>
      </div>
    </>
  )
}

export default App
