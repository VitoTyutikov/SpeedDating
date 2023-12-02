// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User } from '../../service/api/User';
// import { CookiesService } from '../../service/cookies/Cookies';
import useUser from '../../hooks/useUser';


function Profile(props) {
    
    // const navigate = useNavigate();
    const user = useUser();
    // console.log(user);
    // const [userData, setUserData] = useState(null);
    // useEffect(() => {
    //     async function fetchData() {
    //         if (!CookiesService.cookiesExist()) {
    //             navigate("/login");
    //             return;
    //         }
    //         try {

    //             let response = await User.profileData();
    //             let data = await response.json();
    //             setUserData(data);
    //         } catch (error) {
    //             try {
    //                 await User.updateToken();
    //                 let response = await User.profileData();
    //                 let data = await response.json();
    //                 setUserData(data);
    //             } catch (error) {
    //                 navigate("/login");
    //             }
    //         }
    //     }
    //     fetchData();
    // }, [navigate]);


    return (//TODO: add edit
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

export default Profile;