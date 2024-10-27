import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const catApiSlice = createApi({
  reducerPath: 'cat/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1',
    prepareHeaders: (headers) => {
      // @ts-ignore
      headers.set('x-api-key', import.meta.env.VITE_CATS_API_KEY)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCats: builder.query({
      query: (limit = 1) => `/images/search?limit=${limit}`,
    }),
  }),
})

export const { useGetCatsQuery, useLazyGetCatsQuery } = catApiSlice
