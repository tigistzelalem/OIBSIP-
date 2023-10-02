// import { useGetIngredientsQuery } from '@/store/ingredient/ingredients-api'
// import React from 'react'

// const IngredientList: React.FC<pizzaId, ingredientType > = () => {
//     const { data: ingredient, isLoading, isError } = useGetIngredientsQuery({
//         pizzaId,
//         ingredientType
//     });
    
//     if (isLoading) {
//         return <div>Loding...</div>
//     }

//     if (isError) {
//         return <div>Error fetching ingredients</div>
//     }
//     const ingredients = ingredient.
//   return (
//       <div>
//           <h1>Ingredients List</h1>
//           <ul>
//               {ingredients.map((ingredient) => (
//                   <li key={ingredient._id}>
//                       {ingredient.name} - ${ingredient.price}
//                   </li>
//               ))}
//           </ul>
//       </div>
//   )
// }

// export default IngredientList