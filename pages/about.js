import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Rating,
  Avatar,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useSelector } from "react-redux";
import axios from "axios";
import mongoose from "mongoose";
import Feedback from "../models/Feedback";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const About = ({ feedbacks }) => {
  const router = useRouter();
  const userdata = useSelector(state => state.user);

  const [feedbackData, setFeedbackData] = useState({ rating: "", message: "" });

  const handleFeedbackData = (e) => setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');

    try {
      feedbackData.name = userdata.name;
      feedbackData.userId = userdata._id;
      const res = await axios.post(`${process.env.PROD_URL}/api/feedback`, feedbackData, {
        headers: { "content-type": "application/json", "token": token }
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
        setFeedbackData({ rating: "", message: "" });
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
      toast.error(error.data, {
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
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
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
        <Card>
          <CardContent>
            <Typography variant="h3">Cooking</Typography>
            <Typography variant="body1" mt={2} style={{ color: "gray" }}>
              Cooking, cookery, or culinary arts is the art, science and craft of using heat to prepare food for consumption. Cooking techniques and ingredients vary widely, from grilling food over an open fire to using electric stoves, to baking in various types of ovens, reflecting local conditions.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h3">Cook It Up</Typography>
            <Typography variant="body1" mt={2} style={{ color: "gray" }}>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h3">Recipe</Typography>
            <Typography variant="body1" mt={2} style={{ color: "gray" }}>
              A recipe is a formula of ingredients and a list of instructions for creating prepared foods. It is used to control quality, quantity, and food costs in a foodservice operation. A recipe may be simple to complex based on the requirements of the operation and the intended user. For example, an experienced chef may need a recipe with only a few details, while a beginner cook may need more information about ingredients, preparation steps, cooking times and temperatures, visual cues, and equipment requirements. Recipes are formatted differently depending on the author and the intended use. Professional chefs record recipes in pocket notebooks, binders, or digital devices, using simple to complex details, depending on the type of recipe and the experience level of the chef.  Information might include ingredients, prep steps, kitchen notes, and hand-drawn plate presentations. Recipes for the general consumer must be written with the assumption that the intended user knows very little about food preparation. When writing recipes that others will use in your kitchen, provide as much information so that anyone who is preparing, inexperienced or skilled, can easily understand. Include information on ingredients, prep steps for fabricating or measuring, cooking instructions, recipe yield, and required equipment.
            </Typography>
          </CardContent>
        </Card>

        <BaseCard title="Any Suggestions?">
          <form onSubmit={handleSubmit}>

            <Stack spacing={2}>
              <Typography variant="div">
                <Typography component="legend" mb={1}>Give Rate</Typography>
                <Rating
                  name="rating"
                  value={feedbackData.rating}
                  onChange={handleFeedbackData}
                />
              </Typography>
              <TextField
                id="outlined-multiline-static"
                label="Feedback"
                name="message"
                multiline
                rows={2}
                value={feedbackData.message}
                onChange={handleFeedbackData}
                required
              />
            </Stack>
            <br />
            <Button type="submit" variant="contained">
              Send
            </Button>
          </form>

          <Typography variant="div" mt={5} style={{ display: "block" }}>

            {
              feedbacks.map((feedback) => {
                return <Typography variant="div" style={{ display: "block" }} pb={1} mb={3} key={feedback._id}>
                  <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <Avatar alt="Remy Sharp" src="" />
                      <Typography variant="h5" ml={1}>
                        {feedback.name}
                      </Typography>
                    </Typography>
                    <Typography variant="h5" style={{ fontSize: 10, color: 'gray' }}>
                      {new Date(feedback.createdAt).toLocaleString()}
                    </Typography>
                  </Typography>
                  <Rating
                    name="rating"
                    value={feedback.rating}
                    readOnly
                    style={{ fontSize: 15, marginTop: 10 }}
                  />
                  <Typography variant="div" style={{ display: "block", color: "gray" }}>
                    {feedback.message}
                  </Typography>
                </Typography>
              })
            }


            <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
              See all reviews
            </Typography>
          </Typography>
        </BaseCard>
      </Grid>
    </Grid>
  );
}

export async function getStaticProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const feedbacks = await Feedback.find();

  return { props: { feedbacks: JSON.parse(JSON.stringify(feedbacks)) } }
}

export default About;