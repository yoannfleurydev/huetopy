import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BrightnessLow from "@material-ui/icons/BrightnessLowOutlined";
import BrightnessHigh from "@material-ui/icons/BrightnessHighOutlined";

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});

class BottomAppBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton
              color="inherit"
              onClick={() => console.log("Turn Off All Lights")}
            >
              <BrightnessLow />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => console.log("Turn On All Lights")}
            >
              <BrightnessHigh />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(BottomAppBar);
