import React, {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

// Stil tanımlamaları
const PostContainer = styled('div')`
  margin-bottom: 16px; // Post'lar arasında boşluk ekler
  margin-top: 15px;
`;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
 
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {

  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked]=useState(false);
  const [likeCount, setIsLikeCount] = useState(likes.length);
  const [likeId,setLikeId] = useState(null);
  const [newLikeHandler, setnewLikeHandler] = useState(null);

  const [newComment, setNewComment] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleFavoriteClick = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setIsLikeCount(likeCount+1)
    }   
    else{
      deleteLike();
      setIsLikeCount(likeCount -1)
    }
    
  };

  const refreshComments = () => {
    fetch(`/comments?postId=${postId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Response:', data);
        setLikeId(data.id);
        setIsLiked(true);
        setIsLikeCount(likeCount + 1);
      })
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    console.log(likeId);
    if (likeId) {
      fetch("/likes/" + likeId, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            console.log('Like deleted');
            setLikeId(null);
            setIsLiked(false);
            setIsLikeCount(likeCount - 1);
          } else {
            console.log('Failed to delete like');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const checkLikes = () => {
    const likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    } else {
      setLikeId(null);
      setIsLiked(false);
    }
  };
  

  useEffect(() => {
    if (expanded) {
      refreshComments();
    }
  }, [newComment]);

  useEffect (()=> {checkLikes()},[])

  return (
    <PostContainer>
      <Card sx={{ maxWidth: 700, minWidth: 500 }}>
        <CardHeader
          avatar={
            <Link to={{pathname:'/users/'+userId}}  style={{ textDecoration : 'none'}} >
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
          title={title}
        />
       
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
          >           
            <FavoriteIcon sx={{ color: isLiked ? "pink" : "inherit" }} />
            
          </IconButton>

          {likeCount}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed>
            {error ? "Error" :
              isLoaded ? commentList.map(comment => (
                <Comment  userId={2} userName={"USER"} text={comment.text}></Comment>
              )) : "Loading"
            }
            <CommentForm  userId={2} userName={"USER"} postId={postId} setNewComment={setNewComment}  ></CommentForm>
          </Container>
        </Collapse>
      </Card>
    </PostContainer>
  );
}

export default Post;
