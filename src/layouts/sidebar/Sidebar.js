import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import Ratings from "./Ratings";
import Category from "./Category";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../States/index';
import axios from 'axios';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {

  const dispatch = useDispatch();

  const actions = bindActionCreators(actionCreators, dispatch);

  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [open, setOpen] = React.useState(true);

  const userdata = useSelector((state) => state.user);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  let curl = useRouter();
  const location = curl.pathname;

  const logoutUser = () => {
    localStorage.removeItem("token");
    actions.getUser("");
  }


  useEffect(() => {
    const fetchSome = async () => {
      const res = await axios.get('http://localhost:3000/api/count');
      setTotalRecipes(res.data.recipes);
      setTotalUsers(res.data.users);
    }
    fetchSome();
  }, []);

  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box mt={2}>
        <List>
          {
            Menuitems.map((item, index) => (
              <List component="li" disablePadding key={item.title}>

                <NextLink href={`${item.href === "/profile" ? userdata && item.href + "/" + userdata.name : item.href}`}>

                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    selected={location === `${item.href === "/profile" ? userdata && item.href + "/" + userdata.name : item.href}`}
                    sx={{
                      mb: 1,
                      ...(location === `${item.href === "/profile" ? userdata && item.href + "/" + userdata.name : item.href}` && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}>

                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${location === `${item.href === "/profile" ? userdata && item.href + "/" + userdata.name : item.href}` ? "white" : ""} `,
                        }}
                        icon={item.icon}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText onClick={onSidebarClose}>
                      {item.title}
                    </ListItemText>

                  </ListItem>

                </NextLink>

              </List>
            ))
          }
        </List>
        <Divider />


        <List component="li">
          {
            userdata
              ? <NextLink href="">

                <ListItem
                  onClick={() => handleClick(13)}
                  button
                >

                  <ListItemIcon>
                    <FeatherIcon
                      icon="log-out"
                      width="20"
                      height="20"
                    />
                  </ListItemIcon>

                  <ListItemText onClick={() => { logoutUser(), onSidebarClose }}>
                    Logout
                  </ListItemText>

                </ListItem>

              </NextLink>
              : <>
                <NextLink href="/login">

                  <ListItem
                    onClick={() => handleClick(11)}
                    button
                    selected={location === "/login"}
                    sx={{
                      mb: 1,
                      ...(location === "/login" && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}>

                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${location === "/login" ? "white" : ""} `,
                        }}
                        icon="log-in"
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText onClick={onSidebarClose}>
                      Login
                    </ListItemText>

                  </ListItem>

                </NextLink>

                <NextLink href="/signup">

                  <ListItem
                    onClick={() => handleClick(12)}
                    button
                    selected={location === "/signup"}
                    sx={{
                      ...(location === "/signup" && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}>

                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${location === "/signup" ? "white" : ""} `,
                        }}
                        icon="user-plus"
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText onClick={onSidebarClose}>
                      Signup
                    </ListItemText>

                  </ListItem>

                </NextLink>
              </>
          }

        </List>

      </Box>
      <Divider />
      <Category />
      <Divider />
      <Ratings totalRecipes={totalRecipes} totalUsers={totalUsers} />
    </Box >
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }


  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
