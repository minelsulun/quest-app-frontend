import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Stil tanımlamaları
const PostContainer = styled('div')`
  margin-bottom: 16px; // Post'lar arasında boşluk ekler
  margin-top: 15px;
`;


function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey")
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
      })
      .catch((err) => console.log("error", err));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSent(false);
  };

  return (
    <div>
      <PostContainer>
        <Card sx={{ maxWidth: 700, minWidth: 500 }}>
          <CardHeader
            avatar={
              <Link to={{ pathname: "/users/" + userId }} style={{ textDecoration: "none" }}>
                <Avatar sx={{ bgcolor: pink[200] }} aria-label="post">
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={title}
                onChange={(i) => handleTitle(i.target.value)}
              />
            }
          />
          <CardContent>
            <div>
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Text"
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                onChange={(i) => handleText(i.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: pink[200], "&:hover": { backgroundColor: pink[300] } }}
                      onClick={handleSubmit}
                    >
                      POST
                    </Button>
                  </InputAdornment>
                }
              />
            </div>
          </CardContent>
        </Card>
      </PostContainer> 
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Gönderi Başarılı
        </Alert>
      </Snackbar>

    </div>
  );
}

export default PostForm;
