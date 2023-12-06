import styles from './Profile.module.css';
import { User } from '../../service/api/User';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiRequest from '../../service/api/ApiRequest';
import UserProfileDetail from './UserProfileDetail';
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
        <div className="profile">
            {user ? (
                <>
                    <img src={user.profilePicture.replace(/"/g, '')} alt="Profile" className={styles.profilePicture} />
                    <h1>{user.username}</h1>
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
                <p>Loading...</p>
            )}
        </div>

    );
}

export default UserProfile;