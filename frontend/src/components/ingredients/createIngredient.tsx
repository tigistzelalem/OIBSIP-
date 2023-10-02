import { useCreateIngredientMutation } from '@/store/ingredient/ingredients-api';
import React, { useState } from 'react';


const CreateIngredient: React.FC<{ pizzaId: string }> = ({ pizzaId }) => {
   
    const initialState = {
        name: '',
        price: 0,
        base: pizzaId,
        ingredientType: ''
    };
    

    const [ingredientData, setIngredientData] = useState(initialState);
    const [CreateIngredient, { isLoading, isError, error }] = useCreateIngredientMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIngredientData({ ...ingredientData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, price, ingredientType } = ingredientData;

        // Check that pizzaId is defined and contains a valid value.
        console.log(pizzaId);

        // Ensure that pizzaId is not undefined when making the API call.
        if (pizzaId) {
            await CreateIngredient({
                _id: pizzaId, // Use pizzaId as the _id value
                ingredient: { name, price, base: pizzaId, ingredientType },
            }).unwrap();
            console.log('success')
            setIngredientData(initialState);
        } else {
            console.error("pizzaId is undefined or invalid.");
        }
    };




    return (
        <div className="flex justify-center items-center h-screen w-full bg-blue-100">
            <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded shadow-2xl p-4 m-1">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                    Create Ingredient
                </h1>
                {isError && (
                    <p className="text-red-500 text-sm mb-4">Error: An error occurred.</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label
                            className="mb-2 font-bold text-lg text-gray-900"
                            htmlFor="name"
                        >
                            Ingredient Name
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="text"
                            name="name"
                            id="name"
                            value={ingredientData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            className="mb-2 font-bold text-lg text-gray-900"
                            htmlFor="price"
                        >
                            Ingredient Price
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="number"
                            name="price"
                            id="price"
                            value={ingredientData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            className="mb-2 font-bold text-lg text-gray-900"
                            htmlFor="ingredientType"
                        >
                            Ingredient Type
                        </label>
                        <input
                            className="border py-2 px-3 text-black"
                            type="text"
                            name="ingredientType"
                            id="ingredientType"
                            value={ingredientData.ingredientType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Add more input fields for other ingredient properties */}
                    <button
                        className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Ingredient'}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default CreateIngredient