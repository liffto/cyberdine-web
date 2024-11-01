// StyledTextField.tsx
import { TextField, TextFieldProps } from '@mui/material';

const StyledTextField = (props: TextFieldProps) => (
    <TextField
        {...props}
        InputProps={{
            ...props.InputProps,
            style: { borderColor: 'black' },
        }}
        InputLabelProps={{
            ...props.InputLabelProps,
            style: { color: 'black' },
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'black',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'black',
                },
            },
            '& .MuiInputLabel-root': {
                color: 'black',
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
            },
        }}
    />
);

export default StyledTextField;
