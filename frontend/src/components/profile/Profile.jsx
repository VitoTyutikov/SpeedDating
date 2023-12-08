import useUser from '../../hooks/useUser';
import { useState, useEffect } from 'react';
import { User } from '../../service/api/User';
import apiRequest from '../../service/api/ApiRequest';
import UserProfileDetail from './UserProfileDetail';
import FileUpload from '../file/FileUpload';

import { File } from '../../service/api/File';
import { Card, CardContent, Grid, Typography, Button, TextField } from '@mui/material';
function Profile() {
    const [editMode, setEditMode] = useState(false);
    const user = useUser();
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    const handleUpload = (url) => {
        apiRequest(File.getPhotoAfterUpload, url, user.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setProfilePictureUrl(url);
                setFormData(prevData => ({
                    ...prevData,
                    profilePicture: url
                }));
            })
            .catch(error => {
                console.error('Error updating profile picture:', error);
            });
    };
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        profilePicture: '',
        dateOfBirth: '',
        bio: '',
        city: '',
    });
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                password: '',
                gender: user.gender || '',
                profilePicture: user.profilePicture || '',
                dateOfBirth: user.dateOfBirth || '',
                bio: user.bio || '',
                city: user.city || '',
            });
            setProfilePictureUrl(user.profilePicture || '');
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        apiRequest(User.updateUser, formData)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

        setEditMode(false);
    };

    const handleEditBalance = (event) => {
        event.preventDefault();
        apiRequest(User.updateBalance, user.id, 100)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error updating balance:', error);
            })

    }
    const renderEditForm = () => (
        <form onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth >
                Save Changes
            </Button>
            <Button variant="outlined" color='primary' onClick={handleEditToggle} fullWidth  >
                Cancel
            </Button>
        </form>
    );

    const renderUserInfo = () => (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={11}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">{user.username}</Typography>

                        {profilePictureUrl && (
                            <img src={profilePictureUrl.replace(/"/g, '')} alt="Profile" style={{ width: '15%', height: '15 %', borderRadius: '50%', margin: '10px auto', display: 'block' }} />
                        )}

                        <FileUpload onUpload={handleUpload} />

                        {!editMode ? (
                            <>
                                <UserProfileDetail label="Name" value={`${user.firstName} ${user.lastName}`} />
                                <UserProfileDetail label="Email" value={user.email} />
                                <UserProfileDetail label="Gender" value={user.gender} />
                                <UserProfileDetail label="City" value={user.city} />
                                <UserProfileDetail label="Date of Birth" value={user.dateOfBirth} />
                                <UserProfileDetail label="Bio" value={user.bio} />
                                <UserProfileDetail label="Date Joined" value={user.dateJoined} />
                                <UserProfileDetail label="Role" value={user.role} />
                                <UserProfileDetail label="Balance" value={user.balance} />
                                <Button variant="contained" color="primary" onClick={handleEditToggle} fullWidth>Edit Profile</Button>
                            </>
                        ) : (
                            renderEditForm()
                        )}
                        <Button variant="contained" color="primary" onClick={handleEditBalance} fullWidth>Top Up Balance $100</Button>
                       
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const userInfo = user && renderUserInfo();

    return <div className="profile">{userInfo || <p>Loading...</p>}</div>;
}


export default Profile;