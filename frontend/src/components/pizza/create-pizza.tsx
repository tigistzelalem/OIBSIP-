import React, { useState } from 'react';
import { useCreatePizzaMutation } from '@/store/pizza/pizza-api';

const initialPizzaState = {
    name: '',
    price: 0,
    image: null as File | null
    // Add other pizza properties here
};

const CreatePizza: React.FC = () => {
    const [pizzaData, setPizzaData] = useState(initialPizzaState);
    const [createPizza, { isLoading, isError, error }] = useCreatePizzaMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPizzaData({ ...pizzaData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; 
        setPizzaData({ ...pizzaData, image: file});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createPizza(pizzaData).unwrap();
            console.log('Pizza created:', result);
            // Clear form or navigate to a different page
            setPizzaData(initialPizzaState);
        } catch (err) {
            console.error('Error creating pizza:', err);
           
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full bg-blue-100">
            <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded shadow-2xl p-4 m-1">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                    Create Pizza
                </h1>
                {isError && (
                    <p className="text-red-500 text-sm mb-4">
                        Error: 'An error occurred.'
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
                            value={pizzaData.name}
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
                            value={pizzaData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="image">
                            Pizza Image
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {/* Add more input fields for other pizza properties */}
                    <button className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded" type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Pizza'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePizza;
