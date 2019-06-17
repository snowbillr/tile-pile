export class Board<T> {
  private tiles: { [index: string]: T }

  constructor() {
    this.tiles = {};
  }

  set(x: number, y: number, data: T) {
    this.tiles[this.keyForCoords(x, y)] = data;
  }

  get(x: number, y: number): T {
    return this.tiles[this.keyForCoords(x, y)];
  }

  private keyForCoords(x: number, y: number) {
    return `${x},${y}`;
  }
}
