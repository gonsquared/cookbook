import React from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ImageIcon from '@mui/icons-material/Image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recipeSchema } from '@/utils/validators';
import { Recipe } from '@/types/Recipe';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { addRecipe, updateRecipe } from '@/store/recipeSlice';
import { v4 as uuidv4 } from 'uuid';

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  isEdit?: boolean;
  data?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ isEdit = false, data }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: isEdit && data ? data : {},
  });

  const imageFile = watch('image');

  const onSubmit = async (values: RecipeFormValues) => {
    const formData = new FormData();
    const file = values.image instanceof FileList ? values.image[0] : undefined;

    if (file) {
      formData.append('image', file);
    } else {
      // Optional: handle the case where no image was uploaded
      console.error('No image file selected');
    }
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('ingredients', values.ingredients);
    formData.append('instructions', values.instructions);
  
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }
  
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || 'Failed to upload recipe');
      }
  
      // Dispatch to Redux
      const newRecipe: Recipe = {
        id: result.id, // e.g. generated in backend or use uuid
        name: values.name,
        email: values.email,
        title: values.title,
        description: values.description,
        ingredients: values.ingredients,
        instructions: values.instructions,
        image: result.filename, // returned from API
        dateAdded: new Date().toDateString(),
        isFavorite: false,
      };
  
      dispatch(addRecipe(newRecipe));
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f0f0', p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 2, py: 1 }}>
              <IconButton color="inherit" onClick={() => router.push('/')}>
                <ArrowBackIos />
              </IconButton>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Back
              </Typography>
            </Box>
            <Paper
              elevation={1}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#ccc',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {typeof window !== 'undefined' && imageFile instanceof File ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : typeof data?.image === 'string' ? (
                <img
                  src={`/images/${data.image}`}
                  alt={data.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ImageIcon sx={{ fontSize: 80, color: 'white' }} />
              )}
            </Paper>

            <Box mt={2}>
              <input
                type="file"
                accept="image/*"
                {...register('image', {
                  validate: (value) => {
                    if (value instanceof FileList && value.length > 0) return true;
                    return 'Image is required';
                  },
                })}
              />
            </Box>
          </Grid>

          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  InputProps={{ readOnly: isEdit }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Ingredients"
                  {...register('ingredients')}
                  error={!!errors.ingredients}
                  helperText={errors.ingredients?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Instructions"
                  {...register('instructions')}
                  error={!!errors.instructions}
                  helperText={errors.instructions?.message}
                />
              </Grid>
              <Grid size={12} sx={{ textAlign: "right" }}>
                <Button variant="contained" color="primary" type="submit">
                  {isEdit ? 'Update' : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RecipeForm;
