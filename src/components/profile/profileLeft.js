import {
    FormControl, FormControlLabel, FormLabel, Grid, Radio, Link, RadioGroup, TextField, Typography, Button, List, ListItem, ListItemAvatar, Avatar, IconButton, ListItemText, InputLabel, Select, MenuItem, OutlinedInput, useTheme
} from '@mui/material'
import FeatherIcon from "feather-icons-react";
import React, { useState } from 'react'

const ProfileLeft = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <Typography variant="div" style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                        <Typography variant="div" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <Typography variant="div" color="primary">
                                Personal Information
                            </Typography>
                            <IconButton aria-label="user" color="primary" onClick={() => setShow(!show)}>
                                <FeatherIcon icon="edit-2" width="20" height="20" />
                            </IconButton>
                        </Typography>
                        {
                            show
                                ? <Typography variant="div">
                                    <FormControl style={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-standard-label" Expert Inclas style={{ marginTop: 20 }}>Expert In</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Expert In"
                                            variant='standard'
                                            style={{ marginTop: 40 }}
                                        >
                                            <MenuItem value="Breakfast">Breakfast</MenuItem>
                                            <MenuItem value="Lunch">Lunch</MenuItem>
                                            <MenuItem value="Dinner">Dinner</MenuItem>
                                        </Select>
                                        <TextField
                                            id="standard-basic"
                                            label="Location"
                                            variant="standard"
                                            style={{ marginTop: 20 }}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="Cooking Expeirence"
                                            variant="standard"
                                            style={{ marginTop: 20 }}
                                        />
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue=""
                                            name="radio-buttons-group"
                                            style={{ marginTop: 20 }}
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </RadioGroup>
                                        <Button variant="contained" style={{ display: "block", marginTop: 20 }}>
                                            Submit
                                        </Button>
                                    </FormControl>
                                </Typography>
                                : <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="map-pin" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Location" secondary="Ahmedabad, Gujarat" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="hash" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Cooking expirence" secondary="10 Years" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton aria-label="user" color="primary">
                                                <FeatherIcon icon="user" width="20" height="20" />
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary="Gender" secondary="Male" />
                                    </ListItem>
                                </List>
                        }
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileLeft