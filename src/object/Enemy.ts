import { Sprite, TileSprite, Input, Game } from "phaser-ce"
import { Vector2 } from "../math/VectorMath";
import Player from "./Player";

export default class Enemy {
    private game: Game;
    private player: Player;

    public demonGroup: Phaser.Group;
    public dragonGroup: Phaser.Group;
    public ghostGroup: Phaser.Group;

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

    update() {
        this.BossBehaviorUpdate();
    }

    LoadEnemyAudio() {
        this.deathAudio = this.game.add.audio("enemyDeath", 1, false);
        this.hurtAudio = this.game.add.audio("enemyHurt", 1, false);
    }

    CreateEnemyGroup() {
        this.demonGroup = this.game.add.group();
        this.demonGroup.enableBody = true;
        this.demonGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.demonGroup.createMultiple(50, "demon");
        this.demonGroup.setAll("checkWorldBounds", true);
        this.demonGroup.setAll("outOfBoundsKill", true);
        this.demonGroup.setAll("scale.x", 1.5);
        this.demonGroup.setAll("scale.y", 1.5);

        this.dragonGroup = this.game.add.group();
        this.dragonGroup.enableBody = true;
        this.dragonGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.dragonGroup.createMultiple(30, "dragon");
        this.dragonGroup.setAll("checkWorldBounds", true);
        this.dragonGroup.setAll("outOfBoundsKill", true);
        this.dragonGroup.setAll("scale.x", 2.5);
        this.dragonGroup.setAll("scale.y", 2.5);

        this.ghostGroup = this.game.add.group();
        this.ghostGroup.enableBody = true;
        this.ghostGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.ghostGroup.createMultiple(30, "ghost");
        this.ghostGroup.setAll("checkWorldBounds", true);
        this.ghostGroup.setAll("outOfBoundsKill", true);
        this.ghostGroup.setAll("scale.x", 1.5);
        this.ghostGroup.setAll("scale.y", 1.5);
    }

    EnemyHurt(enemySprite: Sprite) {
        enemySprite.damage(1);
        this.hurtAudio.play();
        // use 1 for death because sprite will get auto destroied when it become 0
        if (enemySprite.health <= 1) {
            enemySprite.body.enable = false;
            this.deathAudio.play();
            enemySprite.play("death");
            enemySprite.animations.getAnimation("death").onComplete.add(() => { enemySprite.kill(); }, this);
        }
    }

    AddEnemy(_enemy: string, _x: number, _y: number) {
        switch (_enemy) {
            case "demon":
                this.DemonBehavior(this.enemySprite, _x, _y);
                break;

            case "dragon":
                this.DragonBehavior(this.enemySprite, _x, _y);
                break;

            case "ghost":
                this.GhostBehavior(this.enemySprite, _x, _y);
                break;

            case "boss":
                this.BossBehavior(this.enemySprite, _x, _y);
                break;

            default:
                break;
        }
    }

    DemonBehavior(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.demonGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.body.velocity.x = -25;
        enemySprite.health = 1+1;
        enemySprite.animations.add("idle", ["demon_idle01", "demon_idle02"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
    }

    DragonBehavior(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.dragonGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.body.velocity.x = -15;
        enemySprite.health = 1+4;
        enemySprite.animations.add("idle", ["dragon_idle01", "dragon_idle02"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
    }

    GhostBehavior(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.ghostGroup.getFirstDead();
        enemySprite.health = 1+2;
        enemySprite.animations.add("idle", ["ghost_idle01", "ghost_idle02"], 5, true);
        enemySprite.animations.add("idle_ghost", ["ghost_idle01_transparent", "ghost_idle02_transparent"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle_ghost");
        enemySprite.body.velocity.x = -15;
        let ghostTween = this.game.add.tween(enemySprite).to({y: enemySprite.y+70}, 1000, Phaser.Easing.Sinusoidal.InOut,true,0,-1,true);
    }

    BossBehavior(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.game.add.sprite(_x,_y,"boss");
        enemySprite.reset(_x, _y);
        enemySprite.health = 1+60;
        enemySprite.animations.add("idle", ["boss_idle01"], 5, true);
        enemySprite.animations.add("laser_charge", ["boss_laser_charge01"], 5, true);
        enemySprite.animations.add("laser_shoot", ["boss_laser_shoot01"], 5, false);
        enemySprite.animations.add("eyebullet", ["boss_eyebullet01"], 5, false);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
        this.BossBehaviorUpdate(enemySprite)
    }

    BossBehaviorUpdate(enemySprite?:Sprite){
        const bossSprite = enemySprite;
        if(bossSprite != null){
            //if(this.player.playerSprite.x > bossSprite.x + )
        }
    }
}