import { createContext, useContext, useEffect, useState } from 'react'
import '@/App.css'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { change, THEME } from '@/features/theme/slice'

function ThemeSelect() {
  const theme = useAppSelector((state) => state['theme'].theme)
  const dispatch = useAppDispatch()
  return (
    <select value={theme} onChange={(e) => dispatch(change(e.target.value))}>
      {Object.values(THEME).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function App() {
  useEffect(() => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    themeMedia.matches
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
    /* 심화 : 운영체제에서 테마를 바꾸었을때 바로 적용될 수 있도록 이벤트 부착 */
    function handleThemeChange(e) {
      e.matches ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    }
    themeMedia.addEventListener('change', handleThemeChange)
    return () => {
      themeMedia.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return (
    <ReduxProvider>
      <h1>Theme</h1>
      <ThemeSelect />
    </ReduxProvider>
  )
}

export default App
