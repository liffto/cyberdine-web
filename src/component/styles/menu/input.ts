export const inputStyles = {
  '& .MuiInputBase-input': {
    color: '#000', // Change text color
  },
  "& .MuiInputLabel-outlined": {
    color: "#000",
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: "#000", // Focused label color
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