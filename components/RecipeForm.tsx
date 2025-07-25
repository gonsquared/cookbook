import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ImageIcon from "@mui/icons-material/Image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { recipeSchema } from "@/utils/validators";
import { Recipe } from "@/types/Recipe";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addRecipe, updateRecipe, getAllRecipes, deleteRecipe } from "@/store/recipeSlice";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import Image from "next/image";

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
    control,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ...data,
      isFavorite: data?.isFavorite ?? false,
    },
  });

  const imageFile = watch("image");

  const existingRecipes = useAppSelector(getAllRecipes);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<RecipeFormValues> = async (values) => {

    if (!isEdit) {
      const titleExists = existingRecipes.some(
        (recipe) => recipe.title.trim().toLowerCase() === values.title.trim().toLowerCase()
      );
  
      if (titleExists) {
        enqueueSnackbar("A recipe with this title already exists.", { variant: 'error' });
        return;
      }
    }
    
    const formData = new FormData();
    const file = values.image instanceof FileList ? values.image[0] : undefined;
  
    if (file) {
      formData.append("image", file);
    } else if (isEdit && typeof data?.image === "string") {
      formData.append("existingImage", data.image);
    } else {
      enqueueSnackbar("No image file selected", { variant: 'error' })
    }
  
    const id = isEdit && data?.id ? data.id : uuidv4();
    formData.append("id", id);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("ingredients", values.ingredients);
    formData.append("instructions", values.instructions);
    formData.append("isFavorite", String(values.isFavorite));
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "Failed to upload recipe");
      }
  
      const newRewcipe: Recipe = {
        id,
        name: values.name,
        email: values.email,
        title: values.title,
        description: values.description,
        ingredients: values.ingredients,
        instructions: values.instructions,
        image: result.filename,
        dateAdded: data?.dateAdded ?? new Date().toDateString(),
        isFavorite: values.isFavorite,
      };
  
      if (isEdit) {
        dispatch(updateRecipe(newRewcipe));
        enqueueSnackbar("Recipe updated successfully!", { variant: 'success' });
      } else {
        dispatch(addRecipe(newRewcipe));
        enqueueSnackbar("Recipe created successfully!", { variant: 'success' });
      }
  
      router.push("/");
    } catch (error) {
      enqueueSnackbar("Error in saving the recipe.", { variant: 'error' });
    }
  };

  const handleDelete = () => {
    if (!data?.id) return;
    // const confirm = window.confirm('Are you sure you want to delete this recipe?');
    // if (!confirm) return;
  
    dispatch(deleteRecipe(data.id));
    enqueueSnackbar("Recipe deleted successfully.", { variant: "info" });
    router.push('/');
  };
  
  return (
    <Box sx={{ height: "100%", bgcolor: "#ffffff", p: 2 }}>
      <form
        onSubmit={handleSubmit(
          onSubmit,
          (formErrors) => {
            console.error("Validation errors:", formErrors);
          }
        )}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <Box
              sx=
              {{
                display: "flex",
                alignItems: "center",
                mb: 2,
                px: 2,
                py: 1
              }}
              onClick={() => router.push("/")}
            >
              <IconButton color="inherit" onClick={() => router.push("/")}>
                <ArrowBackIos />
              </IconButton>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Back
              </Typography>
            </Box>
            <Box mt={2}>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                {...register("image", {
                  validate: (value) => {
                    if (value instanceof FileList && value.length > 0) return true;
                    return "Image is required";
                  },
                })}
                style={{ display: "none" }}
              />

              <label htmlFor="image-upload">
              <Paper
                elevation={1}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#ccc",
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: errors.image ? '2px solid red' : '2px solid transparent',
                  transition: 'border 0.2s ease-in-out',
                  position: "relative",
                }}
              >
                {typeof window !== "undefined" && imageFile instanceof FileList && imageFile.length > 0 ? (
                  <Image
                    src={URL.createObjectURL(imageFile[0])}
                    alt="Preview"
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized 
                  />
                ) : typeof data?.image === "string" ? (
                  <Image
                    src={`/images/${data.image}`}
                    alt={data.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <ImageIcon sx={{ fontSize: 80, color: "white" }} />
                )}
              </Paper>
              </label>
              {typeof errors.image?.message === 'string' && (
                <Typography color="error" variant="body2" mt={1}>
                  {errors.image.message}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  InputProps={{ readOnly: isEdit }}
                  sx={ isEdit ? {
                    backgroundColor: "lightgray",
                    cursor: "no-drop"
                  } : {}}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  {...register("description")}
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
                  {...register("ingredients")}
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
                  {...register("instructions")}
                  error={!!errors.instructions}
                  helperText={errors.instructions?.message}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="isFavorite"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                        />
                      }
                      label="Mark as Favorite"
                    />
                  )}
                />
              </Grid>
              <Grid size={12} sx={{ textAlign: "right" }}>
                {isEdit && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      mr: 2,
                      width: "20%"
                    }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    width: "20%"
                  }}  
                >
                  Save
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
