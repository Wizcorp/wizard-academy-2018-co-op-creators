import { Game, TileSprite } from "phaser-ce";
import Player from "../object/Player";

export default class StageManager {
    private game: Game;
    private player: Player;
    private background: Phaser.TileSprite;
    private map: Phaser.Tilemap;
    private collisionLayer: Phaser.TilemapLayer;

    private currentStage: number;

    constructor(_game: Game, _player: Player, _currentStage: number) {
        this.game = _game;
        this.player = _player;
        this.currentStage = _currentStage;
    }

    create() {
        this.StartStage(this.currentStage);
    }

    update() {
        this.BackgroundScrolling(this.background, 5);
    }

    StartStage(stage: number) {
        // Set world dimensions
        //this.game.world.setBounds(0, 0, 956, 538);

        // Set background color
        //this.game.stage.backgroundColor = '#124184';

        // Add background
        this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");

        // Add tilemap(collision)
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("collision", "collision");
        this.collisionLayer = this.map.createLayer("Collision");
        this.collisionLayer.resizeWorld();
        this.collisionLayer.visible = false;
        this.game.physics.arcade.enable(this.collisionLayer);
        this.map.setCollision(161, true, "Collision"); // 161 = first grid
        this.game.physics.arcade.collide(this.player, this.collisionLayer);
    }

    // Make the background scrolling
    BackgroundScrolling(background: TileSprite, speed: number) {
        background.tilePosition.x -= speed;
    }
}