import React, { useEffect, useState } from 'react'
import FeatherIcon from "feather-icons-react";
import {
    Grid,
    Button,
    Box,
    Typography,
    Avatar,
    IconButton,
    Menu,
    List,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'timeago.js'

const post = ({ post }) => {

    const userdata = useSelector((state) => state.user);

    const [anchorEl4, setAnchorEl4] = React.useState(null);

    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
        setAnchorEl4(null);
    };


    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState(post.likes.length);
    const [isliked, setIsliked] = useState();
    const [issaved, setIssaved] = useState();
    const [comments, setComments] = useState(post.comments.length);
    const [commentData, setCommnetData] = useState({});

    const handleLikes = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:3000/api/like?id=${post._id}`, {}, {
                headers: { "content-type": "application/json", "token": token }
            });
            setLikes(isliked ? likes - 1 : likes + 1);
            setIsliked(!isliked);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSaved = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:3000/api/save?id=${post._id}`, {}, {
                headers: { "content-type": "application/json", "token": token }
            });
            setIssaved(!issaved);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/comment?id=${post._id}`, commentData, {
                headers: { "content-type": "application/json" }
            });
            setComments(comments + 1);
            setCommnetData({ ...commentData, comment: "" })
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {

        const token = localStorage.getItem('token');

        try {
            const res = await axios.delete(`http://localhost:3000/api/deleterecipe?id=${id}`, {
                headers: { "token": token }
            })

            if (res.status === 200) {
                toast.success(res.data.message, {
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

    useEffect(() => {

        const fetchUser = async () => {

            const res = await axios.get(`http://localhost:3000/api/getoneuser?id=${post.user}`);

            if (res.status === 200) {
                setUser(res.data);
            }

            if (userdata) {
                setIsliked(post.likes.includes(userdata._id))

                setIssaved(post.saverecipeusers.includes(userdata._id))

                setCommnetData({ name: userdata.name, comment: "", userId: userdata._id })
            }

        }

        fetchUser();

    }, [userdata]);

    return (
        <Typography variant="div" style={{ display: "block", backgroundColor: "rgb(255, 255, 255)", borderRadius: 10 }} py={3} px={3} mb={3} key={post._id}>
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
            {/* Header */}
            <Typography variant="div" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="div" style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                    <Typography variant="div" style={{ display: "flex", alignItems: "center" }}>
                        <Link href={`${"profile/" + user.name}`} >
                            <Image
                                src={`${user.profileimg ? user.profileimg : "/userlogo.png"}`}
                                alt={`${user.profileimg ? user.profileimg : "/userlogo.png"}`}
                                width={30}
                                height={30}
                                className="roundedCircle"
                                style={{ borderRadius: "100%", cursor: "pointer" }}
                            />
                        </Link>
                        <Typography variant="h5" ml={2}>
                            {post.title}
                        </Typography>
                    </Typography >
                    <Typography variant="div" style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="div" style={{ fontSize: 14, color: "silver" }} mr={1}>
                            {format(post.createdAt)}
                        </Typography>

                        {
                            userdata && user._id === userdata._id && <Typography variant="div">
                                <Button
                                    aria-label="menu"
                                    color="inherit"
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <FeatherIcon icon="more-vertical" width="20" height="20" color="silver" />
                                    </Box>
                                </Button>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={anchorEl4}
                                    keepMounted
                                    open={Boolean(anchorEl4)}
                                    onClose={handleClose4}
                                    sx={{
                                        "& .MuiMenu-paper": {
                                            width: "285px",
                                        },
                                    }}
                                >
                                    <Box>
                                        <Box>
                                            <List
                                                component="nav"
                                                aria-label="secondary mailbox folder"
                                                onClick={handleClose4}
                                            >
                                                <ListItemButton>
                                                    <Link href={'/update/' + post._id}>
                                                        <ListItemText primary="Edit Recipe" />
                                                    </Link>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => handleDelete(post._id)}>
                                                    <ListItemText primary="Delete Recipe" />
                                                </ListItemButton>

                                            </List>
                                        </Box>
                                    </Box>
                                </Menu>
                            </Typography>
                        }
                    </Typography>
                </Typography >
            </Typography >

            {/* Content */}
            <Typography Typography variant="div" >
                <Typography variant="div" style={{ display: "block", borderTop: "1px solid #cccccc" }} my={2}></Typography>
                <Image src={`${post.foodimg ? post.foodimg : "/logo.png"}`} alt="recipeimg" width={400} height={300} style={{ borderRadius: 10 }} />
                <Typography variant="h4" color="primary" >
                    Ingredients:
                </Typography>
                <Typography variant="ul" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }} >

                    {
                        post.ingredients.split(",").map((item, index) => <Typography variant="li" style={{ margin: "4px 0" }} key={index + 1}><FeatherIcon icon="chevron-right" width="13" height="13" />
                            {item}
                        </Typography>
                        )
                    }

                </Typography>

                <Typography variant="h4" style={{ marginTop: 20 }} color="primary" >
                    How to make Aloo Paratha? Let's Cook
                </Typography>
                <Typography variant="ol" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }}>
                    {
                        Object.keys(post.makingsteps).map((item, index) => {
                            return <Typography variant="li" style={{ margin: "4px 0" }} key={index + 1}>
                                {post.makingsteps[item]}
                            </Typography>
                        })
                    }

                </Typography>
            </Typography>
            <Typography variant="div" style={{ display: "block", borderTop: "1px solid #cccccc" }} my={2}></Typography>

            {/* Footer */}
            <Typography variant="div" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <IconButton aria-label="heart" onClick={handleLikes}>
                        <FeatherIcon icon="heart" width="20" height="20" strokeWidth='1' color={`${isliked ? "red" : "gray"}`} />
                    </IconButton>
                    <IconButton aria-label="message-circle" onClick={() => setShow(!show)}>
                        <FeatherIcon icon="message-circle" width="20" height="20" strokeWidth='1' />
                    </IconButton>
                    <IconButton aria-label="bookmark" onClick={handleSaved}>
                        <FeatherIcon icon="bookmark" width="20" height="20" strokeWidth='1' color={`${issaved ? "blue" : "gray"}`} />
                    </IconButton>
                </Typography>
                <Typography variant="div" fontSize={12} style={{ color: "gray" }}>
                    {likes} Likes • {comments} Comments
                </Typography>
            </Typography>

            {/* Type a commnet */}
            {
                show &&
                <>
                    <form style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", marginTop: 10, marginBottom: 30 }} onSubmit={handleComment}>
                        <TextField
                            type="comment"
                            id="comment"
                            name='comment'
                            label={`Comment as ${user.name}`}
                            variant="standard"
                            required
                            onChange={(e) => setCommnetData({ ...commentData, [e.target.name]: e.target.value })}
                            value={commentData.comment}
                            fullWidth
                        />
                        <IconButton aria-label="send" type="submit">
                            <FeatherIcon icon="send" width="20" height="20" strokeWidth='1' />
                        </IconButton>
                    </form>


                    {/* Comments */}
                    <Typography variant="div" mt={2} style={{ display: "block" }}>

                        {
                            post.comments.map((user) => <Typography variant="div" style={{ display: "block" }} pb={1} mb={3} key={user._id}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src="userlogo.png" />
                                    <Typography variant="h5" ml={1}>
                                        {user.name}
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    {user.comment}
                                </Typography>
                            </Typography>
                            )
                        }

                        <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
                            See all comments
                        </Typography>
                    </Typography></>
            }
        </Typography >
    )
}

export default post