import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  test('lib/ never references legacy Material Icons (D-18)', () {
    final libDir = Directory('lib');
    final dartFiles = libDir
        .listSync(recursive: true)
        .whereType<File>()
        .where((file) => file.path.endsWith('.dart'))
        .toList()
      ..sort((a, b) => a.path.compareTo(b.path));

    expect(dartFiles, isNotEmpty);

    final legacyIconsPattern = RegExp(r'\bIcons\.');
    for (final file in dartFiles) {
      final content = file.readAsStringSync();
      expect(
        legacyIconsPattern.hasMatch(content),
        isFalse,
        reason: '${file.path} must use Symbols.*_rounded via BwIcon, not Icons.*',
      );
    }
  });
}
