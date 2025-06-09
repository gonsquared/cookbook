import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Checkbox,
  Container,
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
  SelectChangeEvent,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/Recipe";
import NoRecords from "@/components/NoRecords";
import AddCircle from "@mui/icons-material/AddCircle";
import { useAppSelector } from "@/store/hooks";
import { getAllRecipes } from "@/store/recipeSlice";
import SearchInput from "@/components/SearchInput";

const HomePage = () => {
  const router = useRouter();
  const recipes = useAppSelector(getAllRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isFavorite, setIsFavorite] = useState({
    yes: false,
    no: false
  });

  useEffect(() => {
    if (searchKeyword.trim() === '') {
      let recipesList = [...recipes];
  
      if (isFavorite.yes && !isFavorite.no) {
        recipesList = recipesList.filter((r) => r.isFavorite === true);
      } else if (!isFavorite.yes && isFavorite.no) {
        recipesList = recipesList.filter((r) => r.isFavorite === false);
      }
  
      if (sortOrder === "asc") {
        recipesList.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === "desc") {
        recipesList.sort((a, b) => b.title.localeCompare(a.title));
      }
  
      setFilteredRecipes(recipesList);
    }
  }, [searchKeyword, recipes, isFavorite, sortOrder]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as "asc" | "desc" | "");
  };
  
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFavorite((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSearch = () => {
    const lowerKeyword = searchKeyword.trim().toLowerCase();
  
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerKeyword) ||
      recipe.name.toLowerCase().includes(lowerKeyword)
    );
  
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignSelf: "flex-end"
          }}
        >
          <SearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={handleSearch}
          />
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          my: 0,
          mx: "auto"
        }}
      >
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
                  <MenuItem value="">Select</MenuItem>
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
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#ffffff",
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
              overflowY: "scroll",
              position: "relative"
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                display: "flex",
                justifyContent: "flex-end",
                zIndex: 1,
              }}
            >
              <Tooltip title="Create Recipe">
                <IconButton
                  color="primary"
                  onClick={() => router.push("/recipe/create")}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ position: "relative", top: "-3rem", }}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <Box key={recipe.id} sx={{ p: 1, mb: 1 }}>
                  <RecipeCard
                    id={recipe.id}
                    imageUrl={recipe.image}
                    title={recipe.title}
                    description={recipe.description}
                    name={recipe.name}
                    date={recipe.dateAdded}
                    isFavorite={recipe.isFavorite}
                  />
                  {index !== filteredRecipes.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))
            ) : (
              <NoRecords />
            )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
