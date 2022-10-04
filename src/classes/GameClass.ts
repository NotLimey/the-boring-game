
export default class GameClass {
    ref: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    tiles: TileClass[] = [];
    player: TileClass;
    interval: any;
    direction: 0 | 1 | -1 = 0;
    speed = 5;
    scenes: SceneClass[] = [];

    constructor(ref: HTMLCanvasElement) {
        this.ref = ref;
        this.ctx = ref.getContext('2d');
        this.width = ref.width;
        this.height = ref.height;
        this.tiles = [];
        this.player = new TileClass(250, 0, 'red');
        this.scenes = [
            {
                depth: 0,
                tiles: this.initializeTiles(),
                x: 0,
                y: 0
            },
            {
                depth: 1,
                tiles: this.generateTiles(1),
                x: 0,
                y: 500,
            }
        ];
        this.start();
        this.stop();
    }
    // start the game
    start() {
        this.player = new TileClass(250, 200, 'red');
        this.tiles = [];
        this.initializeTiles();
        this.loop();
        this.interval = setInterval(() => this.loop(), 1000 / 60)
    }
    loop() {
        this.update();
        this.draw();
    }
    update() {
        // update game logic
        // move player

        // move scene
        for (var i = 0; i < this.scenes.length; i++) {
            this.scenes[i].y -= 2;
            if (this.scenes[i].y <= -500) {
                const prev = this.scenes[i];
                this.scenes.splice(i, 1);
                const newScene = this.generateScene(prev);
                this.scenes.push(newScene);
            }
        }

    }
    move(direction: "left" | "right") {
        if (!this.player) return;
        switch (direction) {
            case "left":
                if (this.player.x <= 0) return;
                this.player.x -= 50;
                break;
            case "right":
                if (this.player.x >= this.width - this.player.width) return;
                this.player.x += 50;
                break;
        }
    }
    draw() {
        this.clear();
        for (var i = 0; i < this.scenes.length; i++) {
            this.drawScene(this.scenes[i]);
        }
        this.drawTile(this.player, 0);
    }
    drawScene(scene: SceneClass) {
        for (var i = 0; i < scene.tiles.length; i++) {
            this.drawTile(scene.tiles[i], scene.y);
        }
    }
    drawTile(tile: TileClass, y: number) {
        if (!this.ctx) return;
        this.ctx.fillStyle = tile.color;
        this.ctx.fillRect(tile.x, tile.y + y, tile.width, tile.height);
    }
    clear() {
        if (this.ctx)
            this.ctx.clearRect(0, 0, this.width, this.height);

    }
    initializeTiles() {
        // initialize tiles
        // create sky
        const tile = new TileClass(0, 0, 'skyblue', this.width, 250);
        this.tiles.push(tile);
        // create grass
        const tile2 = new TileClass(0, 250, 'green', this.width);
        this.tiles.push(tile2);
        // create dirt
        const tile3 = new TileClass(0, 300, 'brown', this.width, 200);
        this.tiles.push(tile3);
        const tresure = new TileClass(150, 400, 'gold');
        this.tiles.push(tresure);
        return this.tiles;
    }

    stop() {
        clearInterval(this.interval);
    }

    generateScene(prev: SceneClass): SceneClass {
        const depth = prev.depth + 2;
        let tiles: TileClass[] = [];
        console.log(depth, prev.depth)
        const terrain = this.getTerrain(depth);
        const bg = new TileClass(0, 0, terrain, this.width, 500);
        tiles.push(bg);
        const treasures = this.getTreasures();
        tiles = tiles.concat(treasures);

        // generate new scene
        return {
            depth: depth,
            tiles: tiles,
            x: 0,
            y: 500
        }
    }

    generateTiles(depth: number) {
        let tiles: TileClass[] = [];

        const bg = new TileClass(0, 0, 'brown', this.width, 500);
        tiles.push(bg);
        const treasures = this.getTreasures();
        tiles = tiles.concat(treasures);
        return tiles;
    }

    getTerrain(depth: number) {
        if (depth <= 1)
            return "brown";
        return "gray";
    }
    getTreasures(): TileClass[] {
        const treasures: TileClass[] = [];
        const tilesY = 10;
        const tilesX = 10;
        for (var i = 0; i < tilesX; i++) {
            for (var j = 0; j < tilesY; j++) {
                // randomize if treasure is generated in 1 / 10 chance
                if (Math.floor(Math.random() * 10) !== 1) continue;
                // make tile size 25x25
                const x = i * 50;
                const y = j * 50;
                // get random color
                const colors: TileColor[] = ['gold', 'lightblue'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                const treasure = new TileClass(x, y, color, 25, 25);
                treasures.push(treasure);
            }
        }
        return treasures;
    }

    // update frame 60 times per second
}

type TileColor = "red" | "green" | "blue" | "skyblue" | "brown" | "gold" | "gray" | "lightblue";

export class TileClass {
    x: number;
    y: number;
    color: TileColor;
    width: number;
    height: number;
    constructor(x: number, y: number, color: TileColor, width = 50, height = 50) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }
}

export class SceneClass {
    tiles: TileClass[] = [];
    depth: number = 0;
    x: number = 0;
    y: number = 0;
    constructor(tiles: TileClass[], depth: number, x = 0, y = 0) {
        this.tiles = tiles;
        this.depth = depth;
        this.x = x;
        this.y = y;
    }
}