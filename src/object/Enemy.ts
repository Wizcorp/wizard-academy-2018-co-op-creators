import { Sprite, TileSprite, Input, Game } from "phaser-ce"
import { Vector2 } from "../math/VectorMath";
import Player from "./Player";

export default class Enemy {
    private game: Game;
    private player: Player;

    private demonGroup: Phaser.Group;
    private demonLife: number = 1;

    public enemySprite: Phaser.Sprite;


    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
    }

    create() {
        this.CreateDemonGroup();
    }

    update(){

    }
    
    CreateDemonGroup() {
        this.demonGroup = this.game.add.group();
        this.demonGroup.enableBody = true;
        this.demonGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.demonGroup.createMultiple(30, "demon");
        this.demonGroup.setAll("checkWorldBounds", true);
        this.demonGroup.setAll("outOfBoundsKill", true);
        //this.demonGroup.scale.set(2, 2);
        this.demonGroup.setAll("scale.x",2);
        this.demonGroup.setAll("scale.y",2);
        this.demonGroup.setAll("body.velocity.x",-50);

    }

    AddEnemy(_enemy: string,_x:number,_y:number) {
        switch(_enemy){
            case "demon":
            this.enemySprite = this.demonGroup.getFirstDead();
            this.enemySprite.reset(_x,_y);
            //this.enemySprite.body.velocity.x = -50;
            //console.log("spawned",_enemy);
            break;

            case "boss":
            break;

            default:
            break;
        }
    }
}