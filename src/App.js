import React, { Component } from "react";
import { LightsService } from "./service/LightsService";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import LightListItem from "./components/LightListItem";
import BottomAppBar from "./components/BottomAppBar";

class App extends Component {
  state = { lights: [] };

  componentDidMount() {
    this.lightsState();
  }

  lightsState = () => {
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
  };

  render() {
    const { lights } = this.state;

    return (
      <div>
        <List subheader={<ListSubheader>Lights</ListSubheader>}>
          {lights.map(light => (
            <LightListItem
              key={light.id}
              light={light}
              lightsState={this.lightsState}
            />
          ))}
        </List>
        <BottomAppBar />
      </div>
    );
  }
}

export default App;
