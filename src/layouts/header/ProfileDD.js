import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import {
  Box,
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../States/index';
import { useRouter } from 'next/router';

const ProfileDD = () => {

  const userdata = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  const actions = bindActionCreators(actionCreators, dispatch);

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    actions.getUser("");
    router.push('/');
  }

  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={`${userdata && userdata.profileimg ? userdata.profileimg : "/userlogo.png"}`}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
            style={{ borderRadius: "100%" }}
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {userdata ? userdata?.name : "ADMIN"}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <Link href={'/dashboard'}>
                <ListItemButton>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
              <Link href={'/profile/' + userdata?.name}>
                <ListItemButton>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </Link>
              <Link href={'/updateprofile'}>
                <ListItemButton>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </Link>
              <Link href={'/changepassword'}>
                <ListItemButton>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </Link>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            {
              userdata ?
                <Button fullWidth variant="contained" color="primary" onClick={logoutUser}>
                  Logout
                </Button>
                : <Link href={"/login"} >
                  <Button fullWidth variant="contained" color="primary">
                    Login
                  </Button>
                </Link>
            }
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
