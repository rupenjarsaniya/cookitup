import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import BaseCard from '../src/components/baseCard/BaseCard'
import ProfileLeft from '../src/components/profile/profileLeft'
import ProfileRight from '../src/components/profile/profileRight'

const Profile = () => {
    return (
        <Grid container spacing={0} style={{ backgroundColor: "white" }}>
            <Grid item xs={12} lg={12}>
                {/* <BaseCard> */}
                <Typography variant="div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src=""
                        sx={{ width: 200, height: 200, margin: "auto" }}
                    />
                    <Typography variant="h5" mt={3} style={{ display: "block", fontStyle: "bold", color: "gray" }}>
                        Expert in Make Dinner Dishes
                    </Typography>
                </Typography>

                <Grid container spacing={0} mt={5}>
                    <Grid item xs={12} lg={3}>
                        <ProfileLeft />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <ProfileRight />
                    </Grid>
                </Grid>
                {/* </BaseCard> */}
            </Grid>
        </Grid >
    )
}

export default Profile