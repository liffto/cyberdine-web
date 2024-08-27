export const inputStyles = {
    '& .MuiInputBase-input': {
      color: '#000', // Change text color
    },
    "& .MuiInputLabel-outlined": {
      color: "#2e2e2e",
    },
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000', // Change border color on hover
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000', // Change border color when focused
      },
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #000', // Default border color
    },

  };