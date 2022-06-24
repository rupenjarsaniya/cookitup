import React from 'react'
import { Grid, Rating, Box, Typography, List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import NextLink from "next/link";
import FeatherIcon from "feather-icons-react";

const Ratings = () => {
    const [value, setValue] = React.useState(2);
    return (
        <>
            <Rating name="read-only" value={value} readOnly />
            <List component="li" disablePadding>
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 1
                        }}
                    >
                        <ListItemIcon>
                            <FeatherIcon
                                icon="eye"
                                width="20"
                                height="20"
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Visitor (100)
                        </ListItemText>
                    </ListItem>
                </NextLink>
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 1
                        }}
                    >
                        <ListItemIcon>
                            <FeatherIcon
                                icon="users"
                                width="20"
                                height="20"
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Users (100)
                        </ListItemText>
                    </ListItem>
                </NextLink>
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 1
                        }}
                    >
                        <ListItemIcon>
                            <FeatherIcon
                                icon="trending-up"
                                width="20"
                                height="20"
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Total Recipes (100)
                        </ListItemText>
                    </ListItem>
                </NextLink>
            </List>
            {/* <Typography variant="h5">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
            </Typography> */}
        </>
    )
}

export default Ratings