import CreateIngredient from '@/components/ingredients/createIngredient';
import { useRouter } from 'next/router';
import React from 'react';

const CreateIngredients = () => {
  const router = useRouter();
  const { pizzaId } = router.query;
  console.log('router.query:', router.query);

  return (
    <div>
      <CreateIngredient pizzaId={ pizzaId as string} />
    </div>
  );
};

export default CreateIngredients;
