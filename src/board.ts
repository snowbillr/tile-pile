export class Board {
  private tiles: { [index: string]: object }

  constructor() {
    this.tiles = {};
  }

  set(x: number, y: number, data: object) {
    this.tiles[this.keyForCoords(x, y)] = data;
  }

  get(x: number, y: number) {
    return this.tiles[this.keyForCoords(x, y)];
  }

  private keyForCoords(x: number, y: number) {
    return `${x},${y}`;
  }
}
