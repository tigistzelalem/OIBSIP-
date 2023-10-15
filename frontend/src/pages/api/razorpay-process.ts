// pages/api/process-payment.js

import { processRazorpayPayment } from '@/utlis/razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { paymentId } = req.body;

        // Process the payment using the Razorpay utility function
        const success = await processRazorpayPayment(paymentId);

        if (success) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
}
