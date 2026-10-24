import 'dart:io';
import 'dart:ui' show SemanticsAction, Tristate;

import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';

const _containerKey = ValueKey<String>('BwIconButton.container');

Widget _app({
  required Widget child,
  Brightness brightness = Brightness.light,
  Locale locale = const Locale('en'),
}) {
  final theme = brightness == Brightness.light
      ? BwTabletTheme.light(locale)
      : BwTabletTheme.dark(locale);
  return MaterialApp(
    locale: locale,
    supportedLocales: const [Locale('en'), Locale('ar')],
    localizationsDelegates: GlobalMaterialLocalizations.delegates,
    theme: theme,
    home: Scaffold(body: Center(child: child)),
  );
}

void main() {
  group('BwIconButton API', () {
    testWidgets('uses the documented defaults and activates', (tester) async {
      var presses = 0;
      await tester.pumpWidget(
        _app(
          child: BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit device',
            onPressed: () => presses += 1,
          ),
        ),
      );

      final subject = tester.widget<BwIconButton>(find.byType(BwIconButton));
      expect(subject.variant, BwButtonVariant.text);
      expect(subject.color, BwButtonColor.neutral);
      expect(subject.size, BwControlSize.lg);
      expect(subject.toggle, isFalse);
      expect(subject.selected, isFalse);
      expect(subject.tooltip, isTrue);
      expect(subject.loading, isFalse);

      await tester.tap(find.byKey(_containerKey));
      expect(presses, 1);
    });

    test('asserts every invalid combination', () {
      void callback() {}

      expect(
        () => BwIconButton(
          icon: Symbols.edit_rounded,
          label: '',
          onPressed: callback,
        ),
        throwsAssertionError,
      );
      for (final color in [BwButtonColor.neutral, BwButtonColor.inverse]) {
        expect(
          () => BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit',
            onPressed: callback,
            variant: BwButtonVariant.tonal,
            color: color,
          ),
          throwsAssertionError,
        );
      }
      for (final variant in [BwButtonVariant.filled, BwButtonVariant.tonal]) {
        expect(
          () => BwIconButton(
            icon: Symbols.push_pin_rounded,
            selectedIcon: Symbols.push_pin_rounded,
            label: 'Pin',
            onPressed: callback,
            variant: variant,
            color: BwButtonColor.brand,
            toggle: true,
          ),
          throwsAssertionError,
        );
      }
      expect(
        () => BwIconButton(
          icon: Symbols.push_pin_rounded,
          label: 'Pin',
          onPressed: callback,
          toggle: true,
        ),
        throwsAssertionError,
      );
    });
  });

  group('render matrix', () {
    final allowedColors = <BwButtonVariant, List<BwButtonColor>>{
      BwButtonVariant.filled: BwButtonColor.values,
      BwButtonVariant.tonal: const [
        BwButtonColor.brand,
        BwButtonColor.secondary,
        BwButtonColor.error,
      ],
      BwButtonVariant.outlined: BwButtonColor.values,
      BwButtonVariant.text: BwButtonColor.values,
    };

    for (final brightness in Brightness.values) {
      for (final locale in const [Locale('en'), Locale('ar')]) {
        testWidgets(
            'state matrix is token-resolved for '
            '${brightness.name}/${locale.languageCode}', (tester) async {
          for (final entry in allowedColors.entries) {
            final selections = switch (entry.key) {
              BwButtonVariant.outlined || BwButtonVariant.text => const [
                  false,
                  true
                ],
              _ => const [false],
            };
            for (final color in entry.value) {
              for (final selected in selections) {
                await tester.pumpWidget(
                  _app(
                    brightness: brightness,
                    locale: locale,
                    child: BwIconButton(
                      icon: Symbols.push_pin_rounded,
                      selectedIcon: Symbols.push_pin_rounded,
                      label: locale.languageCode == 'ar' ? 'تثبيت' : 'Pin',
                      onPressed: () {},
                      variant: entry.key,
                      color: color,
                      toggle: selections.length > 1,
                      selected: selected,
                      tooltip: false,
                    ),
                  ),
                );

                await tester.pumpAndSettle();
                expect(tester.takeException(), isNull);
                final button = tester.widget<IconButton>(
                  find.byKey(_containerKey),
                );
                expect(button.style, isNotNull);
                expect(button.style!.backgroundColor, isNotNull);
                expect(button.style!.iconColor, isNotNull);
                expect(find.byType(BwIcon), findsOneWidget);
              }
            }
          }
        });
      }
    }

    testWidgets('renders every size from semantic dimensions', (tester) async {
      for (final size in BwControlSize.values) {
        await tester.pumpWidget(
          _app(
            child: BwIconButton(
              icon: Symbols.edit_rounded,
              label: 'Edit',
              onPressed: () {},
              size: size,
              tooltip: false,
            ),
          ),
        );

        final button = tester.widget<IconButton>(find.byKey(_containerKey));
        final fixedSize = button.style!.fixedSize!.resolve(<WidgetState>{})!;
        final expected = switch (size) {
          BwControlSize.sm => BwSize.controlHeightSm,
          BwControlSize.md => BwSize.controlHeightMd,
          BwControlSize.lg => BwSize.controlHeightLg,
          BwControlSize.xl => BwSize.controlHeightXl,
        };
        expect(fixedSize, Size.square(expected));
      }
    });

    testWidgets('selected states use the specified token branches', (
      tester,
    ) async {
      for (final variant in [BwButtonVariant.text, BwButtonVariant.outlined]) {
        for (final color in BwButtonColor.values) {
          await tester.pumpWidget(
            _app(
              child: BwIconButton(
                icon: Symbols.push_pin_rounded,
                selectedIcon: Symbols.push_pin_rounded,
                label: 'Unpin',
                onPressed: () {},
                variant: variant,
                color: color,
                toggle: true,
                selected: true,
                tooltip: false,
              ),
            ),
          );

          final context = tester.element(find.byKey(_containerKey));
          final colors = context.bw.colors;
          final expectedBackground = switch (color) {
            BwButtonColor.brand => colors.backgroundBrandSubtle,
            BwButtonColor.secondary => colors.backgroundSecondarySubtle,
            BwButtonColor.neutral => colors.backgroundNeutralDefault,
            BwButtonColor.error => colors.backgroundErrorSubtle,
            BwButtonColor.inverse => colors.backgroundInverseDefault,
          };
          final expectedIcon = switch (color) {
            BwButtonColor.brand => colors.iconRoleBrand,
            BwButtonColor.secondary => colors.iconRoleSecondary,
            BwButtonColor.neutral => colors.iconNeutralDefault,
            BwButtonColor.error => colors.iconRoleError,
            BwButtonColor.inverse => colors.iconRoleBrand,
          };
          final button = tester.widget<IconButton>(find.byKey(_containerKey));
          final selectedState = <WidgetState>{WidgetState.selected};
          expect(
            button.style!.backgroundColor!.resolve(selectedState),
            expectedBackground,
          );
          expect(button.style!.iconColor!.resolve(selectedState), expectedIcon);
          expect(tester.widget<BwIcon>(find.byType(BwIcon)).filled, isTrue);
        }
      }
    });

    testWidgets('cross-fades between unselected and selected icons', (
      tester,
    ) async {
      Widget subject({required bool selected}) => _app(
            child: BwIconButton(
              icon: Symbols.push_pin_rounded,
              selectedIcon: Symbols.push_pin_rounded,
              label: selected ? 'Unpin' : 'Pin',
              onPressed: () {},
              toggle: true,
              selected: selected,
              tooltip: false,
            ),
          );

      await tester.pumpWidget(subject(selected: false));
      expect(find.byType(BwIcon), findsOneWidget);

      await tester.pumpWidget(subject(selected: true));
      expect(find.byType(BwIcon), findsNWidgets(2));

      await tester.pumpAndSettle();
      expect(find.byType(BwIcon), findsOneWidget);
      expect(tester.widget<BwIcon>(find.byType(BwIcon)).filled, isTrue);
    });
  });

  group('accessibility and interaction', () {
    testWidgets('exposes one label and the selected toggle state', (
      tester,
    ) async {
      final semantics = tester.ensureSemantics();
      var presses = 0;
      await tester.pumpWidget(
        _app(
          child: BwIconButton(
            icon: Symbols.push_pin_rounded,
            selectedIcon: Symbols.push_pin_rounded,
            label: 'Unpin device',
            onPressed: () => presses += 1,
            toggle: true,
            selected: true,
          ),
        ),
      );

      expect(find.bySemanticsLabel('Unpin device'), findsOneWidget);
      final node = tester.getSemantics(find.byType(BwIconButton));
      final data = node.getSemanticsData();
      expect(data.label, 'Unpin device');
      expect(data.flagsCollection.isButton, isTrue);
      expect(data.flagsCollection.isToggled, Tristate.isTrue);
      expect(data.hasAction(SemanticsAction.tap), isTrue);
      expect(data.hasAction(SemanticsAction.focus), isTrue);

      tester.semantics.tap(find.semantics.byLabel('Unpin device'));
      expect(presses, 1);

      await tester.pumpWidget(
        _app(
          child: const BwIconButton(
            icon: Symbols.push_pin_rounded,
            selectedIcon: Symbols.push_pin_rounded,
            label: 'Unpin device',
            onPressed: null,
            toggle: true,
            selected: true,
          ),
        ),
      );

      expect(find.bySemanticsLabel('Unpin device'), findsOneWidget);
      final disabledData =
          tester.getSemantics(find.byType(BwIconButton)).getSemanticsData();
      expect(disabledData.flagsCollection.isToggled, Tristate.isTrue);
      expect(disabledData.hasAction(SemanticsAction.tap), isFalse);
      expect(disabledData.hasAction(SemanticsAction.focus), isFalse);
      semantics.dispose();
    });

    testWidgets('keeps sm and md targets at the tablet minimum', (
      tester,
    ) async {
      for (final size in [BwControlSize.sm, BwControlSize.md]) {
        await tester.pumpWidget(
          _app(
            child: BwIconButton(
              icon: Symbols.edit_rounded,
              label: 'Edit',
              onPressed: () {},
              size: size,
              tooltip: false,
            ),
          ),
        );

        final rendered = tester.getSize(find.byKey(_containerKey));
        expect(rendered.width, greaterThanOrEqualTo(BwLayout.tablet.minTarget));
        expect(
          rendered.height,
          greaterThanOrEqualTo(BwLayout.tablet.minTarget),
        );
        await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
        await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
      }
    });

    testWidgets('filled icon contrast meets the non-text guideline', (
      tester,
    ) async {
      for (final brightness in Brightness.values) {
        for (final color in BwButtonColor.values) {
          await tester.pumpWidget(
            _app(
              brightness: brightness,
              child: BwIconButton(
                icon: Symbols.edit_rounded,
                label: 'Edit',
                onPressed: () {},
                variant: BwButtonVariant.filled,
                color: color,
                tooltip: false,
              ),
            ),
          );

          final button = tester.widget<IconButton>(find.byKey(_containerKey));
          final background = button.style!.backgroundColor!.resolve(
            <WidgetState>{},
          )!;
          final foreground = button.style!.iconColor!.resolve(<WidgetState>{})!;
          expect(_contrast(foreground, background), greaterThanOrEqualTo(3));
        }
      }
    });

    testWidgets('directional symbols mirror in RTL and close does not', (
      tester,
    ) async {
      Future<bool> hasHorizontalFlip(IconData icon) async {
        await tester.pumpWidget(
          _app(
            locale: const Locale('ar'),
            child: BwIconButton(
              icon: icon,
              label: 'إغلاق',
              onPressed: () {},
              tooltip: false,
            ),
          ),
        );
        return tester
            .widgetList<Transform>(
              find.descendant(
                of: find.byType(BwIcon),
                matching: find.byType(Transform),
              ),
            )
            .any((transform) => transform.transform.storage.first == -1);
      }

      expect(await hasHorizontalFlip(Symbols.arrow_back_rounded), isTrue);
      expect(await hasHorizontalFlip(Symbols.close_rounded), isFalse);
    });

    testWidgets('hardware focus draws the token focus ring', (tester) async {
      await tester.pumpWidget(
        _app(
          child: BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit',
            onPressed: () {},
            tooltip: false,
          ),
        ),
      );

      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(
        find.byKey(const ValueKey<String>('BwIconButton.focus-ring')),
        findsOneWidget,
      );
    });

    testWidgets('tooltip is visual only and uses the token theme', (
      tester,
    ) async {
      await tester.pumpWidget(
        _app(
          child: BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit device',
            onPressed: () {},
          ),
        ),
      );

      final tooltip = tester.widget<Tooltip>(find.byType(Tooltip));
      final theme = tester.widget<TooltipTheme>(find.byType(TooltipTheme));
      final context = tester.element(find.byType(TooltipTheme));
      expect(tooltip.message, 'Edit device');
      expect(tooltip.excludeFromSemantics, isTrue);
      expect(theme.data.waitDuration, BwDuration.xl2);
      expect(theme.data.verticalOffset, BwSpacing.xs);
      expect(theme.data.textStyle!.color, context.bw.colors.textNeutralInverse);
    });

    testWidgets(
      'loading keeps layout, blocks activation, and localizes status',
      (tester) async {
        var presses = 0;
        await tester.pumpWidget(
          _app(
            locale: const Locale('ar'),
            child: BwIconButton(
              icon: Symbols.edit_rounded,
              label: 'تعديل',
              onPressed: () => presses += 1,
              loading: true,
              tooltip: false,
            ),
          ),
        );

        expect(
          find.byKey(const ValueKey<String>('BwIconButton.spinner')),
          findsOneWidget,
        );
        expect(
          tester.getSemantics(find.byType(BwIconButton)).value,
          'جارٍ التحميل',
        );
        await tester.tap(find.byKey(_containerKey));
        expect(presses, 0);
      },
    );
  });

  group('goldens', () {
    for (final brightness in Brightness.values) {
      for (final locale in const [Locale('en'), Locale('ar')]) {
        testWidgets(
          'B9 matrix ${brightness.name}/${locale.languageCode}',
          (tester) async {
            await tester.pumpWidget(
              _app(
                brightness: brightness,
                locale: locale,
                child: RepaintBoundary(
                  key: const ValueKey<String>('icon-button-golden'),
                  child: _GoldenBoard(locale: locale),
                ),
              ),
            );
            await tester.pumpAndSettle();

            await expectLater(
              find.byKey(const ValueKey<String>('icon-button-golden')),
              matchesGoldenFile(
                'goldens/icon_button/'
                '${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test('component source contains no raw design values', () {
    final source = File('lib/src/components/icon_button/bw_icon_button.dart')
        .readAsStringSync();
    expect(source, isNot(matches(RegExp(r'#[0-9a-fA-F]{3,8}'))));
    expect(source, isNot(matches(RegExp(r'\b\d+(?:\.\d+)?(?:px|ms)\b'))));
    expect(source, isNot(contains('fontFamily:')));
  });
}

class _GoldenBoard extends StatelessWidget {
  const _GoldenBoard({required this.locale});

  final Locale locale;

  @override
  Widget build(BuildContext context) {
    final isArabic = locale.languageCode == 'ar';
    final allowedColors = <BwButtonVariant, List<BwButtonColor>>{
      BwButtonVariant.filled: BwButtonColor.values,
      BwButtonVariant.tonal: const [
        BwButtonColor.brand,
        BwButtonColor.secondary,
        BwButtonColor.error,
      ],
      BwButtonVariant.outlined: BwButtonColor.values,
      BwButtonVariant.text: BwButtonColor.values,
    };

    return Material(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: SizedBox(
        width: 760,
        height: 560,
        child: Padding(
          padding: const EdgeInsetsDirectional.all(BwSpacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                isArabic ? 'مصفوفة زر الأيقونة' : 'Icon button matrix',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: BwSpacing.lg),
              for (final entry in allowedColors.entries) ...[
                _GoldenRow(
                  label: entry.key.name,
                  children: [
                    for (final color in entry.value)
                      _goldenButton(
                        locale: locale,
                        variant: entry.key,
                        color: color,
                      ),
                    if (entry.key == BwButtonVariant.outlined ||
                        entry.key == BwButtonVariant.text)
                      for (final color in entry.value)
                        _goldenButton(
                          locale: locale,
                          variant: entry.key,
                          color: color,
                          selected: true,
                        ),
                  ],
                ),
                const SizedBox(height: BwSpacing.md),
              ],
              _GoldenRow(
                label: isArabic ? 'الأحجام' : 'sizes',
                children: [
                  for (final size in BwControlSize.values)
                    _goldenButton(
                      locale: locale,
                      size: size,
                      icon: Symbols.arrow_back_rounded,
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _goldenButton({
    required Locale locale,
    BwButtonVariant variant = BwButtonVariant.text,
    BwButtonColor color = BwButtonColor.neutral,
    BwControlSize size = BwControlSize.lg,
    bool selected = false,
    IconData icon = Symbols.push_pin_rounded,
  }) {
    final button = BwIconButton(
      icon: icon,
      selectedIcon: icon,
      label: locale.languageCode == 'ar' ? 'تثبيت' : 'Pin',
      onPressed: () {},
      variant: variant,
      color: color,
      size: size,
      toggle:
          variant == BwButtonVariant.outlined || variant == BwButtonVariant.text,
      selected: selected,
      tooltip: false,
    );
    if (color != BwButtonColor.inverse) return button;
    return Builder(
      builder: (context) => DecoratedBox(
        decoration: BoxDecoration(
          color: context.bw.colors.backgroundBrandDefault,
          borderRadius: const BorderRadiusDirectional.all(
            Radius.circular(BwRadius.md),
          ),
        ),
        child: Padding(
          padding: const EdgeInsetsDirectional.all(BwSpacing.xs),
          child: button,
        ),
      ),
    );
  }
}

class _GoldenRow extends StatelessWidget {
  const _GoldenRow({required this.label, required this.children});

  final String label;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: 84,
            child: Text(label, style: Theme.of(context).textTheme.labelLarge),
          ),
          Expanded(
            child: Wrap(
              spacing: BwSpacing.sm,
              runSpacing: BwSpacing.sm,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: children,
            ),
          ),
        ],
      );
}

double _contrast(Color foreground, Color background) {
  final lighter = foreground.computeLuminance() > background.computeLuminance()
      ? foreground
      : background;
  final darker = foreground.computeLuminance() > background.computeLuminance()
      ? background
      : foreground;
  return (lighter.computeLuminance() + 0.05) /
      (darker.computeLuminance() + 0.05);
}
