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
    private hurtAudio: Phaser.Sound;

    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
    }

    create() {
        this.LoadEnemyAudio();
        this.CreateEnemyGroup();
    }

    update(){
    }

    LoadEnemyAudio(){
        this.deathAudio = this.game.add.audio("enemyDeath",1,false);
        this.hurtAudio = this.game.add.audio("enemyHurt",1,false);
    }
    
    CreateEnemyGroup() {
        this.demonGroup = this.game.add.group();
        this.demonGroup.enableBody = true;
        this.demonGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.demonGroup.createMultiple(50, "demon");
        this.demonGroup.setAll("checkWorldBounds", true);
        this.demonGroup.setAll("outOfBoundsKill", true);
        this.demonGroup.setAll("scale.x",1.5);
        this.demonGroup.setAll("scale.y",1.5);
        
        this.dragonGroup = this.game.add.group();
        this.dragonGroup.enableBody = true;
        this.dragonGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.dragonGroup.createMultiple(50, "dragon");
        this.dragonGroup.setAll("checkWorldBounds", true);
        this.dragonGroup.setAll("outOfBoundsKill", true);
        this.dragonGroup.setAll("scale.x",2);
        this.dragonGroup.setAll("scale.y",2);
    }

    EnemyHurt(enemySprite:Sprite){
        enemySprite.damage(1);
        this.hurtAudio.play();
        // use 1 for death because sprite will get auto destroied when it become 0
        if(enemySprite.health <= 1){
            console.log("1hp!");
            this.enemySprite.body.enable = false;
            this.deathAudio.play();
            this.enemySprite.play("death");
            this.enemySprite.animations.getAnimation("death").onComplete.add( () =>
            {this.enemySprite.kill();},this);
        }
    }

    AddEnemy(_enemy: string,_x:number,_y:number) {
        switch(_enemy){
            case "demon":
            this.enemySprite = this.demonGroup.getFirstDead();
            this.enemySprite.reset(_x,_y);
            this.enemySprite.body.velocity.x = -25;
            this.enemySprite.health = 2;
            this.enemySprite.animations.add("idle",["demon_idle01","demon_idle02"],5,true);
            this.enemySprite.animations.add("death",["death01","death02","death03","death04"],5,false);
            this.enemySprite.play("idle");
            console.log(this.enemySprite);
            break;

            case "dragon":
            this.enemySprite = this.dragonGroup.getFirstDead();
            this.enemySprite.reset(_x,_y);
            this.enemySprite.body.velocity.x = -15;
            this.enemySprite.health = 4;
            this.enemySprite.animations.add("idle",["dragon_idle01","dragon_idle02"],5,true);
            this.enemySprite.animations.add("death",["death01","death02","death03","death04"],5,false);
            this.enemySprite.play("idle");
            console.log(this.enemySprite);
            break;

            default:
            break;
        }
    }
}