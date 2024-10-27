import userReducer from '@/features/users/slice'
import { configureStore } from '@reduxjs/toolkit'

const dispatchWithLog = (store) => (next) => (action) => {
  console.log('- 이전 State : ', store.getState())
  console.log('- Action : ', action)
  next(action)
  console.log('- 이후 State : ', store.getState())
}

// 2. 전역 Store 설정 (configureStore) <- Reducer(Reducer + InitialState) + Middleware
export const store = configureStore({
  reducer: {
    // Store 내 (초기) State 뿐만 아니라 상태전이를 위한 Reducer 대입
    users: userReducer,
    // cart: cartSlice.reducer,
    // payment: paymentSlice.reducer,
    // account: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dispatchWithLog),
})
