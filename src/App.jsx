import { useState } from 'react'
import '@/App.css'

/**
 * State Lifting : 부모 컴포넌트가 가지고 있는 상태 변경을 위한 Controller = SetState 를 자식 컴포넌트가 호출
 *  = 상태 끌어올리기 = 부모의 SetState 호출을 자식에게 넘긴다(콜백)
 */
function ButtonComponent(/* props → object destructure */ { className, onClick, children }) {
  // const className = props.className
  // const onClick = props.onClick
  // const children = props.children
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(0)

  /**
   * JSX 는 객체이고, 그 객체 내부에 props 라는 객체 프로퍼티를 갖는다. 총 2개의 파라미터를 우린 넘겨주고 있다.
   *  - className : 'example'
   *  - children  : 'example-children'
   */
  const jsx = <div className='example'>example-children</div>

  return (
    <>
      <div>{count}</div>
      <div>
        <ButtonComponent
          // 1. string 을 그냥 넘길수도 있고
          className='increase-button'
          onClick={() => setCount((previousCount) => previousCount + 1)}
          // onClick={() => {
          //   setCount((previousCount) => previousCount + 1)
          // }}
        >
          {/* 두개 이상의 컴포넌트는 주입이 불가능하다 */}
          {/* <div></div> */}
          {/* <div></div> */}
          증가
        </ButtonComponent>
        <ButtonComponent
          // 2. 중괄호 JS 로직으로 string 을 넘길수도 있다.
          className={'decrease-button'}
          onClick={() => setCount((previousCount) => previousCount - 1)}
          // onClick={() => {
          //   setCount((previousCount) => previousCount - 1)
          // }}
        >
          감소
        </ButtonComponent>
      </div>
    </>
  )
}

export default App
