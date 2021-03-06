#ifndef CONFIGDIALOG
#define CONFIGDIALOG
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QLabel>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QFormLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QGroupBox>

class ConfigDialog : public QDialog {
    Q_OBJECT

public:
    explicit ConfigDialog(QWidget *parent = 0);
    ~ConfigDialog();

private:
    QRadioButton     *humanButton;
    QRadioButton     *computerButton;
    QComboBox        *difficulty;
    QDialogButtonBox *buttonBox;
    QFormLayout      *mainLayout;
    QGroupBox        *groupBox;
    QHBoxLayout      *radioBox;

    QString m_sSettingsFile;

public slots:
    void reject();
    void accept();
    void showDialog();
    void loadSettings();
    void saveSettings();
    int  getDifficulty();
    void enableCombobox();
    bool isAgainstComputer();
};

#endif // CONFIGDIALOG

