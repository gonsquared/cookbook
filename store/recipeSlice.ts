import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from '../types/Recipe'

const initialState: Recipe[] = [];

export const addRecipe = createAsyncThunk(
  'recipe/add',
  async (newRecipe: Recipe) => {
    return newRecipe;
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    deleteRecipe(state, action: PayloadAction<string>) {
      return state.filter(recipe => recipe.id !== action.payload);
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const recipe = state.find(r => r.id === action.payload);
      if (recipe) recipe.isFavorite = !recipe.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { deleteRecipe, updateRecipe, toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
