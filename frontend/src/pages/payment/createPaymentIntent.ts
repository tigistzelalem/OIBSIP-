import razorpayConfig from "@/razor.config";
import Order from "@/types/order";

export default async function createPaymentIntent(order: Order): Promise<PaymentItem> {
    const razorpay = new Razorpay(razorpayConfig);

    const paymentIntent = await razorpay.payments.create({
        amount: order.amount,
        currency: order.currency,
    });

    return paymentIntent;
}
