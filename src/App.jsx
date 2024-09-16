import { useEffect, useState } from 'react'
import '@/App.css'

function Input({ value, onChange }) {
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  console.log('- 자식 Input 컴포넌트 rerendered (이슈 : 2번 리렌더되는걸 확인할 수 있다.)')

  return (
    <input
      value={innerValue}
      onChange={(event) => {
        const value = event.target.value
        setInnerValue(value)
        onChange(value)
      }}
    />
  )
}

function App() {
  const [outerValue, setOuterValue] = useState('')

  console.log('- 부모 App 페이지 rerendered')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input value={outerValue} onChange={(value) => setOuterValue(value)} />
      <input value={outerValue} onChange={(event) => setOuterValue(event.target.value)} />
    </div>
  )
}

export default App
