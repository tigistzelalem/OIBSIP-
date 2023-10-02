import authResponse from "@/types/login-response";
import { getCookie, removeCookie, setCookie } from "@/utlis/cookie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: getCookie("token") || "",
    role: getCookie("role") || "",
    email: getCookie("email") || "",
    isAuthenticated: Boolean(getCookie("token")),
    firstname: getCookie("firstname") || "",
    lastname: getCookie("lastname") || "",
    _id: getCookie("_id") || "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<authResponse>) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state._id = action.payload._id;
            setCookie("token", action.payload.token);
            setCookie("role", action.payload.role);
            setCookie("email", action.payload.email);
            setCookie("firstname", action.payload.firstname);
            setCookie("lastname", action.payload.lastname);
            setCookie("_id", action.payload._id);
        },
        clearToken(state) {
            state.token = "";
            state.isAuthenticated = false;
            state.firstname = "";
            state.lastname = "";
            state.role = "";
            state.email = "";
            state._id = "";
            removeCookie("token");
            removeCookie("role");
            removeCookie("email");
            removeCookie("firstname");
            removeCookie("lastname");
            removeCookie("_id");
        }
    }

})

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;