import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

export const forgetPasswordApi = createApi({
    reducerPath: "email",
    tagTypes: ["Email"],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        forgetPassword: builder.mutation<any, any>({
            query: (email) => ({
                url: "/users/forgetPassword",
                method: "POST",
                body: email,
            }),
            invalidatesTags: ["Email"],
        }),

        resetPassword: builder.mutation<any, any>({
            query: ({ token, password }) => ({
                url: `/users/reset-password/${token}`,
                method: "POST",
                body: {password}


            })
        })
    }),
});

export const {
    useResetPasswordMutation,
    useForgetPasswordMutation
} = forgetPasswordApi;
