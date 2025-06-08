import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
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
} = recipeSlice.actions;

export default recipeSlice.reducer;
