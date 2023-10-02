import { getCookie } from '@/utlis/cookie';
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div>
            {/* Navigation Bar */}
            <nav className=" p-10  flex justify-between items-center">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <Link href="/" className="text-yellow-700 text-lg font-semibold ">
                            Delicious Pizza
                        </Link>
                    </div>

                    {/* Hamburger Menu Button (for mobile) */}
                    <div className="md:hidden">
                        <button className="text-white p-2 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${menuOpen ? 'hidden' : 'text-white'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links (for larger screens) */}
                    <div className={`hidden md:flex space-x-5`}>
                        <Link href="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        {/* {getCookie("role") === "admin" && (
                            <Link href="/pizza/createPizza" className="text-white hover:text-gray-300">
                                AddPizza
                            </Link>
                        )} */}

                        {/* {getCookie("role") === "admin" && (
                      <Link href={`/admin/createIngredient/${id}` className="text-white  hover:text-gray-300">
                          AddIngredient
                      </Link>
                      )} */}

                        <Link href="/pizza/pizzas" className="text-white hover:text-gray-300">
                            Dashboard
                        </Link>
                        <Link href="/auth/login" className="text-white hover:text-gray-300">
                            SignIn
                        </Link>
                        <Link href="/auth/register">
                            <button className="text-white hover:text-gray-300 bg-yellow-600 py-1 px-4 rounded-full">
                                SignUp
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {menuOpen && (
                        <div className="md:hidden bg-gray-900 text-white absolute top-16 right-0 w-48 z-10">
                            <Link href="/" className="text-white p-4 hover:text-gray-300">
                                Home
                            </Link>
                            {getCookie("role") === "admin" && (
                                <Link href="/pizza/createPizza" className="text-white p-4 hover:text-gray-300">
                                    AddPizza
                                </Link>
                            )}
                            <Link href="/pizza/pizzas" className="text-white p-4 hover:text-gray-300">
                                Dashboard
                            </Link>
                            <Link href="/auth/login" className="text-white p-4 hover:text-gray-300">
                                SignIn
                            </Link>
                            <Link href="/auth/register" className="text-white p-4 hover:text-gray-300">
                                SignUp
                            </Link>
                        </div>
                    )}
                </div>

            </nav>
        </div >
    )
}

export default Navbar