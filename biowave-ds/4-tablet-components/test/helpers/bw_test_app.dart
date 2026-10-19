import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

extension BwWidgetTester on WidgetTester {
  Future<void> pumpBw(
    Widget child, {
    Brightness brightness = Brightness.light,
    Locale locale = const Locale('en'),
    double textScaleFactor = 1,
  }) async {
    await pumpWidget(
      MaterialApp(
        theme: BwTabletTheme.light(locale),
        darkTheme: BwTabletTheme.dark(locale),
        themeMode:
            brightness == Brightness.light ? ThemeMode.light : ThemeMode.dark,
        builder: (context, child) => Localizations.override(
          context: context,
          locale: locale,
          child: Directionality(
            textDirection: locale.languageCode == 'ar'
                ? TextDirection.rtl
                : TextDirection.ltr,
            child: MediaQuery.withClampedTextScaling(
              minScaleFactor: textScaleFactor,
              maxScaleFactor: textScaleFactor,
              child: child!,
            ),
          ),
        ),
        home: Scaffold(body: Center(child: child)),
      ),
    );
    await pump();
  }
}
