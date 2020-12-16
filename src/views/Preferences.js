import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { ArrowBackIos as BackIcon } from "@material-ui/icons";

import VoicesSelection from "../components/VoicesSelection";
import "../Layout.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Preferences = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Language Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="l-container">
        <VoicesSelection />
      </div>
    </>
  );
};

export default Preferences;
