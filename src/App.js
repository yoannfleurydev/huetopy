import React, { Component } from "react";
import "./App.css";
import { LightsService } from "./service/LightsService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";

class App extends Component {
  state = { lights: [] };

  componentDidMount() {
    LightsService.getLights().then(res => {
      const lights = [];

      // Put the JSON of each light in an array because Philips Hue default is
      // an object.
      Object.keys(res.data).forEach(key => {
        const light = res.data[key];
        light.id = key;
        lights.push(light);
      });

      this.setState({ lights });
    });
  }

  changeState = light => {
    LightsService.changeState(light, !light.state.on).then(() => {
      LightsService.getLights().then(res => {
        const lights = [];
        // Put the JSON of each light in an array because Philips Hue default is
        // an object.
        Object.keys(res.data).forEach(key => {
          const light = res.data[key];
          light.id = key;
          lights.push(light);
        });

        this.setState({ lights });
      });
    });
  };

  render() {
    const { lights } = this.state;

    return (
      <div>
        <List subheader={<ListSubheader>Lights</ListSubheader>}>
          {lights.map(light => (
            <ListItem key={light.id}>
              <ListItemText primary={light.name} />
              <ListItemSecondaryAction>
                <Switch
                  onChange={() => {
                    this.changeState(light);
                  }}
                  checked={light.state.on}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
