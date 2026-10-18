import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  for (final locale in const [Locale('en'), Locale('ar')]) {
    testWidgets('theme resolves extensions (${locale.languageCode})', (tester) async {
      late BwThemeAccess bw;
      await tester.pumpWidget(MaterialApp(
        theme: BwMobileTheme.light(locale),
        darkTheme: BwMobileTheme.dark(locale),
        locale: locale,
        supportedLocales: const [Locale('en'), Locale('ar')],
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        home: Builder(builder: (context) {
          bw = context.bw;
          return const SizedBox();
        }),
      ));
      expect(bw.colors, BwColors.light);
      expect(bw.layout, BwLayout.mobile);
      expect(bw.text.bodyMd.fontFamily, locale.languageCode == 'ar' ? BwFontFamily.ar : BwFontFamily.en);
    });
  }
}
