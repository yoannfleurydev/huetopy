export class State {
  on = null;
  bri = null;
  hue = null;
  sat = null;

  constructor(on, bri = null, hue = null, sat = null) {
    this.on = on;
    this.bri = bri == null ? null : Math.round(bri);
    this.hue = hue;
    this.sat = sat;
  }
}
