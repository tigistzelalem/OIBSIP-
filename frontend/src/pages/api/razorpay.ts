// pages/api/razorpay-initialize.js

import { getRazorpayApiKey } from '@/utlis/razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const key = getRazorpayApiKey(); // Retrieve the Razorpay API key
        res.status(200).json({ key });
    } catch (error) {
        console.error('Error initializing Razorpay:', error);
        res.status(500).json({ error: 'Failed to initialize Razorpay' });
    }
}
