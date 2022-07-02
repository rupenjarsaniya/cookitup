import { Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BaseCard from '../../src/components/baseCard/BaseCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose';
import Recipe from '../../models/Recipe';
import { useSelector } from 'react-redux';

const Id = ({ recipe }) => {

    const router = useRouter();
    const { id } = router.query;

    const userdata = useSelector(state => state.user);

    const [updateRecipe, setUpdateRecipe] = useState({
        title: recipe.title,
        ingredients: recipe.ingredients,
        foodimg: recipe.foodimg
    });

    const [updateSteps, setUpdateSteps] = useState(recipe.makingsteps);

    const handleUpdateRecipe = (e) => {
        if (e.target.name === "foodimg") {
            setUpdateRecipe({ ...updateRecipe, [e.target.name]: e.target.files[0] });
        }
        else {
            setUpdateRecipe({ ...updateRecipe, [e.target.name]: e.target.value });
        }
    }

    const handleUpdateSteps = (e) => setUpdateSteps({ ...updateSteps, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.set("title", updateRecipe.title);
            formData.set("ingredients", updateRecipe.ingredients);
            formData.set("foodimg", updateRecipe.foodimg);
            formData.set("makingsteps", JSON.stringify(updateSteps));

            const res = await axios.put('http://localhost:3000/api/updaterecipe?id=' + id, formData, {
                headers: { "content-type": "multipart/form-data", "token": token }
            });

            if (res.status === 200) {
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                router.push("/dashboard");
            }
            else {
                toast.error(res.response.data, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        catch (error) {
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={10}>
                    {
                        userdata && userdata._id === recipe.user ?
                            <BaseCard>
                                <Typography variant="h2" color="primary" mb={5} style={{ textAlign: "center" }}>
                                    Update Your Recipe On <Typography variant="div" color="primary" style={{ fontWeight: 900 }}>CookItUp</Typography> !
                                </Typography>
                                <form className='form' onSubmit={handleSubmit}>

                                    <FormControl>
                                        <Stack spacing={2}>
                                            <TextField
                                                id="name"
                                                name="title"
                                                label="Name of Recipe"
                                                variant="outlined"
                                                value={updateRecipe.title}
                                                onChange={handleUpdateRecipe}
                                            />

                                            <TextField
                                                id="outlined-multiline-static"
                                                name="ingredients"
                                                label="Ingredients (eg. 1 cup all purpose flour (Maida), Water to Knead dough, 2 tbsp oil)"
                                                multiline
                                                rows={4}
                                                value={updateRecipe.ingredients}
                                                onChange={handleUpdateRecipe}
                                            />

                                            <input type="file" id="actual-btn" name="foodimg" style={{ marginBottom: 20 }} onChange={handleUpdateRecipe} />

                                            {/* <Image src={updateRecipe.foodimg} alt="kachori" width={400} height={300} style={{ borderRadius: 10 }} /> */}

                                            <Typography variant="h2" color="primary" mb={5} style={{ textAlign: "center" }}>How to make?</Typography>

                                            {
                                                Object.keys(updateSteps).map((item, index) => {
                                                    return <TextField
                                                        key={index + 1}
                                                        id="name-basic1"
                                                        label={`Step ${index + 1}`}
                                                        name={`step${index + 1}`}
                                                        variant="outlined"
                                                        value={updateSteps[item]}
                                                        onChange={handleUpdateSteps}
                                                    />
                                                })
                                            }


                                        </Stack>
                                    </FormControl>
                                    <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
                                        Submit
                                    </Button>
                                </form>
                            </BaseCard> : <h1 style={{ textAlign: "center" }}>Method Not Allowed</h1>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    const recipe = await Recipe.findOne({ _id: context.query.id });

    if (!recipe) { return { props: { error: 404 } } }

    return { props: { recipe: JSON.parse(JSON.stringify(recipe)) } }

}

export default Id