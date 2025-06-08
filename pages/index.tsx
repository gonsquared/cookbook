import React, { ChangeEvent, useState } from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import RecipeCard from "@/components/RecipeCard";

const HomePage = () => {
  const [isFavorite, setIsFavorite] = React.useState({
    yes: false,
    no: false
  });

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
          borderRadius: "15px",
          padding: "32px"
        }}
      >
        <RecipeCard
          imageUrl="https://source.unsplash.com/featured/?food"
          title="Delicious Chicken Curry"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          author="Johnny"
          date="March 6, 2024"
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
