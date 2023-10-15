import React, { useState } from 'react';
import { useCreatePizzaMutation } from '@/store/pizza/pizza-api';
// import { UploadButton } from '@uploadthing/react';
import { UploadButton } from '@/utlis/uploadthing';
import ImageUploader from '@/common/uploader';


const initialPizzaState = {
    name: '',
    price: 0,
    image: null as string | null,
    // Add other pizza properties here
};

const CreatePizza: React.FC = () => {
    const [pizzaData, setPizzaData] = useState(initialPizzaState);
    const [createPizza, { isLoading, isError, error }] = useCreatePizzaMutation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPizzaData({ ...pizzaData, [name]: value });
    };

    // const reader = new FileReader();


    const handleImageChange = (e: any) => {
        // const file = e.target.files?.[0] || null;
        // console.log('file', file)

        // if (file) {
        //     const formData = new FormData();
        //     formData.append("image", file);
        //     console.log('formData', formData);

        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         const image = reader.result as string;
        //         setSelectedImage(image);
        //         console.log('before pizzaData', pizzaData)

        //         setPizzaData({ ...pizzaData, image });
        //         console.log('after pizzaData', pizzaData)
        //     };
        //     reader.readAsDataURL(file);
        // } else {
        //     // Handle the case where no file is selected, e.g., you may keep the previous image.
        // }

        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        console.log("********", e.target.files)
        setPizzaData({ ...pizzaData, [e.target.name]: e.target.files[0] });

        console.log(e.target.files[0]);
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setSelectedImage("");
        }

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // await reader.onloadend;
        // Check if a new image was selected before creating the pizza
        console.log(pizzaData);

        await createPizza({ ...pizzaData })

        // const result = await createPizza(pizzaData).unwrap();
        console.log('Pizza created:');


        // Clear the form or perform other actions as needed
        setPizzaData(initialPizzaState);
    };


    return (
        <div className="flex justify-center items-center h-screen w-full dark:bg-gray-900">
            <div className="w-3/4 md:w-1/2 lg:w-1/3  rounded shadow-2xl p-4 m-1 bg-gray-800">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
                    Create Pizza
                </h1>
                {isError && (
                    <p className="text-red-500 text-sm mb-4">
                        Error: 'An error occurred.'
                    </p>
                )}
                <form onSubmit={handleSubmit} >
                    <div className="flex flex-col mb-4 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">
                            Pizza Name
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="name"
                            id="name"
                            value={pizzaData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="price">
                            Pizza Price
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="price"
                            id="price"
                            value={pizzaData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
                            Pizza Image
                        </label>
                        {/* {selectedImage && (
                            <img className="width:200 height:200 my-4" src={selectedImage} alt="Selected Pizza" />
                        )} */}

                        <input
                            className="border py-2 px-3 text-black"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {/* <ImageUploader
                            onImageUploadComplete={handleImageUploadComplete}
                            onImageUploadError={handleImageUploadError}
                        /> */}

                    </div>
                    {/* Add more input fields for other pizza properties */}
                    <button className="block bg-yellow-500  text-white uppercase text-lg mx-auto p-2 rounded" type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Pizza'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePizza;
