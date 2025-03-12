import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation"; // Cambiar a next/navigation
import { useState } from "react";
// LOCAL CUSTOM COMPONENTS
import SearchResult from "./components/search-result";
// LOCAL CUSTOM HOOKS
import useSearch from "./hooks/use-search";
// CUSTOM ICON COMPONENT
import Search from "icons/Search";

export default function SearchInputWithCategory({onClose}: any) {
  const {
    parentRef,
    resultList,
    handleSearch,
  } = useSearch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      router.push(`/products?query=${searchText}`);
      onClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    handleSearch(event);
  };

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      padding: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
    },
    startAdornment: (
      <Box
        mr={2}
        px={2}
        display="grid"
        alignItems="center"
        justifyContent="center"
        borderRight="1px solid"
        borderColor="grey.400"
      >
        <Search sx={{ fontSize: 17, color: "grey.600" }} />
      </Box>
    ),
    // endAdornment: <CategoryDropdown title={categoryTitle} handleChange={handleCategoryChange} />
  };

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        value={searchText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        InputProps={INPUT_PROPS}
      />

      {/* SHOW SEARCH RESULT LIST */}
      {resultList?.length > 0 ? <SearchResult results={resultList} query={searchText} onClose={onClose}/> : null}
    </Box>
  );
}
