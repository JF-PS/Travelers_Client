import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Paper
      // component="form"
      sx={{p: '2px 6px', display: 'flex', alignItems: 'center'}}
      style={{height: '50px', borderRadius: '16px', margin: '20px 20px 15px 20px', boxShadow: 'none'}}
      fullWidth
    >
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Rechercher"
        // style={{fontSize: '16px', color: "#707070 !important"}}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" style={{backgroundColor: "#EBA701", borderRadius: '8px', color:'white'}}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;