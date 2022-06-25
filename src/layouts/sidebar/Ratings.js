import React from 'react'
import { Grid, Rating, Box, Typography, List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import NextLink from "next/link";
import FeatherIcon from "feather-icons-react";

const Ratings = () => {
    const [value, setValue] = React.useState(2);
    return (
        <>
            <List component="li">
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 0.5
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
                            mb: 0.5
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
                            mb: 0.5
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
            <Rating name="read-only" value={value} readOnly />
        </>
    )
}

export default Ratings