import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  Snackbar,
  Tooltip
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

function BottomAppBar({ lights, onChange, classes }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /**
   * on is the attribute in Philips Hue API that tells the light to be on or off
   */
  const changeGlobalStateOn = (on = false) => {
    LightsService.changeStates(lights, { on }).then(() => {
      setSnackbarMessage(`Lights turned ${on ? "on" : "off"}`);
      setSnackbarOpen(true);
      onChange();
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbarMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
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
            <Tooltip title="Turn off all lights">
              <IconButton
                color="inherit"
                onClick={() => changeGlobalStateOn(false)}
              >
                <BrightnessLowIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Turn on all lights">
              <IconButton
                color="inherit"
                onClick={() => changeGlobalStateOn(true)}
              >
                <BrightnessHighIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(BottomAppBar);
