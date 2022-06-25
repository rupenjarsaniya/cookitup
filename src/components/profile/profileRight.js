import React, { useState } from 'react'
import FeatherIcon from "feather-icons-react";
import {
    Grid,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
    Avatar,
    IconButton,
    Menu,
    List,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import userimg1 from "../../../assets/images/users/1.jpg";
import Image from 'next/image';

const ProfileRight = () => {

    const [anchorEl4, setAnchorEl4] = React.useState(null);

    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12} px={1}>
                <Typography variant="div" style={{ display: "block" }}>
                    <Typography variant="div" style={{ display: "block", backgroundColor: "rgb(252, 252, 252)", borderRadius: 10 }} py={3} px={3} mb={3}>

                        {/* Header */}
                        <Typography variant="div" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                            <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Avatar alt="Remy Sharp" src={userimg1} />
                                <Typography variant="h5" ml={2}>
                                    Aloo Paratha
                                </Typography>
                            </Typography>
                            <Typography variant="div">
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
                        </Typography>

                        {/* Content */}
                        <Typography variant="div">
                            <Typography variant="div" style={{ display: "block", borderTop: "1px solid #cccccc" }} my={2}></Typography>
                            <Image src="/alooparatha.jpg" alt="alooparatha" width={400} height={300} style={{ borderRadius: 10 }} />
                            <Typography variant="h4" color="primary" >
                                Ingredients:
                            </Typography>
                            <Typography variant="ul" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }} >
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 cup all purpose flour (Maida)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Water to Knead dough</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 2 tbsp oil</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Little salt</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/4th tsp. Ajwain (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 3-4 Potatoes (boiled, peeled & mashed)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 cup Green Peas (boiled)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 tbsp coriander finely chopped</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few chopped Cashews (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few Raisins (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 tsp Garam masala</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Salt to taste</Typography>
                            </Typography>
                            <Typography variant="h4" style={{ marginTop: 20 }} color="primary" >
                                How to make Aloo Paratha? Let's Cook
                            </Typography>
                            <Typography variant="ol" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }}>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Mix all the ingredients (salt, oil, ajwain) except water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add a little water at a time.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Pat and knead well for several times into a soft pliable dough.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cover it with moist Muslin cloth and keep aside for 15 minutes.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>In a bowl add mashed potatoes and all dry masalas (salt, chili powder, mango powder, garam masala) and green chilles, ginger and Mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add green peas, cashews and raisins and mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add coriander and keep aside.Make small rolls of dough and roll it into a 4″ diameter circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cut it into two parts like semi-circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Now take one semi circle and fold it like a cone. Use water while doing so.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Place a spoon of filling in the cone and seal the third side using a drop of water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Heat oil in a kadhai and deep fry till golden brown (fry on a medium flame).</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Serve samosa hot with hari chutney, tamarind chutney.</Typography>
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
                                100 Likes
                                <IconButton aria-label="user">
                                    <FeatherIcon icon="circle" width="6" height="6" />
                                </IconButton>
                                100 Comments
                            </Typography>
                        </Typography>

                        {/* Comments */}
                        <Typography variant="div" mt={2} style={{ display: "block" }}>
                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Rupen Jarsaniya
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Nice website, i learn many cooking recipe
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Bhagyashree Thombre
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Cool website
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Pratham Kansara
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Best Recipe website i never seen before
                                </Typography>
                            </Typography>

                            <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
                                See all comments
                            </Typography>
                        </Typography>
                    </Typography>

                    <Typography variant="div" style={{ display: "block", backgroundColor: "rgb(252, 252, 252)", borderRadius: 10 }} py={3} px={3} mb={3}>

                        {/* Header */}
                        <Typography variant="div" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                            <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Avatar alt="Remy Sharp" src={userimg1} />
                                <Typography variant="h5" ml={2}>
                                    Dabeli
                                </Typography>
                            </Typography>
                            <Typography variant="div">
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
                        </Typography>

                        {/* Content */}
                        <Typography variant="div">
                            <Typography variant="div" style={{ display: "block", borderTop: "1px solid #cccccc" }} my={2}></Typography>
                            <Image src="/dabeli.jpg" alt="dabeli" width={400} height={300} style={{ borderRadius: 10 }} />
                            <Typography variant="h4" color="primary" >
                                Ingredients:
                            </Typography>
                            <Typography variant="ul" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }} >
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 cup all purpose flour (Maida)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Water to Knead dough</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 2 tbsp oil</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Little salt</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/4th tsp. Ajwain (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 3-4 Potatoes (boiled, peeled & mashed)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 cup Green Peas (boiled)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 tbsp coriander finely chopped</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few chopped Cashews (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few Raisins (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 tsp Garam masala</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Salt to taste</Typography>
                            </Typography>
                            <Typography variant="h4" style={{ marginTop: 20 }} color="primary" >
                                How to make Dabeli? Let's Cook
                            </Typography>
                            <Typography variant="ol" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }}>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Mix all the ingredients (salt, oil, ajwain) except water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add a little water at a time.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Pat and knead well for several times into a soft pliable dough.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cover it with moist Muslin cloth and keep aside for 15 minutes.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>In a bowl add mashed potatoes and all dry masalas (salt, chili powder, mango powder, garam masala) and green chilles, ginger and Mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add green peas, cashews and raisins and mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add coriander and keep aside.Make small rolls of dough and roll it into a 4″ diameter circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cut it into two parts like semi-circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Now take one semi circle and fold it like a cone. Use water while doing so.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Place a spoon of filling in the cone and seal the third side using a drop of water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Heat oil in a kadhai and deep fry till golden brown (fry on a medium flame).</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Serve samosa hot with hari chutney, tamarind chutney.</Typography>
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
                            <Typography variant="div">
                                100 Likes
                                <IconButton aria-label="user">
                                    <FeatherIcon icon="circle" width="6" height="6" />
                                </IconButton>
                                100 Comments
                            </Typography>
                        </Typography>

                        {/* Comments */}
                        <Typography variant="div" mt={2} style={{ display: "block" }}>
                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Rupen Jarsaniya
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Nice website, i learn many cooking recipe
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Bhagyashree Thombre
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Cool website
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Pratham Kansara
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Best Recipe website i never seen before
                                </Typography>
                            </Typography>

                            <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
                                See all comments
                            </Typography>
                        </Typography>
                    </Typography>

                    <Typography variant="div" style={{ display: "block", backgroundColor: "rgb(252, 252, 252)", borderRadius: 10 }} py={3} px={3} mb={3}>

                        {/* Header */}
                        <Typography variant="div" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                            <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Avatar alt="Remy Sharp" src={userimg1} />
                                <Typography variant="h5" ml={2}>
                                    Samosa
                                </Typography>
                            </Typography>
                            <Typography variant="div">
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
                        </Typography>

                        {/* Content */}
                        <Typography variant="div">
                            <Typography variant="div" style={{ display: "block", borderTop: "1px solid #cccccc" }} my={2}></Typography>
                            <Image src="/kachori.jpg" alt="kachori" width={400} height={300} style={{ borderRadius: 10 }} />
                            <Typography variant="h4" color="primary" >
                                Ingredients:
                            </Typography>
                            <Typography variant="ul" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }} >
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 cup all purpose flour (Maida)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Water to Knead dough</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 2 tbsp oil</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Little salt</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/4th tsp. Ajwain (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 3-4 Potatoes (boiled, peeled & mashed)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 cup Green Peas (boiled)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1-2 Green Chilies (finely chopped)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1 tbsp coriander finely chopped</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few chopped Cashews (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Few Raisins (optional)</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> 1/2 tsp Garam masala</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}><FeatherIcon icon="chevron-right" width="13" height="13" /> Salt to taste</Typography>
                            </Typography>
                            <Typography variant="h4" style={{ marginTop: 20 }} color="primary" >
                                How to make Samosa? Let's Cook
                            </Typography>
                            <Typography variant="ol" style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 15, color: "gray" }}>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Mix all the ingredients (salt, oil, ajwain) except water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add a little water at a time.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Pat and knead well for several times into a soft pliable dough.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cover it with moist Muslin cloth and keep aside for 15 minutes.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>In a bowl add mashed potatoes and all dry masalas (salt, chili powder, mango powder, garam masala) and green chilles, ginger and Mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add green peas, cashews and raisins and mix well.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Add coriander and keep aside.Make small rolls of dough and roll it into a 4″ diameter circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Cut it into two parts like semi-circle.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Now take one semi circle and fold it like a cone. Use water while doing so.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Place a spoon of filling in the cone and seal the third side using a drop of water.</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Heat oil in a kadhai and deep fry till golden brown (fry on a medium flame).</Typography>
                                <Typography variant="li" style={{ margin: "4px 0" }}>Serve samosa hot with hari chutney, tamarind chutney.</Typography>
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
                            <Typography variant="div">
                                100 Likes
                                <IconButton aria-label="user">
                                    <FeatherIcon icon="circle" width="6" height="6" />
                                </IconButton>
                                100 Comments
                            </Typography>
                        </Typography>

                        {/* Comments */}
                        <Typography variant="div" mt={2} style={{ display: "block" }}>
                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Rupen Jarsaniya
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Nice website, i learn many cooking recipe
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Bhagyashree Thombre
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Cool website
                                </Typography>
                            </Typography>

                            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
                                <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Avatar alt="Remy Sharp" src={userimg1} />
                                    <Typography variant="h5" style={{}} ml={1}>
                                        Pratham Kansara
                                    </Typography>
                                </Typography>
                                <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                                    Best Recipe website i never seen before
                                </Typography>
                            </Typography>

                            <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
                                See all comments
                            </Typography>
                        </Typography>
                    </Typography>

                </Typography>
            </Grid>
        </Grid >
    )
}

export default ProfileRight