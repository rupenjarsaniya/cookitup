import React from 'react'
import { Rating, List, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import FeatherIcon from "feather-icons-react";

const Ratings = ({ totalRecipes, totalUsers }) => {
    const [value, setValue] = React.useState(2);
    return (
        <>
            <List component="li">

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
                        Users ({totalUsers})
                    </ListItemText>
                </ListItem>
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
                        Total Recipes ({totalRecipes})
                    </ListItemText>
                </ListItem>
            </List>
            <Rating name="read-only" value={value} readOnly />
        </>
    )
}


export default Ratings