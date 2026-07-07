import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, CardContent, Container, Grid, TextField, Typography, CircularProgress } from "@mui/material";
import Post from "../Post/Post";
import { getAvatarImage, AvatarSelectionModal } from "../Avatar/AvatarHelper";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editAvatar, setEditAvatar] = useState(0);
    const [editInfo, setEditInfo] = useState("");
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const currentUser = localStorage.getItem("currentUser");
    const isOwner = currentUser === userId;

    const fetchUser = () => {
        fetch("/users/" + userId)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setEditAvatar(data.avatar || 0);
                setEditInfo(data.userInfo || "");
            })
            .catch(err => console.log(err));
    };

    const fetchPosts = () => {
        fetch("/posts?userId=" + userId)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setIsLoaded(false);
        Promise.all([
            fetch("/users/" + userId).then(res => res.json()),
            fetch("/posts?userId=" + userId).then(res => res.json())
        ]).then(([userData, postsData]) => {
            setUser(userData);
            setEditAvatar(userData.avatar || 0);
            setEditInfo(userData.userInfo || "");
            setPosts(postsData);
            setIsLoaded(true);
        }).catch(err => {
            console.log(err);
            setIsLoaded(true);
        });
    }, [userId]);

    const handleSaveProfile = () => {
        fetch("/users/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                userName: user.userName, // Keeping it the same
                avatar: editAvatar,
                userInfo: editInfo
            }),
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setIsEditing(false);
        })
        .catch(err => console.log(err));
    };

    if (!isLoaded) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    }

    if (!user) {
        return <Typography variant="h5" align="center" sx={{ mt: 5 }}>User not found</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {/* Sol Taraf: Profil Bilgileri */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 2, position: 'sticky', top: 20 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                {isEditing ? (
                                    <Box>
                                        <Avatar 
                                            src={getAvatarImage(editAvatar)} 
                                            sx={{ width: 120, height: 120, mb: 2, mx: 'auto', backgroundColor: '#f0f5ff' }} 
                                        />
                                        <Button variant="outlined" size="small" onClick={() => setIsAvatarModalOpen(true)}>
                                            Change Avatar
                                        </Button>
                                    </Box>
                                ) : (
                                    <Avatar 
                                        src={getAvatarImage(user.avatar)} 
                                        sx={{ width: 120, height: 120, backgroundColor: '#f0f5ff' }} 
                                    />
                                )}
                            </Box>

                            <Typography variant="h5" gutterBottom fontWeight="bold">
                                {user.userName}
                            </Typography>
                            
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    label="Bio"
                                    value={editInfo}
                                    onChange={(e) => setEditInfo(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                                    {user.userInfo || "No bio provided yet."}
                                </Typography>
                            )}

                            {isOwner && (
                                <Box sx={{ mt: 3 }}>
                                    {isEditing ? (
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                            <Button variant="contained" color="primary" onClick={handleSaveProfile}>Save</Button>
                                            <Button variant="outlined" color="error" onClick={() => setIsEditing(false)}>Cancel</Button>
                                        </Box>
                                    ) : (
                                        <Button variant="outlined" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sağ Taraf: Postlar */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Posts by {user.userName}</Typography>
                    {posts.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">No posts to show.</Typography>
                    ) : (
                        posts.map(post => (
                            <Post 
                                key={post.id} 
                                likes={post.postLikes} 
                                postId={post.id} 
                                userId={post.userId} 
                                userName={post.userName} 
                                avatarId={post.avatarId}
                                title={post.title} 
                                text={post.text} 
                            />
                        ))
                    )}
                </Grid>
            </Grid>

            {/* Avatar Seçim Modalı */}
            <AvatarSelectionModal 
                open={isAvatarModalOpen} 
                handleClose={() => setIsAvatarModalOpen(false)} 
                handleSelect={(id) => setEditAvatar(id)} 
            />
        </Container>
    );
}

export default User;