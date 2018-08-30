import { Sprite, TileSprite, Input, Game } from "phaser-ce"
import { Vector2 } from "../math/VectorMath";
import Player from "./Player";

export default class Enemy {
    private game: Game;
    private player: Player;

    public demonGroup: Phaser.Group;
    public dragonGroup: Phaser.Group;

    private enemySprite: Phaser.Sprite;
	private deathAudio: Phaser.Sound;

    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
    }

    create() {
        this.LoadEnemyAnimNAudio();
        this.CreateEnemyGroup();
    }

    update(){
    }

    LoadEnemyAnimNAudio(){
        this.deathAudio = this.game.add.audio("enemyDeath",1,false);
    }
    
    CreateEnemyGroup() {
        this.demonGroup = this.game.add.group();
        this.demonGroup.enableBody = true;
        this.demonGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.demonGroup.createMultiple(30, "demon");
        this.demonGroup.setAll("checkWorldBounds", true);
        this.demonGroup.setAll("outOfBoundsKill", true);
        this.demonGroup.setAll("scale.x",1.5);
        this.demonGroup.setAll("scale.y",1.5);
        //this.demonGroup.x -= 1.5;
        
        this.dragonGroup = this.game.add.group();
        this.dragonGroup.enableBody = true;
        this.dragonGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.dragonGroup.createMultiple(30, "demon");
        this.dragonGroup.setAll("checkWorldBounds", true);
        this.dragonGroup.setAll("outOfBoundsKill", true);
        this.dragonGroup.setAll("scale.x",1.5);
        this.dragonGroup.setAll("scale.y",1.5);
    }

    EnemyDeath(enemySprite:Sprite){
        this.deathAudio.play("enemyDeath");
        enemySprite.kill();
    }

    AddEnemy(_enemy: string,_x:number,_y:number) {
        switch(_enemy){
            case "demon":
            this.enemySprite = this.demonGroup.getFirstDead();
            this.enemySprite.reset(_x,_y);
            this.enemySprite.body.velocity.x = -10;
            this.enemySprite.animations.add("idle",["demon_idle01","demon_idle02"],5,true);
            this.enemySprite.play("idle");
            //console.log("spawned",_enemy);
            break;

            case "boss":
            break;

            default:
            break;
        }
    }
}