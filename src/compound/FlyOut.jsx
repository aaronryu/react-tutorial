import Icon from '@/compound/Icon'
import { createContext, useContext, useState } from 'react'

const FlyOutContext = createContext({
  open: false,
  toggle: (state) => {},
})

function FlyOut(props) {
  const [open, toggle] = useState(false)

  return (
    <div className='flyout'>
      <FlyOutContext.Provider value={{ open, toggle }}>
        {props.children}
      </FlyOutContext.Provider>
    </div>
  )
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext)

  return (
    <div className='flyout-btn' onClick={() => toggle(!open)}>
      <Icon />
    </div>
  )
}

function List({ children }) {
  const { open } = useContext(FlyOutContext)
  return open && <ul className='flyout-list'>{children}</ul>
}

function Item({ children }) {
  return <li className='flyout-item'>{children}</li>
}

FlyOut.Toggle = Toggle
FlyOut.List = List
FlyOut.Item = Item

export default FlyOut
