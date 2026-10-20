import 'dart:io';
import 'dart:ui' show Tristate;

import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:biowave_mobile/src/components/button/bw_button_style.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

void main() {
  final allowedPairs = <(BwButtonVariant, BwButtonColor)>[
    for (final color in BwButtonColor.values) (BwButtonVariant.filled, color),
    for (final color in <BwButtonColor>[
      BwButtonColor.brand,
      BwButtonColor.secondary,
      BwButtonColor.error,
    ])
      (BwButtonVariant.tonal, color),
    for (final color in BwButtonColor.values) (BwButtonVariant.outlined, color),
    for (final color in BwButtonColor.values) (BwButtonVariant.text, color),
  ];

  group('BwButton API', () {
    test('defaults and invalid combinations assert', () {
      final button = BwButton(label: 'Save', onPressed: () {});
      expect(button.variant, BwButtonVariant.filled);
      expect(button.color, BwButtonColor.brand);
      expect(button.size, BwControlSize.lg);
      expect(button.fullWidth, isFalse);
      expect(button.loading, isFalse);
      expect(button.autofocus, isFalse);

      expect(
        () => BwButton(label: '', onPressed: () {}),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwButton(
          label: 'Quiet',
          onPressed: () {},
          variant: BwButtonVariant.tonal,
          color: BwButtonColor.neutral,
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwButton(
          label: 'Both',
          onPressed: () {},
          leadingIcon: Symbols.add_rounded,
          trailingIcon: Symbols.arrow_forward_rounded,
        ),
        throwsA(isA<AssertionError>()),
      );
    });

    testWidgets('Enter and Space activate the focused button', (tester) async {
      var presses = 0;
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      await pumpBw(
        tester,
        BwButton(
          label: 'Save',
          focusNode: focusNode,
          onPressed: () => presses += 1,
        ),
      );

      focusNode.requestFocus();
      FocusManager.instance.applyFocusChangesIfNeeded();
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.sendKeyEvent(LogicalKeyboardKey.space);

      expect(presses, 2);
    });
  });

  group('BwButtonStyle', () {
    for (final brightness in Brightness.values) {
      testWidgets(
        'all token colors resolve in ${brightness.name}',
        (tester) async {
          late BuildContext context;
          await pumpBw(
            tester,
            Builder(
              builder: (builderContext) {
                context = builderContext;
                return const SizedBox.shrink();
              },
            ),
            brightness: brightness,
          );
          final colors = context.bw.colors;

          for (final (variant, color) in allowedPairs) {
            final style = BwButtonStyle.resolve(
              context,
              variant,
              color,
              BwControlSize.lg,
            );
            final background = style.backgroundColor!;
            final foreground = style.foregroundColor!;
            final icon = style.iconColor!;
            final overlay = style.overlayColor!;

            expect(
              background.resolve(<WidgetState>{}),
              _background(colors, variant, color),
              reason: '$variant $color default background',
            );
            expect(
              background.resolve(<WidgetState>{WidgetState.hovered}),
              _background(colors, variant, color, hovered: true),
              reason: '$variant $color hover background',
            );
            expect(
              background.resolve(<WidgetState>{WidgetState.pressed}),
              _background(colors, variant, color, pressed: true),
              reason: '$variant $color pressed background',
            );
            expect(
              background.resolve(<WidgetState>{WidgetState.disabled}),
              variant == BwButtonVariant.filled ||
                      variant == BwButtonVariant.tonal
                  ? colors.backgroundNeutralDisabled
                  : colors.backgroundTransparent,
              reason: '$variant $color disabled background',
            );
            expect(
              foreground.resolve(<WidgetState>{}),
              _foreground(colors, variant, color),
              reason: '$variant $color foreground',
            );
            expect(
              foreground.resolve(<WidgetState>{WidgetState.disabled}),
              colors.textNeutralDisabled,
            );
            expect(
              icon.resolve(<WidgetState>{}),
              _icon(colors, variant, color),
              reason: '$variant $color icon',
            );
            expect(
              icon.resolve(<WidgetState>{WidgetState.disabled}),
              colors.iconNeutralDisabled,
            );
            expect(
              overlay.resolve(<WidgetState>{WidgetState.hovered}),
              variant == BwButtonVariant.filled
                  ? colors.backgroundTransparent
                  : colors.overlayHover,
            );
            expect(
              overlay.resolve(<WidgetState>{WidgetState.pressed}),
              variant == BwButtonVariant.filled
                  ? colors.backgroundTransparent
                  : colors.overlayPressed,
            );
            expect(
              overlay.resolve(<WidgetState>{WidgetState.focused}),
              colors.backgroundTransparent,
            );

            if (variant == BwButtonVariant.outlined) {
              expect(
                style.side!.resolve(<WidgetState>{})!.color,
                _border(colors, color),
              );
              expect(
                style.side!.resolve(<WidgetState>{WidgetState.disabled})!.color,
                colors.borderDisabled,
              );
              expect(
                style.side!.resolve(<WidgetState>{})!.width,
                BwBorder.widthDefault,
              );
            } else {
              expect(style.side, isNull);
            }

            expect(style.splashFactory, NoSplash.splashFactory);
            expect(style.elevation!.resolve(<WidgetState>{}), BwSpacing.none);
          }
        },
      );
    }

    testWidgets('reduced motion uses the instant token', (tester) async {
      late BuildContext context;
      await pumpBw(
        tester,
        Builder(
          builder: (builderContext) {
            context = builderContext;
            return BwButton(label: 'Save', onPressed: () {});
          },
        ),
        reduceMotion: true,
      );

      final style = BwButtonStyle.resolve(
        context,
        BwButtonVariant.filled,
        BwButtonColor.brand,
        BwControlSize.lg,
      );
      expect(context.bw.reduceMotion, isTrue);
      expect(style.animationDuration, BwDuration.instant);
      expect(
        tester.widget<AnimatedSwitcher>(find.byType(AnimatedSwitcher)).duration,
        BwDuration.instant,
      );
    });
  });

  group('layout and focus ring', () {
    final heights = <BwControlSize, double>{
      BwControlSize.sm: BwSize.controlHeightSm,
      BwControlSize.md: BwSize.controlHeightMd,
      BwControlSize.lg: BwSize.controlHeightLg,
      BwControlSize.xl: BwSize.controlHeightXl,
    };

    for (final entry in heights.entries) {
      testWidgets('${entry.key.name} has its exact visible height', (
        tester,
      ) async {
        await pumpBw(
          tester,
          BwButton(
            label: 'Save',
            size: entry.key,
            onPressed: () {},
          ),
        );

        expect(tester.getSize(_visibleMaterial()).height, entry.value);
        expect(
          tester.getSize(find.byType(BwButton)).height,
          greaterThanOrEqualTo(BwLayout.mobile.minTarget),
        );
      });
    }

    testWidgets('full width uses all parent width', (tester) async {
      const parentWidth = 312.0;
      await pumpBw(
        tester,
        SizedBox(
          width: parentWidth,
          child: BwButton(
            label: 'Save',
            fullWidth: true,
            onPressed: () {},
          ),
        ),
      );

      expect(tester.getSize(_visibleMaterial()).width, parentWidth);
    });

    testWidgets('text scale 2 grows sm instead of clipping', (tester) async {
      await pumpBw(
        tester,
        BwButton(
          label: 'Save changes',
          size: BwControlSize.sm,
          onPressed: () {},
        ),
        textScale: 2,
      );

      final containerSize = tester.getSize(_visibleMaterial());
      final labelSize = tester.getSize(find.text('Save changes'));
      expect(containerSize.height, greaterThan(BwSize.controlHeightSm));
      expect(containerSize.height, greaterThanOrEqualTo(labelSize.height));
    });

    for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
      for (final entry in heights.entries) {
        testWidgets(
          '${entry.key.name} ring geometry in ${locale.languageCode}',
          (tester) async {
            final oldStrategy = FocusManager.instance.highlightStrategy;
            FocusManager.instance.highlightStrategy =
                FocusHighlightStrategy.alwaysTraditional;
            addTearDown(() {
              FocusManager.instance.highlightStrategy = oldStrategy;
            });
            final focusNode = FocusNode();
            addTearDown(focusNode.dispose);

            await pumpBw(
              tester,
              BwButton(
                label: locale.languageCode == 'ar' ? 'حفظ' : 'Save',
                size: entry.key,
                focusNode: focusNode,
                onPressed: () {},
              ),
              locale: locale,
            );
            final before = tester.getRect(find.byType(BwButton));
            focusNode.requestFocus();
            FocusManager.instance.applyFocusChangesIfNeeded();
            await tester.pump();

            final containerRect = tester.getRect(_visibleMaterial());
            final ringFinder = find.byKey(
              const ValueKey<String>('BwButton.focus-ring'),
            );
            final ringRect = tester.getRect(ringFinder);
            const inset = BwBorder.focusOffset + BwBorder.widthFocus;
            expect(ringRect, containerRect.inflate(inset));
            expect(tester.getRect(find.byType(BwButton)), before);
            expect(
              before.width,
              containerRect.width < BwLayout.mobile.minTarget
                  ? BwLayout.mobile.minTarget
                  : containerRect.width,
            );
            expect(
              before.height,
              entry.value < BwLayout.mobile.minTarget
                  ? BwLayout.mobile.minTarget
                  : entry.value,
            );

            final decorated = tester.widget<DecoratedBox>(ringFinder);
            final decoration = decorated.decoration as BoxDecoration;
            final border = decoration.border! as Border;
            final radius = decoration.borderRadius! as BorderRadius;
            expect(border.top.width, BwBorder.widthFocus);
            expect(border.top.color,
                BwColors.of(tester.element(ringFinder)).borderFocus);
            expect(
              radius.topLeft.x,
              _radius(entry.key) + inset,
            );
          },
        );
      }
    }

    testWidgets('inverse focus uses inverse border token', (tester) async {
      final oldStrategy = FocusManager.instance.highlightStrategy;
      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTraditional;
      addTearDown(() {
        FocusManager.instance.highlightStrategy = oldStrategy;
      });
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      await pumpBw(
        tester,
        BwButton(
          label: 'Save',
          color: BwButtonColor.inverse,
          focusNode: focusNode,
          onPressed: () {},
        ),
      );
      focusNode.requestFocus();
      FocusManager.instance.applyFocusChangesIfNeeded();
      await tester.pump();

      final finder = find.byKey(
        const ValueKey<String>('BwButton.focus-ring'),
      );
      final decoration =
          tester.widget<DecoratedBox>(finder).decoration as BoxDecoration;
      expect(
        (decoration.border! as Border).top.color,
        BwColors.of(tester.element(finder)).borderInverse,
      );
    });

    testWidgets('ring is immediate in keyboard mode and absent in touch mode', (
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
      await pumpBw(
        tester,
        BwButton(
          label: 'Save',
          focusNode: focusNode,
          onPressed: () {},
        ),
      );
      focusNode.requestFocus();
      FocusManager.instance.applyFocusChangesIfNeeded();
      await tester.pump();
      expect(
        find.byKey(const ValueKey<String>('BwButton.focus-ring')),
        findsOneWidget,
      );
      expect(
        find.descendant(
          of: find.byType(BwButton),
          matching: find.byType(AnimatedOpacity),
        ),
        findsNothing,
      );

      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTouch;
      await tester.pump();
      expect(
        find.byKey(const ValueKey<String>('BwButton.focus-ring')),
        findsNothing,
      );
    });
  });

  group('loading and semantics', () {
    testWidgets('loading keeps size and focus, blocks presses, announces once',
        (
      tester,
    ) async {
      final announcements = <Map<dynamic, dynamic>>[];
      Future<dynamic> handleMessage(dynamic message) async {
        announcements.add(message as Map<dynamic, dynamic>);
      }

      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockDecodedMessageHandler<dynamic>(
        SystemChannels.accessibility,
        handleMessage,
      );
      addTearDown(() {
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
            .setMockDecodedMessageHandler<dynamic>(
          SystemChannels.accessibility,
          null,
        );
      });
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      var loading = false;
      var presses = 0;
      late StateSetter setState;

      await pumpBw(
        tester,
        StatefulBuilder(
          builder: (context, setter) {
            setState = setter;
            return BwButton(
              label: 'Save',
              loading: loading,
              loadingLabel: 'Saving…',
              focusNode: focusNode,
              onPressed: () => presses += 1,
            );
          },
        ),
      );
      focusNode.requestFocus();
      FocusManager.instance.applyFocusChangesIfNeeded();
      await tester.pump();
      final before = tester.getSize(find.byType(BwButton));

      setState(() => loading = true);
      await tester.pump();
      await tester.pump();
      expect(tester.getSize(find.byType(BwButton)), before);
      expect(focusNode.hasFocus, isTrue);
      await tester.tap(find.byType(BwButton));
      await tester.pump();
      expect(presses, 0);
      expect(
        announcements.where((message) => message['type'] == 'announce'),
        hasLength(1),
      );

      setState(() {});
      await tester.pump();
      expect(
        announcements.where((message) => message['type'] == 'announce'),
        hasLength(1),
      );
    });

    testWidgets('loading with null callback remains disabled', (tester) async {
      final semantics = tester.ensureSemantics();
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);
      try {
        await pumpBw(
          tester,
          BwButton(
            label: 'Save',
            loading: true,
            focusNode: focusNode,
            onPressed: null,
          ),
        );

        focusNode.requestFocus();
        FocusManager.instance.applyFocusChangesIfNeeded();
        await tester.pump();
        expect(focusNode.hasFocus, isFalse);
        final node = tester.getSemantics(find.byType(BwButton));
        expect(node.flagsCollection.isEnabled, Tristate.isFalse);
      } finally {
        semantics.dispose();
      }
    });
  });

  group('RTL, localization, and fonts', () {
    testWidgets('pumpBw covers both themes and locales with localizations', (
      tester,
    ) async {
      for (final brightness in Brightness.values) {
        for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
          await pumpBw(
            tester,
            const TextField(),
            brightness: brightness,
            locale: locale,
          );
          expect(find.byType(TextField), findsOneWidget);
          expect(
            Directionality.of(tester.element(find.byType(TextField))),
            locale.languageCode == 'ar' ? TextDirection.rtl : TextDirection.ltr,
          );
        }
      }
    });

    testWidgets('directional icon mirrors in RTL and add does not', (
      tester,
    ) async {
      await pumpBw(
        tester,
        BwButton(
          label: 'التالي',
          trailingIcon: Symbols.arrow_forward_rounded,
          onPressed: () {},
        ),
        locale: const Locale('ar'),
      );
      final directionalIcon = find.byIcon(Symbols.arrow_forward_rounded);
      expect(
        find.descendant(
          of: directionalIcon,
          matching: find.byType(Transform),
        ),
        findsOneWidget,
      );

      await pumpBw(
        tester,
        BwButton(
          label: 'إضافة',
          leadingIcon: Symbols.add_rounded,
          onPressed: () {},
        ),
        locale: const Locale('ar'),
      );
      final addIcon = find.byIcon(Symbols.add_rounded);
      expect(
        find.descendant(of: addIcon, matching: find.byType(Transform)),
        findsNothing,
      );
    });

    testWidgets('real Latin and Arabic fonts differ from Ahem', (tester) async {
      await pumpBw(
        tester,
        const Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
              'MMMM',
              key: ValueKey<String>('inter'),
              style: TextStyle(fontFamily: BwFontFamily.en),
            ),
            Text(
              'MMMM',
              key: ValueKey<String>('ahem-en'),
              style: TextStyle(fontFamily: 'Ahem'),
            ),
            Text(
              'مرحبا',
              key: ValueKey<String>('plex'),
              style: TextStyle(fontFamily: BwFontFamily.ar),
            ),
            Text(
              'مرحبا',
              key: ValueKey<String>('ahem-ar'),
              style: TextStyle(fontFamily: 'Ahem'),
            ),
          ],
        ),
      );

      expect(
        tester.getSize(find.byKey(const ValueKey<String>('inter'))).width,
        isNot(
          tester.getSize(find.byKey(const ValueKey<String>('ahem-en'))).width,
        ),
      );
      expect(
        tester.getSize(find.byKey(const ValueKey<String>('plex'))).width,
        isNot(
          tester.getSize(find.byKey(const ValueKey<String>('ahem-ar'))).width,
        ),
      );
    });
  });

  group('accessibility guidelines', () {
    for (final brightness in Brightness.values) {
      for (final pair in allowedPairs) {
        final (variant, color) = pair;
        testWidgets(
          '${brightness.name} ${variant.name} ${color.name}',
          (tester) async {
            await pumpBw(
              tester,
              Builder(
                builder: (context) => ColoredBox(
                  color: color == BwButtonColor.inverse
                      ? context.bw.colors.surfaceInverse
                      : context.bw.colors.surfacePage,
                  child: BwButton(
                    label: 'Save',
                    variant: variant,
                    color: color,
                    onPressed: () {},
                  ),
                ),
              ),
              brightness: brightness,
            );

            await expectLater(
                tester, meetsGuideline(androidTapTargetGuideline));
            await expectLater(tester, meetsGuideline(textContrastGuideline));
          },
        );
      }
    }
  });

  group('goldens', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} variants and sizes',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(1200, 760));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            const goldenKey = ValueKey<String>('button-golden');
            final label =
                locale.languageCode == 'ar' ? 'إضافة جهاز' : 'Add device';

            await pumpBw(
              tester,
              RepaintBoundary(
                key: goldenKey,
                child: SizedBox(
                  width: 1200,
                  height: 760,
                  child: Builder(
                    builder: (context) => ColoredBox(
                      color: context.bw.colors.surfacePage,
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Wrap(
                          spacing: 12,
                          runSpacing: 12,
                          children: <Widget>[
                            for (final (variant, color) in allowedPairs)
                              ColoredBox(
                                color: color == BwButtonColor.inverse
                                    ? context.bw.colors.surfaceInverse
                                    : context.bw.colors.surfacePage,
                                child: Padding(
                                  padding: const EdgeInsets.all(8),
                                  child: BwButton(
                                    label: label,
                                    variant: variant,
                                    color: color,
                                    leadingIcon: Symbols.add_rounded,
                                    onPressed: () {},
                                  ),
                                ),
                              ),
                            for (final size in BwControlSize.values)
                              BwButton(
                                label: label,
                                size: size,
                                trailingIcon: Symbols.arrow_forward_rounded,
                                onPressed: () {},
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
                'goldens/button/button-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test('component source contains no raw visual values', () {
    final source = <String>[
      'lib/src/common/bw_focus_ring.dart',
      'lib/src/components/button/bw_button.dart',
      'lib/src/components/button/bw_button_style.dart',
    ].map((path) => File(path).readAsStringSync()).join('\n');

    expect(source, isNot(contains('Color(0x')));
    expect(source,
        isNot(matches(RegExp(r'EdgeInsets(?:Directional)?\.[^(]+\(\s*\d'))));
    expect(source,
        isNot(matches(RegExp(r'SizedBox\([^)]*(?:width|height):\s*\d'))));
    expect(source, isNot(contains('Duration(milliseconds:')));
    expect(source, isNot(contains('BwPalette')));
  });
}

Finder _visibleMaterial() => find.descendant(
      of: find.byType(BwButton),
      matching: find.byWidgetPredicate(
        (widget) => widget is Material && widget.type == MaterialType.button,
      ),
    );

double _radius(BwControlSize size) =>
    size == BwControlSize.xl ? BwRadius.xl : BwRadius.md;

Color _background(
  BwColors colors,
  BwButtonVariant variant,
  BwButtonColor color, {
  bool hovered = false,
  bool pressed = false,
}) {
  if (variant == BwButtonVariant.outlined || variant == BwButtonVariant.text) {
    return colors.backgroundTransparent;
  }
  if (variant == BwButtonVariant.tonal) {
    return switch (color) {
      BwButtonColor.brand => colors.backgroundBrandSubtle,
      BwButtonColor.secondary => colors.backgroundSecondarySubtle,
      BwButtonColor.error => colors.backgroundErrorSubtle,
      BwButtonColor.neutral ||
      BwButtonColor.inverse =>
        colors.backgroundTransparent,
    };
  }
  if (pressed) {
    return switch (color) {
      BwButtonColor.brand => colors.backgroundBrandPressed,
      BwButtonColor.secondary => colors.backgroundSecondaryPressed,
      BwButtonColor.neutral => colors.backgroundNeutralPressed,
      BwButtonColor.error => colors.backgroundErrorPressed,
      BwButtonColor.inverse => colors.backgroundInversePressed,
    };
  }
  if (hovered) {
    return switch (color) {
      BwButtonColor.brand => colors.backgroundBrandHover,
      BwButtonColor.secondary => colors.backgroundSecondaryHover,
      BwButtonColor.neutral => colors.backgroundNeutralHover,
      BwButtonColor.error => colors.backgroundErrorHover,
      BwButtonColor.inverse => colors.backgroundInverseHover,
    };
  }
  return switch (color) {
    BwButtonColor.brand => colors.backgroundBrandDefault,
    BwButtonColor.secondary => colors.backgroundSecondaryDefault,
    BwButtonColor.neutral => colors.backgroundNeutralDefault,
    BwButtonColor.error => colors.backgroundErrorDefault,
    BwButtonColor.inverse => colors.backgroundInverseDefault,
  };
}

Color _foreground(
  BwColors colors,
  BwButtonVariant variant,
  BwButtonColor color,
) {
  if (variant == BwButtonVariant.filled) {
    return switch (color) {
      BwButtonColor.brand => colors.textOnBrand,
      BwButtonColor.secondary => colors.textOnSecondary,
      BwButtonColor.neutral => colors.textNeutralDefault,
      BwButtonColor.error => colors.textOnError,
      BwButtonColor.inverse => colors.textRoleBrand,
    };
  }
  return switch (color) {
    BwButtonColor.brand => colors.textRoleBrand,
    BwButtonColor.secondary => colors.textRoleSecondary,
    BwButtonColor.neutral => colors.textNeutralDefault,
    BwButtonColor.error => colors.textRoleError,
    BwButtonColor.inverse => colors.textOnBrand,
  };
}

Color _icon(BwColors colors, BwButtonVariant variant, BwButtonColor color) {
  if (variant == BwButtonVariant.filled) {
    return switch (color) {
      BwButtonColor.brand => colors.iconOnBrand,
      BwButtonColor.secondary => colors.iconOnSecondary,
      BwButtonColor.neutral => colors.iconNeutralDefault,
      BwButtonColor.error => colors.iconOnError,
      BwButtonColor.inverse => colors.iconRoleBrand,
    };
  }
  return switch (color) {
    BwButtonColor.brand => colors.iconRoleBrand,
    BwButtonColor.secondary => colors.iconRoleSecondary,
    BwButtonColor.neutral => colors.iconNeutralDefault,
    BwButtonColor.error => colors.iconRoleError,
    BwButtonColor.inverse => colors.iconOnBrand,
  };
}

Color _border(BwColors colors, BwButtonColor color) => switch (color) {
      BwButtonColor.brand => colors.borderBrand,
      BwButtonColor.secondary => colors.borderSecondary,
      BwButtonColor.neutral => colors.borderStrong,
      BwButtonColor.error => colors.borderError,
      BwButtonColor.inverse => colors.borderInverse,
    };
