import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const CustomTextFieldContainer = styled(TextField)(({ theme }) => ({
    width: '100%;',
    '& .MuiOutlinedInput-root': {
      paddingLeft: 0,
    },
    '& .MuiInputAdornment-root': {
      backgroundColor: '#f3f3f3',
      padding: '28px 14px',
      borderTopLeftRadius: theme.shape.borderRadius + 'px',
      borderBottomLeftRadius: theme.shape.borderRadius + 'px',
    },
    '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input' : {
      padding: '10px 14px',
    }
  }));