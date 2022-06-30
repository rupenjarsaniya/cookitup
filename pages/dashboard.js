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
import axios from 'axios';



const Dashboard = () => {
    const userdata = useSelector(state => state.user);

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchRecipes = async () => {

            const recipes = await axios.get("http://localhost:3000/api/getrecipe", {
                headers: { "token": token }
            });
            setRecipes(recipes.data);
        }

        if (token) fetchRecipes();

    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: "100vh" }}>
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
                                console.log(item)
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
                                        <Button size="small" variant="contained" color="error">
                                            Delete
                                        </Button>
                                        <Button size="small" variant="contained" color="primary" style={{ marginLeft: 5 }}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Dashboard;
