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
        this.AddEnemy("demon");
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
        this.demonGroup.scale.set(2, 2);
    }

    AddEnemy(enemy: string) {
        this.enemySprite = this.game.add.sprite(this.game.width / 1.6, this.game.height / 2, enemy);
    }
}