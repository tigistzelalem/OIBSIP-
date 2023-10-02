import { useResetPasswordMutation } from '@/store/service/forget-password-api';
import React, { useState } from 'react';

interface ResetPasswordFormProps {
  token: string; // Explicitly specify the type of the 'token' prop
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ token, password }); 
    } catch (err) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
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
  );
};

export default ResetPasswordForm;
