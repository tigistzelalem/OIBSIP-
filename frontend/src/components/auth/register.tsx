import Modal from '@/common/Modal';
import { useRegisterMutation } from '@/store/auth/auth-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
}
const Register: React.FC = () => {

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [createUser, { isLoading }] = useRegisterMutation()
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();


    const [alreadyHasAccount, setAlreadyHasAccount] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset the error message when the user starts typing
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation rules
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { firstname, lastname, email, password } = formData
        // Validate firstname
        if (firstname.trim() === '') {
            setErrors({ ...errors, firstname: 'First name is required' });
            return;
        }

        // Validate lastname
        if (lastname.trim() === '') {
            setErrors({ ...errors, lastname: 'Last name is required' });
            return;
        }

        // Validate email
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }

        // Validate password
        if (password.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
            return;
        }
        await createUser({
            firstname,
            lastname,
            email,
            password
        }).unwrap();
        setFormData(initialState);
        setErrors(initialState);
        setIsOpen(true);

        setTimeout(() => {
            setIsOpen(false); // Close the popup
            router.push('/auth/login'); // Redirect to the login page
        }, 5000);

    };

    return (
        <div className="flex justify-center items-center h-screen w-full dark:bg-gray-900">
            <div className="w-3/4 md:w-1/2 lg:w-1/3  rounded shadow-2xl p-4 m-1  bg-gray-800">
                <h1 className="block w-full text-center text-white text-2xl font-bold mb-6">
                    Register
                </h1>
                {alreadyHasAccount ? (
                    <p className="text-gray-500 text-sm mb-4">
                        You already have an account. Please <a href="/login">login</a>.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4 ">
                                {isOpen && (
                                    <Modal onClose={() => setIsOpen(false)}>
                                        <div className='text-center my-auto'>
                                            <h2>Registration Successful</h2>
                                            <p>Pleas check your email for account verification mail.</p>
                                        </div>

                                    </Modal>
                                )}
                                
                            <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="firstname"
                            >
                                First Name
                            </label>
                            <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstname && (
                                <span className="text-red-500 text-sm">{errors.firstname}</span>
                            )}
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="lastname"
                            >
                                Last Name
                            </label>
                            <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastname && (
                                <span className="text-red-500 text-sm">{errors.lastname}</span>
                            )}
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email}</span>
                            )}
                        </div>
                        <div className="flex flex-col mb-4">
                            <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password}</span>
                            )}
                        </div>
                        <button
                            className="block bg-yellow-500 hover:bg-gray-600 text-white uppercase text-lg mx-auto p-2 rounded-lg"
                            type="submit"
                        >
                            {isLoading ? ("Creating") : ("CREATE ACCOUNT")}
                    
                        </button>
                    </form>
                )}
                <a
                    className="block w-full text-center no-underline mt-4 text-sm text-gray-500"
                    href="/auth/login"
                >
                    Already have an account?Login here
                </a>
              

            </div>
           
        </div>
    );
};

export default Register;
