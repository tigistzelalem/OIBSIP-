import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetResetPasswordQuery, useResetPasswordMutation } from '@/store/service/forget-password-api';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState(''); // Add an email state
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const { data, error } = useGetResetPasswordQuery({ token })
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  console.log("token: ", token)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ token, email, password }); // Include email in the request
      console.log('##########password reseted')
      // Assuming a successful reset, you can navigate to a login page or any other desired route
      router.push('/login');
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div>
      {data ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email" // Add an email input field
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="text-black"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
          {isError && <div>Error</div>}
        </form>
      ) : (
        <div>Loading...</div>
      )}
      {error && <div>Error loading token data</div>}
    </div>
  );
};

export default ResetPasswordForm;
