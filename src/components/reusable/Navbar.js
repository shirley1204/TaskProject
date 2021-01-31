import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
  },
  home: {
    textDecoration: "none",
    color: "grey",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        style={{ borderBottom: "1px solid grey" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tasks
          </Typography>
          <Link to="/">
            <Typography variant="h6" className={classes.home}>
              Home
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
