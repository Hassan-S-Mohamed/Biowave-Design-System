import 'dart:io';

import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:biowave_tablet/src/components/button/bw_button_style.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

const _allowedVariantColors = <(BwButtonVariant, BwButtonColor)>[
  (BwButtonVariant.filled, BwButtonColor.brand),
  (BwButtonVariant.filled, BwButtonColor.secondary),
  (BwButtonVariant.filled, BwButtonColor.neutral),
  (BwButtonVariant.filled, BwButtonColor.error),
  (BwButtonVariant.filled, BwButtonColor.inverse),
  (BwButtonVariant.tonal, BwButtonColor.brand),
  (BwButtonVariant.tonal, BwButtonColor.secondary),
  (BwButtonVariant.tonal, BwButtonColor.error),
  (BwButtonVariant.outlined, BwButtonColor.brand),
  (BwButtonVariant.outlined, BwButtonColor.secondary),
  (BwButtonVariant.outlined, BwButtonColor.neutral),
  (BwButtonVariant.outlined, BwButtonColor.error),
  (BwButtonVariant.outlined, BwButtonColor.inverse),
  (BwButtonVariant.text, BwButtonColor.brand),
  (BwButtonVariant.text, BwButtonColor.secondary),
  (BwButtonVariant.text, BwButtonColor.neutral),
  (BwButtonVariant.text, BwButtonColor.error),
  (BwButtonVariant.text, BwButtonColor.inverse),
];

void main() {
  group('BwButton API', () {
    testWidgets('uses the documented defaults and M3 variant', (tester) async {
      await tester.pumpBw(
        BwButton(label: 'Clock in', onPressed: () {}),
      );

      final button = tester.widget<BwButton>(find.byType(BwButton));
      expect(button.variant, BwButtonVariant.filled);
      expect(button.color, BwButtonColor.brand);
      expect(button.size, BwControlSize.lg);
      expect(button.fullWidth, isFalse);
      expect(button.loading, isFalse);
      expect(find.byType(FilledButton), findsOneWidget);
    });

    test('asserts every invalid combination', () {
      expect(
        () => BwButton(label: '', onPressed: () {}),
        throwsAssertionError,
      );
      expect(
        () => BwButton(
          label: 'Move',
          leadingIcon: Symbols.add_rounded,
          trailingIcon: Symbols.arrow_forward_rounded,
          onPressed: () {},
        ),
        throwsAssertionError,
      );
      expect(
        () => BwButton(
          label: 'Neutral',
          variant: BwButtonVariant.tonal,
          color: BwButtonColor.neutral,
          onPressed: () {},
        ),
        throwsAssertionError,
      );
      expect(
        () => BwButton(
          label: 'Inverse',
          variant: BwButtonVariant.tonal,
          color: BwButtonColor.inverse,
          onPressed: () {},
        ),
        throwsAssertionError,
      );
    });

    testWidgets('maps variants to their Material 3 buttons', (tester) async {
      final expected = <BwButtonVariant, Type>{
        BwButtonVariant.filled: FilledButton,
        BwButtonVariant.tonal: FilledButton,
        BwButtonVariant.outlined: OutlinedButton,
        BwButtonVariant.text: TextButton,
      };
      for (final entry in expected.entries) {
        await tester.pumpBw(
          BwButton(
            label: entry.key.name,
            variant: entry.key,
            onPressed: () {},
          ),
        );
        expect(find.byType(entry.value), findsOneWidget);
      }
    });
  });

  group('BwButton tokens and states', () {
    testWidgets(
      'resolved colors match tokens for every allowed variant and color',
      (tester) async {
        late BuildContext context;
        await tester.pumpBw(
          Builder(
            builder: (buildContext) {
              context = buildContext;
              return const SizedBox.shrink();
            },
          ),
        );

        for (final (variant, color) in _allowedVariantColors) {
          final style = BwButtonStyle.resolve(
            context,
            variant,
            color,
            BwControlSize.lg,
          );
          final colors = context.bw.colors;
          final isFilled = variant == BwButtonVariant.filled;
          final isTonal = variant == BwButtonVariant.tonal;
          final isOutlined = variant == BwButtonVariant.outlined;

          final expectedBackground = switch (variant) {
            BwButtonVariant.filled => switch (color) {
                BwButtonColor.brand => colors.backgroundBrandDefault,
                BwButtonColor.secondary => colors.backgroundSecondaryDefault,
                BwButtonColor.neutral => colors.backgroundNeutralDefault,
                BwButtonColor.error => colors.backgroundErrorDefault,
                BwButtonColor.inverse => colors.backgroundInverseDefault,
              },
            BwButtonVariant.tonal => switch (color) {
                BwButtonColor.brand => colors.backgroundBrandSubtle,
                BwButtonColor.secondary => colors.backgroundSecondarySubtle,
                BwButtonColor.error => colors.backgroundErrorSubtle,
                BwButtonColor.neutral ||
                BwButtonColor.inverse =>
                  colors.backgroundTransparent,
              },
            BwButtonVariant.outlined ||
            BwButtonVariant.text =>
              colors.backgroundTransparent,
          };
          final expectedForeground = switch (variant) {
            BwButtonVariant.filled => switch (color) {
                BwButtonColor.brand => colors.textOnBrand,
                BwButtonColor.secondary => colors.textOnSecondary,
                BwButtonColor.neutral => colors.textNeutralDefault,
                BwButtonColor.error => colors.textOnError,
                BwButtonColor.inverse => colors.textRoleBrand,
              },
            BwButtonVariant.tonal ||
            BwButtonVariant.outlined ||
            BwButtonVariant.text =>
              switch (color) {
                BwButtonColor.brand => colors.textRoleBrand,
                BwButtonColor.secondary => colors.textRoleSecondary,
                BwButtonColor.neutral => colors.textNeutralDefault,
                BwButtonColor.error => colors.textRoleError,
                BwButtonColor.inverse => colors.textOnBrand,
              },
          };
          final expectedIcon = switch (variant) {
            BwButtonVariant.filled => switch (color) {
                BwButtonColor.brand => colors.iconOnBrand,
                BwButtonColor.secondary => colors.iconOnSecondary,
                BwButtonColor.neutral => colors.iconNeutralDefault,
                BwButtonColor.error => colors.iconOnError,
                BwButtonColor.inverse => colors.iconRoleBrand,
              },
            BwButtonVariant.tonal ||
            BwButtonVariant.outlined ||
            BwButtonVariant.text =>
              switch (color) {
                BwButtonColor.brand => colors.iconRoleBrand,
                BwButtonColor.secondary => colors.iconRoleSecondary,
                BwButtonColor.neutral => colors.iconNeutralDefault,
                BwButtonColor.error => colors.iconRoleError,
                BwButtonColor.inverse => colors.iconOnBrand,
              },
          };

          expect(
            style.backgroundColor!.resolve(const <WidgetState>{}),
            expectedBackground,
          );
          expect(
            style.backgroundColor!.resolve(const {WidgetState.disabled}),
            isFilled || isTonal
                ? colors.backgroundNeutralDisabled
                : colors.backgroundTransparent,
          );
          expect(
            style.foregroundColor!.resolve(const <WidgetState>{}),
            expectedForeground,
          );
          expect(
            style.foregroundColor!.resolve(const {WidgetState.disabled}),
            colors.textNeutralDisabled,
          );
          expect(
            style.iconColor!.resolve(const <WidgetState>{}),
            expectedIcon,
          );
          expect(
            style.iconColor!.resolve(const {WidgetState.disabled}),
            colors.iconNeutralDisabled,
          );

          final hoverBackground = style.backgroundColor!.resolve(
            const {WidgetState.hovered},
          );
          final pressedBackground = style.backgroundColor!.resolve(
            const {WidgetState.pressed},
          );
          if (isFilled) {
            expect(
              hoverBackground,
              switch (color) {
                BwButtonColor.brand => colors.backgroundBrandHover,
                BwButtonColor.secondary => colors.backgroundSecondaryHover,
                BwButtonColor.neutral => colors.backgroundNeutralHover,
                BwButtonColor.error => colors.backgroundErrorHover,
                BwButtonColor.inverse => colors.backgroundInverseHover,
              },
            );
            expect(
              pressedBackground,
              switch (color) {
                BwButtonColor.brand => colors.backgroundBrandPressed,
                BwButtonColor.secondary => colors.backgroundSecondaryPressed,
                BwButtonColor.neutral => colors.backgroundNeutralPressed,
                BwButtonColor.error => colors.backgroundErrorPressed,
                BwButtonColor.inverse => colors.backgroundInversePressed,
              },
            );
          } else {
            expect(hoverBackground, expectedBackground);
            expect(pressedBackground, expectedBackground);
          }

          expect(
            style.overlayColor!.resolve(const {WidgetState.hovered}),
            isFilled ? colors.backgroundTransparent : colors.overlayHover,
          );
          expect(
            style.overlayColor!.resolve(const {WidgetState.pressed}),
            isFilled ? colors.backgroundTransparent : colors.overlayPressed,
          );
          expect(
            style.overlayColor!.resolve(const {WidgetState.focused}),
            colors.backgroundTransparent,
          );

          final side = style.side!.resolve(const <WidgetState>{})!;
          final disabledSide =
              style.side!.resolve(const {WidgetState.disabled})!;
          if (isOutlined) {
            expect(side.width, BwBorder.widthDefault);
            expect(
              side.color,
              switch (color) {
                BwButtonColor.brand => colors.borderBrand,
                BwButtonColor.secondary => colors.borderSecondary,
                BwButtonColor.neutral => colors.borderStrong,
                BwButtonColor.error => colors.borderError,
                BwButtonColor.inverse => colors.borderInverse,
              },
            );
            expect(disabledSide.color, colors.borderDisabled);
          } else {
            expect(side, BorderSide.none);
            expect(disabledSide, BorderSide.none);
          }

          if (isTonal) {
            expect(hoverBackground, expectedBackground);
            expect(pressedBackground, expectedBackground);
          }
        }
      },
    );

    testWidgets('uses exact size tokens and grows at 200% text scale', (
      tester,
    ) async {
      late BuildContext context;
      await tester.pumpBw(
        Builder(
          builder: (buildContext) {
            context = buildContext;
            return const SizedBox.shrink();
          },
        ),
      );

      final expectedHeights = {
        BwControlSize.sm: BwSize.controlHeightSm,
        BwControlSize.md: BwSize.controlHeightMd,
        BwControlSize.lg: BwSize.controlHeightLg,
        BwControlSize.xl: BwSize.controlHeightXl,
      };
      for (final entry in expectedHeights.entries) {
        final style = BwButtonStyle.resolve(
          context,
          BwButtonVariant.filled,
          BwButtonColor.brand,
          entry.key,
        );
        expect(
          style.minimumSize!.resolve(const <WidgetState>{})!.height,
          entry.value,
        );
      }

      await tester.pumpBw(
        BwButton(
          label: 'Save changes without clipping',
          size: BwControlSize.sm,
          onPressed: () {},
        ),
        textScaleFactor: 2,
      );
      expect(tester.takeException(), isNull);
      final label = tester.widget<Text>(
        find.byKey(const ValueKey<String>('BwButton.label')),
      );
      expect(label.maxLines, 1);
      expect(label.overflow, TextOverflow.ellipsis);
    });

    testWidgets('honours reduced motion', (tester) async {
      late BuildContext context;
      await tester.pumpWidget(
        MaterialApp(
          theme: BwTabletTheme.light(const Locale('en')),
          home: MediaQuery(
            data: const MediaQueryData(disableAnimations: true),
            child: Builder(
              builder: (buildContext) {
                context = buildContext;
                return const SizedBox.shrink();
              },
            ),
          ),
        ),
      );
      final style = BwButtonStyle.resolve(
        context,
        BwButtonVariant.filled,
        BwButtonColor.brand,
        BwControlSize.lg,
      );
      expect(style.animationDuration, BwDuration.instant);
    });
  });

  group('BwButton behavior and accessibility', () {
    testWidgets(
        'loading blocks presses, keeps size and focus, and announces once', (
      tester,
    ) async {
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      var presses = 0;
      var loading = false;
      late StateSetter setState;

      await tester.pumpBw(
        StatefulBuilder(
          builder: (context, setter) {
            setState = setter;
            return BwButton(
              label: 'Save changes',
              loadingLabel: 'Saving…',
              loading: loading,
              focusNode: focusNode,
              onPressed: () => presses += 1,
            );
          },
        ),
      );
      focusNode.requestFocus();
      await tester.pump();
      final before = tester.getSize(find.byType(BwButton));
      tester.takeAnnouncements();

      setState(() => loading = true);
      await tester.pump();
      final announcements = tester.takeAnnouncements();
      expect(announcements.map((item) => item.message), ['Saving…']);
      expect(tester.getSize(find.byType(BwButton)), before);
      expect(focusNode.hasFocus, isTrue);

      await tester.tap(
        find.byKey(const ValueKey<String>('BwButton.container')),
      );
      await tester.pump();
      expect(presses, 0);

      setState(() {});
      await tester.pump();
      expect(tester.takeAnnouncements(), isEmpty);
      expect(
        find.byKey(const ValueKey<String>('BwButton.spinner')),
        findsOneWidget,
      );
    });

    testWidgets('disabled is not focusable and does not activate',
        (tester) async {
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      await tester.pumpBw(
        BwButton(label: 'Unavailable', focusNode: focusNode, onPressed: null),
      );

      focusNode.requestFocus();
      await tester.pump();
      expect(focusNode.hasFocus, isFalse);
      final button = tester.widget<FilledButton>(find.byType(FilledButton));
      expect(button.onPressed, isNull);
    });

    testWidgets('uses the localized default loading label', (tester) async {
      await tester.pumpBw(
        BwButton(label: 'حفظ', loading: true, onPressed: () {}),
        locale: const Locale('ar'),
      );
      final semantics = tester.getSemantics(
        find.byKey(const ValueKey<String>('BwButton.loading-semantics')),
      );
      expect(semantics.label, 'حفظ');
      expect(semantics.value, 'جارٍ التحميل');
    });

    testWidgets('focus ring appears only in keyboard highlight mode', (
      tester,
    ) async {
      final oldStrategy = FocusManager.instance.highlightStrategy;
      addTearDown(() {
        FocusManager.instance.highlightStrategy = oldStrategy;
      });
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);

      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTraditional;
      await tester.pumpBw(
        BwButton(
          label: 'Focused',
          focusNode: focusNode,
          onPressed: () {},
        ),
      );
      focusNode.requestFocus();
      await tester.pumpAndSettle();
      var ring = tester.widget<AnimatedContainer>(
        find.byKey(const ValueKey<String>('BwButton.focus-ring')),
      );
      expect((ring.decoration! as BoxDecoration).border, isNotNull);

      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTouch;
      await tester.pumpAndSettle();
      ring = tester.widget<AnimatedContainer>(
        find.byKey(const ValueKey<String>('BwButton.focus-ring')),
      );
      expect((ring.decoration! as BoxDecoration).border, isNull);
    });

    testWidgets('directional icons opt into RTL mirroring but add does not', (
      tester,
    ) async {
      await tester.pumpBw(
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            BwButton(
              label: 'Next',
              leadingIcon: Symbols.arrow_forward_rounded,
              onPressed: () {},
            ),
            BwButton(
              label: 'Add',
              leadingIcon: Symbols.add_rounded,
              onPressed: () {},
            ),
          ],
        ),
        locale: const Locale('ar'),
      );

      final icons = tester.widgetList<Icon>(find.byType(Icon)).toList();
      expect(icons[0].icon!.matchTextDirection, isTrue);
      expect(icons[1].icon!.matchTextDirection, isFalse);
      expect(Directionality.of(tester.element(find.byType(BwButton).first)),
          TextDirection.rtl);
    });

    testWidgets('full width uses the parent width', (tester) async {
      await tester.pumpBw(
        SizedBox(
          width: 480,
          child: BwButton(
            label: 'Clock in',
            fullWidth: true,
            onPressed: () {},
          ),
        ),
      );
      expect(tester.getSize(find.byType(BwButton)).width, 480);
    });

    for (final (variant, color) in _allowedVariantColors) {
      testWidgets('${variant.name}/${color.name} meets a11y guidelines', (
        tester,
      ) async {
        await tester.pumpBw(
          Builder(
            builder: (context) => ColoredBox(
              color: color == BwButtonColor.inverse
                  ? context.bw.colors.backgroundBrandDefault
                  : context.bw.colors.backgroundTransparent,
              child: BwButton(
                label: 'Clock in',
                variant: variant,
                color: color,
                onPressed: () {},
              ),
            ),
          ),
        );
        await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
        await expectLater(tester, meetsGuideline(textContrastGuideline));
      });
    }
  });

  group('BwButton visual regression', () {
    for (final brightness in Brightness.values) {
      for (final locale in const [Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name}/${locale.languageCode} variants and sizes',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(1400, 1600));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            await tester.pumpBw(
              const RepaintBoundary(
                key: ValueKey<String>('button-golden'),
                child: _ButtonGoldenMatrix(),
              ),
              brightness: brightness,
              locale: locale,
            );
            await expectLater(
              find.byKey(const ValueKey<String>('button-golden')),
              matchesGoldenFile(
                'goldens/button/button-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test('component source contains no prohibited raw values', () {
    final sources = [
      File('lib/src/components/button/bw_button.dart').readAsStringSync(),
      File('lib/src/components/button/bw_button_style.dart').readAsStringSync(),
    ].join();
    expect(sources, isNot(contains('Color(0x')));
    expect(sources,
        isNot(matches(RegExp(r'EdgeInsets(?:Directional)?\.[^(]+\(\s*\d'))));
    expect(sources,
        isNot(matches(RegExp(r'SizedBox\([^)]*(?:width|height):\s*\d'))));
    expect(sources, isNot(contains('Duration(milliseconds:')));
    expect(sources, isNot(contains('BwPalette')));
  });
}

class _ButtonGoldenMatrix extends StatelessWidget {
  const _ButtonGoldenMatrix();

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: context.bw.colors.backgroundNeutralDefault,
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            for (final (variant, color) in _allowedVariantColors)
              ColoredBox(
                color: color == BwButtonColor.inverse
                    ? context.bw.colors.backgroundBrandDefault
                    : context.bw.colors.backgroundTransparent,
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: BwButton(
                    label: '${variant.name} ${color.name}',
                    variant: variant,
                    color: color,
                    leadingIcon: Symbols.add_rounded,
                    onPressed: _emptyCallback,
                  ),
                ),
              ),
            for (final size in BwControlSize.values)
              Padding(
                padding: const EdgeInsets.all(8),
                child: BwButton(
                  label: 'Size ${size.name}',
                  size: size,
                  trailingIcon: Symbols.arrow_forward_rounded,
                  onPressed: _emptyCallback,
                ),
              ),
          ],
        ),
      ),
    );
  }

  static void _emptyCallback() {}
}
