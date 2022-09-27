
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
                tiles: this.initializeTiles(),
                x: 0,
                y: 500
            }
        ];
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
                this.scenes[i].y = 500;
            }
        }

        if (this.direction === 1) {
            if (this.player.x + this.player.width >= this.width) return;
            this.player.x += this.speed;
        }
        if (this.direction === -1) {
            if (this.player.x <= 0) return;
            this.player.x -= this.speed;
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
        // stop game
        // stop loop
        clearInterval(this.interval);
    }
    generateScene() {

    }

    // update frame 60 times per second
}


export class TileClass {
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;
    constructor(x: number, y: number, color: string, width = 50, height = 50) {
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