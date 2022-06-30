import React, { useEffect, useState } from 'react'
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    FormControl,
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

const Login = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const actions = bindActionCreators(actionCreators, dispatch);

    const [userdata, setUserdata] = useState({ email: "", password: "" });

    const handleData = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post('http://localhost:3000/api/login', userdata, {
                headers: { "content-type": "application/json" }
            });

            console.log(res);

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

                setUserdata({ email: "", password: "" });
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
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <BaseCard title="Login Here!">
                        <form className="form" onSubmit={handleLogin}>
                            <TextField
                                style={{ width: "100%" }}
                                type="email"
                                id="email"
                                name='email'
                                label="Email"
                                variant="outlined"
                                required
                                onChange={handleData}
                                value={userdata.email}
                            />

                            <TextField
                                id="Password"
                                label="Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                required
                                style={{ width: "100%", marginTop: 20 }}
                                onChange={handleData}
                                value={userdata.password}
                            />

                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Show Password"
                                style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
                            />

                            <Button type="submit" variant="contained">
                                Log in
                            </Button>

                        </form>
                        <Typography variant="div" mt={3} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} color="primary">
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