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
const GridColor = 0x95E1D3;

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

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(GridColor, 1);
        graphics.drawRect(GridStartX + i * (GridWidth + GridDelta), GridStartY + j * (GridWidth + GridDelta), GridWidth, GridWidth);
        app.stage.addChild(graphics);
    }
}

for (var i = 0; i < 10; i++) {
    console.log(generateRandomNumber());
}

var x = generateRandomNumber();
var y = generateRandomNumber();

var graphics = new PIXI.Graphics();
graphics.beginFill(0xffffff, 1);
graphics.drawRect(GridStartX + x * (GridWidth + GridDelta), GridStartY + y * (GridWidth + GridDelta), GridWidth, GridWidth);
app.stage.addChild(graphics);


var number = new PIXI.Text('2',{fontSize:48});
number.anchor.set(0.5);
number.x = GridStartX + x * (GridWidth + GridDelta) + GridWidth / 2;
number.y = GridStartY + y * (GridWidth + GridDelta) + GridWidth / 2;
app.stage.addChild(number);

