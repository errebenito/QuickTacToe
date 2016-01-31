#ifndef CONFIGDIALOG
#define CONFIGDIALOG
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QLabel>
#include <QtWidgets/QSlider>
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
    QRadioButton *humanButton;
    QRadioButton *computerButton;
    QSlider *difficultySlider;
    QDialogButtonBox *buttonBox;
    QFormLayout *mainLayout;
    QGroupBox *groupBox;
    QHBoxLayout *radioBox;

public slots:
    void reject();
    void accept();
    void showDialog();
};

#endif // CONFIGDIALOG

