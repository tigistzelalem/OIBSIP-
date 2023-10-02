interface RazorpayOptions {
    key: string;
    // Add other properties here as needed
}

// Define the type for the Razorpay payment object
interface RazorpayPaymentObject {
    open: () => void;
    // Add other methods and properties as needed
}

interface RazorpayStatic {
    new(options: RazorpayOptions): RazorpayPaymentObject;
    // Add other static methods and properties as needed
}

declare var Razorpay: RazorpayStatic;
