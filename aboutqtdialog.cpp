#include "aboutqtdialog.h"
#include <QtWidgets/QApplication>

AboutQtDialog::AboutQtDialog(QWidget *parent) : QMessageBox(parent) {
}


void AboutQtDialog::aboutQt() {
    QApplication::aboutQt();
}

AboutQtDialog::~AboutQtDialog() {

}
