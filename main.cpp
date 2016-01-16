#include "aboutappdialog.h"
#include "aboutqtdialog.h"
#include "configdialog.h"
#include <QtQml/QQmlApplicationEngine>
#include <QtCore/QUrl>
#include <QtQml/QQmlContext>
#include <QtWidgets/QApplication>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    QQmlApplicationEngine engine;
    AboutAppDialog aboutApp;
    AboutQtDialog aboutQt;
    ConfigDialog configDialog;
    engine.rootContext()->setContextProperty("aboutApp", &aboutApp);
    engine.rootContext()->setContextProperty("aboutQt", &aboutQt);
    engine.rootContext()->setContextProperty("configDialog", &configDialog);
    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));

    return app.exec();
}
