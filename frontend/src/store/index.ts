import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./auth/auth-api";
import authSlice from "./auth/auth-slice";
import { pizzaApi } from "./pizza/pizza-api";
import { ingredientApi } from "./ingredient/ingredients-api";
import { orderApi } from "./order/order-api";
import { verifyEmailApi } from "./verification/verify-api";
import { forgetPasswordApi } from "./service/forget-password-api";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [userApi.reducerPath]: userApi.reducer,
        [pizzaApi.reducerPath]: pizzaApi.reducer,
        [ingredientApi.reducerPath]: ingredientApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [verifyEmailApi.reducerPath]: verifyEmailApi.reducer,
        [forgetPasswordApi.reducerPath]: forgetPasswordApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            userApi.middleware,
            pizzaApi.middleware,
            ingredientApi.middleware,
            orderApi.middleware,
            verifyEmailApi.middleware,
            forgetPasswordApi.middleware

        )
    }
})