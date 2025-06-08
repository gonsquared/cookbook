import React from 'react';
import RecipeForm from "@/components/RecipeForm";

export default function CreateRecipePage() {
  return (
    <>
      <RecipeForm />

      {/* <RecipeForm
        isEdit={true}
        data={{
          name: 'Johnny',
          email: 'johnny@example.com',
          title: 'Fried Rice',
          description: 'Quick and easy fried rice',
          ingredients: 'Rice, eggs, soy sauce',
          instructions: 'Cook rice, fry eggs, mix all together',
          image: 'tinola.jpg',
          dateAdded: "Jun 7, 2025",
          isFavorite: true
        }}
      /> */}
    </>
  )
}
