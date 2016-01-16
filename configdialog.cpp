#include "configdialog.h"
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QApplication>
#include <QtCore/QSettings>
#include <QtCore/QVariant>

ConfigDialog::ConfigDialog(QWidget *parent) : QDialog(parent) {
    QLabel *message = new QLabel(tr("Nothing to configure yet"), this);

    QDialogButtonBox *buttonBox = new QDialogButtonBox(QDialogButtonBox::Ok |
                                                       QDialogButtonBox::Cancel);
    connect(buttonBox, SIGNAL(accepted()), this, SLOT(accept()));
    connect(buttonBox, SIGNAL(rejected()), this, SLOT(reject()));

    QVBoxLayout *mainLayout = new QVBoxLayout(this);
    mainLayout->addWidget(message);
    mainLayout->addWidget(buttonBox);

    setLayout(mainLayout);
}

void ConfigDialog::accept() {
    QDialog::accept();
}

void ConfigDialog::reject() {
    QDialog::reject();
}


ConfigDialog::~ConfigDialog() {

}

void ConfigDialog::showDialog() {
    this->show();
}
