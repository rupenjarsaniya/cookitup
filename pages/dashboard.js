import React from "react";
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

const Dashboard = () => {
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
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell >
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    1
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "600",
                                    }}
                                >
                                    Aloo Paratha
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography color="textSecondary" variant="h6">
                                    100
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography color="textSecondary" variant="h6">
                                    100
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Dashboard;
