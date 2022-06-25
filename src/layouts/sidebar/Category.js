import React from 'react'
import { Grid, Box, Typography, List, ListItemText, ListItem } from "@mui/material";
import NextLink from "next/link";

const Category = () => {
    return (
        <>
            <List component="li" >
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 0.5
                        }}
                    >
                        <ListItemText>
                            Breakfast
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
                        <ListItemText>
                            Brunch
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

                        <ListItemText>
                            Lunch
                        </ListItemText>
                    </ListItem>
                </NextLink >
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 0.5
                        }}
                    >

                        <ListItemText>
                            Dinner
                        </ListItemText>
                    </ListItem>
                </NextLink >
                <NextLink href={"/"}>
                    <ListItem
                        button
                        sx={{
                            mb: 0.5
                        }}
                    >

                        <ListItemText>
                            Sweets
                        </ListItemText>
                    </ListItem>
                </NextLink >
            </List >
        </>
    )
}

export default Category