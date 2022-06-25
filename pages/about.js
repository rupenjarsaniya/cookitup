import * as React from "react";
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
import userimg1 from "../assets/images/users/1.jpg";
import userimg2 from "../assets/images/users/2.jpg";
import userimg3 from "../assets/images/users/3.jpg";

const About = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
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
          <Stack spacing={2}>
            <Typography variant="div">
              <Typography component="legend" mb={1}>Give Rate</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Feedback"
              multiline
              rows={2}
            />
          </Stack>
          <br />
          <Button variant="contained" mt={2}>
            Send
          </Button>
          <Typography variant="div" mt={5} style={{ display: "block" }}>
            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
              <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Avatar alt="Remy Sharp" src={userimg1} />
                <Typography variant="h5" style={{}} ml={1}>
                  Rupen Jarsaniya
                </Typography>
              </Typography>
              <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                Nice website, i learn many cooking recipe
              </Typography>
            </Typography>

            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
              <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Avatar alt="Remy Sharp" src={userimg1} />
                <Typography variant="h5" style={{}} ml={1}>
                  Bhagyashree Thombre
                </Typography>
              </Typography>
              <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                Cool website
              </Typography>
            </Typography>

            <Typography variant="div" style={{ display: "block" }} pb={1} mb={3}>
              <Typography variant="div" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Avatar alt="Remy Sharp" src={userimg1} />
                <Typography variant="h5" style={{}} ml={1}>
                  Pratham Kansara
                </Typography>
              </Typography>
              <Typography variant="div" style={{ display: "block", color: "gray" }} mt={2}>
                Best Recipe website i never seen before
              </Typography>
            </Typography>

            <Typography variant="div" mt={3} style={{ display: "block", cursor: "pointer" }} color="primary">
              See all reviews
            </Typography>
          </Typography>
        </BaseCard>
      </Grid>
    </Grid>
  );
}

export default About;