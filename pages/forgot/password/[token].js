import React, { useEffect, useState } from 'react'
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
} from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Token = () => {

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwords, setPasswords] = useState({ password: "", confirmpassword: "" });
    const handlePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleForgotSubmit = async () => {
        const token = router.query.token.split('=')[1];
        try {
            const res = await axios.post(`/api/forgotpassword`, passwords, {
                headers: { "content-type": "application/json", "passtoken": token }
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
                router.push('/login');
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
                    <BaseCard title="Forgot Password">
                        <form className='form' onSubmit={handleSubmit(handleForgotSubmit)}>

                            <TextField
                                id="pass-basic"
                                label="New Password"
                                type={`${passwordShow ? "text" : "password"}`}
                                name="password"
                                variant="outlined"
                                {...register('password')}
                                value={passwords.password}
                                onChange={handlePasswords}
                            />
                            {
                                errors.password && <span style={{ color: "red", fontSize: 13 }}>{errors.password.message}</span>
                            }

                            <TextField
                                id="pass-basic2"
                                label="New Confirm Password"
                                type="password"
                                name="confirmpassword"
                                variant="outlined"
                                {...register('confirmpassword')}
                                value={passwords.confirmpassword}
                                onChange={handlePasswords}
                                style={{ marginTop: 20 }}
                            />
                            {
                                errors.confirmpassword && <span style={{ color: "red", fontSize: 13 }}>{errors.confirmpassword.message}</span>
                            }

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Show Password"
                                onChange={() => { setPasswordShow(!passwordShow) }}
                                style={{ marginTop: 20 }}
                            />
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

export default Token