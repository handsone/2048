/**
 * Created by 84406 on 2017/6/10.
 */

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

var score = 0;

var grid = [];

for (var i = 0; i < 4; i++) {
    grid.push([0, 0, 0, 0]);
}

function moveCellToRight() {
    var isMove = false;
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
                        score += cellsNextState[k];
                    }
                }
            }
        }

        for (var j = 0; j < 4; j++) {
            if (j < cellsNextState.length) {
                if (grid[3 - j][i] !== cellsNextState[j]) {
                    grid[3 - j][i] = cellsNextState[j];
                    isMove = true;
                }
            }
            else
                grid[3 - j][i] = 0;
        }
    }
    return isMove;
}

function rotateArray(rotateCount = 1) {
    for (var i = 0; i < rotateCount; i++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
            return row.map((item, columnIndex) => {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}

function generateRandomGrid() {
    if (isGridFull())return;
    var x = generateRandomNumber();
    var y = generateRandomNumber();
    while (grid[x][y] !== 0) {
        x = generateRandomNumber();
        y = generateRandomNumber();
    }

    function generateRandomNumberTwoOrFour() {
        return Math.random() > 0.5 ? 2 : 4;
    }

    grid[x][y] = generateRandomNumberTwoOrFour();
}

function isGridFull() {
    var count = 0;
    grid.forEach((e) => {
        e.forEach((f) => {
            if (f === 0) count++;
        })
    });
    return count === 0;
}

function isGameOver() {
    var mergeCount = 0;

    if (isGridFull()) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if ((grid[i - 1] && grid[i][j] === grid[i - 1][j] ) ||
                (grid[i + 1] && grid[i][j] === grid[i + 1][j] ) ||
                (grid[i][j - 1] && grid[i][j] === grid[i][j - 1]) ||
                (grid[i][j + 1] && grid[i][j] === grid[i][j + 1])
            ) {
                mergeCount++;
                break;
            }
        }
    }

    return mergeCount === 0;
}


//test

generateRandomGrid();
generateRandomGrid();
