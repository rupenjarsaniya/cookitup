import { Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import BaseCard from '../src/components/baseCard/BaseCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const Addrecipe = () => {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters'),
        ingredients: Yup.string()
            .required('Ingredients is required')
            .min(3, 'Ingredients must be at least 3 characters'),
        step1: Yup.string()
            .required('This Field cannot blank'),
        step2: Yup.string()
            .required('This Field cannot blank'),
        step3: Yup.string()
            .required('This Field cannot blank'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

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


    const handleNewRecipe = async () => {

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.set("title", recipeData.title);
            formData.set("ingredients", recipeData.ingredients);
            formData.set("foodimg", recipeData.foodimg);
            formData.set("makingsteps", JSON.stringify(steps));
            console.log(recipeData.foodimg);
            const res = await axios.post(`/api/addrecipe`, formData, {
                headers: { "content-type": "multipart/form-data", "token": token }
            });


            if (res.status === 200) {
                toast.success(res.data.message, {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                router.push('/dashboard');
            }
            else {
                toast.error(res.response.data, {
                    position: "top-left",
                    autoClose: 1000,
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
                autoClose: 1000,
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
                autoClose={1000}
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
                        <form className='form' onSubmit={handleSubmit(handleNewRecipe)}>

                            <FormControl>
                                <TextField
                                    id="name"
                                    name="title"
                                    label="Name of Recipe"
                                    variant="outlined"
                                    {...register('title')}
                                    onChange={handleRecipeData}
                                    style={{ marginTop: 20 }}
                                />
                                {
                                    errors.title && <span style={{ color: "red", fontSize: 13 }}>{errors.title.message}</span>
                                }

                                <TextField
                                    id="outlined-multiline-static"
                                    name="ingredients"
                                    label="Ingredients (eg. 1 cup all purpose flour (Maida), Water to Knead dough, 2 tbsp oil)"
                                    multiline
                                    rows={4}
                                    {...register('ingredients')}
                                    onChange={handleRecipeData}
                                    style={{ marginTop: 20 }}
                                />
                                {
                                    errors.ingredients && <span style={{ color: "red", fontSize: 13 }}>{errors.ingredients.message}</span>
                                }

                                <input type="file" id="actual-btn" name="foodimg" style={{ marginBottom: 20, marginTop: 20 }}
                                    onChange={handleRecipeData} />

                                <Typography variant="h2" color="primary" mb={3} style={{ textAlign: "center" }}>How to make?</Typography>

                                <TextField
                                    id="name-basic1"
                                    label="Step 1"
                                    name="step1"
                                    variant="outlined"
                                    {...register('step1')}
                                    onChange={handleMakingSteps}
                                />
                                {
                                    errors.step1 && <span style={{ color: "red", fontSize: 13 }}>{errors.step1.message}</span>
                                }

                                <TextField
                                    id="name-basic2"
                                    label="Step 2"
                                    name="step2"
                                    variant="outlined"
                                    {...register('step2')}
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                {
                                    errors.step2 && <span style={{ color: "red", fontSize: 13 }}>{errors.step2.message}</span>
                                }

                                <TextField
                                    id="name-basic3"
                                    label="Step 3"
                                    name="step3"
                                    variant="outlined"
                                    {...register('step3')}
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                {
                                    errors.step3 && <span style={{ color: "red", fontSize: 13 }}>{errors.step3.message}</span>
                                }

                                <TextField
                                    id="name-basic4"
                                    label="Step 4"
                                    name="step4"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic5"
                                    label="Step 5"
                                    name="step5"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic6"
                                    label="Step 6"
                                    name="step6"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic7"
                                    label="Step 7"
                                    name="step7"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic8"
                                    label="Step 8"
                                    name="step8"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic9"
                                    label="Step 9"
                                    name="step9"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
                                <TextField
                                    id="name-basic10"
                                    label="Step 10"
                                    name="step10"
                                    variant="outlined"
                                    onChange={handleMakingSteps}
                                    style={{ marginTop: 20 }}
                                />
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