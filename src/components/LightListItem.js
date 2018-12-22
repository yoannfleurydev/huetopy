import React, { Component, Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { ListItemIcon, Tooltip } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/WifiOutlined";
import ErrorIcon from "@material-ui/icons/WifiOffOutlined";
import Slider from "@material-ui/lab/Slider";
import { LightsService } from "../service/LightsService";
import { State } from "../resource/State";

class LightCard extends Component {
  constructor(props) {
    super(props);

    this.state = { light: this.props.light, bri: this.props.light.state.bri };
  }

  changeState = light => {
    LightsService.changeState(light, new State(!light.state.on)).then(() => {
      LightsService.getLight(light).then(res => {
        const newState = res.data;
        newState.id = light.id;
        this.setState({ light: newState });
      });
    });
  };

  handleLightBrightnessChange = (event, value) => {
    this.setState({ bri: value });
  };

  handleLightBrightnessOnDragEnd = () => {
    const {
      bri,
      light,
      light: { id }
    } = this.state;

    LightsService.changeState(light, new State(true, bri)).then(() => {
      LightsService.getLight(light).then(res => {
        const newState = res.data;
        newState.id = id;
        this.setState({ light: newState });
      });
    });
  };

  render() {
    const { light, bri } = this.state;

    return (
      <Fragment>
        <ListItem key={light.id}>
          <ListItemIcon>
            {light.state.reachable ? (
              <Tooltip title="Reachable">
                <CheckBoxIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Unreachable">
                <ErrorIcon />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemText primary={light.name} />
          <ListItemSecondaryAction>
            <Switch
              disabled={!light.state.reachable}
              onChange={() => {
                this.changeState(light);
              }}
              checked={light.state.on}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Slider
          max={254}
          value={bri}
          onChange={this.handleLightBrightnessChange}
          onDragEnd={this.handleLightBrightnessOnDragEnd}
        />
      </Fragment>
    );
  }
}

export default LightCard;
