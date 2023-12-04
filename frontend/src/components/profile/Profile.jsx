import useUser from '../../hooks/useUser';
import { useState, useEffect } from 'react';
import { User } from '../../service/api/User';
import apiRequest from '../../service/api/ApiRequest';

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const user = useUser();

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        profilePicture: '',
        dateOfBirth: '',
        bio: '',
        city: '',
    });
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                password: '',
                gender: user.gender || '',
                profilePicture: user.profilePicture || '',
                dateOfBirth: user.dateOfBirth || '',
                bio: user.bio || '',
                city: user.city || '',
            });
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };
    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        apiRequest(User.updateUser, formData)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

        setEditMode(false);
    };

    const renderUserInfo = () => (//TODO: add confirmation
        <>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <p>
                        <strong>Profile Picture:</strong>
                        <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
                        <strong>FirstName:</strong>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <strong>LastName:</strong>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        <strong>City:</strong>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        <strong>Date of Birth:</strong>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        <strong>Bio:</strong>
                        <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                    </p>
                    <button type="submit" onClick={handleSubmit}>Save</button>
                    <button type="button" onClick={handleEditToggle}>Cancel</button>
                </form>
            ) : (
                <>
                    <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                    <h1>{user.username}</h1>
                    <UserProfileDetail label="Name" value={`${user.firstName} ${user.lastName}`} />
                    <UserProfileDetail label="Email" value={user.email} />
                    <UserProfileDetail label="Gender" value={user.gender} />
                    <UserProfileDetail label="City" value={user.city} />
                    <UserProfileDetail label="Date of Birth" value={user.dateOfBirth} />
                    <UserProfileDetail label="Bio" value={user.bio} />
                    <UserProfileDetail label="Date Joined" value={user.dateJoined} />
                    <button onClick={handleEditToggle}>Edit</button>
                </>
            )}
        </>
    );

    const userInfo = user && renderUserInfo();

    return <div className="profile">{userInfo || <p>Loading...</p>}</div>;
}

function UserProfileDetail({ label, value }) {
    return (
        <p>
            <strong>{label}:</strong> {value}
        </p>
    );
}

export default Profile;