import { User } from '../../service/api/User';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiRequest from '../../service/api/ApiRequest';
import UserProfileDetail from './UserProfileDetail';
import { Card, CardContent, Grid, Typography } from '@mui/material';
function UserProfile() {//TODO: add send message if userId!= cookies.userId

    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            apiRequest(User.getUserById, id)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                })
        };
        fetchUser();
    }, [id]);


    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={11}>
                <Card>
                    <CardContent>
                        {user ? (
                            <>
                                <img src={user.profilePicture.replace(/"/g, '')} alt="Profile" style={{ width: '15%', height: '15 %', borderRadius: '50%', margin: '10px auto', display: 'block' }}  />
                                <Typography variant="h5" align="center">{user.username}</Typography>
                                <UserProfileDetail label="Name" value={`${user.firstName} ${user.lastName}`} />
                                <UserProfileDetail label="Email" value={user.email} />
                                <UserProfileDetail label="Gender" value={user.gender} />
                                <UserProfileDetail label="City" value={user.city} />
                                <UserProfileDetail label="Date of Birth" value={user.dateOfBirth} />
                                <UserProfileDetail label="Bio" value={user.bio} />
                                <UserProfileDetail label="Date Joined" value={user.dateJoined} />
                                <UserProfileDetail label="Role" value={user.role} />
                            </>
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default UserProfile;