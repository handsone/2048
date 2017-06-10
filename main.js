/**
 * Created by 84406 on 2017/6/10.
 */

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

var grid = [];

for (var i = 0; i < 4; i++) {
    grid.push([2, 4, 8, 16]);
}

function moveCellToRight() {
    for (var i = 0; i < 4; i++) {
        var cellsNextState = [];
        for (var j = 3; j >= 0; j--) {
            if (grid[j][i] !== 0) {
                cellsNextState.push(grid[j][i]);
                for (var k = 0; k < cellsNextState.length - 1; k++) {
                    if (cellsNextState[k] === cellsNextState[k + 1]) {
                        cellsNextState[k] *= 2;
                        cellsNextState[k + 1] = 0;
                        cellsNextState.pop();
                    }
                }
            }
        }

        for (var j = 0; j < 4; j++) {
            if (j < cellsNextState.length)
                grid[3 - j][i] = cellsNextState[j];
            else
                grid[3 - j][i] = 0;
        }
    }
}

//test



