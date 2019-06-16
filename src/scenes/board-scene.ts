import 'phaser';

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

export class BoardScene extends Phaser.Scene {
  preload() {
    this.load.image('letters', 'assets/letters/solid_spritesheet.png');
    this.load.image('empty_letter', 'assets/letters/solid_empty.png');
  }

  create() {
    const boardBackground = this.add.tileSprite(0, 0, 500, 500, 'empty_letter');
    boardBackground.setOrigin(0, 0);
    boardBackground.setTileScale(0.25);

    const board = this.make.tilemap({
      tileWidth: 256,
      tileHeight: 256,
      width: 10,
      height: 10,
    });
    const lettersTileset = board.addTilesetImage('letters', undefined, 256, 256, 0, 0);

    const lettersLayer = board.createBlankDynamicLayer('letters', lettersTileset);
    lettersLayer.setScale(0.25);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const pointerTileX = board.worldToTileX(worldPoint.x);
      const pointerTileY = board.worldToTileY(worldPoint.y);

      lettersLayer.putTileAt(tileIndices.A, pointerTileX, pointerTileY);
    });
  }
}
