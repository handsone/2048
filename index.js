/**
 * Created by 84406 on 2017/6/10.
 */

const BackgroundColor = 0xFCE38A;

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: BackgroundColor});
document.body.appendChild(app.view);

const GridWidth = 60;
const GridDelta = 10;
const GridStartX = (app.renderer.width - ((GridDelta + GridWidth) * 4 - GridDelta)) / 2;
const GridStartY = app.renderer.height / 8 * 3;
const GridFontSize = 28;

var titleStyle = new PIXI.TextStyle({
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

var basicText = new PIXI.Text('2048', titleStyle);
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 5;
app.stage.addChild(basicText);

function getNumberBackgroundColor(number) {
    var color = {
        0: 0xf4e542,
        2: 0xebf441,
        4: 0xd6f441,
        8: 0xbef441,
        16: 0xa0f441,
        32: 0x91f441,
        64: 0x6af441,
        128: 0x4ff441
    };
    return color[number];
}

function drawGridNumber(x, y, number) {
    var number = new PIXI.Text(number, {fontSize: GridFontSize});
    number.anchor.set(0.5);
    number.x = GridStartX + x * (GridWidth + GridDelta) + GridWidth / 2;
    number.y = GridStartY + y * (GridWidth + GridDelta) + GridWidth / 2;
    app.stage.addChild(number);
}

function drawCellWithColor(x, y, color) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
    graphics.drawRect(GridStartX + x * (GridWidth + GridDelta), GridStartY + y * (GridWidth + GridDelta), GridWidth, GridWidth);
    app.stage.addChild(graphics);
}

function drawCell(x, y) {
    if (grid[x][y] === 0) {
        drawCellWithColor(x, y, getNumberBackgroundColor(grid[x][y]));
    } else {
        drawCellWithColor(x, y, getNumberBackgroundColor(grid[x][y]));
        drawGridNumber(x, y, grid[x][y]);
    }
}

function drawScore() {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(BackgroundColor, 1);
    const width = 150;
    const height = 25;
    const y = 20;

    graphics.drawRect((app.renderer.width - width) / 2, y, width, height);
    app.stage.addChild(graphics);

    var scoreStyle = new PIXI.TextStyle({
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

    var scoreText = new PIXI.Text('score : ' + score, scoreStyle);
    scoreText.anchor.set(0.5, 0);
    scoreText.x = app.renderer.width / 2;
    scoreText.y = y;
    app.stage.addChild(scoreText);
}

function flushGame() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j);
        }
    }
    drawScore();
}

flushGame();

function MoveCells(direction) {
    var isMove;
    switch (direction) {
        case 'Right':
            if (moveCellToRight())
                generateRandomGrid();
            break;
        case 'Left':
            rotateArray(2);
            isMove = moveCellToRight();
            rotateArray(2);
            if (isMove)
                generateRandomGrid();
            break;
        case 'Up':
            rotateArray(3);
            isMove = moveCellToRight();
            rotateArray(1);
            if (isMove)
                generateRandomGrid();
            break;
        case 'Down':
            rotateArray(1);
            isMove = moveCellToRight();
            rotateArray(3);
            if (isMove)
                generateRandomGrid();
            break;
    }
    flushGame();
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        MoveCells('Right');
    }
    if (event.key === 'ArrowLeft') {
        MoveCells('Left');
    }
    if (event.key === 'ArrowUp') {
        MoveCells('Up');
    }
    if (event.key === 'ArrowDown') {
        MoveCells('Down');
    }

    if (isGameOver()) {
        alert('Game Over');
    }
});

var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});

hammertime.on('swiperight', function() {
    MoveCells('Right');
});
hammertime.on('swipeup', function () {
    MoveCells('Up');
});
hammertime.on('swipeleft', function () {
    MoveCells('Left');
});
hammertime.on('swipedown', function () {
    MoveCells('Down');
});


