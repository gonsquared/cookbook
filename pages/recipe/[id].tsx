import React, { useMemo } from 'react';
import RecipeForm from "@/components/RecipeForm";
import { useRouter } from 'next/router';
import { Recipe } from '@/types/Recipe';
import { useAppSelector } from '@/store/hooks';
import { Box } from '@mui/material';

export default function RecipeDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const recipes = useAppSelector((state) => state.recipe);

  const recipe = useMemo<Recipe | undefined>(() => {
    if (!id || typeof id !== 'string') return undefined;
    return recipes.find((r) => r.id === id);
  }, [id, recipes]);

  if (!recipe) return (<><h1>Recipe not found!</h1></>)

  return (
    <Box sx={{ height: "87vh", m: 2 }}>
      <RecipeForm
      isEdit={true}
      data={{
        id: recipe?.id,
        name: recipe?.name,
        email: recipe?.email,
        title: recipe?.title,
        description: recipe?.description,
        ingredients: recipe?.ingredients,
        instructions: recipe?.instructions,
        image: recipe?.image,
        dateAdded: recipe?.dateAdded,
        isFavorite: recipe?.isFavorite
      }}
    />
    </Box>    
  )
}
