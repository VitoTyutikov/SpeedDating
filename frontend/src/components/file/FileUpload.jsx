import { useState, useRef } from 'react';
import apiRequest from '../../service/api/ApiRequest';
import { File } from '../../service/api/File';
function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        apiRequest(File.uploadFile, formData)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                onUpload(data);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });

    };

    return (
        <div>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} required />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
