/**
 * Created by 84406 on 2017/6/10.
 */

const BackgroundColor = 0xFCE38A;

let app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: BackgroundColor});
document.body.appendChild(app.view);

const GridWidth = 60;
const GridDelta = 10;
const GridStartX = (app.renderer.width - ((GridDelta + GridWidth) * 4 - GridDelta)) / 2;
const GridStartY = app.renderer.height / 8 * 3;
const GridFontSize = 28;

let titleStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 125,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#EAFFD0'], // gradient
    stroke: '#222831',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#393E46',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

let titleText = new PIXI.Text('2048', titleStyle);
titleText.anchor.set(0.5);
titleText.x = app.renderer.width / 2;
titleText.y = app.renderer.height / 5;
app.stage.addChild(titleText);

const ScorePositionY = 20;
let scoreStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 25,
    // fontStyle: 'italic',
    fill: ['#F38181'], // gradient
    // fontWeight: 'bold',
    // stroke: '#222831',
    // strokeThickness: 5,
    // dropShadow: true,
    // dropShadowColor: '#393E46',
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 0,
    // wordWrap: true,
    // wordWrapWidth: 440
});
let scoreText = new PIXI.Text('score : ' + score, scoreStyle);
scoreText.anchor.set(0.5, 0);
scoreText.x = app.renderer.width / 2;
scoreText.y = ScorePositionY;
app.stage.addChild(scoreText);

function getNumberBackgroundColor(number) {
    let color = {
        0: 0xf4e542,
        2: 0xebf441,
        4: 0xd6f441,
        8: 0xbef441,
        16: 0xa0f441,
        32: 0x91f441,
        64: 0x6af441,
        128: 0x4ff441,
        256: 0x41f452,
        512: 0x41f476,
        1024: 0x41f497,
        2048: 0x41f4c4,
        4096: 0x41f4e2
    };
    return color[number];
}

function drawGridNumber(x, y, number) {
    let gridNumberText = new PIXI.Text(number, {fontSize: GridFontSize});
    gridNumberText.anchor.set(0.5);
    gridNumberText.x = GridStartX + x * (GridWidth + GridDelta) + GridWidth / 2;
    gridNumberText.y = GridStartY + y * (GridWidth + GridDelta) + GridWidth / 2;
    app.stage.addChild(gridNumberText);
}

function drawGridWithColor(x, y, color) {
    let gridGraphics = new PIXI.Graphics();
    gridGraphics.beginFill(color, 1);
    gridGraphics.drawRect(GridStartX + x * (GridWidth + GridDelta), GridStartY + y * (GridWidth + GridDelta), GridWidth, GridWidth);
    app.stage.addChild(gridGraphics);
}

function drawGrid(x, y) {
    if (grid[x][y] === 0) {
        drawGridWithColor(x, y, getNumberBackgroundColor(grid[x][y]));
    } else {
        drawGridWithColor(x, y, getNumberBackgroundColor(grid[x][y]));
        drawGridNumber(x, y, grid[x][y]);
    }
}

function flushGame() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            drawGrid(i, j);
        }
    }
    scoreText.text = 'score : '+score;
}

flushGame();

function MoveGrids(direction) {
    let isMove;
    switch (direction) {
        case 'Right':
            if (moveGridsToRight())
                generateRandomGrid();
            break;
        case 'Left':
            rotateArray(2);
            isMove = moveGridsToRight();
            rotateArray(2);
            if (isMove)
                generateRandomGrid();
            break;
        case 'Up':
            rotateArray(3);
            isMove = moveGridsToRight();
            rotateArray(1);
            if (isMove)
                generateRandomGrid();
            break;
        case 'Down':
            rotateArray(1);
            isMove = moveGridsToRight();
            rotateArray(3);
            if (isMove)
                generateRandomGrid();
            break;
    }
    flushGame();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        MoveGrids('Right');
    }
    if (event.key === 'ArrowLeft') {
        MoveGrids('Left');
    }
    if (event.key === 'ArrowUp') {
        MoveGrids('Up');
    }
    if (event.key === 'ArrowDown') {
        MoveGrids('Down');
    }

    if (isGameOver()) {
        alert('Game Over');
    }
});

let hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});

hammertime.on('swiperight', function () {
    MoveGrids('Right');
});
hammertime.on('swipeup', function () {
    MoveGrids('Up');
});
hammertime.on('swipeleft', function () {
    MoveGrids('Left');
});
hammertime.on('swipedown', function () {
    MoveGrids('Down');
});
