import React from 'react'

const MostOrder = () => {
    const mostlyOrderedProducts = [
        {
            name: "Product 1",
            price: 9.99,
            imageSrc: "/images/product1.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/product2.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/product2.jpg",
        },
        {
            name: "Product 2",
            price: 12.99,
            imageSrc: "/images/—Pngtree—delicious pizza background material_1050243.jpg",
        },
        // Add data for the other 2 products
    ];
  return (
    <div>
          <h2 className="text-2xl font-semibold my-10">Mostly Ordered Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {mostlyOrderedProducts.map((product, index) => (
                  <div key={index} className="bg-gray-800 border rounded-lg p-4 flex flex-col items-center">
                      {/* Circular Product Image */}
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                          <img
                              src={product.imageSrc}
                              alt={product.name}
                              className="w-32 h-32 rounded-full"
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