#include "configdialog.h"
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QApplication>
#include <QtCore/QSettings>
#include <QtCore/QVariant>

ConfigDialog::ConfigDialog(QWidget *parent) : QDialog(parent) {
    difficultySlider = new QSlider(Qt::Horizontal, this);
    difficultySlider->setTickPosition(QSlider::TicksBelow);
    difficultySlider->setTickInterval(1);
    difficultySlider->setSingleStep(1);
    difficultySlider->setMinimum(1);
    difficultySlider->setMaximum(3);

    humanButton = new QRadioButton(tr("Human"), this);
    computerButton = new QRadioButton(tr("Computer"), this);
    humanButton->setChecked(true);

    buttonBox = new QDialogButtonBox(QDialogButtonBox::Ok | QDialogButtonBox::Cancel);
    connect(buttonBox, SIGNAL(accepted()), this, SLOT(accept()));
    connect(buttonBox, SIGNAL(rejected()), this, SLOT(reject()));

    groupBox = new QGroupBox();
    radioBox = new QHBoxLayout();
    radioBox->addWidget(humanButton);
    radioBox->addWidget(computerButton);
    groupBox->setLayout(radioBox);

    mainLayout = new QFormLayout(this);
    mainLayout->addRow(tr("Opponent"), groupBox);
    mainLayout->addRow(tr("Difficulty"), difficultySlider);
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
