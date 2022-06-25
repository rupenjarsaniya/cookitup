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

const Changepassword = () => {
    return (
        <>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Change Password">
                        <Stack spacing={3}>
                            <TextField
                                id="pass-basic"
                                label="Current Password"
                                type="password"
                                variant="outlined"
                            />
                            <TextField
                                id="pass-basic"
                                label="New Password"
                                type="password"
                                variant="outlined"
                            />
                            <TextField
                                id="pass-basic"
                                label="New Confirm Password"
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
                        </Stack>
                        <br />
                        <Button variant="contained" mt={2}>
                            Change Password
                        </Button>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Changepassword