import React from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, OutlinedInput, InputAdornment, Avatar } from '@mui/material';
import { pink } from '@mui/material/colors';

// Stil tanımlamaları
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
        
    },
}));

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <StyledCardContent>
            <StyledOutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Avatar sx={{ bgcolor: pink[200] }} aria-label="post">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </InputAdornment>
                }
            />
        </StyledCardContent>
    );
}

export default Comment;
