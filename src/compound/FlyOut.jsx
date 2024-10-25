import Icon from '@/compound/Icon'
import { createContext, useContext, useState } from 'react'

const FlyOutContext = createContext({
  open: false,
  toggle: (state) => {},
})

function FlyOut(props) {
  const [open, toggle] = useState(false)

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  )
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext)

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  )
}

FlyOut.Toggle = Toggle

export default FlyOut
