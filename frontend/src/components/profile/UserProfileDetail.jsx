import { Typography } from '@mui/material';

function UserProfileDetail({ label, value }) {
    return (
        <Typography>
            <strong>{label}:</strong> {value}
        </Typography>
    );
}
export default UserProfileDetail;