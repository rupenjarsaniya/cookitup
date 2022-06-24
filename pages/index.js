import { Grid } from "@mui/material";

export default function Index() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <h1>RJ</h1>
      </Grid>
      <Grid item xs={12} lg={4}>
        <h1>RJ1</h1>
      </Grid>
      <Grid item xs={12} lg={8}>
        <h1>RJ2</h1>
      </Grid>
      <Grid item xs={12} lg={12}>
        <h1>RJ3</h1>
      </Grid>
    </Grid>
  );
}
