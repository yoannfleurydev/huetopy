import React, { Component, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  Snackbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLowOutlined";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHighOutlined";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { LightsService } from "../service/LightsService";

const styles = {
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
};

class BottomAppBar extends Component {
  state = { snackbarOpen: false, snackbarMessage: "" };

  /**
   * on is the attribute in Philips Hue API that tells the light to be on or off
   */
  changeGlobalStateOn = (on = false) => {
    const { lights, onChange } = this.props;

    LightsService.changeStates(lights, { on }).then(() => {
      const snackbarMessage = `Lights turned ${on ? "on" : "off"}`;

      this.setState({ snackbarOpen: true, snackbarMessage });
      onChange();
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  turnOffAllLights = () => {
    this.changeGlobalStateOn(false);
  };

  turnOnAllLights = () => {
    this.changeGlobalStateOn(true);
  };

  render() {
    const { classes } = this.props;
    const { snackbarOpen, snackbarMessage } = this.state;

    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <div>
              <IconButton color="inherit" onClick={this.turnOffAllLights}>
                <BrightnessLowIcon />
              </IconButton>
              <IconButton color="inherit" onClick={this.turnOnAllLights}>
                <BrightnessHighIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(BottomAppBar);
