#ifndef ABOUTQTDIALOG
#define ABOUTQTDIALOG
#include <QtWidgets/QMessageBox>
#include <QtWidgets/QWidget>

class AboutQtDialog : public QMessageBox {
    Q_OBJECT

public:
    explicit AboutQtDialog(QWidget *parent = 0);
    ~AboutQtDialog();

public slots:
    void aboutQt();
};

#endif // ABOUTQTDIALOG

