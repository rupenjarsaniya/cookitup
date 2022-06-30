import React, { useState } from 'react'
import FeatherIcon from "feather-icons-react";
import {
  Grid,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import userimg1 from "../assets/images/users/1.jpg";
import Image from 'next/image';
import mongoose from 'mongoose';
import Recipe from '../models/Recipe';
import Post from './post';

export default function Index({ recipes }) {


  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} px={1}>
        <Typography variant="div" style={{ display: "block" }}>


          {

            recipes.map((p) => { return <Post post={p} key={p._id} /> })

          }


        </Typography>
      </Grid >
    </Grid >
  );
}

export async function getStaticProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const recipes = await Recipe.find();

  return { props: { recipes: JSON.parse(JSON.stringify(recipes)) } }

}