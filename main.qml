import QtQuick 2.4
import QtQuick.Window 2.0
import QtQuick.Controls 1.2
import "javascript/utils.js" as Utils

ApplicationWindow {
    id: mainWindow
    title: "Quick Tac Toe"
    minimumHeight: 420
    minimumWidth: 420
    visibility: Window.AutomaticVisibility
    visible: true
    property var aboutDialog: aboutApp
    property var qtDialog: aboutQt
    property var config: configDialog;
    menuBar: MenuBar {
        Menu {
            title: qsTr("Game")
            MenuItem {
                text: qsTr("New")
                shortcut: "Ctrl+N"
                onTriggered: restartGame()
            }
            MenuItem {
                text: qsTr("Quit")
                shortcut: "Alt+F4"
                onTriggered: Qt.quit()
            }
        }
        Menu {
            title: qsTr("Tools")
            MenuItem {
                text: qsTr("Options")
                shortcut: "Ctrl+O"
                onTriggered: config.showDialog()
            }
        }
        Menu {
            title: qsTr("About")
            MenuItem {
                text: qsTr("About Quick Tac Toe")
                onTriggered: aboutDialog.aboutApp(mainWindow)
            }
            MenuItem {
                text: qsTr("About Qt")
                onTriggered: qtDialog.aboutQt(mainWindow)
            }
        }
    }
    Canvas {
        id:canvas
        anchors.fill: parent
        onPaint:{
            Utils.drawBoard()
        }
    }
    Component {
        id: tile
        Item {
            signal clicked
            states: [
                    State { name: "X"; PropertyChanges { target: image; source: "images/cross.svg" } },
                    State { name: "O"; PropertyChanges { target: image; source: "images/nought.svg" } }
                ]
                Image {
                    id: image
                    anchors.centerIn: parent
                    visible: false
                    width: boardGrid.width/boardGrid.columns
                    height: boardGrid.height / boardGrid.rows
                }
            width: boardGrid.width / boardGrid.columns
            height: boardGrid.height / boardGrid.rows
            MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: {
                    if (boardGrid.gameInProgress && Utils.emptyCell(index)) {
                        Utils.move(index, boardGrid.currentPlayer, boardGrid)
                        Utils.switchPlayer(boardGrid)
                        image.visible = true;
                        if (Utils.winner(boardGrid)) {
                            boardGrid.gameInProgress = false
                            winButton.visible = true
                        }
                        if (!Utils.winner(boardGrid) && Utils.boardFull(boardGrid)) {
                            boardGrid.gameInProgress = false
                            winButton.text = "It's a draw!\n OK"
                            winButton.visible = true
                        }
                   }
                }
            }
        }
    }
    Grid{
        property string currentPlayer: "X"
        property string previousPlayer: "O"
        property bool gameInProgress: true
        id:boardGrid
        anchors.fill: parent
        horizontalItemAlignment: Grid.AlignHCenter
        verticalItemAlignment: Grid.AlignVCenter
        columns: 3
        rows: 3
        Repeater {
            model: boardGrid.columns*boardGrid.rows
            delegate: tile
        }
    }
    Button {
        id: winButton
        text: "Player "+boardGrid.previousPlayer+" wins!\n OK"
        visible: false
        onClicked: Utils.restartGame()
        anchors.centerIn: parent
    }
}