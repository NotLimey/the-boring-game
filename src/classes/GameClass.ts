
export default class GameClass {
    ref: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    tiles: TileClass[] = [];
    player: TileClass;

    constructor(ref: HTMLCanvasElement) {
        this.ref = ref;
        this.ctx = ref.getContext('2d');
        this.width = ref.width;
        this.height = ref.height;
        this.tiles = [];
        this.player = new TileClass(250, 0, 'red');
    }
    // start the game
    start() {
        this.player = new TileClass(250, 200, 'red');
        this.tiles = [];
        this.initializeTiles();
        this.loop();
    }
    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
    update() {
        // update game logic
    }
    move(direction: "right" | "left") {
        if (direction === "right") {
            // make sure player is not going off screen
            if (this.player.x + 50 >= this.width) return;
            this.player.x += 50;
        } else {
            // make sure player is not going off screen
            if (this.player.x - 50 < 0) return;
            this.player.x -= 50;
        }
    }
    draw() {
        // draw game
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.tiles.forEach((tile) => {
                if (!this.ctx) return;
                this.ctx.fillStyle = tile.color;
                this.ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
            })
            this.ctx.fillStyle = this.player.color;
            this.ctx.fillRect(this.player.x, this.player.y, 50, 50);
        }
    }
    initializeTiles() {
        // initialize tiles
        // create sky
        const tile = new TileClass(0, 0, 'skyblue', this.width, 250);
        this.tiles.push(tile);
    }
    stop() {
        // stop game
        // stop loop
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