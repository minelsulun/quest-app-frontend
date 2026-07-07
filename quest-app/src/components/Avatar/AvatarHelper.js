import React from 'react';
import { Avatar, Box, IconButton, Modal, Typography, Button } from '@mui/material';

// 6 farklı avatar seçeneği için DiceBear seed değerleri
export const AVATARS = [1, 2, 3, 4, 5, 6];

export const getAvatarImage = (avatarId) => {
    if (!avatarId) return `https://api.dicebear.com/7.x/avataaars/svg?seed=0`;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarId}`;
};

export const AvatarSelectionModal = ({ open, handleClose, handleSelect }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="avatar-modal-title"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <Typography id="avatar-modal-title" variant="h6" component="h2" gutterBottom>
                    Select an Avatar
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 2 }}>
                    {AVATARS.map((id) => (
                        <IconButton 
                            key={id} 
                            onClick={() => { handleSelect(id); handleClose(); }}
                        >
                            <Avatar 
                                src={getAvatarImage(id)} 
                                sx={{ width: 64, height: 64, backgroundColor: '#f0f5ff' }}
                            />
                        </IconButton>
                    ))}
                </Box>
                <Button onClick={handleClose} sx={{ mt: 3 }} color="inherit">
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};
