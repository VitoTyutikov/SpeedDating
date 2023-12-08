import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
const UserCardContainer = styled(Card)`
  margin-bottom: 10px;
`;

const UserImage = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

function UserCard({ user, onDeleteUser, onToggleNonLocked, onChangeRole }) {
  const [userDetails, setUserDetails] = useState(user);

  const handleRoleChange = () => {
    const updatedUserDetails = { ...userDetails, role: userDetails.role === 'ADMIN' ? 'USER' : 'ADMIN' };
    setUserDetails(updatedUserDetails);
    onChangeRole(userDetails.id, userDetails.role === 'ADMIN' ? 'USER' : 'ADMIN');
  };

  const handleToggleNonLocked = () => {
    const updatedUserDetails = { ...userDetails, accountNonLocked: !userDetails.accountNonLocked };
    setUserDetails(updatedUserDetails);
    onToggleNonLocked(userDetails.id, updatedUserDetails.accountNonLocked);
  };

  return (
    <UserCardContainer>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Username</Typography>
            <Typography>{userDetails.username}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Firstname</Typography>
            <Typography>{userDetails.firstName}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Lastname</Typography>
            <Typography>{userDetails.lastName}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography>{userDetails.email}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Gender</Typography>
            <Typography>{userDetails.gender}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <UserImage src={userDetails.profilePicture.replace(/"/g, '')} alt="Photo" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Date of Birth</Typography>
            <Typography>{userDetails.dateOfBirth}</Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Bio</Typography>
            <Typography>{userDetails.bio}</Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Bio</Typography>
            <Typography>{userDetails.bio}</Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Date Joined</Typography>
            <Typography>{userDetails.dateJoined}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">City</Typography>
            <Typography>{userDetails.city}</Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">Location</Typography>
            <Typography>{userDetails.location}</Typography>
          </Grid>


          <Grid item xs={6} sm={3}>
            <Button variant="contained" onClick={handleRoleChange}>
              {userDetails.role}
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Checkbox
              checked={userDetails.accountNonLocked}
              onChange={handleToggleNonLocked}
            />
            Non-Locked
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="contained" color="error" onClick={() => onDeleteUser(userDetails.id)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </UserCardContainer>
  );
}

export default UserCard;
