import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'
import { User } from '../../service/api/User';
import { CookiesService } from '../../service/cookies/Cookies';
import apiRequest from '../../service/api/ApiRequest';
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
                return User.getAllUsers;
            })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error in handleDeleteUser:', error);
            });
    };


    return (
        <div className="userList">
            {users.filter(user => user.id !== CookiesService.getUserId()).map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onChangeRole={handleRoleChange}
                    onToggleNonLocked={handleToggleNonLocked}
                    onDeleteUser={handleDeleteUser}
                />
            ))}
        </div>
    );
};

export default UserList;