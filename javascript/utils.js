function hasEmptyCells(board) {
    for (var i = 0; i < 9; i++) {
        if (board.children[i].state === "") return true
    }
    return false
}

function printBoard(board) {
    for (var i = 0; i < 9; i++) {
        console.log("Tile "+i+" has value "+ board.children[i].state)
    }
}

function isWinner(board, player) {
    for (var i=0; i < 3; ++i) {
        if (board.children[i].state === player
                && board.children[i+3].state === player
                && board.children[i+6].state === player) {
            return true
        }
        if (board.children[i*3].state === player
                && board.children[i*3+1].state === player
                && board.children[i*3+2].state === player) {
            return true
        }
    }
    if (board.children[0].state === player
            && board.children[4].state === player
            && board.children[8].state === player) {
        return true
    }
    if (board.children[2].state === player
            && board.children[4].state === player
            && board.children[6].state === player) {
        return true
    }
}

function restartGame() {
    for (var i=0; i<9; ++i) {
        boardGrid.children[i].state = ""
    }
    drawBoard()
    winButton.visible = false
    boardGrid.currentPlayer="X"
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

function winOrBlock(player, board) {
    var moved = false
    //check columns and rows
    for (var i=0; i < 3 && !moved; ++i) {
        if (board.children[i].state === player) {
            if (board.children[i].state === board.children[i+3].state) {
                move(i+6, player, board)
                console.log(player+" makes reactive move to: "+i+6)
                moved = true;
            } else if (board.children[i].state === board.children[i+6].state) {
                move(i+3, player, board)
                console.log(player+" makes reactive move to: "+i+3)
                moved = true;
            }
        } else if (board.children[i+3].state === player && board.children[i+3].state === board.children[i+6].state) {
            move(i, player, board)
            console.log(player+" makes reactive move to: "+i)
            moved = true;
        }
        if (board.children[i*3].state === board.currentPlayer) {
            if (board.children[i*3].state === board.children[i*3+1].state) {
                move(i*3+2, player, board)
                console.log(player+" makes reactive move to: "+i*3+2)
                moved = true;
            } else if (board.children[i*3].state === board.children[i*3+2].state) {
                move (i*3+1, player, board)
                console.log(player+" makes reactive move to: "+i*3+1)
                moved = true;
            }
        } else if (board.children[i*3+1].state === board.currentPlayer && board.children[i*3+1].state === board.children[i*3+2].state) {
            move(i*3, player, board)
            console.log(player+" makes reactive move to: "+i*3)
            moved = true
        }
    }
    //if no move was made, check a diagonal
    if (!moved) {
        if (board.children[0].state === player) {
            if (board.children[0].state === board.children[4].state) {
                move(8, player, board)
                console.log(player+" makes reactive move to: 8")
                moved = true;
            } else if (board.children[0].state === board.children[8].state) {
                move(4, player, board)
                console.log(player+" makes reactive move to: 4")
                moved = true;
            }
        } else if (board.children[4].state === player && board.children[4].state === board.children[8].state) {
            move(0, player, board)
            console.log(player+" makes reactive move to: 0")
            moved = true;
        }
    }
    //if no move was made, check the other diagonal
    if (!moved) {
        if (board.children[2].state === player) {
             if (board.children[2].state === board.children[4].state) {
                 move(6, player, board)
                 console.log(player+" makes reactive move to: 6")
                 moved = true
             } else if (board.children[2].state === board.children[6].state) {
                 move(4, player, board)
                 console.log(player+" makes reactive move to: 4")
                 moved = true;
             }
        } else if (board.children[4].state === player && board.children[4].state === board.children[6].state) {
            move(2, player, board)
            console.log(player+" makes reactive move to: 2")
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
         index = Math.floor(Math.random() * 9)
   } while (!emptyCell(index))
   move(index, player, board)
    console.log(player+" makes random move to: "+index)
}

function reactiveMove(player, board) {
    if (!winOrBlock(player, board)) {
        if (!winOrBlock(board.previousPlayer, board)) {
            if (board.children[4].state === "") {
                move(4)
            } else {
                randomMove(player, board)
            }
        }
    }
}

function max(board) {
    if (isWinner(board, "X")) return -1
    if (!hasEmptyCells(board)) return 0
    var n = 9
    var current, result = 9999
    for (var i=0;i<n;i++) {
        if (emptyCell(i)) {
            board.children[i].state = board.currentPlayer
            current = min(board)
            if (current > result) {
                result = current
            }
            board.children[i].state = ""
        }
    }
    return result
}

function min(board) {
    if (isWinner(board, "O")) return 1
    if (!hasEmptyCells(board)) return 0
    var n = 9
    var current, result = 9999
    for (var i=0;i<n;i++) {
        if (emptyCell(i)) {
            board.children[i].state = board.previousPlayer
            current = max(board)
            if (current < result) {
                result = current
            }
            board.children[i].state = ""
        }
    }
    return result
}

function minimaxMove(player, board) {
     var position=0
     var n = 9
     var current, result = -9999
     for (var i=0;i<n;i++) {
         if (emptyCell(i)) {
             board.children[i].state = player
             current = min(board);
             if (current > result) {
                 result = current
                 position = i
             }
             board.children[i].state = ""
         }
     }
     move(position, player, board)
     console.log(player+" makes minimax move to: "+position)
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
