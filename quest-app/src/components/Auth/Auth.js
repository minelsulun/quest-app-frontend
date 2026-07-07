import { Button, FormControl, Input, InputLabel, Box, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoginMode, setIsLoginMode] = useState(true)
    const navigate = useNavigate() // useNavigate hook'u kullanıyoruz


    const handleUsername = (value) => {
        SetUsername(value);
        setErrorMessage("");
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    
    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setErrorMessage("");
        SetUsername("");
        setPassword("");
    }

    const sendRequest = (path) => {
      console.log("/auth/"+path);
      console.log(username,password);
        fetch("/auth/"+path,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },            
            body : JSON.stringify({
                userName:username,
                password:password,
            }),
        }  
      )
        .then((res) => {
            return res.text().then(text => {
                let data = null;
                try {
                    data = text ? JSON.parse(text) : null;
                } catch (e) {
                    data = null;
                }
                return { status: res.status, body: data };
            });
        })
        .then((resData) => {
            if (resData.status >= 400) {
                if (resData.body && resData.body.message === "Username already in use") {
                    setErrorMessage("Username already in use try another one");
                } else if (resData.body && resData.body.message) {
                    setErrorMessage(resData.body.message);
                } else if (resData.status === 401 || resData.status === 403) {
                    setErrorMessage("Hatalı kullanıcı adı veya şifre!");
                } else {
                    setErrorMessage("Bir hata oluştu (Status: " + resData.status + ")");
                }
                return;
            }
            
            setErrorMessage("");
            const result = resData.body;
            if (path === "login") {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username);
                navigate(0);
            } else {
                alert("Başarıyla kayıt oldunuz! Şimdi giriş yapabilirsiniz.");
                setIsLoginMode(true); // Switch to login after successful register
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorMessage("Sunucuya bağlanılamadı.");
        })       
    }

    const handleSubmit = () => {
        if (isLoginMode) {
            sendRequest("login")
        } else {
            sendRequest("register")
        }
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
      <StyledFormControl error={!!errorMessage}>
        <InputLabel>Username</InputLabel>
        <StyledInput value={username} onChange={(i)=>handleUsername(i.target.value)} />
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
      </StyledFormControl>
      
      <StyledFormControl>
        <InputLabel>Password</InputLabel>
        <StyledInput value={password} onChange={(i)=>handlePassword(i.target.value)} type="password" />
      </StyledFormControl>

      <StyledButton  
        variant="contained" 
        fullWidth 
        onClick={handleSubmit}
      >
        {isLoginMode ? "Login" : "Register"}
      </StyledButton>

      <FormHelperText style={{ margin: 20 }}>
        {isLoginMode ? "If haven't registered yet then register" : "If already registered then login"}
      </FormHelperText>
      
      <Button 
          variant="contained"
          style={{
              background: 'linear-gradient(45deg, #f48fb1 30%, #f06292 90%)', // pink gradient
              color: 'white'
          }}
          onClick={toggleMode}
      >
          {isLoginMode ? "Register" : "Login"}
      </Button>
    </Box>
  );
}

export default Auth;
