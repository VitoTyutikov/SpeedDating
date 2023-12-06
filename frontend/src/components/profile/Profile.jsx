import useUser from '../../hooks/useUser';
import { useState, useEffect } from 'react';
import { User } from '../../service/api/User';
import apiRequest from '../../service/api/ApiRequest';
import UserProfileDetail from './UserProfileDetail';
import FileUpload from '../file/FileUpload';
import styles from './Profile.module.css'
import { File } from '../../service/api/File';
function Profile() {
    const [editMode, setEditMode] = useState(false);
    const user = useUser();
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    const handleUpload = (url) => {
        apiRequest(File.getPhotoAfterUpload, url, user.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setProfilePictureUrl(url);
                setFormData(prevData => ({
                    ...prevData,
                    profilePicture: url
                }));
            })
            .catch(error => {
                console.error('Error updating profile picture:', error);
            });
    };
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
            setProfilePictureUrl(user.profilePicture || '');
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

    const handleEditBalance = (event) => {
        event.preventDefault();
        apiRequest(User.updateBalance, user.id, 100)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error updating balance:', error);
            })

    }

    const renderUserInfo = () => (
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
                    <div>
                        <FileUpload onUpload={handleUpload} />
                        {profilePictureUrl && <img src={profilePictureUrl.replace(/"/g, '')} alt="Profile" className={styles.profilePicture} />}
                    </div>
                    <h1>{user.username}</h1>
                    <UserProfileDetail label="Name" value={`${user.firstName} ${user.lastName}`} />
                    <UserProfileDetail label="Email" value={user.email} />
                    <UserProfileDetail label="Gender" value={user.gender} />
                    <UserProfileDetail label="City" value={user.city} />
                    <UserProfileDetail label="Date of Birth" value={user.dateOfBirth} />
                    <UserProfileDetail label="Bio" value={user.bio} />
                    <UserProfileDetail label="Date Joined" value={user.dateJoined} />
                    <UserProfileDetail label="Balance" value={user.balance} />
                    <UserProfileDetail label="Role" value={user.role} />
                    <button onClick={handleEditBalance}>Top-Up Balance for 100</button>
                    <button onClick={handleEditToggle}>Edit Profile</button>
                </>
            )}
        </>
    );

    const userInfo = user && renderUserInfo();

    return <div className="profile">{userInfo || <p>Loading...</p>}</div>;
}


export default Profile;