import React from 'react'
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
    Typography,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Link from 'next/link';

const Login = () => {
    return (
        <>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Login Here!">
                        <Stack spacing={3}>
                            <TextField id="email-basic" label="Email" variant="outlined" />
                            <TextField
                                id="pass-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Show Password"
                            />
                            <Link href={"/forgot"}>
                                <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                    Forgot Password
                                </Typography>
                            </Link>
                            <Link href={"/signup"}>
                                <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                    Signup Here!
                                </Typography>
                            </Link>
                        </Stack>
                        <br />
                        <Button variant="contained" mt={2}>
                            Log in
                        </Button>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Login