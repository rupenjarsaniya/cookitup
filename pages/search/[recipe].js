import { Grid, Typography } from '@mui/material';
import mongoose from 'mongoose';
import React from 'react'
import Recipe from '../../models/Recipe';
import Post from '../post';

const Recipes = ({ recipes, error }) => {
    if (error) return <h1 style={{ textAlign: 'center' }}>{error}</h1>

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12} px={1}>
                <Typography variant="div" style={{ display: "block" }}>

                    {

                        recipes.map((p) => { return <Post post={p} key={p._id} /> })

                    }

                </Typography>
            </Grid >
        </Grid >
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    const recipes = await Recipe.find({ title: { $regex: '.*' + context.query.recipe + '.*' } }).sort({ createdAt: -1 });

    if (recipes.length === 0) return { props: { error: 'No Recipes Are Found !!!' } }

    return { props: { recipes: JSON.parse(JSON.stringify(recipes)) } }

}

export default Recipes