import {
    FormControl, FormControlLabel, FormLabel, Grid, Radio, Link, RadioGroup, TextField, Typography, Button, List, ListItem, ListItemAvatar, Avatar, IconButton, ListItemText, InputLabel, Select, MenuItem, OutlinedInput, useTheme
} from '@mui/material'
import axios from 'axios';
import FeatherIcon from "feather-icons-react";
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../States/index';

const ProfileLeft = ({ user }) => {

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const actions = bindActionCreators(actionCreators, dispatch);

    const userdata = useSelector(state => state.user);

    const [prInfo, setPrInfo] = useState({ expertin: "", location: "", expirence: "", gender: "" });

    const handleInfo = (e) => {
        setPrInfo({ ...prInfo, [e.target.name]: e.target.value });
    }



    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        try {
            const res = await axios.put(`/api/updateprofile`, prInfo, {
                headers: { "content-type": "multipart/form-data", "token": token }
            });

            console.log(res);
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
                setShow(false);
                setPrInfo({ expertin: "", location: "", expirence: "", gender: "" });
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
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <Typography variant="div" style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                        <Typography variant="div" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <Typography variant="div" color="primary">
                                Personal Information
                            </Typography>
                            {
                                userdata && user._id === userdata._id &&

                                <IconButton aria-label="user" color="primary" onClick={() => setShow(!show)}>
                                    <FeatherIcon icon="edit-2" width="20" height="20" />
                                </IconButton>
                            }
                        </Typography>
                        {
                            show
                                ? <Typography variant="div">
                                    <form className="form" onSubmit={handleSubmit}>

                                        <FormControl style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-standard-label" Expert Inclas style={{ marginTop: 20 }}>Expert In</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                label="Expert In"
                                                name="expertin"
                                                variant='standard'
                                                style={{ marginTop: 40 }}
                                                onChange={handleInfo}
                                            >
                                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                                <MenuItem value="Lunch">Lunch</MenuItem>
                                                <MenuItem value="Dinner">Dinner</MenuItem>
                                            </Select>

                                            <TextField
                                                id="standard-basic"
                                                label="Location"
                                                name="location"
                                                variant="standard"
                                                style={{ marginTop: 20 }}
                                                onChange={handleInfo}
                                            />


                                            <TextField
                                                id="standard-basic"
                                                label="Cooking Expirence"
                                                name="expirence"
                                                variant="standard"
                                                style={{ marginTop: 20 }}
                                                onChange={handleInfo}
                                            />

                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="male"
                                                name="gender"
                                                style={{ marginTop: 20 }}
                                            >
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Female"
                                                    onChange={handleInfo}
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Male"
                                                    onChange={handleInfo}
                                                />
                                            </RadioGroup>
                                            <Button type="submit" variant="contained" style={{ display: "block", marginTop: 20 }}>
                                                Submit
                                            </Button>
                                        </FormControl>

                                    </form>
                                </Typography>
                                : <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="map-pin" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Location" secondary={userdata && user._id === userdata._id ? userdata.location : user.location} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="hash" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Cooking expirence" secondary={userdata && user._id === userdata._id ? userdata.expirence : user.expirence} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="user" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Gender" secondary={userdata && user._id === userdata._id ? userdata.gender : user.gender} />
                                    </ListItem>
                                </List>
                        }
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileLeft