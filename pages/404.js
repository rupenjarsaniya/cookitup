import { Grid, Typography } from '@mui/material'
import React from 'react'

const Error = () => {
    return (
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h2">404 - Page Not Found</Typography>
        </Grid>
    )
}

export default Error