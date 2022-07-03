import React, { useEffect, useState } from 'react'
import {
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const actions = bindActionCreators(actionCreators, dispatch);


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .email('Email is invalid'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;


    const [userdata, setUserdata] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);

    const handleData = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value });
    }

    const handleLogin = async () => {
        console.log(errors);

        try {

            const res = await axios.post(`${process.env.PROD_URL}/api/login`, userdata, {
                headers: { "content-type": "application/json" }
            });

            console.log(res);

            if (res.status === 200) {
                actions.getUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setUserdata({ email: "", password: "" });
                setTimeout(() => {
                    router.push("/");
                }, 500);
            }

            else {
                toast.error(res.response.data, {
                    position: "top-left",
                    autoClose: 1000,
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
                autoClose: 1000,
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

    }, []);

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Login Here!">
                        <form className="form" onSubmit={handleSubmit(handleLogin)}>
                            <TextField
                                style={{ width: "100%" }}
                                type="email"
                                id="email"
                                name='email'
                                label="Email"
                                {...register('email')}
                                variant="outlined"
                                onChange={handleData}
                                value={userdata.email}
                            />
                            {
                                errors.email && <span style={{ color: "red", fontSize: 13 }}>Email not valid</span>
                            }

                            <TextField
                                id="Password"
                                label="Password"
                                type={`${show ? "text" : "password"}`}
                                name="password"
                                variant="outlined"
                                {...register('password')}
                                style={{ width: "100%", marginTop: 20 }}
                                onChange={handleData}
                                value={userdata.password}
                            />
                            {
                                errors.password && <span style={{ color: "red", fontSize: 13 }}>{errors.password.message}</span>
                            }

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Show Password"
                                style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
                                onClick={() => setShow(!show)}
                            />

                            <Button type="submit" variant="contained">
                                Log in
                            </Button>
                        </form>
                        <Typography variant="div" mt={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} color="primary">
                            <Link href={"/forgot"}  >
                                <Typography variant="div" style={{ cursor: "pointer" }} color="primary">
                                    Forgot Password&nbsp; | &nbsp;
                                </Typography>
                            </Link>

                            <Link href={"/signup"}  >
                                <Typography variant="div" style={{ cursor: "pointer" }} color="primary">
                                    Signup Here!
                                </Typography>
                            </Link>
                        </Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Login