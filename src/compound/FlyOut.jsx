import { createContext, useState } from 'react'

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

export default FlyOut
