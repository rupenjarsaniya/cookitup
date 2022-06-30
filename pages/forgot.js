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
    Link,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import ForgotPassEmailVlidator from "../validators/ForgotPasswordValidator";

const handleSendOtp = () => {
    console.log("values");
}

const handleNewPassword = () => {
    console.log("nvalues");
}


useEffect(() => {

    if (!localStorage.getItem('token')) router.push("/");

}, []);


const Forgot = () => {
    return (
        <>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Forgot Password">
                        <Stack spacing={3}>
                            <TextField id="email-basic" name="email" label="Email" variant="outlined" />

                            <Button type="submit" variant="contained" mt={2}>
                                Send OTP
                            </Button>
                        </Stack>
                        <Stack spacing={3}>
                            <TextField
                                id="pass-basic"
                                label="New Password"
                                type="password"
                                name="password"
                                variant="outlined"
                            />

                            <TextField
                                id="pass-basic"
                                label="New Confirm Password"
                                type="password"
                                name="confirmpassword"
                                variant="outlined"
                            />

                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Show Password"
                            />
                        </Stack>
                        <br />
                        <Button type="submit" variant="contained" mt={2}>
                            Continue
                        </Button>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Forgot