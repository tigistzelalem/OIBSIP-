import { getCookie } from '@/utlis/cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000'; // Replace with your API base URL
export const verifyEmailApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // prepareHeaders: (headers) => {
        //     const token = getCookie("token");
        //     if (token) {
        //         headers.set("authorization", `bearer ${token}`);
        //     }

        //     return headers;

        // }
    }),
    endpoints: (builder) => ({
        verifyEmail: builder.query({
            query: (token) => `verify?token=${token}`,
        }),
    }),
});

export const { useVerifyEmailQuery } = verifyEmailApi;
