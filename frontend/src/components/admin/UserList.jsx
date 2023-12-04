// UserList.jsx
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'; // Assuming UserCard is in the same directory
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
                    // Handle error, e.g., show error message to the user
                })
        };

        fetchUsers();
    }, []);


    const handleRoleChange = (userId, newRole) => {
        // Implement role change logic here
        console.log(`Change role for user ${userId} to ${newRole}`);
    };

    const handleToggleBoolean = (userId, field) => {
        // Implement toggle boolean logic here
        console.log(`Toggle boolean field ${field} for user ${userId}`);
    };
    const handleDeleteUser = (userId) => {
        apiRequest(User.deleteUser, userId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                return User.getAllUsers; // Fetch all users after deletion
            })
            .then(response => response.json())
            .then(data => {
                setUsers(data); // Update users state with the new list
            })
            .catch(error => {
                console.error('Error in handleDeleteUser:', error);
                // Handle error, such as showing an error message
            });
    };


    return (
        <div className="userList">
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f3f3f3' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>Username</div>
                <div style={{ flex: '1', textAlign: 'center' }}>First Name</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Last Name</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Email</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Gender</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Profile Picture</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Date of Birth</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Bio</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Date Joined</div>
                <div style={{ flex: '1', textAlign: 'center' }}>City</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Location</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Role</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Account Status</div>
                <div style={{ flex: '1', textAlign: 'center' }}>Actions</div>
            </div> */}
            {users.filter(user => user.id !== CookiesService.getUserId()).map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onChangeRole={handleRoleChange}
                    onToggleBoolean={handleToggleBoolean}
                    onDeleteUser={handleDeleteUser}
                />
            ))}
        </div>
    );
};

export default UserList;