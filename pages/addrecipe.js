import { Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BaseCard from '../src/components/baseCard/BaseCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Addrecipe = () => {
    const router = useRouter();
    const [recipeData, setRecipeData] = useState({ title: "", ingredients: "", foodimg: "" });
    const [steps, setSteps] = useState({});

    const handleRecipeData = (e) => {
        if (e.target.name === "foodimg") {
            console.log(e.target.files[0]);
            setRecipeData({ ...recipeData, [e.target.name]: e.target.files[0] });
        }
        else {
            setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
        }
    }
    const handleMakingSteps = (e) => setSteps({ ...steps, [e.target.name]: e.target.value });


    const handleNewRecipe = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.set("title", recipeData.title);
            formData.set("ingredients", recipeData.ingredients);
            formData.set("foodimg", recipeData.foodimg);
            formData.set("makingsteps", JSON.stringify(steps));
            console.log(recipeData.foodimg);
            const res = await axios.post('http://localhost:3000/api/addrecipe', formData, {
                headers: { "content-type": "multipart/form-data", "token": token }
            });

            console.log(res);

            if (res.status === 200) {
                console.log(res.data);
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                console.log(res);
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
            console.log(error);
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

    useEffect(() => {
        if (!localStorage.getItem('token')) router.push("/login");
    })

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
                    <BaseCard>
                        <Typography variant="h2" color="primary" mb={5} style={{ textAlign: "center" }}>
                            Add Your Own Recipe On <Typography variant="div" color="primary" style={{ fontWeight: 900 }}>CookItUp</Typography> !
                        </Typography>
                        <form className='form' onSubmit={handleNewRecipe}>

                            <FormControl>
                                <Stack spacing={2}>
                                    <TextField
                                        id="name"
                                        name="title"
                                        label="Name of Recipe"
                                        variant="outlined"
                                        onChange={handleRecipeData}
                                    />

                                    <TextField
                                        id="outlined-multiline-static"
                                        name="ingredients"
                                        label="Ingredients (eg. 1 cup all purpose flour (Maida), Water to Knead dough, 2 tbsp oil)"
                                        multiline
                                        rows={4}
                                        onChange={handleRecipeData}
                                    />

                                    <input type="file" id="actual-btn" name="foodimg" style={{ marginBottom: 20 }}
                                        onChange={handleRecipeData} />

                                    <Image src="/kachori.jpg" alt="kachori" width={400} height={300} style={{ borderRadius: 10 }} />

                                    <Typography variant="h2" color="primary" mb={5}>How to make?</Typography>

                                    <TextField
                                        id="name-basic1"
                                        label="Step 1"
                                        name="step1"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic2"
                                        label="Step 2"
                                        name="step2"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic3"
                                        label="Step 3"
                                        name="step3"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic4"
                                        label="Step 4"
                                        name="step4"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic5"
                                        label="Step 5"
                                        name="step5"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic6"
                                        label="Step 6"
                                        name="step6"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic7"
                                        label="Step 7"
                                        name="step7"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic8"
                                        label="Step 8"
                                        name="step8"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic9"
                                        label="Step 9"
                                        name="step9"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                    <TextField
                                        id="name-basic10"
                                        label="Step 10"
                                        name="step10"
                                        variant="outlined"
                                        onChange={handleMakingSteps}
                                    />
                                </Stack>
                            </FormControl>
                            <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
                                Submit
                            </Button>
                        </form>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export default Addrecipe