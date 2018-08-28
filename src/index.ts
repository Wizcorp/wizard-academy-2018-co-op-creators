/**
 * This file just bootstraps the game. Add your scenes here and then start the ones that you want by using
 * game.state.start.
 */
import "phaser-ce"; // Just imports types
import Boot from "./base/Boot";
import TitleScene from "./TitleScene";
import GameScene from "./GameScene";
import GameOverScene from "./GameOverScene";

const game = new Phaser.Game(956, 538, Phaser.AUTO, 'content', null);
game.state.add('Boot', Boot, false);
game.state.add('TitleScene', TitleScene, false);
game.state.add('GameScene', GameScene, false);
game.state.add('GameOverScene', GameOverScene, false);


game.state.start('Boot');
