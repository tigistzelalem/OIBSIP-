import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const paymentApi = createApi({
    reducerPath: "payment",
    tagTypes: ["Payment"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        createPayment: builder.mutation<any, any>({
            query: () => ({
                url: "/users/razorPay",
                method: "POST",
            }),
            invalidatesTags: ["Payment"],
        }),
    })
});

export const { useCreatePaymentMutation } = paymentApi;
