import React, { useEffect, useState } from 'react'
import {
    Grid,
    TextField,
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Updateprofile = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const userdata = useSelector(state => state.user);
    const actions = bindActionCreators(actionCreators, dispatch);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .email('Email is invalid'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [updateData, setUpdateData] = useState({ name: "", email: "", profileimg: "" });

    const handleUpdateData = (e) => {
        if (e.target.name === 'profileimg') {
            setUpdateData({ ...updateData, [e.target.name]: e.target.files[0] });
        }
        else {
            setUpdateData({ ...updateData, [e.target.name]: e.target.value });
        }
    }

    const handleRegister = async () => {
        try {
            const token = localStorage.getItem('token');
            const formdata = new FormData();
            formdata.set("name", updateData.name);
            formdata.set("email", updateData.email);
            formdata.set("profileimg", updateData.profileimg);

            const res = await axios.put(`/api/updateprofile`, formdata, {
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
        if (!localStorage.getItem('token')) router.push("/login");

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
                    <BaseCard title="Edit Profile">
                        <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={userdata && userdata.profileimg}
                                sx={{ width: 100, height: 100, margin: "auto", objectFit: "fill" }}
                            />
                        </Typography>
                        <form className="form" onSubmit={handleSubmit(handleRegister)}>



                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                type="text"
                                {...register('name')}
                                defaultValue={userdata && userdata.name}
                                onChange={handleUpdateData}
                                style={{ marginTop: 20 }}
                            />
                            {
                                errors.name && <span style={{ color: "red", fontSize: 13 }}>{errors.name.message}</span>
                            }

                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                {...register('email')}
                                defaultValue={userdata && userdata.email}
                                onChange={handleUpdateData}
                                style={{ marginTop: 20 }}
                            />
                            {
                                errors.email && <span style={{ color: "red", fontSize: 13 }}>Email must be valid</span>
                            }

                            <Typography variant="div" style={{ color: "gray", marginTop: 20 }}>
                                Select Profile Photo
                            </Typography>

                            <input type="file" id="actual-btn" name="profileimg" onChange={handleUpdateData}
                                style={{ marginTop: 20 }} />

                            <Button type="submit" variant="contained"
                                style={{ marginTop: 20 }}>
                                Update Profile
                            </Button>
                        </form>
                        <Typography variant="div" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} color="primary">
                            <Link href={"/changepassword"}>
                                <Typography variant="div" mt={3} style={{ cursor: "pointer" }} color="primary">
                                    Change Password
                                </Typography>
                            </Link>
                        </Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Updateprofile