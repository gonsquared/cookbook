import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Recipe } from '../types/Recipe';

const initialState: Recipe[] = [];

export const addRecipe = createAsyncThunk(
  'recipe/add',
  async (newRecipe: Recipe) => newRecipe
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    loadInitialData: (state, action: PayloadAction<Recipe[]>) => {
      return [...action.payload];
    },
    deleteRecipe: (state, action: PayloadAction<string>) =>
      state.filter((r) => r.id !== action.payload),

    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((r) => r.id === action.payload);
      if (index !== -1) {
        state[index].isFavorite = !state[index].isFavorite;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const {
  loadInitialData,
  deleteRecipe,
  updateRecipe,
  toggleFavorite
} = recipeSlice.actions;

export const getAllRecipes = (state: RootState) => state.recipe;

export default recipeSlice.reducer;
