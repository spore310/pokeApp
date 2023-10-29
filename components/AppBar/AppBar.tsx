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
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
export const AppBar = () => {
  return (
    <AppBarMui className={styles.container}>
      <Stack
        direction={"row"}
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
          <IconButton edge={"start"} size={"large"} color={"primary"}>
            <OtherHousesOutlinedIcon />
          </IconButton>
        </Link>
        <Typography component={"div"} variant={"body1"}>
          {"Pokedex"}
        </Typography>
      </Stack>
      <SearchBar />
      <IconButton edge="end" size="large" color="primary">
        <SettingsOutlinedIcon />
      </IconButton>
    </AppBarMui>
  );
};
