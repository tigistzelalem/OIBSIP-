import React from 'react'

const MostOrder = () => {
    const mostlyOrderedProducts = [
        {
            name: "Product 1",
            price: 9.99,
            imageSrc: "/images/pizza-442058_1280.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/pizza-1094741_1280.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/pizza-1442946_1280.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/pizza-3007395_1280.jpg",
        },
        // Add data for the other 2 products
    ];
    return (
        <div>
            <h2 className="text-2xl font-semibold my-10">Mostly Ordered Pizzas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2 ">
                {mostlyOrderedProducts.map((product, index) => (
                    <div key={index} className="bg-gray-800 border rounded-lg flex flex-col items-center">
                        {/* Circular Product Image */}
                        <div className=" overflow-hidden mb-2">
                            <img
                                src={product.imageSrc}
                                alt={product.name}
                                className="h-44 w-72 rounded-lg"
                            />
                        </div>
                        <p className="text-center mt-2">{product.name}</p>

                        {/* Display the Product Name */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MostOrder