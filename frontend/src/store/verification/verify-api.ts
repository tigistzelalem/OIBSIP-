import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

export const verifyEmailApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        verifyEmail: builder.query({
            query: (token) => `verify?token=${token}`,
        }),
    }),
});

export const { useVerifyEmailQuery } = verifyEmailApi;
