import 'dart:async';
import 'dart:io';

import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  TestWidgetsFlutterBinding.ensureInitialized();

  await Future.wait(<Future<void>>[
    _loadFontFamily(BwFontFamily.en, <String>[
      'test/fonts/Inter-Regular.ttf',
      'test/fonts/Inter-Medium.ttf',
      'test/fonts/Inter-SemiBold.ttf',
    ]),
    _loadFontFamily(BwFontFamily.ar, <String>[
      'test/fonts/IBMPlexSansArabic-Regular.ttf',
      'test/fonts/IBMPlexSansArabic-Medium.ttf',
      'test/fonts/IBMPlexSansArabic-SemiBold.ttf',
    ]),
    _loadMaterialSymbols(),
  ]);

  await testMain();
}

Future<void> _loadFontFamily(String family, List<String> paths) async {
  final loader = FontLoader(family);
  for (final path in paths) {
    loader.addFont(_fontBytes(path));
  }
  await loader.load();
}

Future<void> _loadMaterialSymbols() async {
  final loader =
      FontLoader('packages/material_symbols_icons/MaterialSymbolsRounded')
        ..addFont(
          rootBundle.load(
            'packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded.ttf',
          ),
        );
  await loader.load();
}

Future<ByteData> _fontBytes(String path) async {
  final bytes = await File(path).readAsBytes();
  return ByteData.view(Uint8List.fromList(bytes).buffer);
}
