import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';

extension BwWidgetTester on WidgetTester {
  Future<void> pumpBw(
    Widget child, {
    Brightness brightness = Brightness.light,
    Locale locale = const Locale('en'),
    double textScaleFactor = 1,
    bool reduceMotion = false,
  }) async {
    await pumpWidget(
      MaterialApp(
        locale: locale,
        supportedLocales: const [Locale('en'), Locale('ar')],
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        theme: BwTabletTheme.light(locale),
        darkTheme: BwTabletTheme.dark(locale),
        themeMode:
            brightness == Brightness.light ? ThemeMode.light : ThemeMode.dark,
        builder: (context, child) => MediaQuery(
          data: MediaQuery.of(context).copyWith(
            disableAnimations: reduceMotion,
            textScaler: TextScaler.linear(textScaleFactor),
          ),
          child: child!,
        ),
        home: Scaffold(body: Center(child: child)),
      ),
    );
    await pump();
  }
}
