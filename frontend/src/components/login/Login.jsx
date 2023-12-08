import { useState } from 'react';
import { User } from '../../service/api/User';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        User.login(username, password)
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/profile';
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                alert('Login failed. Please try again.');
            })

    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;

