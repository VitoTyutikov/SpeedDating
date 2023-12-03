import './Profile.module.css';
import { User } from '../../service/api/User';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { CookiesService } from '../../service/cookies/Cookies';
// import { useNavigate } from 'react-router-dom';
function UserProfile() {//TODO: add send message if userId!= cookies.userId



    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await User.getUserById(id);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Get user failed:', error);
            }
        };

        fetchUser();
    }, [id]); // Re-run the effect when `id` changes
    return (
        <div className="profile">
            {user ? (
                <div>
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <h1>{user.username}</h1>
                    <p>
                        <strong>Name:</strong> {user.firstName} {user.lastName}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Gender:</strong> {user.gender}
                    </p>
                    <p>
                        <strong>City:</strong> {user.city}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong> {user.dateOfBirth}
                    </p>
                    <p>
                        <strong>Bio:</strong> {user.bio}
                    </p>
                    <p>
                        <strong>Date Joined:</strong> {user.dateJoined}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;