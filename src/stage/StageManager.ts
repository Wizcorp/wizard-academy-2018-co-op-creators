import { Game, TileSprite, Camera, Sprite, Sound } from "phaser-ce";
import Player from "../object/Player";
import Enemy from "../object/Enemy";
import ITiledObject from "./ITiledObject";
export default class StageManager {
    private game: Game;
    private player: Player;
    private enemy: Enemy;
    public background: Phaser.TileSprite;
    private stageBGM: Sound;
    private collisionLayer: Phaser.TilemapLayer;

    private currentStage: number;

    constructor(_game: Game, _player: Player, _enemy: Enemy, _currentStage: number) {
        this.game = _game;
        this.player = _player;
        this.enemy = _enemy;
        this.currentStage = _currentStage;
    }

    create() {
        this.StartStage(this.currentStage);
    }

    update() {
        this.BackgroundScrolling(this.background, 5);
        this.CameraScrolling(1.1);
        this.PlayerCollision();
    }

    StartStage(stage: number) {
        // Add background
        this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");
        this.background.fixedToCamera = true;

        let stageString: string = "stage" + stage;
        // Add tilemap
        const map = this.game.add.tilemap(stageString);
        // Read the objects
        const objectList = this.getObjectLayer(map, 'object');

        // Add eneny in the object spawn point
        for (const object of objectList) {
            if (object.name === "demon") {
                this.enemy.AddEnemy("demon", object.x, object.y);
                console.log("added", object.name);
            }
            if (object.name === "dragon") {
                this.enemy.AddEnemy("dragon", object.x, object.y);
                console.log("added", object.name);
            }
            if (object.name === "ghost") {
                this.enemy.AddEnemy("ghost", object.x, object.y);
                console.log("added", object.name);
            }
        }

        // Add collision layer
        map.addTilesetImage("collision", "collision");
        this.collisionLayer = map.createLayer("Collision");
        this.collisionLayer.resizeWorld();
        this.collisionLayer.visible = false;
        this.game.physics.arcade.enable(this.collisionLayer);
        map.setCollision(161, true, "Collision"); // 161 = first grid
        this.game.physics.arcade.collide(this.player, this.collisionLayer);

        switch (stage) {
            case 1:
                this.stageBGM = this.game.add.audio("stage1BGM", .3, true);
                this.stageBGM.play();

            default:
                this.stageBGM = this.game.add.audio("stage1BGM", .3, true);
                this.stageBGM.play();
        }
    }

    // Make the background scrolling
    BackgroundScrolling(background: TileSprite, speed: number) {
        background.tilePosition.x -= speed;
    }

    // Make the camera scrolling
    CameraScrolling(speed: number) {
        this.game.camera.x += speed;
    }

    PlayerCollision() {
        this.game.physics.arcade.overlap(this.player.bulletGroup, this.enemy.dragonGroup, this.HurtEnemy, null, this);
        this.game.physics.arcade.overlap(this.player.bulletGroup, this.enemy.demonGroup, this.HurtEnemy, null, this);
        this.game.physics.arcade.overlap(this.player.bulletGroup, this.enemy.ghostGroup, this.HurtEnemy, null, this);

        this.game.physics.arcade.overlap(this.player.playerSprite, this.enemy.dragonGroup, this.TouchEnemy, null, this);
        this.game.physics.arcade.overlap(this.player.playerSprite, this.enemy.demonGroup, this.TouchEnemy, null, this);
        this.game.physics.arcade.overlap(this.player.playerSprite, this.enemy.ghostGroup, this.TouchEnemy, null, this);
    }

    // Use for bullet collide with enemy
    HurtEnemy(bulletSprite: Sprite, enemySprite: Sprite) {
        console.log("hitted!");
        bulletSprite.kill();
        this.enemy.EnemyHurt(enemySprite);
    }

    // Use for player collide with enemy
    TouchEnemy(playerSprite: Sprite, enemySprite: Sprite) {
        if (!this.player.isHurted) this.enemy.EnemyHurt(enemySprite);
        this.player.PlayerHurt();
    }

    getObjectLayer(map: Phaser.Tilemap, layerName: string): ITiledObject[] {
        return (map.objects as any)[layerName] as ITiledObject[];
    }
}