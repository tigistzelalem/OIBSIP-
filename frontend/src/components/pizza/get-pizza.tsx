import { useDeletePizzaMutation, useGetPizzaQuery } from '@/store/pizza/pizza-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import IngredientDetail from '../ingredients/IngredientDetail';
import { useCreateOrderMutation, useGetOrderQuery, useGetOrdersQuery } from '@/store/order/order-api';
import { useCreatePaymentMutation } from '@/store/payment/payment-api';
import Navbar from '../navbar/navbar';
import { getCookie } from '@/utlis/cookie';
import { useSelector } from 'react-redux';
import Link from 'next/link';


const PizzaDetail = () => {

    const [deletePizza, setDeletePizza] = useDeletePizzaMutation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedPizzaId, setSelectedPizzaId] = useState(null);

    const handleDelete = async (id: any) => {
        setConfirmDelete(true);
        setSelectedPizzaId(id);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePizza(selectedPizzaId);
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


    const router = useRouter();
    const { id, orderId } = router.query;
    const userId = router.query.id && router.query.id.toString();

    const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1);
    const { data: pizza, isLoading: pizzaLoading, isError, error } = useGetPizzaQuery(id as string);
    const [createOrder, isLoading] = useCreateOrderMutation();

    const { data: order, isLoading: orderLoading, isError: orderError } = useGetOrderQuery(orderId as string)
    const { data: orders, isLoading: ordersLoading, isError: ordersError } = useGetOrdersQuery();

    if (pizzaLoading || !pizza) {
        return <div>Loading...</div>
    }

    if (isError || error) {
        return <div>Error</div>
    }

    const pizzaDetail = pizza.pizza

    console.log('########', pizzaDetail._id)

    const handleSelection = (ingredientId: string) => {
        if (selectedIngredient.includes(ingredientId)) {
            setSelectedIngredient(selectedIngredient.filter((id) => id !== ingredientId))
        } else {
            setSelectedIngredient([...selectedIngredient, ingredientId]);
        }

    }
    console.log('selected: ', selectedIngredient)

    const handleSubmit = async () => {

        try {
            const order = {
                userId: userId as string,
                pizzaId: pizzaDetail._id,
                ingredient: selectedIngredient,
                quantity: 1
            };

            console.log(order, "this is the order")
            const response = await createOrder({ id: userId as string, order: order }).unwrap()
            const orderId = response.orderId;

        } catch (error) {
            console.log(error);

        }
    }

    // In your PizzaDetail component where you navigate to CreateIngredients:
    const redirectToIngredientCreation = () => {
        router.push(`/ingredients/createIngredient?pizzaId=${pizzaDetail._id}`);
    };
    // const userToken = getCookie("token");
    // console.log("User Token:", userToken);

    return (
        <div className='bg-gray-900 min-h-screen'>
            <Navbar />
            {/* {getCookie("role") === 'admin' && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 absolute bottom-4 right-4" // Adjust position as needed
                    onClick={redirectToIngredientCreation}
                >
                    Create Ingredient
                </button>
            )} */}
            <div
                className="flex flex-col items-center mx-20 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="w-full md:w-48">
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src={pizzaDetail.imageUrl}
                        alt={pizzaDetail.name}
                    />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:
                        {pizzaDetail.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Price: {pizzaDetail.price}
                    </p>
                    <div className="rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-center">Ingredients</h2>
                        <div className="flex flex-row space-x-4 my-4 ">
                            {pizzaDetail.ingredient.cheese.map((cheeseId: any) => (
                                <div key={cheeseId}>
                                    <div className="w-1/2 md:w-1/4 underline-text">
                                        {/* Ingredient Title */}
                                        <h3 className="mb-2 text-lg font-semibold text-center">Cheese</h3>
                                        {/* <hr className="my-2 border-t border-gray-400" /> */}

                                        {/* Ingredient Name and Price */}
                                        <div className="flex items-center space-x-2">

                                            {getCookie("role") === "user" && (
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIngredient.includes(cheeseId)}
                                                        onChange={() => handleSelection(cheeseId as string)}
                                                        className="h-6 w-6 rounded-full border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 appearance-none"
                                                    />
                                                    {/* <span>Select</span> */}
                                                </label>
                                            )}
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
                                                <IngredientDetail id={cheeseId} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Separator */}
                                </div>
                            ))}

                            {pizzaDetail.ingredient.sauces.map((sauceId: any) => (
                                <div key={sauceId}>
                                    <div className="w-1/2 md:w-1/4 underline-text">
                                        {/* Ingredient Title */}
                                        <h3 className="mb-2 text-lg font-semibold text-center">Sauce</h3>

                                        {/* Ingredient Name and Price */}
                                        <div className="flex items-center space-x-2">
                                            <hr className="my-2 border-t border-gray-400" />

                                            {getCookie("role") === "user" && (
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIngredient.includes(sauceId)}
                                                        onChange={() => handleSelection(sauceId as string)}
                                                        className="h-6 w-6 rounded-full border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 appearance-none"
                                                    />
                                                    {/* <span>Select</span> */}
                                                </label>
                                            )}
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
                                                <IngredientDetail id={sauceId} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Separator */}
                                </div>
                            ))}

                            {pizzaDetail.ingredient.meat.map((meatId: any) => (
                                <div key={meatId}>
                                    <div className="w-1/2 md:w-1/4 underline-text">
                                        {/* Ingredient Title */}
                                        <h3 className="mb-2 text-lg font-semibold text-center">Meat</h3>

                                        {/* Ingredient Name and Price */}
                                        <div className="flex items-center space-x-2">
                                            <hr className="my-2 border-t border-gray-400" />

                                            {getCookie("role") === "user" && (
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIngredient.includes(meatId)}
                                                        onChange={() => handleSelection(meatId as string)}
                                                        className="h-6 w-6 rounded-full border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 appearance-none"
                                                    />
                                                    {/* <span>Select</span> */}
                                                </label>
                                            )}
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
                                                <IngredientDetail id={meatId} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Separator */}
                                </div>
                            ))}
                            {pizzaDetail.ingredient.veggies.map((veggiesId: any) => (
                                <div key={veggiesId}>
                                    <div className="w-1/2 md:w-1/4 underline-text">
                                        {/* Ingredient Title */}
                                        <h3 className="mb-2 text-lg font-semibold text-center">Veggies</h3>

                                        {/* Ingredient Name and Price */}
                                        <div className="flex items-center space-x-2">
                                            <hr className="my-2 border-t border-gray-400" />

                                            {getCookie("role") === "user" && (
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIngredient.includes(veggiesId)}
                                                        onChange={() => handleSelection(veggiesId as string)}
                                                        className="h-6 w-6 rounded-full border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 appearance-none"
                                                    />
                                                    {/* <span>Select</span> */}
                                                </label>
                                            )}
                                            <div className="flex items-center space-x-2"> {/* Flex container */}
                                                <IngredientDetail id={veggiesId} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Separator */}
                                </div>
                            ))}

                        </div>


                        {getCookie("role") === 'user' && (
                            <div className="my-4 flex justify-between items-center">
                                <div className="flex space-x-2 items-center">
                                    <label className="block">Quantity:</label>
                                    <input
                                        className="w-16 text-black border rounded-lg p-2"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                </div>

                            </div>
                        )}

                    </div>
                    {getCookie("role") !== "admin" && (
                        <button className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600" onClick={handleSubmit}>
                            Submit Order
                        </button>
                    )}

                </div>
                {getCookie("role") === "admin" && (
                    <div>
                        <button className="bg-yellow-600 rounded-lg p-1 mx-4" onClick={() => handleDelete(pizza._id)}>
                            Delete
                        </button>
                        <Link className="mx-2 mt-2" href={`/pizza/${id}`}>
                            Edit
                        </Link>
                    </div>

                )}
                {confirmDelete && getCookie("role") === "admin" && (
                    <div>
                        <p>Are you sure you want to delete this pizza?</p>
                        <button className="bg-yellow-600 rounded-full" onClick={handleConfirmDelete}>
                            Yes
                        </button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default PizzaDetail