import { useState } from 'react';
import axios from 'axios';
import { CookiesService } from '../../service/cookies/Cookies';
function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + CookiesService.getAccessToken(),
                // 'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Assuming the server response is in JSON format
            })
            .then(data => {
                
                // data = data.replace(/"/g, '')
                console.log('File uploaded successfully:', data);
                onUpload(data); // Handle the response data
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });

    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
