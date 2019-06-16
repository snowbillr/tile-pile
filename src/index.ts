import 'phaser';

import { BoardScene } from './scenes/board-scene';

const gameConfig = {
  width: 500,
  height: 500,
  scene: BoardScene
};

new Phaser.Game(gameConfig);
