#include "aboutappdialog.h"

AboutAppDialog::AboutAppDialog(QWidget *parent) : QMessageBox(parent) {
}

void AboutAppDialog::aboutApp(QWidget * parent) {
    this->setParent(parent);
    this->setTextFormat(Qt::RichText);
    this->setText(tr("Tic Tac Toe game written in C++ and QML<br>© Raúl Benito de Antonio (<a href='mailto:erre.benito@gmail.com'>erre.benito@gmail.com</a>).<br>Released under the terms of the GNU General Public License v3 or any later version."));
    this->setWindowTitle(tr("About QuickTacToe"));
    this->exec();
}

AboutAppDialog::~AboutAppDialog() {

}
