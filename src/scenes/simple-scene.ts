const tileIndices = {

};

export class SimpleScene extends Phaser.Scene {
  preload() {
    // this.load.atlasXML('letters', 'assets/letters/solid_spritesheet.png', 'assets/letters/solid_spritesheet.xml');
    this.load.image('letters', 'assets/letters/solid_spritesheet.png');
  }

  create() {
    const board = this.make.tilemap({
      tileWidth: 256,
      tileHeight: 256,
      width: 10,
      height: 10,
    });
    const lettersTileset = board.addTilesetImage('letters');

    const lettersLayer = board.createBlankDynamicLayer('letters', lettersTileset);
    lettersLayer.setScale(0.25)

    lettersLayer.putTileAt(4, 0, 0);
  }
}
