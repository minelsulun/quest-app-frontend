import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import PostForm from "../Post/PostForm";

// Stil tanımlamaları
const StyledContainer = styled(Box)`
display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f5ff;
  min-height: calc(100vh - 64px);  // Subtract the height of AppBar
  // Add top margin to account for Navbar height

`;


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/posts")
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setPostList(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
}

  useEffect(() => {
    refreshPosts()
  }, []);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container position="relative" z-index='0' maxWidth="sm" disableGutters >
        <StyledContainer>
          {localStorage.getItem("currentUser")==null?"" :
           <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts= {refreshPosts}/>}
         
          {postList.map(post => (
            
              <Post likes={post.postLikes} key={post.id} postId={post.id} userId={post.userId} userName= {post.userName} 
              title={post.title} text={post.text} />   
          ))}
        </StyledContainer>
      </Container>
    );
  }
}

export default Home;
