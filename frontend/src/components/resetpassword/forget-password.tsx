import { useForgetPasswordMutation, useResetPasswordMutation } from '@/store/service/forget-password-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ForgetPassword: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [forgotPassword, { isLoading: isForgotLoading, isError: isForgotError, error: forgotError }] = useForgetPasswordMutation();
    const [resetPassword, { isLoading: isResetLoading, isError: isResetError, error: resetError }] = useResetPasswordMutation();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forgotPassword({ email });
            setStep(2);
        } catch (error) {
            console.log('An error occurred during forgotPassword:', error);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword({ email, otpCode, password });
            console.log('Password reset successfully');
            // Redirect to the login page or display a success message
            router.push('/auth/login');
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className=' flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0  bg-gray-900'>
            <div className='w-3/4 md:w-1/2 lg:w-1/3 bg-gray-800 rounded shadow-2xl p-4 m-1 py-8 mt-10 bg-gray-800'>

            {step === 1 && (
                    <form className="space-y-4 md:space-y-6 mx-2 " onSubmit={handleForgotPassword}>
                        <div className="flex flex-col mx-1 item-center">
                            <label>Email:</label>
                            <input 
                                className="text-gray-50 bg-gray-500"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center ">
                            <button type="submit" disabled={isForgotLoading} className=" bg-yellow-500 rounded-lg p-2">
                                {isForgotLoading ? 'Sending Email...' : 'Send Email'}
                            </button>
                        </div>
                       
                        {isForgotError && <div>Error</div>}
                    </form>

            )}

            {step === 2 && (
                    <form className="space-y-4 md:space-y-6  " onSubmit={handleResetPassword}>
                        <div className="flex flex-col">
                            <label>OTP Code:</label>
                            <input className='bg-gray-500 text-gray-50'
                                type="text"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>New Password:</label>
                            <input className='bg-gray-500'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col text-gray-50">
                            <input type="hidden" name="email" value={email} />
                            <button type="submit" disabled={isResetLoading} className='inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg'>
                                {isResetLoading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </div>
                        {isResetError && <div>Error</div>}
                    </form>

            )}
            </div>
        </div>

    );
};

export default ForgetPassword;
