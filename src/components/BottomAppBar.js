import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BrightnessLow from "@material-ui/icons/BrightnessLowOutlined";
import BrightnessHigh from "@material-ui/icons/BrightnessHighOutlined";
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
  /**
   * on is the attribute in Philips Hue API that tells the light to be on or off
   */
  changeGlobalStateOn = (on = false) => {
    const { lights, lightsState } = this.props;

    LightsService.changeStates(lights, { on }).then(() => {
      lightsState();
    });
  };

  turnOffAllLights = () => {
    this.changeGlobalStateOn(false);
  };

  turnOnAllLights = () => {
    this.changeGlobalStateOn(true);
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton color="inherit" onClick={this.turnOffAllLights}>
              <BrightnessLow />
            </IconButton>
            <IconButton color="inherit" onClick={this.turnOnAllLights}>
              <BrightnessHigh />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(BottomAppBar);
