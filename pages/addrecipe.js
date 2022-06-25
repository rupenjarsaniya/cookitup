import { Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BaseCard from '../src/components/baseCard/BaseCard'

const Addrecipe = () => {
    return (
        <>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={10}>
                    <BaseCard>
                        <Typography variant="h2" color="primary" mb={5}>
                            Add Your Own Recipe On <Typography variant="div" color="primary" style={{ fontWeight: 900 }}>CookItUp</Typography> !
                        </Typography>

                        <FormControl style={{ marginBottom: 30 }}>
                            <Stack spacing={3}>
                                <TextField
                                    id="name-basic"
                                    label="Name of Recipe"
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Ingredients (eg. 1 cup all purpose flour (Maida), Water to Knead dough, 2 tbsp oil)"
                                    multiline
                                    rows={4}
                                />
                                <input type="file" id="actual-btn" name="recipeimg" style={{ marginBottom: 20 }} />

                                <Image src="/kachori.jpg" alt="kachori" width={400} height={300} style={{ borderRadius: 10 }} />

                                <Typography variant="h2" color="primary" mb={5}>How to make?</Typography>

                                <TextField
                                    id="name-basic"
                                    label="Step 1"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 2"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 3"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 4"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 5"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 6"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 7"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 8"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 9"
                                    variant="outlined"
                                />
                                <TextField
                                    id="name-basic"
                                    label="Step 10"
                                    variant="outlined"
                                />
                            </Stack>
                        </FormControl>
                        <Button variant="contained" style={{ display: "block" }}>
                            Submit
                        </Button>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Addrecipe