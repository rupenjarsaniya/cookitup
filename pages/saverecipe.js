import React, { useEffect, useState } from 'react'
import {
    Grid,
    Typography,
} from "@mui/material";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Post from './post';

const Saverecipe = () => {

    const [anchorEl4, setAnchorEl4] = React.useState(null);

    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let savedRecipes = [];
        setSavedRecipes([]);

        const fetchRecipes = async () => {
            try {

                const currentUser = await axios.get('http://localhost:3000/api/getuser', {
                    headers: { "token": token }
                });

                if (currentUser.status === 200) {

                    for (let index = 0; index < currentUser.data.saverecipe.length; index++) {
                        const id = currentUser.data.saverecipe[index];

                        const res = await axios.get('http://localhost:3000/api/getonerecipe?id=' + id);
                        if (res.status === 200) {
                            savedRecipes.push(res.data.recipe);
                        }
                    }
                    setSavedRecipes(savedRecipes);
                }
            }

            catch (error) {
                console.log(error);
            }

        }

        if (token) fetchRecipes();


    }, []);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12} px={1}>
                <Typography variant="h3" mb={2}>Saved Recipes</Typography>
                <Typography variant="div" style={{ display: "block" }}>

                    {

                        savedRecipes && savedRecipes.length !== 0 ? savedRecipes.map((p) => { return <Post post={p} key={p._id} /> }) :
                            <h1 style={{ textAlign: 'center' }}>No Saved Posts Found</h1>

                    }

                </Typography>
            </Grid>
        </Grid >
    );
}

export default Saverecipe;