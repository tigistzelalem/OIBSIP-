import { useForgetPasswordMutation } from '@/store/service/forget-password-api';
import React, { useState } from 'react'

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword, {isLoading, isError, error}] = useForgetPasswordMutation();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forgotPassword({ email });
            

        } catch (error) {
            console.log('An error occured');
        }

    }
  return (
      <form onSubmit={handleForgotPassword}>
          <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
          {isError && <div>Error</div>}
      </form>
  )
}

export default ForgetPassword