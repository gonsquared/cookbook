import { z } from 'zod';

const isFile = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File;

export const recipeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
  image: z.union([
    z
      .custom<File>((file) => isFile(file) && file.size > 0, {
        message: 'Image is required',
      }),
    z
      .string()
      .min(1, 'Image filename is required'),
  ]),
});
