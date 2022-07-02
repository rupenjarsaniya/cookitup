import React, { useEffect, useState } from 'react'
import FeatherIcon from "feather-icons-react";
import {
    Grid,
    Typography,
} from "@mui/material";
import Post from '../../../pages/post';

const ProfileRight = ({ recipes, userId }) => {

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


                    {

                        recipes.map((p) => { return <Post post={p} key={p._id} /> })

                    }

                </Typography>
            </Grid>
        </Grid >
    )
}

export default ProfileRight