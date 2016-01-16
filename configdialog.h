#ifndef CONFIGDIALOG
#define CONFIGDIALOG
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QLabel>
#include <QtWidgets/QSlider>
#include <QtWidgets/QDialog>


class ConfigDialog : public QDialog {
    Q_OBJECT

public:
    explicit ConfigDialog(QWidget *parent = 0);
    ~ConfigDialog();

private:
    QLabel *playerLabel;

public slots:
    void reject();
    void accept();
    void showDialog();
};

#endif // CONFIGDIALOG

