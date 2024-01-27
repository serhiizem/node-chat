import React, {FormEventHandler} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {extractFormDataAsJson} from "../../utils/formUtils";
import {login} from "../../api/usersApi";
import {User} from "../../types/User";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export const Login: React.FC = () => {

    const signIn = useSignIn()
    const navigate = useNavigate();

    const handleSubmit: FormEventHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {email, password} = extractFormDataAsJson(event) as any;
        const user: User = {email, password};
        const authResponse = await login(user);
        signIn({
            auth: {
                token: authResponse.data.token,
                type: "Bearer"
            }
        });
        navigate("/chat");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}