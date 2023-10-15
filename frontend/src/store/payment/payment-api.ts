import { getCookie } from "@/utlis/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const paymentApi: any = createApi({
    reducerPath: "payment",
    tagTypes: ["Payment"],
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
        createPayment: builder.mutation<any, { totalPrice: number }>({
            query: (totalPrice) => ({
                url: "/users/razorPay",
                method: "POST",
                body: { totalPrice },
            }),

            invalidatesTags: ["Payment"],
        }),
    })
});

export const { useCreatePaymentMutation } = paymentApi;
