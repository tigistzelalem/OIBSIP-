type Order = {
  amount: any;
  currency: any;
  userId: string;
  pizzaId: string;
  ingredient: string[];
  quantity: number;
  // You can add more fields as needed
};

export default Order;