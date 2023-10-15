import { RazorpayConfig } from "./types/razorpay";

const razorpayConfig: RazorpayConfig = {
    secret: process.env.RAZORPAY_SECRET,
    key: process.env.RAZORPAY_KEY,
};

// This code will not compile, because the `amount` property is not defined in the `RazorpayConfig` type.



export default razorpayConfig as RazorpayConfig;

