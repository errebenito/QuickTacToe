#include "configdialog.h"
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QApplication>
#include <QtCore/QSettings>
#include <QtCore/QVariant>

ConfigDialog::ConfigDialog(QWidget *parent) : QDialog(parent) {

    m_sSettingsFile = QApplication::applicationDirPath() + "/QuickTacToe.conf";
    difficulty = new QComboBox(this);
    difficulty->addItem(QString(tr("Easy")), QVariant(1));
    difficulty->addItem(QString(tr("Medium")), QVariant(2));
    difficulty->addItem(QString(tr("Hard")), QVariant(3));
    difficulty->setDisabled(true);

    humanButton = new QRadioButton(tr("Human"), this);
    computerButton = new QRadioButton(tr("Computer"), this);
    humanButton->setChecked(true);
    connect(humanButton, SIGNAL(clicked()), this, SLOT(enableCombobox()));
    connect(computerButton, SIGNAL(clicked()), this, SLOT(enableCombobox()));
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
    mainLayout->addRow(tr("Difficulty"), difficulty);

    mainLayout->addWidget(buttonBox);
    setLayout(mainLayout);

    loadSettings();
}

void ConfigDialog::enableCombobox() {
    if (humanButton->isChecked()) {
        difficulty->setDisabled(true);
    }
    if (computerButton->isChecked()) {
        difficulty->setDisabled(false);
    }

}

int ConfigDialog::getDifficulty() {
    return difficulty->currentData().toInt();
}

bool ConfigDialog::isAgainstComputer() {
    return computerButton->isChecked();
}

void ConfigDialog::loadSettings() {
    QSettings settings(m_sSettingsFile, QSettings::NativeFormat);
    computerButton->setChecked(settings.value("againstComputer").toBool());
    difficulty->setCurrentIndex(settings.value("difficulty").toInt()-1);
    enableCombobox();
}

void ConfigDialog::saveSettings(){
    QSettings settings(m_sSettingsFile, QSettings::NativeFormat);
    settings.setValue("difficulty", getDifficulty());
    settings.setValue("againstComputer", isAgainstComputer());
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
