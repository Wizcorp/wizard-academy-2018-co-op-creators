import { Sprite, TileSprite, Input, Game } from "phaser-ce" 

const enemy_life = 1;
var speed = 200;

export default class Enemy { 
    //private enemy_1: enemy;

    public enemySprite: Phaser.Sprite;
    private game:Game;

	constructor(game: Game) {
		this.game = game;	
	}

    create()
    {
       
    }

    EnemyMovement()
   {

    
   }

   Addenemy()
   {
    console.log("ENEMY");
    this.enemySprite = this.game.add.sprite(this.game.width / 2.5, this.game.height / 2, 'enemy');
    this.enemySprite.smoothed = false;
    this.enemySprite.anchor.set(0.5, 0.5);
    this.enemySprite.scale.set(2, 2);
    this.game.physics.arcade.enable(this.enemySprite); 
    
   }
}