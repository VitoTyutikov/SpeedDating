import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { User } from '../../service/api/User';
import { CookiesService } from '../../service/cookies/Cookies';
import apiRequest from '../../service/api/ApiRequest';
import Grid from '@mui/material/Grid';
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = () => {
            apiRequest(User.getAllUsers).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then((data) => {
                    setUsers(data);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                })
        };

        fetchUsers();
    }, []);


    const handleRoleChange = (userId, newRole) => {
        apiRequest(User.updateRole, userId, newRole);
    };

    const handleToggleNonLocked = (userId, nonLocked) => {
        apiRequest(User.updateNonLocked, userId, nonLocked);
    };

    const handleDeleteUser = (userId) => {
        apiRequest(User.deleteUser, userId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
            })
            .then(response => {
                apiRequest(User.getAllUsers)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch users');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setUsers(data);
                    })
            })
            .catch(error => {
                console.error('Error in handleDeleteUser:', error);
            });
    };


    return (
        <Grid container spacing={2} justifyContent="center">
            {users.filter(user => user.id !== CookiesService.getUserId()).map(user => (
                <Grid item xs={11} key={user.id}>
                    <UserCard
                        user={user}
                        onChangeRole={handleRoleChange}
                        onToggleNonLocked={handleToggleNonLocked}
                        onDeleteUser={handleDeleteUser}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default UserList;