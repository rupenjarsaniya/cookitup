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
    Avatar,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Link from 'next/link';

const Signup = () => {
    return (
        <>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Create Your Account">
                        <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src=""
                                sx={{ width: 100, height: 100, margin: "auto" }}
                            />
                        </Typography>
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
                            <Typography variant="div" style={{ color: "gray" }}>
                                Select Profile Photo
                            </Typography>
                            <input type="file" id="actual-btn" name="recipeimg" />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Show Password"
                            />
                            <Link href={"/login"}>
                                <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                    Login Here!
                                </Typography>
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