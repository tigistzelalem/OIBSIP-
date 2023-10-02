import { useGetPizzaQuery, useUpdatePizzaMutation } from '@/store/pizza/pizza-api'
import Pizza from '@/types/pizza';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const initialState = {
    id: "",
    name: "",
    price: 0

}
const UpdatePizza: React.FC = () => {
    const [updatePizza, { isLoading: isUpdating }] = useUpdatePizzaMutation();
    const router = useRouter();
    const { id } = router.query;
    const {
        data: response = [],
        isError,
        isLoading
    } = useGetPizzaQuery(id as string);

    const [pizza, setPizza] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    useEffect(() => {
        if (response.pizza) {
            const curr = response.pizza;
            const currPizza = {
                id: id as string,
                name: curr.name,
                price: curr.price
            };
            setPizza(currPizza);
        }
    }, [response.pizza, id]);

    const handleCancle = () => {
        router.push('/pizza/}');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPizza((prevPizza) => (
            { ...prevPizza, [name]: value }
        ));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { id, name, price } = pizza;
        const updatedPizza: Partial<Pizza> = {
            _id: id,
            name,
            price
        }

        await updatePizza(updatedPizza).unwrap()
        console.log(updatedPizza);

    }
    

    return (
        <div className="flex justify-center items-center h-screen w-full bg-blue-100">
            <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded shadow-2xl p-4 m-1">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                    Update Pizza
                </h1>
                {isError && (
                    <p className="text-red-500 text-sm mb-4">
                        Error: An error occurred.
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="name">
                            Pizza Name
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="text"
                            name="name"
                            id="name"
                            value={pizza.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="price">
                            Pizza Price
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="number"
                            name="price"
                            id="price"
                            value={pizza.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Add more input fields for other pizza properties */}
                    <div className="flex justify-between">
                        <button className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg p-2 rounded" type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update Pizza'}
                        </button>
                        <button className="block bg-red-400 hover:bg-red-600 text-white uppercase text-lg p-2 rounded" type="button" onClick={handleCancle}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePizza