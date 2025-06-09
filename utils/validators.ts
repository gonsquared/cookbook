import { z } from 'zod';

export const recipeSchema = z.object({
  id: z.string().min(1, 'id is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
  image: z.any().refine(
    (file) =>
      (typeof file === 'string' && file.length > 0) ||
      (typeof File !== 'undefined' && file instanceof FileList && file.length > 0),
    {
      message: 'Image is required',
    }
  ),
  isFavorite: z.boolean(),
});
