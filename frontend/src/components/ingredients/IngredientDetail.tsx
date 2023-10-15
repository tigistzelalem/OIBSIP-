import { useGetIngredientQuery } from '@/store/ingredient/ingredients-api';
import React from 'react'

interface IngredientDetailProps {
    id: string
}
const IngredientDetail: React.FC<IngredientDetailProps> = ({ id }) => {

    const { data: ingredient, isLoading, isError, error } = useGetIngredientQuery(id);
    if (isLoading || !ingredient) {
        return <div>Loading...</div>
    }

    if (isError || error) {
        return <div>Error</div>
    }
    // console.log(ingredient, "#############")
    // console.log(ingredient.message)
    const ingredientDetail = ingredient.ingredient;
    // console.log(ingredientDetail, "******8")

    return (
        <div>
            <div>{ingredientDetail.name}</div>
            <div>{ingredientDetail.price}</div>
            {/* <div>{ingredientDetail.ingredientType}</div> */}
        </div>
    )
}

export default IngredientDetail