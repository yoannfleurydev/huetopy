import React, { useState } from "react";
import { LightsService } from "./service/LightsService";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import LightListItem from "./components/LightListItem";
import BottomAppBar from "./components/BottomAppBar";
import { withStyles } from "@material-ui/core";

const styles = {
  list: {
    paddingBottom: 50
  }
};

function App({ classes }) {
  const [lights, setLights] = useState([]);

  const lightsState = () => {
    LightsService.getLights().then(res => {
      const newLights = [];
      // Put the JSON of each light in an array because Philips Hue default is
      // an object.
      Object.keys(res.data).forEach(key => {
        const light = res.data[key];
        light.id = key;
        newLights.push(light);
      });

      setLights(newLights);
    });
  };

  lightsState();

  return (
    <React.Fragment>
      <List
        subheader={<ListSubheader>Lights</ListSubheader>}
        className={classes.list}
      >
        {lights.map(light => (
          <LightListItem
            key={light.id}
            light={light}
            lightsState={lightsState}
          />
        ))}
      </List>
      <BottomAppBar lights={lights} onChange={lightsState} />
    </React.Fragment>
  );
}

export default withStyles(styles)(App);
