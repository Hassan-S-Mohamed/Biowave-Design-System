import 'dart:convert';
import 'dart:io';
import 'dart:ui' show Tristate;

import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

void main() {
  const statusColors = <BwIconColor>{
    BwIconColor.success,
    BwIconColor.warning,
    BwIconColor.error,
    BwIconColor.info,
  };

  group('BwIcon API and assertions', () {
    test('defaults match contract B1', () {
      const icon = BwIcon(icon: Symbols.add_rounded);
      expect(icon.icon, Symbols.add_rounded);
      expect(icon.size, isNull);
      expect(icon.filled, isFalse);
      expect(icon.color, isNull);
      expect(icon.directional, isFalse);
      expect(icon.semanticLabel, isNull);
    });

    test('standalone status colours without semanticLabel assert', () {
      for (final statusColor in statusColors) {
        expect(
          () => BwIcon(
            icon: Symbols.schedule_rounded,
            size: BwIconSize.md,
            color: statusColor,
          ),
          throwsA(
            isA<AssertionError>().having(
              (error) => error.message,
              'message',
              'status icons need text or a label',
            ),
          ),
          reason: '$statusColor with size and null label must assert',
        );
        expect(
          () => BwIcon(
            icon: Symbols.schedule_rounded,
            size: BwIconSize.md,
            color: statusColor,
            semanticLabel: '',
          ),
          throwsA(
            isA<AssertionError>().having(
              (error) => error.message,
              'message',
              'status icons need text or a label',
            ),
          ),
          reason: '$statusColor with size and empty label must assert',
        );

        // Allowed when semanticLabel is provided:
        expect(
          () => BwIcon(
            icon: Symbols.schedule_rounded,
            size: BwIconSize.md,
            color: statusColor,
            semanticLabel: 'Overdue',
          ),
          returnsNormally,
        );

        // Allowed when size is null (inside a parent component slot):
        expect(
          () => BwIcon(
            icon: Symbols.schedule_rounded,
            color: statusColor,
          ),
          returnsNormally,
        );
      }

      // Non-status colours do not require a semanticLabel when standalone:
      for (final color in BwIconColor.values.where(
        (c) => !statusColors.contains(c),
      )) {
        expect(
          () => BwIcon(
            icon: Symbols.add_rounded,
            size: BwIconSize.md,
            color: color,
          ),
          returnsNormally,
        );
      }
    });
  });

  group('Dimensions and sizes', () {
    final expectedSizes = <BwIconSize, double>{
      BwIconSize.xs: BwSize.iconXs,
      BwIconSize.sm: BwSize.iconSm,
      BwIconSize.md: BwSize.iconMd,
      BwIconSize.lg: BwSize.iconLg,
      BwIconSize.xl: BwSize.iconXl,
      BwIconSize.xl2: BwSize.iconXl2,
      BwIconSize.xl3: BwSize.iconXl3,
    };

    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          'every size renders a box of token size (${brightness.name}, ${locale.languageCode})',
          (tester) async {
            for (final entry in expectedSizes.entries) {
              final sizeEnum = entry.key;
              final expectedDimension = entry.value;

              await pumpBw(
                tester,
                BwIcon(
                  icon: Symbols.add_rounded,
                  size: sizeEnum,
                ),
                brightness: brightness,
                locale: locale,
              );

              final renderedSize = tester.getSize(find.byType(BwIcon));
              expect(
                renderedSize,
                Size.square(expectedDimension),
                reason:
                    'size $sizeEnum in ${brightness.name}/${locale.languageCode}',
              );

              final innerIcon = tester.widget<Icon>(
                find.byKey(const ValueKey<String>('BwIcon.glyph')),
              );
              expect(innerIcon.size, expectedDimension);
              expect(innerIcon.opticalSize, expectedDimension);
              expect(innerIcon.weight, BwIconAxes.weight);
              expect(innerIcon.grade, BwIconAxes.grade);
            }
          },
        );
      }
    }

    testWidgets('size: null follows IconTheme size and colour', (tester) async {
      await pumpBw(
        tester,
        Builder(
          builder: (context) => IconTheme(
            data: IconThemeData(
              size: BwSize.iconXl,
              color: context.bw.colors.iconRoleSecondary,
            ),
            child: const BwIcon(icon: Symbols.add_rounded),
          ),
        ),
      );

      expect(tester.getSize(find.byType(BwIcon)), const Size.square(BwSize.iconXl));
      final innerIcon = tester.widget<Icon>(
        find.byKey(const ValueKey<String>('BwIcon.glyph')),
      );
      expect(innerIcon.size, BwSize.iconXl);
      expect(innerIcon.opticalSize, BwSize.iconXl);
      expect(innerIcon.color, BwColors.light.iconRoleSecondary);
    });
  });

  group('Fill and colours', () {
    testWidgets('filled sets fill axis to 1, default is 0', (tester) async {
      await pumpBw(
        tester,
        const Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            BwIcon(
              key: ValueKey<String>('outlined'),
              icon: Symbols.push_pin_rounded,
            ),
            BwIcon(
              key: ValueKey<String>('filled'),
              icon: Symbols.push_pin_rounded,
              filled: true,
            ),
          ],
        ),
      );

      final outlinedGlyph = tester.widget<Icon>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('outlined')),
          matching: find.byType(Icon),
        ),
      );
      final filledGlyph = tester.widget<Icon>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('filled')),
          matching: find.byType(Icon),
        ),
      );

      expect(outlinedGlyph.fill, BwIconAxes.fill);
      expect(filledGlyph.fill, BwIconAxes.fillSelected);
    });

    for (final brightness in Brightness.values) {
      testWidgets(
        'all BwIconColor values resolve to B3 tokens in ${brightness.name}',
        (tester) async {
          late BwColors themeColors;
          await pumpBw(
            tester,
            Builder(
              builder: (context) {
                themeColors = context.bw.colors;
                return Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    for (final color in BwIconColor.values)
                      BwIcon(
                        key: ValueKey<BwIconColor>(color),
                        icon: Symbols.schedule_rounded,
                        size: BwIconSize.md,
                        color: color,
                        semanticLabel:
                            statusColors.contains(color) ? 'Status' : null,
                      ),
                  ],
                );
              },
            ),
            brightness: brightness,
          );

          final expectedColors = <BwIconColor, Color>{
            BwIconColor.defaultColor: themeColors.iconNeutralDefault,
            BwIconColor.subtle: themeColors.iconNeutralSubtle,
            BwIconColor.muted: themeColors.iconNeutralMuted,
            BwIconColor.inverse: themeColors.iconNeutralInverse,
            BwIconColor.brand: themeColors.iconRoleBrand,
            BwIconColor.secondary: themeColors.iconRoleSecondary,
            BwIconColor.success: themeColors.iconRoleSuccess,
            BwIconColor.warning: themeColors.iconRoleWarning,
            BwIconColor.error: themeColors.iconRoleError,
            BwIconColor.info: themeColors.iconRoleInfo,
          };

          for (final entry in expectedColors.entries) {
            final glyph = tester.widget<Icon>(
              find.descendant(
                of: find.byKey(ValueKey<BwIconColor>(entry.key)),
                matching: find.byType(Icon),
              ),
            );
            expect(
              glyph.color,
              entry.value,
              reason: '${entry.key} in ${brightness.name}',
            );
          }
        },
      );
    }
  });

  group('RTL and directional', () {
    testWidgets('directional flips in RTL only; non-directional never flips',
        (tester) async {
      // LTR:
      await pumpBw(
        tester,
        const Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            BwIcon(
              key: ValueKey<String>('dir'),
              icon: Symbols.arrow_forward_rounded,
              directional: true,
            ),
            BwIcon(
              key: ValueKey<String>('non-dir'),
              icon: Symbols.check_rounded,
            ),
          ],
        ),
        locale: const Locale('en'),
      );

      final ltrTransform = tester.widget<Transform>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('dir')),
          matching: find.byType(Transform),
        ),
      );
      expect(ltrTransform.transform.storage[0], 1.0);
      expect(
        find.descendant(
          of: find.byKey(const ValueKey<String>('non-dir')),
          matching: find.byType(Transform),
        ),
        findsNothing,
      );

      // RTL:
      await pumpBw(
        tester,
        const Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            BwIcon(
              key: ValueKey<String>('dir'),
              icon: Symbols.arrow_forward_rounded,
              directional: true,
            ),
            BwIcon(
              key: ValueKey<String>('non-dir'),
              icon: Symbols.check_rounded,
            ),
          ],
        ),
        locale: const Locale('ar'),
      );

      final rtlTransform = tester.widget<Transform>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('dir')),
          matching: find.byType(Transform),
        ),
      );
      expect(rtlTransform.transform.storage[0], -1.0);
      expect(
        find.descendant(
          of: find.byKey(const ValueKey<String>('non-dir')),
          matching: find.byType(Transform),
        ),
        findsNothing,
      );
    });

    testWidgets(
      'directional icon inside button / IconTheme context in RTL flips exactly once',
      (tester) async {
        await pumpBw(
          tester,
          IconTheme(
            data: const IconThemeData(size: BwSize.iconMd),
            child: const BwIcon(
              icon: Symbols.arrow_forward_rounded,
              directional: true,
            ),
          ),
          locale: const Locale('ar'),
        );

        final transforms = tester
            .widgetList<Transform>(
              find.descendant(
                of: find.byType(BwIcon),
                matching: find.byType(Transform),
              ),
            )
            .toList();
        expect(transforms, hasLength(1));
        expect(transforms.single.transform.storage[0], -1.0);
      },
    );
  });

  group('Semantics and accessibility', () {
    testWidgets('decorative icon is excluded from semantics', (tester) async {
      final semantics = tester.ensureSemantics();
      try {
        await pumpBw(
          tester,
          const BwIcon(
            icon: Symbols.add_rounded,
            size: BwIconSize.lg,
          ),
        );

        expect(
          find.descendant(
            of: find.byType(BwIcon),
            matching: find.byType(ExcludeSemantics),
          ),
          findsWidgets,
        );
        expect(find.bySemanticsLabel(RegExp('.+')), findsNothing);
      } finally {
        semantics.dispose();
      }
    });

    for (final (locale, label) in const <(Locale, String)>[
      (Locale('en'), 'Overdue'),
      (Locale('ar'), 'متأخر'),
    ]) {
      testWidgets(
        'meaningful icon exposes image semantics with label (${locale.languageCode})',
        (tester) async {
          final semantics = tester.ensureSemantics();
          try {
            await pumpBw(
              tester,
              BwIcon(
                icon: Symbols.schedule_rounded,
                size: BwIconSize.md,
                color: BwIconColor.warning,
                semanticLabel: label,
              ),
              locale: locale,
            );

            expect(find.bySemanticsLabel(label), findsOneWidget);
            final node = tester.getSemantics(find.byType(BwIcon));
            expect(node.label, label);
            expect(node.flagsCollection.isImage, isTrue);
            expect(node.flagsCollection.isFocused, Tristate.none);
            expect(
              find.descendant(
                of: find.byType(BwIcon),
                matching: find.byType(Focus),
              ),
              findsNothing,
            );
          } finally {
            semantics.dispose();
          }
        },
      );
    }
  });

  group('Component tokens and source checks', () {
    test('code token map matches icon.tokens.json', () {
      final mobileTokensJson = jsonDecode(
        File('components/icon/icon.tokens.json').readAsStringSync(),
      ) as Map<String, dynamic>;
      final extendsPath = mobileTokensJson[r'$extends'] as String;
      final webTokensJson = jsonDecode(
        File('components/icon/$extendsPath').readAsStringSync(),
      ) as Map<String, dynamic>;

      final iconTokens = webTokensJson['icon'] as Map<String, dynamic>;
      final sizeMap = iconTokens['size'] as Map<String, dynamic>;
      final colorMap = iconTokens['color'] as Map<String, dynamic>;

      const codeSizeTokens = <BwIconSize, (String, String)>{
        BwIconSize.xs: ('xs', '{size.icon.xs}'),
        BwIconSize.sm: ('sm', '{size.icon.sm}'),
        BwIconSize.md: ('md', '{size.icon.md}'),
        BwIconSize.lg: ('lg', '{size.icon.lg}'),
        BwIconSize.xl: ('xl', '{size.icon.xl}'),
        BwIconSize.xl2: ('2xl', '{size.icon.2xl}'),
        BwIconSize.xl3: ('3xl', '{size.icon.3xl}'),
      };

      final jsonSizeKeys =
          sizeMap.keys.where((key) => !key.startsWith(r'$')).toSet();
      expect(
        codeSizeTokens.values.map((entry) => entry.$1).toSet(),
        jsonSizeKeys,
      );
      for (final entry in codeSizeTokens.entries) {
        final (modeKey, expectedAlias) = entry.value;
        final modeObj = sizeMap[modeKey] as Map<String, dynamic>;
        final sizeVar = modeObj['size'] as Map<String, dynamic>;
        expect(sizeVar[r'$value'], expectedAlias);
      }

      const codeColorTokens = <BwIconColor, (String, String)>{
        BwIconColor.defaultColor: ('default', '{color.icon.neutral.default}'),
        BwIconColor.subtle: ('subtle', '{color.icon.neutral.subtle}'),
        BwIconColor.muted: ('muted', '{color.icon.neutral.muted}'),
        BwIconColor.inverse: ('inverse', '{color.icon.neutral.inverse}'),
        BwIconColor.brand: ('brand', '{color.icon.role.brand}'),
        BwIconColor.secondary: ('secondary', '{color.icon.role.secondary}'),
        BwIconColor.success: ('success', '{color.icon.role.success}'),
        BwIconColor.error: ('error', '{color.icon.role.error}'),
        BwIconColor.warning: ('warning', '{color.icon.role.warning}'),
        BwIconColor.info: ('info', '{color.icon.role.info}'),
      };

      final jsonColorKeys =
          colorMap.keys.where((key) => !key.startsWith(r'$')).toSet();
      expect(
        codeColorTokens.values.map((entry) => entry.$1).toSet(),
        jsonColorKeys,
      );
      for (final entry in codeColorTokens.entries) {
        final (modeKey, expectedAlias) = entry.value;
        final modeObj = colorMap[modeKey] as Map<String, dynamic>;
        final colorVar = modeObj['color'] as Map<String, dynamic>;
        expect(colorVar[r'$value'], expectedAlias);
      }
    });

    test('bw_icon.dart contains no raw visual values or legacy Icons.', () {
      final source =
          File('lib/src/components/icon/bw_icon.dart').readAsStringSync();

      expect(source, isNot(contains('Icons.')));
      expect(source, isNot(contains('Color(0x')));
      expect(source, isNot(contains('BwPalette')));
      expect(
        source,
        isNot(matches(RegExp(r'SizedBox(?:\.square)?\([^)]*\b\d'))),
      );
      expect(source, isNot(contains('Duration(milliseconds:')));
    });
  });

  group('goldens', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} size scale, colours, filled vs outlined, RTL arrow',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(640, 360));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            const goldenKey = ValueKey<String>('icon-golden');
            final statusLabel =
                locale.languageCode == 'ar' ? 'متأخر' : 'Overdue';

            await pumpBw(
              tester,
              RepaintBoundary(
                key: goldenKey,
                child: SizedBox(
                  width: 640,
                  height: 360,
                  child: Builder(
                    builder: (context) => ColoredBox(
                      color: context.bw.colors.surfacePage,
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: <Widget>[
                            // 1. Size scale (xs -> xl3)
                            Wrap(
                              spacing: 16,
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: <Widget>[
                                for (final size in BwIconSize.values)
                                  BwIcon(
                                    icon: Symbols.add_rounded,
                                    size: size,
                                  ),
                              ],
                            ),
                            // 2. Colours (all 10 BwIconColor values)
                            Wrap(
                              spacing: 16,
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: <Widget>[
                                for (final color in BwIconColor.values)
                                  ColoredBox(
                                    color: color == BwIconColor.inverse
                                        ? context.bw.colors.surfaceInverse
                                        : context.bw.colors.surfacePage,
                                    child: Padding(
                                      padding: const EdgeInsets.all(4),
                                      child: BwIcon(
                                        icon: Symbols.schedule_rounded,
                                        size: BwIconSize.lg,
                                        color: color,
                                        semanticLabel:
                                            statusColors.contains(color)
                                                ? statusLabel
                                                : null,
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                            // 3. Filled vs outlined & Directional vs non-directional arrow
                            const Wrap(
                              spacing: 24,
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: <Widget>[
                                BwIcon(
                                  icon: Symbols.push_pin_rounded,
                                  size: BwIconSize.xl,
                                ),
                                BwIcon(
                                  icon: Symbols.push_pin_rounded,
                                  size: BwIconSize.xl,
                                  filled: true,
                                ),
                                BwIcon(
                                  icon: Symbols.arrow_forward_rounded,
                                  size: BwIconSize.xl,
                                  directional: true,
                                ),
                                BwIcon(
                                  icon: Symbols.arrow_forward_rounded,
                                  size: BwIconSize.xl,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              brightness: brightness,
              locale: locale,
            );
            await tester.pumpAndSettle();

            await expectLater(
              find.byKey(goldenKey),
              matchesGoldenFile(
                'goldens/icon/icon-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });
}
