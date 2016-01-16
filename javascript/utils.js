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

function move(index, player, board) {
    board.children[index].state = player
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
