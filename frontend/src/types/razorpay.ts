interface Razorpay {
    key_id: string;
    open(options: {
        amount: number;
        currency: string;
        order_id: string;
        name: string;
        description: string;
        image: string;
        handler: (response: any) => void;
    }): void;
}

export default Razorpay