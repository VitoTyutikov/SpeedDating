// UserList.jsx
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'; // Assuming UserCard is in the same directory
import { User } from '../../service/api/User';
import { CookiesService } from '../../service/cookies/Cookies';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (CookiesService.getExpiration() < Date.now() + 40) {
            User.updateToken()
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
                        CookiesService.clearCookies();
                        throw new Error('Invalid response from server');
                    }
                    CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
                })
                .then(() => {
                    User.getAllUsers()
                        .then(response => response.json())
                        .then(data => {
                            setUsers(data);
                        })
                });
        } else {
            User.getAllUsers()
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                })
        }
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
        if (CookiesService.getExpiration() < Date.now() + 40) {
            User.updateToken()
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.access === undefined || data.refresh === undefined || data.roles === undefined || data.expiration === undefined) {
                        CookiesService.clearCookies();
                        throw new Error('Invalid response from server');
                    }
                    CookiesService.setCookies(data.access, data.refresh, data.roles, data.expiration);
                })
                .then(() => {
                    User.deleteUser(userId)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Failed to delete user');
                            }
                        })
                        .then(() => {
                            User.getAllUsers()
                                .then(response => response.json())
                                .then(data => {
                                    setUsers(data);
                                });
                        })
                });
        } else {
            User.deleteUser(userId)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                })
                .then(() => {
                    User.getAllUsers()
                        .then(response => response.json())
                        .then(data => {
                            setUsers(data);
                        });
                })
        }




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
            {users.map(user => (
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