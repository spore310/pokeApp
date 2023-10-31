"use client";
import { IconButton } from "@mui/material";

import { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  usePokeAppDispatch,
  usePokeAppSelector,
} from "../../../lib/redux/Hooks";
import { useDispatch } from "react-redux";
import { toogleLightMode } from "../../../lib/redux/slices/themeSlice";
const SettingsMenu = () => {
  const dispatch = usePokeAppDispatch();
  const [settingsRef, settingsState] = useState<HTMLElement | null>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    settingsState(event.currentTarget);
  };
  const handleClose = () => {
    settingsState(null);
  };
  const toogleDarkMode = () => {
    dispatch(toogleLightMode(""));
    handleClose();
  };
  return (
    <>
      <IconButton
        edge="end"
        size="large"
        color="success"
        aria-label="settings for client"
        aria-controls="settings-appbar"
        aria-haspopup="true"
        aria-expanded={Boolean(settingsRef)}
        onClick={handleMenu}
      >
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        id="settings-appbar"
        anchorEl={settingsRef}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(settingsRef)}
        onClose={handleClose}
      >
        <MenuItem onClick={toogleDarkMode}>Toogle Dark Mode</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
