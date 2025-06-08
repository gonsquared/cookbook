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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recipeSchema } from '@/utils/validators';
import { Recipe } from '@/types/Recipe';

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  isEdit?: boolean;
  data?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ isEdit = false, data }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: isEdit && data ? data : {}
  });

  const imageFile = watch('image');

  const onSubmit = (values: RecipeFormValues) => {
    const formData = {
      ...values,
      imageName: values.title.replace(/\s+/g, '_'),
    };
    console.log('Form submitted:', formData);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f0f0', p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          bgcolor: '#3f51b5',
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      >
        <IconButton color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          Back
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid size={12}>
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
              <input type="file" accept="image/*" {...register('image')} />
              {errors.image && (
                <Typography color="error" variant="body2">
                  {errors.image.message}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size={12}>
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
                  InputProps={{
                    readOnly: isEdit,
                  }}
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
              <Grid size={12} sx={{ textAlign: 'right' }}>
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
