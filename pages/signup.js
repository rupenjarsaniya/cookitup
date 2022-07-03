import React, { useEffect, useState } from 'react'
import {
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    Avatar,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import FormData from 'form-data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Signup = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const actions = bindActionCreators(actionCreators, dispatch);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters'),
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
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


    const [userdata, setUserdata] = useState({ username: "", name: "", email: "", password: "", profileimg: "" });
    const [profileImgPre, setProfileImgPre] = useState("");
    const [show, setShow] = useState(false);

    const handleData = (e) => {
        if (e.target.name === "profileimg") {
            // setProfileImgPre(e.target.files[0].name);
            setUserdata({ ...userdata, [e.target.name]: e.target.files[0] });
        }
        else {
            setUserdata({ ...userdata, [e.target.name]: e.target.value });
        }
    }

    const handleSignup = async () => {

        const formdata = new FormData();
        formdata.set("username", userdata.username);
        formdata.set("name", userdata.name);
        formdata.set("email", userdata.email);
        formdata.set("password", userdata.password);
        formdata.set("profileimg", userdata.profileimg);

        try {

            const res = await axios.post('http://localhost:3000/api/signup', formdata, {
                headers: { "content-type": "multipart/form-data" }
            });

            if (res.status === 200) {
                actions.getUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUserdata({ name: "", email: "", password: "", profileimg: "" });
                router.push("/");
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

        if (localStorage.getItem('token')) router.push("/");

    }, []);

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
                    <BaseCard title="Create Your Account">
                        <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src=""
                                sx={{ width: 100, height: 100, margin: "auto" }}
                            />
                        </Typography>
                        <form className='form' onSubmit={handleSubmit(handleSignup)}>
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                type="text"
                                {...register('username')}
                                onChange={handleData}
                                style={{ width: "100%" }}
                                value={userdata.username}
                            />
                            {
                                errors.username && <span style={{ color: "red", fontSize: 13 }}>{errors.username.message}</span>
                            }

                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                type="text"
                                {...register('name')}
                                onChange={handleData}
                                style={{ width: "100%", marginTop: 20 }}
                                value={userdata.name}
                            />
                            {
                                errors.name && <span style={{ color: "red", fontSize: 13 }}>{errors.name.message}</span>
                            }

                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                {...register('email')}
                                onChange={handleData}
                                style={{ width: "100%", marginTop: 20 }}
                                value={userdata.email}
                            />
                            {
                                errors.email && <span style={{ color: "red", fontSize: 13 }}>Email not valid</span>
                            }

                            <TextField
                                id="pass-basic"
                                label="Password"
                                type={`${show ? "text" : "password"}`}
                                name="password"
                                variant="outlined"
                                {...register('password')}
                                onChange={handleData}
                                style={{ width: "100%", marginTop: 20 }}
                                value={userdata.password}
                            />
                            {
                                errors.password && <span style={{ color: "red", fontSize: 13 }}>{errors.password.message}</span>
                            }

                            <Typography variant="div" style={{ color: "gray", marginTop: 20 }}>
                                Select Profile Photo
                            </Typography>

                            <input
                                type="file"
                                id="actual-btn"
                                name="profileimg"
                                style={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                }}
                                onChange={handleData}
                            />

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Show Password"
                                style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
                                onClick={() => setShow(!show)}
                            />

                            <Button type="submit" variant="contained">
                                Sign up
                            </Button>
                        </form>

                        <Typography variant="div" mt={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} color="primary">
                            <Link href={"/login"}>
                                <Typography variant="div" style={{ cursor: "pointer" }} color="primary">
                                    Login Here!
                                </Typography>
                            </Link>
                        </Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Signup