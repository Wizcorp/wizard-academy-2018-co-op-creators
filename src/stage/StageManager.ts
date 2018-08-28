import { Game, TileSprite } from "phaser-ce";
import Player from "../object/Player";
import Enemy from "../object/Enemy";
import ITiledObject from "./ITiledObject";
export default class StageManager {
    private game: Game;
    private player: Player;
    private enemy: Enemy;
    public background: Phaser.TileSprite;
    //private map: Phaser.Tilemap;
    private collisionLayer: Phaser.TilemapLayer;
    private stage1Layer: Phaser.TilemapLayer;

    private currentStage: number;

    constructor(_game: Game, _player: Player,_enemy: Enemy, _currentStage: number) {
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
        //this.PlayerCollision();
    }

    StartStage(stage: number) {
        console.log(this.enemy);
        // Add background
        this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");

        let stageString: string = "stage"+stage;

        // Add tilemap
        const map = this.game.add.tilemap(stageString);

        // Read the objects
        const objectList = this.getObjectLayer(map, 'object');
        
        // Add eneny in the object spawn point
        for (const object of objectList) {
            //console.log('Loaded object', object);
            if(object.name === "demon"){
                console.log("add demon");
                this.enemy.AddEnemy("demon",object.x,object.y);
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
    }

    // Make the background scrolling
    BackgroundScrolling(background: TileSprite, speed: number) {
        background.tilePosition.x -= speed;
    }

    PlayerCollision(){
        if(this.game.physics.arcade.overlap(this.player,this.enemy)){
            this.player.PlayerHurt();
            console.log("hurting player");
        }
    }

    getObjectLayer(map: Phaser.Tilemap, layerName: string): ITiledObject[] {
        return (map.objects as any)[layerName] as ITiledObject[];
    }
}