import React, { useState } from 'react';
import css from './UserList.module.css'; // Make sure to create a corresponding CSS module

function UserCard({ user, onDeleteUser, onToggleBoolean, onChangeRole }) {
    const [userDetails, setUserDetails] = useState(user);

    const handleRoleChange = () => {
        // Call the passed onChangeRole function with the new role
        // onChangeRole(userDetails.id, userDetails.role === 'ADMIN' ? 'USER' : 'ADMIN');
    };

    const handleToggleNonLocked = (field) => {
        // Update the state and call the passed onToggleBoolean function
        const updatedUserDetails = { ...userDetails, [field]: !userDetails[field] };
        setUserDetails(updatedUserDetails);
        // onToggleBoolean(userDetails.id, field, updatedUserDetails[field]);
    };

    const handleDeleteUser = () => {
        // Call the passed onDeleteUser function
        onDeleteUser(userDetails.id);
    }

    return (
        <div className={css.userCard}>
            <div className={css.cell}>{userDetails.username}</div>
            <div className={css.cell}>{userDetails.firstName}</div>
            <div className={css.cell}>{userDetails.lastName}</div>
            <div className={css.cell}>{userDetails.email}</div>
            <div className={css.cell}>{userDetails.gender}</div>
            <div className={css.cell}>{userDetails.profilePicture}</div>
            <div className={css.cell}>{userDetails.dateOfBirth}</div>
            <div className={css.cell}>{userDetails.bio}</div>
            <div className={css.cell}>{userDetails.dateJoined}</div>
            <div className={css.cell}>{userDetails.city}</div>
            <div className={css.cell}>{userDetails.location}</div>
            <div className={css.cell}>
                <button onClick={handleRoleChange}>
                    {userDetails.role}
                </button>
            </div>
            <div className={css.cell}>
                <label>
                    <input
                        type="checkbox"
                        checked={userDetails.accountNonLocked}
                        onChange={() => handleToggleNonLocked}
                    />
                    Non-Locked
                </label>
            </div>
            <div className={css.cell}>
                <button onClick={() => onDeleteUser(userDetails.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UserCard;