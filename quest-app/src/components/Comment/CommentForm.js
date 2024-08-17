import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, OutlinedInput, InputAdornment, Avatar, Button } from '@mui/material';
import { pink } from '@mui/material/colors';

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
    '& .MuiInputBase-input': {
        color: theme.palette.text.primary,
    },
}));

function CommentForm({ userId, userName, postId, onCommentAdded, setNewComment }) {
    const [text, setText] = useState("");

    const saveComments = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
              },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success", data);
            setText(""); // Formu temizleyin
            setNewComment(prev => {return !prev}); // Yorum eklendiğinde üst bileşene bildirin
        })
        .catch((err) => console.error("Error", err));
    };

    const handleSubmit = () => {
        if (text.trim() === "") {
            return;
        }
        saveComments();
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <StyledCardContent>
            <StyledOutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={handleChange}
                startAdornment={
                    <InputAdornment position="start">
                        <Avatar sx={{ bgcolor: pink[200] }} aria-label="post">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: pink[200], "&:hover": { backgroundColor: pink[300] } }}
                            onClick={handleSubmit}
                        >
                            Comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
            />
        </StyledCardContent>
    );
}

export default CommentForm;
