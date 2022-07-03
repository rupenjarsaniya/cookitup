import React, { useEffect, useState } from 'react'
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Changepassword = () => {

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        currentpassword: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
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

    const [show, setShow] = useState(false);

    const [passwords, setPasswords] = useState({ currentpassword: "", password: "", confirmpassword: "" });

    const handlePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handlePasswordSubmit = async () => {

        const token = localStorage.getItem('token');
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

    useEffect(() => {
        if (!localStorage.getItem('token')) router.push("/login");
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
                    <BaseCard title="Change Password">
                        <form className="form" onSubmit={handleSubmit(handlePasswordSubmit)}>

                            <TextField
                                id="pass-basic"
                                label="Current Password"
                                type={`${show ? "text" : "password"}`}
                                name="currentpassword"
                                variant="outlined"
                                {...register('currentpassword')}
                                onChange={handlePasswords}
                            />
                            {
                                errors.currentpassword && <span style={{ color: "red", fontSize: 13 }}>{errors.currentpassword.message}</span>
                            }

                            <TextField
                                id="pass-basic2"
                                label="New Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                {...register('password')}
                                onChange={handlePasswords}
                                style={{ marginTop: 20 }}
                            />
                            {
                                errors.password && <span style={{ color: "red", fontSize: 13 }}>{errors.password.message}</span>
                            }

                            <TextField
                                id="pass-basic3"
                                label="New Confirm Password"
                                type="password"
                                name="confirmpassword"
                                variant="outlined"
                                {...register('confirmpassword')}
                                onChange={handlePasswords}
                                style={{ marginTop: 20 }}
                            />
                            {
                                errors.confirmpassword && <span style={{ color: "red", fontSize: 13 }}>{errors.confirmpassword.message}</span>
                            }

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Show Password"
                                onChange={() => { setShow(!show) }}
                                style={{ marginTop: 20 }}
                            />
                            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
                                Change Password
                            </Button>
                        </form>
                        <Typography variant="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} color="primary">
                            <Link href={"/forgot"}>
                                <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                    Forgot Password
                                </Typography>
                            </Link>
                        </Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Changepassword