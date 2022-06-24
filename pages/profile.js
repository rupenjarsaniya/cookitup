import { Grid } from '@mui/material'
import React from 'react'
import BaseCard from '../src/components/baseCard/BaseCard'

const Profile = () => {
    return (
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={6}>
                <BaseCard>
                    
                </BaseCard>
            </Grid>
        </Grid>
    )
}

export default Profile