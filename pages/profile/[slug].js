import { Grid, Typography } from '@mui/material'
import React from 'react'
import ProfileLeft from '../../src/components/profile/profileLeft'
import ProfileRight from '../../src/components/profile/profileRight'
import mongoose from 'mongoose';
import User from '../../models/User';
import Error from 'next/error';
import Image from 'next/image';
import Recipe from '../../models/Recipe';

const Slug = ({ user, error, recipes }) => {

    if (error === 404) return <Error statusCode={404} />

    return (
        <Grid container spacing={0} style={{ backgroundColor: "white" }}>
            <Grid item xs={12} lg={12}>
                <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Image
                        src={`${user && user.profileimg ? user.profileimg : "/userlogo.png"}`}
                        alt="profile"
                        width={200}
                        height={200}
                        style={{ borderRadius: "100%", margin: "auto" }}
                    />
                    <Typography variant="h5" mt={3} style={{ display: "block", fontWeight: 700, fontSize: 25 }}>
                        {user.name}
                    </Typography>
                    <Typography variant="h5" mt={1} style={{ display: "block", fontWeight: 300, color: "gray" }}>
                        Expert in Make {user.expertin}
                    </Typography>
                </Typography>

                <Grid container spacing={0} mt={5}>
                    <Grid item xs={12} lg={3}>
                        <ProfileLeft user={user} />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <ProfileRight userId={user._id} recipes={recipes} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}


export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    const userdata = await User.findOne({ name: context.query.slug });

    if (!userdata) { return { props: { error: 404 } } }

    const recipes = await Recipe.find({ user: userdata._id }).sort({ createdAt: -1 });

    if (!recipes) { return { props: { error: 404 } } }

    return { props: { user: JSON.parse(JSON.stringify(userdata)), recipes: JSON.parse(JSON.stringify(recipes)) } }

}

export default Slug