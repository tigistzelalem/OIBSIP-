// components/Payment.js

import React, { useState } from 'react';
import { useCreatePaymentMutation } from '@/store/payment/payment-api';
import { useRouter } from 'next/router';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  const [createPayment] = useCreatePaymentMutation();
  const router = useRouter();
  const orderId = router.query;

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const paymentPayload = {
        orderId: orderId, 
      };

      const response = await createPayment(paymentPayload).unwrap();

      window.location.href = response.paymentUrl;

    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      pay
    </div>
  );
};

export default Payment;
