import { getCookie } from "@/utlis/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const userApi = createApi({
    reducerPath: "user",
    tagTypes: ["User"],
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
        login: builder.mutation<any, any>({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
    
        register: builder.mutation<any, any>({
            query: (user) => ({
                url: "/users/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useRegisterMutation, useLoginMutation
} = userApi;