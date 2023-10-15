import Razorpay from 'razorpay';

export const getRazorpayApiKey = () => {
    const razorpayApiKey = 'rzp_test_puuKYzg6YxSPdv';
    if (!razorpayApiKey) {
        throw new Error('Razorpay API key not found.');
    }
    return razorpayApiKey;
};


const razorpay = new Razorpay({
    key_id: getRazorpayApiKey(),
    key_secret: '7JOvaQjaazG8IsopdBS1fGBb', 
});

// Function to process a payment using Razorpay
export const processRazorpayPayment = async (paymentId: any) => {
    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (payment.status === 'captured') {
            // Payment successful
            return true;
        } else {
            // Payment failed or pending
            return false;
        }
    } catch (error) {
        console.error('Error processing Razorpay payment:', error);
        return false;
    }
};
