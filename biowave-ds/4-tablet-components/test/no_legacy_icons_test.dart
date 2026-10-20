import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  test('library code never uses Flutter Material Icons', () {
    final dartFiles = Directory('lib')
        .listSync(recursive: true)
        .whereType<File>()
        .where((file) => file.path.endsWith('.dart'));

    for (final file in dartFiles) {
      expect(
        file.readAsStringSync(),
        isNot(contains(RegExp(r'\bIcons\.'))),
        reason: '${file.path} must use Symbols.*_rounded through BwIcon',
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
