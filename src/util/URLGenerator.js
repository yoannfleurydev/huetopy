import parameters from "../config/parameters.json";

export class URLGenerator {
  static generateBase() {
    return `http://${parameters.ip}/api/${parameters.username}`;
  }
}
