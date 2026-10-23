import 'dart:io';
import 'dart:ui' show Tristate;

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
  });

  group('accessibility and interaction', () {
    testWidgets('exposes one label and the selected toggle state', (
      tester,
    ) async {
      final semantics = tester.ensureSemantics();
      await tester.pumpWidget(
        _app(
          child: BwIconButton(
            icon: Symbols.push_pin_rounded,
            selectedIcon: Symbols.push_pin_rounded,
            label: 'Unpin device',
            onPressed: () {},
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

  test('component source contains no raw design values', () {
    final source = File('lib/src/components/icon_button/bw_icon_button.dart')
        .readAsStringSync();
    expect(source, isNot(matches(RegExp(r'#[0-9a-fA-F]{3,8}'))));
    expect(source, isNot(matches(RegExp(r'\b\d+(?:\.\d+)?(?:px|ms)\b'))));
    expect(source, isNot(contains('fontFamily:')));
  });
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
