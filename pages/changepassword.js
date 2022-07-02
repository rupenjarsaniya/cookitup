import React, { useState } from 'react'
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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Changepassword = () => {

    const router = useRouter();

    const token = localStorage.getItem('token');

    const [show, setShow] = useState(false);

    const [passwords, setPasswords] = useState({ currentpassword: "", password: "", confirmpassword: "" });

    const handlePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put('http://localhost:3000/api/changepassword', passwords, {
                headers: { "content-type": "application/json", "token": token }
            });

            if (res.status === 200) {
                toast.success(res.data, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                router.push('/');
            }
            else {
                toast.error(res.response.data, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Change Password">
                        <form className="form" onSubmit={handleSubmit}>

                            <Stack spacing={2}>
                                <TextField
                                    id="pass-basic"
                                    label="Current Password"
                                    type={`${show ? "text" : "password"}`}
                                    name="currentpassword"
                                    variant="outlined"
                                    onChange={handlePasswords}
                                />


                                <TextField
                                    id="pass-basic2"
                                    label="New Password"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    onChange={handlePasswords}
                                />

                                <TextField
                                    id="pass-basic3"
                                    label="New Confirm Password"
                                    type="password"
                                    name="confirmpassword"
                                    variant="outlined"
                                    onChange={handlePasswords}
                                />

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Show Password"
                                    onChange={() => { setShow(!show) }}
                                />
                                <Button type="submit" variant="contained">
                                    Change Password
                                </Button>
                            </Stack>
                        </form>
                        <Link href={"/forgot"}>
                            <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                Forgot Password
                            </Typography>
                        </Link>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Changepassword