import 'phaser';
import { Board } from '../models/board';
import { Tile } from '../models/tile';

const tileIndices: { [key: string]: number } = {
  Y: 0,
  R: 1,
  K: 2,
  D: 3,

  X: 8,
  Q: 9,
  J: 10,
  C: 11,

  W: 16,
  P: 17,
  I: 18,
  B: 19,

  V: 24,
  O: 25,
  H: 26,
  A: 27,

  U: 32,
  N: 33,
  G: 34,
  BLANK: 35,

  T: 40,
  M: 41,
  F: 42,
  L: 43,

  S: 48,
  Z: 49,
  E: 50
};

const WIDTH = 5;
const HEIGHT = 5;

export class BoardScene extends Phaser.Scene {
  private board!: Board<Tile>;
  private boardTilemap!: Phaser.Tilemaps.Tilemap;
  private lettersLayer!: Phaser.Tilemaps.DynamicTilemapLayer;

  preload() {
    this.load.image('letters', 'assets/letters/solid_spritesheet.png');
    this.load.image('empty_letter', 'assets/letters/solid_empty.png');
  }

  create() {
    this.createBoardModel();
    this.createBoardView();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      const tileX = this.boardTilemap.worldToTileX(worldPoint.x);
      const tileY = this.boardTilemap.worldToTileY(worldPoint.y);

      const boardTile = this.board.get(tileX, tileY);

      const letterOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (boardTile.value == '') {
        boardTile.value = 'A';
      } else {
        const nextValue = letterOrder[letterOrder.indexOf(boardTile.value) + 1];
        boardTile.value = nextValue;
      }

      this.lettersLayer.putTileAt(tileIndices[boardTile.value], tileX, tileY);
    });
  }

  private createBoardModel() {
    this.board = new Board<Tile>();
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        this.board.set(x, y, new Tile(''));
      }
    }
  }

  private createBoardView() {
    const boardBackground = this.add.tileSprite(0, 0, 0, 0, 'empty_letter');
    boardBackground.setOrigin(0, 0);
    boardBackground.setTileScale(0.25);

    this.boardTilemap = this.make.tilemap({
      tileWidth: 256,
      tileHeight: 256,
      width: WIDTH,
      height: HEIGHT,
    });
    const lettersTileset = this.boardTilemap.addTilesetImage('letters', undefined, 256, 256, 0, 0);

    this.lettersLayer = this.boardTilemap.createBlankDynamicLayer('letters', lettersTileset);
    this.lettersLayer.setScale(0.25);

    boardBackground.setSize(this.lettersLayer.displayWidth, this.lettersLayer.displayHeight)
  }
}
