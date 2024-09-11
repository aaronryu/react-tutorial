import { useState } from 'react'
import '@/App.css'

function App() {
  const [level, setLevel] = useState(1)
  const [title, setTitle] = useState('Novice')

  // 1. SetState 내 새로운 상태"값"을 파라미터로
  const levelup_not_working = () => {
    /**
     * 화살표 함수 축약 방식
     *  - setLevel((previous) => { return previous + 1 })
     *  - setLevel((previous) =>          previous + 1  )
     */
    console.log('이전 상태 : ', level)
    setLevel((previous) => previous + 1)
    console.log('이후 상태 : ', level)
    // 여기서의 level 은 상태 변경 이전값이기 때문에 15가 된다하더라도 1차 전직이 되지 않는다.
    if (level >= 30) {
      setTitle('2차 전직')
    } else if (level >= 15) {
      setTitle('1차 전직')
    }
  }

  // 1. SetState 내 새로운 상태"값"을 파라미터로
  const levelup_working_1 = () => {
    const nextLevel = level + 1
    setLevel(nextLevel)
    if (nextLevel >= 15) {
      setTitle('1차 전직')
    }
    if (nextLevel >= 30) {
      setTitle('2차 전직')
    }
  }

  // 2. SetState 내 새로운 상태값을 생성하는 "함수"를 파라미터로
  const levelup_working_2 = () => {
    console.log('이전 상태 : ', level)
    setLevel((previous) => {
      const newest = previous + 1
      if (newest >= 30) {
        setTitle('2차 전직')
      } else if (newest >= 15) {
        setTitle('1차 전직')
      }
      return newest
    })
    console.log('이후 상태 : ', level)
  }

  // 2. SetState 내 새로운 상태값을 생성하는 "함수"를 파라미터로
  const levelup_function_parameter = () => {
    /**
     * * Key : SetState 동기가 아닌 비동기적으로 동작
     *  - 여러분들이 봐온 모든 함수들은 동작이 동기적으로 수행되었을것임
     *  - SetState 는 동기가 아닌 비동기적으로 동작
     */

    // (1) 정상 케이스 : 1 에서 +3 이 더해져서 최종적으로 4 값이 나온다.
    setLevel((previous) => previous + 1)
    setLevel((previous) => previous + 1)
    setLevel((previous) => previous + 1)

    // (2) 비정상 케이스 : 1 에서 +1 만 더해져서 최종적으로 2 값이 나온다.
    // setLevel(level + 1)
    // setLevel(level + 1)
    // setLevel(level + 1)
  }

  return (
    <>
      <div style={{ marginBottom: 10 }}>{level}</div>
      <div style={{ marginBottom: 10 }}>{title}</div>
      {/* <button onClick={(e) => { levelup_working_2(e) })}>레벨업</button> */}
      {/* <button onClick={(e) =>   levelup_working_2(e)  )}>레벨업</button> */}
      {/* <button onClick={         levelup_working_2(e)   }>레벨업</button> */}
      <button onClick={levelup_working_2}>레벨업</button>
    </>
  )
}

export default App
