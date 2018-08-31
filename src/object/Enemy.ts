import { Sprite, TileSprite, Input, Game, Sound } from "phaser-ce"
import { Vector2 } from "../math/VectorMath";
import Player from "./Player";

export default class Enemy {
    private game: Game;
    private player: Player;

    public demonGroup: Phaser.Group;
    public dragonGroup: Phaser.Group;
    public ghostGroup: Phaser.Group;
    public bossGroup: Phaser.Group;
    public bossBulletGroup: Phaser.Group;
    public bossSprite: Sprite;
    private bossTween: Phaser.Tween;
    private bossSkillTimer: Phaser.Timer;
    private isBossRanOnce: boolean = false; 

    private enemySprite: Sprite;
    private deathAudio: Sound;
    private hurtAudio: Sound;
    private bossBGM: Sound;

    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
    }

    create() {
        this.LoadEnemyAudio();
        this.CreateEnemyGroup();
    }

    update() {
        this.BossBehivorUpdate();
    }

    LoadEnemyAudio() {
        this.deathAudio = this.game.add.audio("enemyDeath", 1, false);
        this.hurtAudio = this.game.add.audio("enemyHurt", 1, false);
        this.bossBGM = this.game.add.audio("bossBGM", .3, true);
    }

    // Create enemy groups for spawning later
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

        this.bossGroup = this.game.add.group();
        this.bossGroup.enableBody = true;
        this.bossGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bossGroup.createMultiple(5, "boss");
        this.bossGroup.setAll("checkWorldBounds", true);
        this.bossGroup.setAll("outOfBoundsKill", true);
        this.bossGroup.setAll("scale.x", 5);
        this.bossGroup.setAll("scale.y", 5);

        this.bossBulletGroup = this.game.add.group();
        this.bossBulletGroup.enableBody = true;
        this.bossBulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bossBulletGroup.createMultiple(30, "bossBullet");
        this.bossBulletGroup.setAll("checkWorldBounds", true);
        this.bossBulletGroup.setAll("outOfBoundsKill", true);
        this.bossBulletGroup.setAll("scale.x", 1.1);
        this.bossBulletGroup.setAll("scale.y", 1.1);
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
                this.SpawnDemon(this.enemySprite, _x, _y);
                break;

            case "dragon":
                this.SpawnDragon(this.enemySprite, _x, _y);
                break;

            case "ghost":
                this.SpawnGhost(this.enemySprite, _x, _y);
                break;

            case "boss":
                this.SpawnBoss(this.enemySprite, _x, _y);
                break;

            default:
                break;
        }
    }

    SpawnDemon(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.demonGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.body.velocity.x = -25;
        enemySprite.health = 1 + 1;
        enemySprite.animations.add("idle", ["demon_idle01", "demon_idle02"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
    }

    SpawnDragon(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.dragonGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.body.velocity.x = -15;
        enemySprite.health = 1 + 4;
        enemySprite.animations.add("idle", ["dragon_idle01", "dragon_idle02"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
    }

    SpawnGhost(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.ghostGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.health = 1 + 2;
        enemySprite.animations.add("idle", ["ghost_idle01", "ghost_idle02"], 5, true);
        enemySprite.animations.add("idle_ghost", ["ghost_idle01_transparent", "ghost_idle02_transparent"], 5, true);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle_ghost");
        enemySprite.body.velocity.x = -15;
        const ghostTween = this.game.add.tween(enemySprite).to({ y: enemySprite.y + 70 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    }

    SpawnBoss(enemySprite: Sprite, _x: number, _y: number) {
        enemySprite = this.bossGroup.getFirstDead();
        enemySprite.reset(_x, _y);
        enemySprite.health = 1 + 60;
        enemySprite.animations.add("idle", ["boss_idle01"], 5, true);
        enemySprite.animations.add("laser_charge", ["boss_laser_charge01"], 5, true);
        enemySprite.animations.add("laser_shoot", ["boss_laser_shoot01"], 5, false);
        enemySprite.animations.add("bossbullet", ["boss_bossbullet01"], 5, false);
        enemySprite.animations.add("death", ["death01", "death02", "death03", "death04"], 5, false);
        enemySprite.play("idle");
        this.bossSprite = enemySprite;
        this.BossBehivorStart();
    }

    BossBehivorStart() {
        if (this.bossSprite != null) {
            this.bossTween = this.game.add.tween(this.bossGroup).to({ y: this.bossGroup.y + 250 }, 1500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
            this.bossSkillTimer = this.game.time.create(false);
            this.bossSkillTimer.loop(500, this.BossSkill, this);
        }
    }

    BossBehivorUpdate(_bossSprite?: Sprite) {
        if (this.bossSprite != null) {
            let playerDistance = this.bossSprite.x - this.player.playerSprite.x;
            if (playerDistance <= 960) {
                this.bossTween.start();
                this.StartBossMusic();
                this.bossSkillTimer.start();
            }
        }
    }

    // This is not working for unknown reason
    StartBossMusic(){
        if(!this.isBossRanOnce){
            this.bossBGM.play();
            console.log("MUUUUUUUUUUUUUSIC!");
            this.isBossRanOnce = true;
        }
    }

    BossSkill() {
        console.log("SKILL!");
        let skillPercentage = this.game.rnd.integerInRange(1, 100);
        if(skillPercentage < 20){
            // not enough time for making laser beam
        }
        else if (skillPercentage < 60) {
            this.SpawnBossBullet(this.enemySprite, this.bossSprite.x + 5, this.bossSprite.y, 3);
        }
    }

    SpawnBossBullet(enemySprite: Sprite, _x: number, _y: number, numbers: number) {
        for (let i = 0; i < numbers; i++) {
            enemySprite = this.bossBulletGroup.getFirstDead();
            enemySprite.reset(_x, _y);
            enemySprite.body.velocity.x = -150;
            enemySprite.lifespan = 3000;
            const bossBulletTween = this.game.add.tween(enemySprite).to({ y: enemySprite.y + 70 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        }
    }
}