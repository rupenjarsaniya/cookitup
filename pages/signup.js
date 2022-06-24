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

const Signup = () => {
    return (
        <>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Create Your Account">
                        <Stack spacing={3}>
                            <TextField
                                id="name-basic"
                                label="Name"
                                variant="outlined"
                                type="text"
                            />
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
                            <Link href="/login" underline="hover">
                                Login Here!
                            </Link>
                        </Stack>
                        <br />
                        <Button variant="contained" mt={2}>
                            Sign up
                        </Button>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Signup