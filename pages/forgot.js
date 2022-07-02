import React, { useEffect, useState } from 'react'
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

    const router = useRouter();
    const [show, setShow] = useState();
    const [passwordShow, setPasswordShow] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmpassword: "" });

    const handlePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:3000/api/sendotp', email, {
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

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = { email, otp }
        try {
            const res = await axios.post('http://localhost:3000/api/checkotp', data, {
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
                setEmail("");
                setOtp("");
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

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:3000/api/forgotpassword', passwords, {
                headers: { "content-type": "application/json", "token": token, "passtoken": router.query.token }
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

    useEffect(() => {
        if (!localStorage.getItem('token')) router.push("/");
    }, []);

    useEffect(() => {
        if (router.query.token) setShow(true);
        else setShow(false);
    }, [router.query]);

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
                    <BaseCard title="Forgot Password">
                        {!show
                            ? <>
                                <form className='form' style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField id="email-basic" name="email" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} value={email} required />

                                        <Button type="submit" variant="contained" mt={2}>
                                            Send OTP
                                        </Button>

                                    </Stack>
                                </form>
                                <form className='form' style={{ marginBottom: 20 }} onSubmit={handleOtpSubmit}>
                                    <Stack spacing={3}>
                                        <TextField id="otp-basic" name="otp" label="Otp" variant="outlined" onChange={(e) => { setOtp(e.target.value) }} value={otp} required />

                                        <Button type="submit" variant="contained" mt={2}>
                                            Continue
                                        </Button>

                                    </Stack>
                                </form>
                            </>
                            : <form className='form' onSubmit={handleForgotSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        id="pass-basic"
                                        label="New Password"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        required
                                        value={passwords.password}
                                        onChange={handlePasswords}
                                    />

                                    <TextField
                                        id="pass-basic2"
                                        label="New Confirm Password"
                                        type="password"
                                        name="confirmpassword"
                                        variant="outlined"
                                        required
                                        value={passwords.confirmpassword}
                                        onChange={handlePasswords}
                                    />

                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Show Password"
                                        onChange={() => { setPasswordShow(!passwordShow) }}
                                    />
                                    <Button type="submit" variant="contained" mt={2}>
                                        Continue
                                    </Button>
                                </Stack>
                            </form>
                        }
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Forgot