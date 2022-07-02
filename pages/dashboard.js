import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Paper,
    TableContainer,
    Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';

const Dashboard = () => {

    const [recipes, setRecipes] = useState([]);

    const handleDeletePost = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete("http://localhost:3000/api/deleterecipe?id=" + id, {
                headers: { "token": token }
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchRecipes = async () => {

            const recipes = await axios.get("http://localhost:3000/api/getrecipe", {
                headers: { "token": token }
            });
            setRecipes(recipes.data);
        }

        if (token) fetchRecipes();

    }, [handleDeletePost]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {
                recipes.length === 0 ? <h1 style={{ textAlign: "center" }}>No Recipe Found</h1>

                    : <TableContainer sx={{ maxHeight: "100vh" }}>
                        <Table stickyHeader aria-label="sticky table" sx={{
                            whiteSpace: "nowrap",
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Recipe Title
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Likes
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Comments
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Saved
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography color="textSecondary" variant="h6">
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    recipes && recipes.map((item, index) => {
                                        return <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                            <TableCell >
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.likes.length}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.comments.length}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.saverecipeusers.length}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Button size="small" variant="contained" color="error" onClick={() => handleDeletePost(item._id)}>
                                                    Delete
                                                </Button>
                                                <Link href={'/update/' + item._id}>
                                                    <Button size="small" variant="contained" color="primary" style={{ marginLeft: 5 }}>
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Paper>
    );
};

export default Dashboard;
