#include "configdialog.h"
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QApplication>
#include <QtCore/QSettings>
#include <QtCore/QVariant>

ConfigDialog::ConfigDialog(QWidget *parent) : QDialog(parent) {

    m_sSettingsFile = QApplication::applicationDirPath().left(1) + ":/QuickTacToe.conf";

    loadSettings();

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

int ConfigDialog::getDifficulty() {
    return difficultySlider->value();
}

bool ConfigDialog::isAgainstComputer() {
    return computerButton->isChecked();
}

void ConfigDialog::loadSettings() {
    QSettings settings(m_sSettingsFile, QSettings::NativeFormat);
    computerButton->setChecked(settings.value("againstComputer").toBool());
    difficultySlider->setValue(settings.value("difficulty").toInt());
}

void ConfigDialog::saveSettings(){

    QSettings settings(m_sSettingsFile, QSettings::NativeFormat);
    settings.beginGroup("QuickTacToe");
    settings.setValue("difficulty", getDifficulty());
    settings.setValue("againstComputer", isAgainstComputer());
    settings.endGroup();
}

void ConfigDialog::accept() {
    saveSettings();
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
