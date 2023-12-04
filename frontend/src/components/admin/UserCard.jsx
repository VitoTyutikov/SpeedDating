import { useState } from 'react';
import css from './UserList.module.css'

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
                        onChange={handleToggleNonLocked}
                    />
                    Non-Locked
                </label>
            </div>
            <div className={css.cell}>
                <button style={{ backgroundColor: 'red' }} onClick={() => onDeleteUser(userDetails.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UserCard;