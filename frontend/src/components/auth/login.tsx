import { useLoginMutation } from '@/store/auth/auth-api';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import authResponse from '@/types/login-response';
import { setToken } from '@/store/auth/auth-slice';
import router, { useRouter } from 'next/router';
import { getCookie } from '@/utlis/cookie';
import { isConstructorDeclaration } from 'typescript';
import Link from 'next/link';


const initialState = {
    email: '',
    password: '',

}
const Login: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [login, { isLoading }] = useLoginMutation();

    let [
        loginUser,
        {
            data: signinData,
            isError: isSigninError,
            isSuccess: isSigninSucces,
            error: signInError,
            isLoading: isSigninLoading,
        },
    ] = useLoginMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset the error message when the user starts typing
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation rules
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { email, password } = formData
        // Validate email
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }

        // Validate password (add more checks as needed)
        if (password.length === 0) {
            setErrors({ ...errors, password: 'Password is required' });
            return;
        }

        try {
            console.log("before")
            const response = await login({
                email,
                password,
            }).unwrap();

            // Assuming your response contains user data
            // isConstructorDeclaration

            // Store token in a cookie
            const realData = {
                token: response.token,
                firstname: response.user.firstname,
                lastname: response.user.lastname,
                email: response.user.email,
                _id: response.user._id,
                role: response.user.role
            }
            const authData = realData as authResponse
            Cookies.set('token', authData.token);


            // Dispatch action to update Redux state
            dispatch(setToken(authData));
            console.log("Here%%%%%%%%", authData)
            console.log("the role", getCookie("role"))
            router.push('/pizza/pizzas');



        } catch (error) {
            console.log('error occured', error);


        }


    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 dark:bg-gray-900">
            <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-gray-800 rounded shadow-2xl p-4 m-1 py-8">
                <h1 className="block w-full text-center text-white text-2xl font-bold mb-6">
                    Login
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="flex flex-col mb-4">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col mb-4">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password}</span>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600"
                        type="submit"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="flex items-center justify-between text-sm font-light text-gray-500 dark:text-gray-400">
                        <Link href="/services/forget-password">Forget Password</Link>
                        <span className="">|</span>
                        <a href="/auth/register" className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500">Create Account</a>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default Login;
