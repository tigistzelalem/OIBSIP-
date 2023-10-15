import React, { useState } from 'react';
import { useGetPizzasQuery } from '@/store/pizza/pizza-api';
import Link from 'next/link';
import Navbar from '../navbar/navbar';
import MostOrder from '../mostOrder/mostRoder';
import { getCookie } from '@/utlis/cookie';
import OrdersList from '../mostOrder/getOrders';

const GetPizzas: React.FC = () => {
  const { data: pizzas, isLoading, isError, error } = useGetPizzasQuery();
  console.log('the list....', pizzas)
  if (isLoading) {
    return <div>Loading...</div>;
  }


  const pizza = pizzas.pizza;
  console.log('the pizza....', pizza)
  const isAdmin = getCookie("role") 
  let greetingText;
  if (isAdmin === "admin") {
    greetingText = "Welcome To Admin Dashboard";
  } else {
    greetingText = "Order Your Favorite Pizza";
  }


  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar hideElements={false} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-8">{greetingText}</h1>

        {/* Horizontal Scrollable List of Pizzas */}
        <div className="block items-center overflow-x-auto whitespace-nowrap border-bottom-none "  >
          <div className="flex  ">
            {pizza.map((pizza: any) => (
              <Link
                key={pizza._id}
                href={`/pizza/pizzaDetail/${pizza._id}`}
              >
                <div key={pizza._id} className=" border rounded-lg pb-2 flex flex-col items-center mx-2">

                  <div className="h-32  object-cover w-56  rounded-lg">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover "
                    />
                  </div>

                  <h2 className="text-gray font-semibold mt-2">{pizza.name}</h2>
                  <p className="text-gray">${pizza.price}</p>

                  {/* Conditionally render Delete and Edit buttons for admin */}

                </div>
              </Link>

            ))}

          </div>

        </div>



        {/* Conditionally render Mostly Ordered Products section for non-admin */}
        {getCookie("role") !== "admin" && <MostOrder />}

        <p className="text-2xl font-semibold mx- text-bold text-white my-14  ">
          Recently ordered pizza list
        </p>

        {getCookie("role") === "admin" && (
          <OrdersList />
        )}
      </div>
    </div>
  );
};

export default GetPizzas;
