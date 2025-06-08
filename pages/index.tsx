import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  CardMedia,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@mui/material";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/Recipe";
import { recipesData } from "@/data/recipes";
import NoRecords from "@/components/NoRecords";
import AddCircle from "@mui/icons-material/AddCircle";

const HomePage = () => {
  const [data, setData] = useState<Recipe[]>([]);

  const [isFavorite, setIsFavorite] = useState({
    yes: false,
    no: false
  });

  useEffect(() => {
    setData(recipesData)
  }, []);

  const handleSortChange = () => {
    //sort
  }
  
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFavorite({
      ...isFavorite,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 2, height: "87vh"}}>
      <Grid size={3} >
        <Box sx={{ marginBottom: "2rem"}}>
          <FormControl fullWidth>
            <Typography fontWeight="bold" gutterBottom>
              Sort by Title
            </Typography>
            <Select
              displayEmpty
              defaultValue=""
              onChange={handleSortChange}
              renderValue={(selected) =>
                selected ? selected.toUpperCase() : <em>Select</em>
              }
              sx={{
                backgroundColor: "#ffffff"
              }}
            >
              <MenuItem value="asc">ASC</MenuItem>
              <MenuItem value="desc">DESC</MenuItem>
            </Select>
          </FormControl>
        </Box>
      
        <Box>
          <Typography fontWeight="bold" gutterBottom>
            Filter
          </Typography>

          <Paper
            elevation={0}
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#ffffff',
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Favorites?
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFavorite.yes}
                      onChange={handleFilterChange}
                      name="yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFavorite.no}
                      onChange={handleFilterChange}
                      name="no"
                    />
                  }
                  label="No"
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </Box>
      </Grid>

      <Grid
        size={9}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          padding: 4,
          height: 1,
          overflowY: "scroll"
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: "3rem",
            top: "5rem",
          }}
        >
            <IconButton
              sx={{
                color: 'blue',
              }}
            >
              <AddCircle sx={{ fontSize: "2rem" }} />
            </IconButton>
        </Box>
        <Box>
          {data.length > 0 ? (
            data.map((recipe: Recipe, index) => (
              <Box
                key={recipe.title}
                sx={{
                  p: 1,
                  mb: 1,
                }}
              >
                <RecipeCard
                  imageUrl={recipe.image}
                  title={recipe.title}
                  description={recipe.description}
                  name={recipe.name}
                  date={recipe.dateAdded}
                  isFavorite={recipe.isFavorite}
                />
                {index !== data.length - 1 && <Divider sx={{ mt: 3 }} /> }
              </Box>
            ))
          ) : (
            <NoRecords />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
