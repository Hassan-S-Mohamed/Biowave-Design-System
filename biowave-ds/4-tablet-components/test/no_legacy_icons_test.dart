import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  Iterable<File> getLibDartFiles() => Directory('lib')
      .listSync(recursive: true)
      .whereType<File>()
      .where((file) => file.path.endsWith('.dart'));

  test('library code never uses Flutter Material Icons', () {
    for (final file in getLibDartFiles()) {
      expect(
        file.readAsStringSync(),
        isNot(contains(RegExp(r'\bIcons\.'))),
        reason: '${file.path} must use Symbols.*_rounded through BwIcon',
      );
    }
  });

  test('library code never uses CupertinoIcons', () {
    for (final file in getLibDartFiles()) {
      expect(
        file.readAsStringSync(),
        isNot(contains(RegExp(r'\bCupertinoIcons\.'))),
        reason: '${file.path} must not use CupertinoIcons; use Symbols.*_rounded through BwIcon',
      );
    }
  });

  test('library code never constructs raw IconData', () {
    for (final file in getLibDartFiles()) {
      expect(
        file.readAsStringSync(),
        isNot(contains(RegExp(r'\bIconData\('))),
        reason: '${file.path} must not construct raw IconData; use Symbols.*_rounded',
      );
    }
  });

  test('raw Icon widget is never used outside lib/src/components/icon/', () {
    for (final file in getLibDartFiles()) {
      final normalizedPath = file.path.replaceAll(r'\', '/');
      if (normalizedPath.contains('lib/src/components/icon/')) {
        continue;
      }
      expect(
        file.readAsStringSync(),
        isNot(contains(RegExp(r'\bIcon\('))),
        reason: '${file.path} must render icons through BwIcon, not raw Icon(...)',
      );
    }
  });

  test('BwIcon source has no raw sizes or colours', () {
    final source = File(
      'lib/src/components/icon/bw_icon.dart',
    ).readAsStringSync();

    expect(source, isNot(contains(RegExp(r'\bColor(?:\.from|\()'))));
    expect(source, isNot(contains(RegExp(r'0x[0-9a-fA-F]+'))));
    expect(
      source,
      isNot(contains(RegExp(r'(?:size|dimension|opticalSize):\s*\d'))),
    );
  });
}
