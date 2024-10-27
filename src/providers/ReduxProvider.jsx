import { store } from '@/app/store'
import { Provider } from 'react-redux'

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {/* 3. Provider 로 전역 상태들을 사용할 범주 설정 */}
      {children}
    </Provider>
  )
}
