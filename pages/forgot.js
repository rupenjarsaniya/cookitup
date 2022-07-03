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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Forgot = () => {

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        otp: Yup.string()
            .required('OTP cannot be blank')
            .min(6, 'Password must be 6 digits')
            .max(6, 'Password must be 6 digits'),
        email: Yup.string()
            .required('Email is required')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .email('Email is invalid')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");


    const handleSendOtp = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/sendotp', email, {
                headers: { "content-type": "application/json" }
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

    const handleOtpSubmit = async () => {
        const data = { email, otp }
        try {
            const res = await axios.post('http://localhost:3000/api/checkotp', data, {
                headers: { "content-type": "application/json" }
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

    useEffect(() => {
        if (localStorage.getItem('token')) router.push("/");
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
                        <form className='form' style={{ marginBottom: 20 }} onSubmit={handleSubmit(handleSendOtp)}>

                            <TextField id="email-basic" type="email" name="email" label="Email" variant="outlined" {...register('email')} onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            {
                                errors.email && <span style={{ color: "red", fontSize: 13 }}>Email not valid</span>
                            }
                            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
                                Send OTP
                            </Button>

                        </form>
                        <form className='form' style={{ marginBottom: 20 }} onSubmit={handleSubmit(handleOtpSubmit)}>

                            <TextField id="otp-basic" type="number" name="otp" label="Otp" variant="outlined" {...register('otp')} onChange={(e) => { setOtp(e.target.value) }} value={otp} />
                            {
                                errors.otp && <span style={{ color: "red", fontSize: 13 }}>{errors.otp.message}</span>
                            }
                            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
                                Continue
                            </Button>

                        </form>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Forgot