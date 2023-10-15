import { useDeletePizzaMutation, useGetPizzaQuery } from '@/store/pizza/pizza-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import IngredientDetail from '../ingredients/IngredientDetail';
import { useCreateOrderMutation, useGetOrdersQuery } from '@/store/order/order-api';
import Navbar from '../navbar/navbar';
import { getCookie } from '@/utlis/cookie';
import Link from 'next/link';
import { useCreatePaymentMutation } from '@/store/payment/payment-api';
import Razorpay from 'razorpay';
import OrdersList from '../mostOrder/getOrders';
import Modal from '@/common/Modal';


const PizzaDetail = () => {

    const [deletePizza, setDeletePizza] = useDeletePizzaMutation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedPizzaId, setSelectedPizzaId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;
    console.log('id  of pizza', id)
    const userId = router.query.id && router.query.id.toString();

    const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1);
    const { data: pizza, isLoading: pizzaLoading, isError, error } = useGetPizzaQuery(id as string);
    const [createOrder, isLoading] = useCreateOrderMutation();
    const [createRazopayPayment] = useCreatePaymentMutation();
    const [orderId, setOrderId] = useState(null);


    const handleDelete = async (id: any) => {
        console.log('id to be deleted', id)
        setConfirmDelete(true);
        setSelectedPizzaId(id);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePizza(pizza.pizza._id);
            router.push('/pizza/pizzas')
        } catch (error) {
            alert(`An error occurred during delete: ${error}`);
        }

        setConfirmDelete(false);
        setSelectedPizzaId(null);
    };

    const handleCancelDelete = async () => {
        setConfirmDelete(false);
        setSelectedPizzaId(null);
    };



    if (pizzaLoading || !pizza) {
        return <div>Loading...</div>
    }

    if (isError || error) {
        return <div>Error</div>
    }

    const pizzaDetail = pizza.pizza
    console.log('the image', pizzaDetail.image);



    // console.log('########', pizzaDetail._id)

    const handleSelection = (ingredientId: string) => {
        if (selectedIngredient.includes(ingredientId)) {
            setSelectedIngredient(selectedIngredient.filter((id) => id !== ingredientId))
        } else {
            setSelectedIngredient([...selectedIngredient, ingredientId]);
        }

    }

    const handleSubmit = async () => {

        try {
            const order = {
                userId: userId as string,
                pizzaId: pizzaDetail._id,
                ingredient: selectedIngredient,
                quantity: 1
            };

            const response = await createOrder({ id: userId as string, order: order }).unwrap()
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 5000);

            const orderId = response.order._id;
            const totalPrice = response.order.totalPrice
            if (orderId) {
                setOrderId(orderId);
                const response = await createRazopayPayment(totalPrice);
                console.log('payment: ', response)

                const options = {
                    amount: totalPrice * 100,
                    key_id: 'rzp_test_puuKYzg6YxSPdv',
                    key_secret: '7JOvaQjaazG8IsopdBS1fGBb',
                    currency: 'INR',
                    order_id: orderId,
                    receipt: 'order_receipt_1',
                    handler: function (response: any) {
                        // Handle the response from Razorpay
                        console.log('response: ', response);
                        console.log('Payment successful:', response);
                    },
                    theme: {
                        color: '#3399CC',
                    },
                };
                if (Razorpay === undefined) {
                    console.log('undefind');
                }
                const rzp = new (Razorpay as any)(options);
                console.log(rzp)
                rzp.open({
                    handler: function (response: any) {
                        console.log('after open', rzp)
                        // Handle the result of the transaction
                    },
                    modal: true,
                });
            } else {
                console.error('Error response: ', response);
            }



        } catch (error) {
            console.log(error);

        }
    }

    // In your PizzaDetail component where you navigate to CreateIngredients:
    const redirectToIngredientCreation = () => {
        router.push(`/ingredients/createIngredient?pizzaId=${pizzaDetail._id}`);
    };


    return (
        <>

            <div className='bg-gray-900 min-h-screen'>
                <Navbar hideElements={false} />


                <div className="flex flex-col items-center mx-auto border border-gray-200 rounded-lg shadow md:flex-row md:max-w-lg dark:border-gray-700 dark:bg-gray-800" style={{ maxWidth: '68%' }}>

                    <div className="w-3/4 h-96">
                        <img
                            className="object-cover h-full w-full rounded-lg rounded-r-none"
                            src={pizzaDetail.image}
                            alt={pizzaDetail.name}
                        />
                    </div>
                    <div className="flex flex-col justify-between  leading-normal mx-10 ">
                        {confirmDelete && getCookie("role") === "admin" && (
                            <Modal onClose={() => setConfirmDelete(false)}>
                                <div className="flex flex-col items-center">
                                    <p className="mb-4">Are you sure you want to delete this pizza?</p>
                                    <div className="flex space-x-4">
                                        <button className="bg-yellow-600 rounded-lg p-2" onClick={handleConfirmDelete}>
                                            Yes
                                        </button>
                                        <button onClick={handleCancelDelete}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        )}

                        <h5 className="mb-2 text-2xl font-bold  text-gray-900 dark:text-white">Name: {pizzaDetail.name}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Price: {pizzaDetail.price}
                        </p>
                        <div className="rounded-lg p-2">
                            <h5 className="text-lg font-semibold ">Ingredients</h5>
                            <div className="flex flex-wrap md:grid-cols-2 lg:grid-cols-1">
                                <div key='cheeseId' className="w-4/12 mb-4 px-2">
                                    <div className="">
                                        <h3 className="mb-2 text-lg font-semibold text-center">Cheese</h3>
                                        <select
                                            className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={pizzaDetail.ingredient.cheese[0]} // Set the default cheese
                                        >
                                            <option value="">Select Cheese</option>
                                            {pizzaDetail.ingredient.cheese.map((cheeseId: any) => (
                                                <option key={cheeseId} value={cheeseId} onChange={(e) => handleSelection(cheeseId as string)}>
                                                    <IngredientDetail id={cheeseId} />
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div key='sauceId' className="w-4/12 mb-4 px-2">
                                    <div className="">
                                        <h3 className="mb-2 text-lg font-semibold text-center">Sauce</h3>
                                        <select
                                            className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={pizzaDetail.ingredient.sauces[0]}
                                        >
                                            <option value="">Select Sauce</option>
                                            {pizzaDetail.ingredient.sauces.map((sauceId: any) => (
                                                <option key={sauceId} value={sauceId} onChange={() => handleSelection(sauceId)}>
                                                    <IngredientDetail id={sauceId} />
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div key='meatId' className="w-4/12 mb-4 px-2">
                                    <div className="">
                                        <h3 className="mb-2 text-lg font-semibold text-center">Meat</h3>
                                        <select
                                            className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={pizzaDetail.ingredient.meat[0]} // Set the default meat
                                        >
                                            <option value="">Select Meat</option>

                                            {pizzaDetail.ingredient.meat.map((meatId: any) => (
                                                <option key={meatId} value={meatId} onChange={(e) => handleSelection(meatId as string)}>
                                                    <IngredientDetail id={meatId} />
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div key='veggiesId' className="w-4/12 mb-4 px-2">
                                    <div className="">
                                        <h3 className="mb-2 text-lg font-semibold text-center">Veggies</h3>
                                        <select
                                            className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                            defaultValue={pizzaDetail.ingredient.veggies[0]} // Set the default veggies
                                        >
                                            <option value="">Select Veggies</option>

                                            {pizzaDetail.ingredient.veggies.map((veggiesId: any) => (
                                                <option key={veggiesId} value={veggiesId} onChange={(e) => handleSelection(veggiesId as string)}>
                                                    <IngredientDetail id={veggiesId} />
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>


                            {getCookie("role") === 'user' && (
                                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2">
                                    <div className="flex space-x-2 items-center">
                                        <label className="block">Quantity:</label>
                                        <input
                                            className="w-14 text-black border rounded-lg p-1 mt-2"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                        />



                                    </div>

                                    {getCookie("role") !== "admin" && (
                                        <button className="bg-yellow-500 text-white px-2 py-2 mx-4 rounded-lg hover:bg-yellow-600" onClick={handleSubmit}>
                                            Submit Order
                                        </button>
                                    )}
                                    <div className="relative">
                                        {isOpen && (
                                            <Modal onClose={() => setIsOpen(false)}>
                                                <div>
                                                    <h2 className="text ">Ordered Successfully!</h2>
                                                    {/* Additional content for the success modal */}
                                                </div>
                                            </Modal>
                                        )}
                                    </div>



                                </div>
                            )}

                            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 justify-space-between">
                                {getCookie("role") === 'admin' && (
                                    <button
                                        className="bg-yellow-600 rounded-lg p-1 mx-4 mt-4"
                                        onClick={redirectToIngredientCreation}
                                    >
                                        Create Ingredient
                                    </button>
                                )}

                                {getCookie("role") === "admin" && (
                                    <div className="flex items-center "> {/* Updated */}
                                        <button className="bg-blue-600 rounded-lg p-1 mx-4">
                                            <Link className="mx-2 mt-2" href={`/pizza/${id}`}>
                                                Update Pizza
                                            </Link>
                                        </button>
                                        <button className="bg-red-600 rounded-lg p-1 " onClick={() => handleDelete(pizza._id)}>
                                            Delete Pizza
                                        </button>

                                    </div>
                                )}



                            </div>



                        </div>


                    </div>

                </div>
            </div>
        </>

    )
}

export default PizzaDetail