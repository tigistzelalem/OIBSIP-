import { useCreateOrderMutation } from '@/store/order/order-api';
import { useGetIngredientQuery } from '@/store/ingredient/ingredients-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const CreateOrder: React.FC = () => {
  const route = useRouter();
  const { userId, pizzaId } = route.query;

  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([]);

  const [quantity, setQuantity] = useState(1);

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  const handleIngredientSelection = (ingredientId: string) => {
    if (selectedIngredient.includes(ingredientId)) {
      setSelectedIngredient(selectedIngredient.filter((id) => id !== ingredientId))
    } else {
      setSelectedIngredient([...selectedIngredient, ingredientId]);
    }
  }


  const handleSubmit = async () => {
    try {
      const order = {
        userId,
        pizzaId,
        ingredient: selectedIngredient,
        quantity
      };
      const response = await createOrder(order).unwrap()
      console.log(response.message);

    } catch (error) {
      console.log('error');

    }

  }


  return (
    <div>
      <button onClick={handleSubmit}>Buy now</button>
    </div>
  )
}

export default CreateOrder
