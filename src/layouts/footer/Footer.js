import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography style={{ fontSize: 14, color: "gray" }}>
        © 2022 All rights reserved by{" "}
        <Link href={'/'}>
          <a style={{ color: '#FFA500' }}>Cookitup</a>
        </Link>{" "}
        by RJ
      </Typography>
    </Box>
  );
};

export default Footer;
