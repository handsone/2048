/**
 * Created by 84406 on 2017/6/10.
 */

var grid = [];

for (var i = 0; i < 4; i++) {
    grid.push([0, 0, 0, 0]);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}