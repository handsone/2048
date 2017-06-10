/**
 * Created by 84406 on 2017/6/10.
 */

const TitleFontSize = 125;
const BackgroundColor = 0x0061bb;

const GridWidth = 60;
const GridDelta = 10;
const GridStartX = 60;
const GridStartY = 250;
const GridColor = 0xFF700B;

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: BackgroundColor});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048', {fontSize: TitleFontSize});
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


var grid = [];

for (var i = 0; i < 4; i++) {
    grid.push([0, 0, 0, 0]);
}
