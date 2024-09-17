import { useState } from 'react'
import '@/App.css'

function usePersonSelect(initalvalue) {
  const [person, setPerson] = useState(initalvalue)
  return [
    person,
    () => setPerson((previous) => previous + 1),
    () => setPerson((previous) => previous - 1),
  ]
}

function App() {
  const [adults, plusAdults, minusAdults] = usePersonSelect(0)
  const [kids, plusKids, minusKids] = usePersonSelect(0)
  const [babies, plusBabies, minusBabies] = usePersonSelect(0)

  return (
    <>
      <div>
        성인
        <button onClick={minusAdults}>-</button>
        {adults}
        <button onClick={plusAdults}>+</button>
      </div>
      <div>
        어린이
        <button onClick={minusKids}>-</button>
        {kids}
        <button onClick={plusKids}>+</button>
      </div>
      <div>
        유아
        <button onClick={minusBabies}>-</button>
        {babies}
        <button onClick={plusBabies}>+</button>
      </div>
    </>
  )
}

export default App
