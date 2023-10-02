import React, { useState } from 'react';
import { useGetPizzasQuery } from '@/store/pizza/pizza-api';
import Link from 'next/link';
import Navbar from '../navbar/navbar';
import MostOrder from '../mostOrder/mostRoder';
import { getCookie } from '@/utlis/cookie';

const GetPizzas: React.FC = () => {
  const { data: pizzas, isLoading, isError, error } = useGetPizzasQuery();
  console.log(pizzas)
  if (isLoading) {
    return <div>Loading...</div>;
  }


  const pizza = pizzas.pizza;
  console.log(pizza)

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        
        <h1 className="text-2xl font-semibold mb-8">Order Your Delicious Pizza</h1>

        {/* Horizontal Scrollable List of Pizzas */}
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4 ">
            {pizza.map((pizza: any) => (
              <Link
                key={pizza._id}
                href={`/pizza/pizzaDetail/${pizza._id}`}
              >
                <div key={pizza._id} className="w-64.5 border rounded-lg p-4 flex flex-col items-center bg-gray-800">

                  <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover rounded-full"
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
      </div>
    </div>
  );
};

export default GetPizzas;
