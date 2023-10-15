import { useDeleteOrderMutation, useGetOrdersQuery } from '@/store/order/order-api'
import React from 'react'

const OrdersList: React.FC = () => {
    const { data: ordersData, isLoading, isError, error } = useGetOrdersQuery();
    const [deleteOrder] = useDeleteOrderMutation()
    console.log('order list', ordersData);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }
    const orders = ordersData.orders;
    console.log('getting orders......',orders)

    const handleDeleteOrder = async (orderId: string) => {
        try {
            await deleteOrder( orderId).unwrap();
        } catch (error) {
            console.log('error deleting order', error);
        }
    }

    return (
        <div className="bg-gray-800 max-w-screen-md  border border-gray-700 rounded-lg shadow mt-12 mx-auto">
            <h2 className="text-xl font-bold mb-2 text-center">Orders</h2>
            <div className="overflow-x-auto">
            {orders.length === 0 ? (
                <p>No orders available for this pizza.</p>
                ) : (
                        <div className='table-container w-full '>
                            <table className="table  w-68">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-4 border-none">Order ID</th>
                                        <th scope="col" className="px-6 py-4 border-none">Order Date</th>
                                        <th scope="col" className="px-6 py-4 border-none">Total Price</th>
                                        {/* <th scope="col" className="px-6 py-4 border-none">Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order._id}>
                                            <td className="whitespace-nowrap px-6 py-4 border-none">{order._id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 border-none">{order.createdAt}</td>
                                            <td className="whitespace-nowrap px-6 py-4 border-none">{order.totalPrice}</td>
                                            <td>
                                                <button className='rounded-lg bg-red-500 p-1' onClick={() => handleDeleteOrder(order._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
            )}
            </div>
            </div>
    );
};

export default OrdersList