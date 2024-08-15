import { Button, FormControl, Input, InputLabel, Box, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { json, Navigate } from "react-router-dom";

// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const StyledInput = styled(Input)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#f48fb1',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: "#F06292", // A slightly darker shade of pink for hover effect
  },
}));


function Auth() {

    const[username,SetUsername]=useState("")
    const[password,setPassword]=useState("")

    const handleUsername = (value) => {
        SetUsername(value);
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    const sendRequest = (path) => {
        fetch("/auth"+path,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                username:username,
                password:password,
            }),
        })
        .then((res) => res.json())
        .then((result) =>{localStorage.setItem("tokenKey",result.massage);
                          localStorage.setItem("currentUser",result.userId);
                          localStorage.setItem("userName",username)})

        .catch((err) => console.log(err))       
    }



    const handleRegister = () => {
        sendRequest("register")
        SetUsername("")
        setPassword("")
        Navigate("/auth")
    }
    const handleLogin = () => {
        sendRequest("login")
        SetUsername("")
        setPassword("")
    }

  return (
    <Box
      sx={{
        width: '300px',
        margin: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <StyledFormControl>
        <InputLabel>Username</InputLabel>
        <StyledInput onChange={(i)=>handleUsername(i.target.value)} />
      </StyledFormControl>
      
      <StyledFormControl>
        <InputLabel>Password</InputLabel>
        <StyledInput onChange={(i)=>handlePassword(i.target.value)} type="password" />
      </StyledFormControl>

      <StyledButton  variant="contained" fullWidth 
      onClick={handleRegister()}>
        Register
      </StyledButton>

      <FormHelperText style={{ margin: 20 }}>Are you already registered?</FormHelperText>
            <Button 
                variant="contained"
                style={{
                    background: 'linear-gradient(45deg, #f48fb1 30%, #f06292 90%)', // pink gradient
                    color: 'white'
                }}
                onChange={(i)=>handleLogin(i.target.value)}>
                Login
            </Button>
    </Box>
  );
}

export default Auth;
