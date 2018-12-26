import { URLGenerator } from "../util/URLGenerator";
import Axios from "axios";

export class LightsService {
  static getLights() {
    return Axios.get(URLGenerator.generateBase() + "/lights");
  }

  static getLight(light) {
    return Axios.get(URLGenerator.generateBase() + `/lights/${light.id}`);
  }

  static changeState(light, state) {
    return Axios.put(
      URLGenerator.generateBase() + `/lights/${light.id}/state`,
      state
    );
  }

  static changeStates(lights = [], state = { on: false }) {
    const returns = [];

    lights.map(light => returns.push(this.changeState(light, state)));

    return Axios.all(returns);
  }
}
