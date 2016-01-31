function boardFull(board) {
    var copy = boardCopy(board)
    for (var i = 0; i < 9; i++) {
        if (copy.children[i].state === "") return false
    }
    return true
}

function winner(board) {
    for (var i=0; i < 3; ++i) {
        if (board.children[i].state !== ""
                && board.children[i].state === board.children[i+3].state
                && board.children[i].state === board.children[i+6].state)
            return true

        if (board.children[i*3].state !== ""
                && board.children[i*3].state === board.children[i*3+1].state
                && board.children[i*3].state === board.children[i*3+2].state)
            return true
    }
    if (board.children[0].state !== ""
            && board.children[0].state === board.children[4].state
            && board.children[0].state === board.children[8].state)
        return true
    if (board.children[2].state !== ""
            && board.children[2].state === board.children[4].state
            && board.children[2].state === board.children[6].state)
        return true
}

function restartGame() {
    for (var i=0; i<9; ++i) {
        boardGrid.children[i].state = ""
    }
    drawBoard()
    winButton.visible = false
    boardGrid.gameInProgress = true
}

function emptyCell(index) {
    return boardGrid.children[index].state === ""
}

function drawBoard() {
    var context = canvas.getContext('2d')
    context.beginPath()
    context.clearRect(0, 0, width, height)
    context.fill()
    context.beginPath()
    context.lineWidth = 3
    context.strokeStyle = "black"
    context.moveTo(30, height/boardGrid.rows)
    context.lineTo(width, height/boardGrid.rows)
    context.stroke()
    context.moveTo(30, 2*height/boardGrid.rows)
    context.lineTo(width, 2*height/boardGrid.rows)
    context.stroke()
    context.moveTo(width/boardGrid.columns,0)
    context.lineTo(width/boardGrid.columns,height)
    context.stroke()
    context.moveTo(2*width/boardGrid.columns,0)
    context.lineTo(2*width/boardGrid.columns,height)
    context.stroke()
}

function boardCopy(board) {
    var copy = new Object
    copy.children = new Array(9)
    for (var i = 0; i<9; i++) {
        copy.children[i] = new Object
        copy.children[i].state = board.children[i].state
    }
    return copy
}

function winOrBlock(player, board) {
    var moved = false
    //check columns and rows
    for (var i=0; i < 3 && !moved; ++i) {
        if (board.children[i].state === player) {
            if (board.children[i].state === board.children[i+3].state) {
                move(i+6)
                moved = true;
            } else if (board.children[i].state === board.children[i+6].state) {
                move(i+3)
                moved = true;
            }
        } else if (board.children[i+3].state === player && board.children[i+3].state === board.children[i+6].state) {
            move(i)
            moved = true;
        }
        if (board.children[i*3].state === board.currentPlayer) {
            if (board.children[i*3].state === board.children[i*3+1].state) {
                move(i*3+2)
                moved = true;
            } else if (board.children[i*3].state === board.children[i*3+2].state) {
                move (i*3+1)
                moved = true;
            }
        } else if (board.children[i*3+1].state === board.currentPlayer && board.children[i*3+1].state === board.children[i*3+2].state) {
            move(i*3)
            moved = true
        }
    }
    //if no move was made, check a diagonal
    if (!moved) {
        if (board.children[0].state === player) {
            if (board.children[0].state === board.children[4].state) {
                move(8)
                moved = true;
            } else if ((board.children[0].state === board.children[8].state) || (board.children[2].state === board.children[6].state)) {
                move(4)
                moved = true;
            }
        } else if (board.children[4].state === player && board.children[4].state === board.children[8].state) {
            move(0)
            moved = true;
        }
    }
    //if no move was made, check the other diagonal
    if (!moved) {
        if (board.children[2].state === player) {
             if (board.children[2].state === board.children[4].state) {
                 move(6)
                 moved = true
             }
        } else if (board.children[4].state === player && board.children[4].state === board.children[6].state) {
            move(2)
            moved = true
        }
    }
    return moved
}

function move(index, player, board) {
    board.children[index].state = player
}

function randomMove(player, board) {
    var index = 0
    do {
         index = Math.floor(Math.random() * 10)
   } while (!emptyCell(index))
   move(index, player, board)
}

function reactiveMove(player, board) {
    if (!winOrBlock(player, board)) {
        if (!winOrBlock(board.previousPlayer, board)) {
            if (board.children[4].state === ' ') {
                move(4)
            } else {
                randomMove(player, board)
            }
        }
    }
}

function max(board) {
    var newBoard = boardCopy(board)
    if (winner(newBoard)) return -1
    if (boardFull(newBoard)) return 0
    var n = 9
    var current, result = 9999
    for (var i=0;i<n;i++) {
        if (emptyCell(i)) {
            newBoard.children[i].state = board.currentPlayer
            current = min(newBoard)
            if (current > result) {
                result = current
            }
            newBoard.children[i].state = ' '
        }
    }
    return result
}

function min(board) {
    var newBoard = boardCopy(board)
    if (winner(newBoard)) return 1
    if (boardFull(newBoard)) return 0
    var n = 9
    var current, result = 9999
    for (var i=0;i<n;i++) {
        if (emptyCell(i)) {
            newBoard.children[i].state = board.previousPlayer
            current = max(newBoard)
            if (current < result) {
                result = current
            }
            newBoard.children[i].state = ' '
        }
    }
    return result
}

function minimaxMove(board) {
     var newBoard = boardCopy(board)
     var position=0
     var n = 9
     var current, result = -9999
     for (var i=0;i<n;i++) {
         if (emptyCell(i)) {
             newBoard.children[i].state = board.currentPlayer
             current = min(newBoard);
             if (current > result) {
                 result = current
                 position = i
             }
             newBoard.children[i].state = ' '
         }
     }
     board.children[i].state = board.currentPlayer
}

function switchPlayer(board) {
    if (board.currentPlayer === "X") {
        board.currentPlayer = "O"
        board.previousPlayer = "X"
    } else {
        board.currentPlayer = "X"
        board.previousPlayer = "O"
    }
}
