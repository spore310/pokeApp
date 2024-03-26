"use client";
import React from "react";
import {
  AppBar as AppBarMui,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./styles/AppBar.module.css";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
import SettingsMenu from "./SettingsMenu/SettingsMenu";
export const AppBar = () => {
  return (
    <AppBarMui className={styles.container}>
      <Stack
        direction={"row"}
        sx={{ width: "inherit" }}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Link
            aria-label="Home page link"
            href={`/`}
            className={styles.iconButton}
          >
            <IconButton edge={"start"} size={"large"} color={"success"}>
              <OtherHousesOutlinedIcon />
            </IconButton>
          </Link>
          <Typography component={"div"} variant={"body1"}>
            {"Pokedex"}
          </Typography>
        </Stack>
        <SearchBar />
        <SettingsMenu />
      </Stack>
    </AppBarMui>
  );
};
