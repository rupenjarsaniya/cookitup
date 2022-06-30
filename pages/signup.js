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

const Signup = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const actions = bindActionCreators(actionCreators, dispatch);

    const [userdata, setUserdata] = useState({ name: "", email: "", password: "", profileimg: "" });
    const [profileImgPre, setProfileImgPre] = useState("");

    const handleData = (e) => {
        if (e.target.name === "profileimg") {
            // setProfileImgPre(e.target.files[0].name);
            setUserdata({ ...userdata, [e.target.name]: e.target.files[0] });
        }
        else {
            setUserdata({ ...userdata, [e.target.name]: e.target.value });
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
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
                        <form className='form' onSubmit={handleSignup}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                type="text"
                                onChange={handleData}
                                style={{ width: "100%" }}
                                required
                                value={userdata.name}
                            />


                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                onChange={handleData}
                                style={{ width: "100%", marginTop: 20 }}
                                required
                                value={userdata.email}
                            />


                            <TextField
                                id="pass-basic"
                                label="Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                onChange={handleData}
                                style={{ width: "100%", marginTop: 20 }}
                                required
                                value={userdata.password}
                            />

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
                                control={<Checkbox defaultChecked />}
                                label="Show Password"
                                style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
                            />

                            <Button type="submit" variant="contained">
                                Sign up
                            </Button>
                        </form>


                        <Typography variant="div" mt={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} color="primary">
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