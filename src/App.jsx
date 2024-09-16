import { useEffect, useLayoutEffect, useState } from 'react'
import '@/App.css'

function App() {
  const [value, setValue] = useState(0)

  // 각 Hook 내 조건부 setValue 코드 부분을 주석처리하면서 버튼 클릭 시 깜빡임의 유무를 눈으로 확인해보세요.
  // 1. useEffect
  useEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200)
    }
    console.log('- 3. Paint 직후')
  }, [value])

  // 2. useLayoutEffect
  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200)
    }
    console.log('- 2. Paint 직전 = React 과정 중 (2) Commit 직후')
  }, [value])

  console.log('- 1. React 과정 중 (1) Render 과정')

  return <button onClick={() => setValue(0)}>value: {value}</button>
}

export default App
