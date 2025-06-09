import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search here..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        inputProps={{ "aria-label": "search recipes" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
