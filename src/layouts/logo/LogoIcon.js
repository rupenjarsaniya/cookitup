import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src="/cookituplogo.png" alt="logo" width={100} height={100} />
    </Link>
  );
};

export default LogoIcon;
