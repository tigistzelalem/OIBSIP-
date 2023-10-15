import { getCookie } from '@/utlis/cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

export const forgetPasswordApi = createApi({
    reducerPath: "email",
    tagTypes: ["Email"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("token");
            if (token) {
                headers.set("authorization", `bearer ${token}`);
            }

            return headers;

        }
    }),
    
    endpoints: (builder) => ({
        forgetPassword: builder.mutation<any, any>({
            query: (email) => ({
                url: "/users/forgetPassword",
                method: "POST",
                body: email,
            }),
            invalidatesTags: ["Email"],
        }),

        getResetPassword: builder.query({
            query: (token) => `users/resetPassword/${token}`

        }),
        resetPassword: builder.mutation<any, any>({
            query: ({ otpCode, email, password }) => ({
                url: `/users/resetPassword`,
                method: "POST",
                body: { otpCode, email, password}


            })
        })
    }),
});

export const {
    useResetPasswordMutation,
    useForgetPasswordMutation,
    useGetResetPasswordQuery
} = forgetPasswordApi;
