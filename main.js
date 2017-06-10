/**
 * Created by 84406 on 2017/6/10.
 */

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

var score = 0;

var grid = [];

for (let i = 0; i < 4; i++) {
    grid.push([0, 0, 0, 0]);
}

function moveGridsToRight() {
    let isMove = false;

    function mergeGridScore(gridsState) {
        let score = 0;
        for (let i = 0; i < gridsState.length - 1; i++) {
            if (gridsState[i] === gridsState[i + 1]) {
                gridsState[i] *= 2;
                gridsState[i + 1] = 0;
                gridsState.pop();
                score += gridsState[i];
            }
        }
        return score;
    }

    for (let i = 0; i < 4; i++) {
        let gridsNextState = [];
        for (let j = 3; j >= 0; j--) {
            if (grid[j][i] !== 0) {
                gridsNextState.push(grid[j][i]);
                score += mergeGridScore(gridsNextState);
            }
        }

        for (let j = 0; j < 4; j++) {
            if (j < gridsNextState.length) {
                if (grid[3 - j][i] !== gridsNextState[j]) {
                    grid[3 - j][i] = gridsNextState[j];
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
    for (let i = 0; i < rotateCount; i++) {
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
    if (isFullGrids())return;

    function generateRandomNumberTwoOrFour() {
        return Math.random() > 0.5 ? 2 : 4;
    }

    do {
        let x = generateRandomNumber();
        let y = generateRandomNumber();
        if (grid[x][y] === 0) {
            grid[x][y] = generateRandomNumberTwoOrFour();
            break;
        }
    }while (true);
}

function isFullGrids() {
    let count = 0;
    grid.forEach((e) => {
        e.forEach((f) => {
            if (f === 0) count++;
        })
    });
    return count === 0;
}

function isGameOver() {
    let mergeCount = 0;

    if (!isFullGrids()) {
        return false;
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i - 1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i + 1] && grid[i][j] === grid[i + 1][j])) {
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
