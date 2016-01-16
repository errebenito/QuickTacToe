#ifndef ABOUTAPPDIALOG
#define ABOUTAPPDIALOG
#include <QtWidgets/QMessageBox>
#include <QtWidgets/QWidget>

class AboutAppDialog : public QMessageBox {
    Q_OBJECT
public:
    explicit AboutAppDialog(QWidget *parent = 0);
    ~AboutAppDialog();

public slots:
    void aboutApp(QWidget * parent);
};

#endif // ABOUTAPPDIALOG

