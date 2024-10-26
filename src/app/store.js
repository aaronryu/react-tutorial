import themeReducer from '@/features/theme/slice'
import { configureStore } from '@reduxjs/toolkit' // * RTK 에서 제공하는 간편 코드

// 2. 전역 Store 설정 (configureStore) <- Reducer(Reducer + InitialState) 넣으면 끝
export const store = configureStore({
  reducer: {
    // Store 내 (초기) State 뿐만 아니라 상태전이를 위한 Reducer 대입
    theme: themeReducer,
    // cart: cartSlice.reducer,
    // payment: paymentSlice.reducer,
    // account: accountSlice.reducer,
  },
})
