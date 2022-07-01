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
} from "@mui/material";
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const post = ({ post }) => {

    const [anchorEl4, setAnchorEl4] = React.useState(null);

    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    const userdata = useSelector((state) => state.user);

    const [user, setUser] = useState({});

    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:3000/api/getoneuser?id=${post.user}`);

            if (res.status === 200) {
                setUser(res.data);
            }
        }

        fetchUser();

    }, []);

    return (
        <Typography variant="div" style={{ display: "block", backgroundColor: "rgb(255, 255, 255)", borderRadius: 10 }} py={3} px={3} mb={3} key={post._id}>

            {/* Header */}
            <Typography variant="div" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
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
                                <FeatherIcon icon="more-vertical" width="20" height="20" />
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
                                            <ListItemText primary="Edit Recipe" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText primary="Delete Recipe" />
                                        </ListItemButton>

                                    </List>
                                </Box>
                            </Box>
                        </Menu>
                    </Typography>
                }
            </Typography>

            {/* Content */}
            <Typography variant="div" >
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
                    <IconButton aria-label="user">
                        <FeatherIcon icon="heart" width="20" height="20" />
                    </IconButton>
                    <IconButton aria-label="user">
                        <FeatherIcon icon="message-circle" width="20" height="20" />
                    </IconButton>
                    <IconButton aria-label="user">
                        <FeatherIcon icon="bookmark" width="20" height="20" />
                    </IconButton>
                </Typography>
                <Typography variant="div" fontSize={12} style={{ color: "gray" }}>
                    {post.likes.length} Likes
                    <IconButton aria-label="user">
                        <FeatherIcon icon="circle" width="6" height="6" />
                    </IconButton>
                    {post.comments.length}  Comments
                </Typography>
            </Typography>

            {/* Comments */}
            <Typography variant="div" mt={2} style={{ display: "block" }}>

                {
                    post.comments.map((user) => <Typography variant="div" style={{ display: "block" }} pb={1} mb={3} key={user._id}>
                        <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Avatar alt="Remy Sharp" src="userlogo.png" />
                            <Typography variant="h5" style={{}} ml={1}>
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
            </Typography>
        </Typography >


    )
}

export default post