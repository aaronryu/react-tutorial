import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApiSlice = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
})

export const { useGetUsersQuery, useLazyGetUsersQuery } = userApiSlice
