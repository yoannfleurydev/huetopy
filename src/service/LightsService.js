import { URLGenerator } from "../util/URLGenerator";
import Axios from "axios";

export class LightsService {
  static getLights() {
    return Axios.get(URLGenerator.generateBase() + "/lights");
  }

  static changeState(light, on) {
    return Axios.put(
      URLGenerator.generateBase() + `/lights/${light.id}/state`,
      { on: on }
    );
  }
}
