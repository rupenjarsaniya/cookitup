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
    Avatar,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updateprofile = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const userdata = useSelector(state => state.user);
    const actions = bindActionCreators(actionCreators, dispatch);

    const [updateData, setUpdateData] = useState({ name: "", email: "", profileimg: "" });

    const handleUpdateData = (e) => {
        if (e.target.name === 'profileimg') {
            setUpdateData({ ...updateData, [e.target.name]: e.target.files[0] });
        }
        else {
            setUpdateData({ ...updateData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formdata = new FormData();
            formdata.set("name", updateData.name);
            formdata.set("email", updateData.email);
            formdata.set("profileimg", updateData.profileimg);

            const res = await axios.put('http://localhost:3000/api/updateprofile', formdata, {
                headers: { "content-type": "multipart/form-data", "token": token }
            });

            if (res.status === 200) {
                actions.getUser(res.data.user);
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                router.push("/profile/" + userdata.name);
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
                    <BaseCard title="Edit Profile">
                        <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={userdata && userdata.profileimg}
                                sx={{ width: 100, height: 100, margin: "auto", objectFit: "fill" }}
                            />
                        </Typography>
                        <form className="form" onSubmit={handleSubmit}>

                            <Stack spacing={3}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    defaultValue={userdata && userdata.name}
                                    onChange={handleUpdateData}
                                />


                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    defaultValue={userdata && userdata.email}
                                    onChange={handleUpdateData}
                                />


                                <Typography variant="div" style={{ color: "gray" }}>
                                    Select Profile Photo
                                </Typography>

                                <input type="file" id="actual-btn" name="profileimg" onChange={handleUpdateData} />

                                <Link href={"/changepassword"}>
                                    <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                        Change Password
                                    </Typography>
                                </Link>

                            </Stack>
                            <br />
                            <Button type="submit" variant="contained" mt={2}>
                                Update Profile
                            </Button>
                        </form>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Updateprofile