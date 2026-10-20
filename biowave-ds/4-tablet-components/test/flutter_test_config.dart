import 'dart:async';
import 'dart:io';

import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  TestWidgetsFlutterBinding.ensureInitialized();

  await Future.wait([
    _loadFileFont(BwFontFamily.en, const [
      'test/fonts/Inter-Regular.ttf',
      'test/fonts/Inter-Medium.ttf',
      'test/fonts/Inter-SemiBold.ttf',
    ]),
    _loadFileFont(BwFontFamily.ar, const [
      'test/fonts/IBMPlexSansArabic-Regular.ttf',
      'test/fonts/IBMPlexSansArabic-Medium.ttf',
      'test/fonts/IBMPlexSansArabic-SemiBold.ttf',
    ]),
    _loadAssetFont(
      'packages/material_symbols_icons/MaterialSymbolsRounded',
      'packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded.ttf',
    ),
  ]);

  await testMain();
}

Future<void> _loadFileFont(String family, List<String> paths) async {
  final loader = FontLoader(family);
  for (final path in paths) {
    loader.addFont(
      File(path).readAsBytes().then(ByteData.sublistView),
    );
  }
  await loader.load();
}

Future<void> _loadAssetFont(String family, String asset) async {
  final loader = FontLoader(family)..addFont(rootBundle.load(asset));
  await loader.load();
}
