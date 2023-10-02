// types/pizza.ts

interface Pizza {
    _id: string;
    name: string;
    price: number;
    ingredient: {
        sauces: string[]; // Assuming these are IDs or names of sauces
    cheese: string[]; // IDs or names of cheeses
    veggies: string[]; // IDs or names of veggies
    meat: string[];
} // IDs or names of meat
}

export default Pizza;
