import { useState, useRef } from 'react';
import apiRequest from '../../service/api/ApiRequest';
import { File } from '../../service/api/File';
import { Button, FormControl, Input } from '@mui/material';
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
        <FormControl>
            {/* <InputLabel htmlFor="file-input">Upload File</InputLabel>
            <InputLabel htmlFor="file-input"></InputLabel> */}
            <Input
                lang='en'
                id="file-input"
                type="file"
                inputRef={fileInputRef}
                onChange={handleFileChange}
                required
            />
            <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
        </FormControl>
    );
}

export default FileUpload;
