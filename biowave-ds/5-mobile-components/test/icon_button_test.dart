import 'dart:io';
import 'dart:ui' as ui;

import 'package:biowave_mobile/biowave_mobile.dart';
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

  group('BwIconButton API', () {
    test('defaults and invalid combinations assert', () {
      final button = BwIconButton(
        icon: Symbols.edit_rounded,
        label: 'Edit device',
        onPressed: () {},
      );

      expect(button.variant, BwButtonVariant.text);
      expect(button.color, BwButtonColor.neutral);
      expect(button.size, BwControlSize.lg);
      expect(button.toggle, isFalse);
      expect(button.selected, isFalse);
      expect(button.tooltip, isTrue);
      expect(button.loading, isFalse);

      expect(
        () => BwIconButton(
          icon: Symbols.edit_rounded,
          label: '',
          onPressed: () {},
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          variant: BwButtonVariant.tonal,
          color: BwButtonColor.neutral,
          onPressed: () {},
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwIconButton(
          icon: Symbols.push_pin_rounded,
          selectedIcon: Symbols.push_pin_rounded,
          label: 'Pin',
          variant: BwButtonVariant.filled,
          toggle: true,
          onPressed: () {},
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwIconButton(
          icon: Symbols.push_pin_rounded,
          label: 'Pin',
          toggle: true,
          onPressed: () {},
        ),
        throwsA(isA<AssertionError>()),
      );
    });

    testWidgets('Enter and Space activate the focused button', (tester) async {
      var presses = 0;
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          onPressed: () => presses += 1,
        ),
      );

      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.sendKeyEvent(LogicalKeyboardKey.space);

      expect(presses, 2);
    });
  });

  group('tokens and selected state', () {
    for (final brightness in Brightness.values) {
      testWidgets('selected tokens resolve in ${brightness.name}',
          (tester) async {
        for (final variant in <BwButtonVariant>[
          BwButtonVariant.text,
          BwButtonVariant.outlined,
        ]) {
          for (final color in BwButtonColor.values) {
            await pumpBw(
              tester,
              BwIconButton(
                icon: Symbols.push_pin_rounded,
                selectedIcon: Symbols.push_pin_rounded,
                label: 'Unpin',
                variant: variant,
                color: color,
                toggle: true,
                selected: true,
                onPressed: () {},
              ),
              brightness: brightness,
            );
            final context = tester.element(find.byType(BwIconButton));
            final colors = context.bw.colors;
            final style =
                tester.widget<IconButton>(find.byType(IconButton)).style!;
            final selectedStates = <WidgetState>{WidgetState.selected};
            final disabledSelectedStates = <WidgetState>{
              WidgetState.disabled,
              WidgetState.selected,
            };

            expect(
              style.backgroundColor!.resolve(selectedStates),
              _selectedBackground(colors, color),
            );
            expect(
              style.iconColor!.resolve(selectedStates),
              _selectedIcon(colors, color),
            );
            expect(
              style.backgroundColor!.resolve(disabledSelectedStates),
              colors.backgroundNeutralDisabled,
            );
            expect(
              style.iconColor!.resolve(disabledSelectedStates),
              colors.iconDisabled,
            );
            expect(
              style.overlayColor!.resolve(<WidgetState>{
                WidgetState.selected,
                WidgetState.hovered,
              }),
              colors.overlayHovered,
            );
            expect(
              style.overlayColor!.resolve(<WidgetState>{
                WidgetState.selected,
                WidgetState.pressed,
              }),
              colors.overlayPressed,
            );
            if (variant == BwButtonVariant.outlined) {
              expect(
                style.side!.resolve(selectedStates),
                BorderSide(
                  width: BwBorder.widthDefault,
                  color: _outlineBorder(colors, color),
                ),
              );
              expect(
                style.side!.resolve(disabledSelectedStates),
                BorderSide(
                  width: BwBorder.widthDefault,
                  color: colors.borderDisabled,
                ),
              );
            } else {
              expect(
                style.side!.resolve(selectedStates),
                BorderSide.none,
              );
            }
          }
        }
      });
    }

    testWidgets('selected glyph is filled and cross-fades from the outline',
        (tester) async {
      var selected = false;
      late StateSetter setState;
      await pumpBw(
        tester,
        StatefulBuilder(
          builder: (context, setter) {
            setState = setter;
            return BwIconButton(
              icon: Symbols.push_pin_rounded,
              selectedIcon: Symbols.push_pin_rounded,
              label: selected ? 'Unpin' : 'Pin',
              toggle: true,
              selected: selected,
              onPressed: () {},
            );
          },
        ),
      );
      final switchFinder = find.descendant(
        of: find.byType(BwIconButton),
        matching: find.byType(AnimatedSwitcher),
      );
      expect(tester.widget<AnimatedSwitcher>(switchFinder).duration,
          BwDuration.sm);
      expect(tester.widget<Icon>(find.byIcon(Symbols.push_pin_rounded)).fill,
          isNull);

      setState(() => selected = true);
      await tester.pump();

      expect(
        tester
            .widgetList<Icon>(find.byIcon(Symbols.push_pin_rounded))
            .any((icon) => icon.fill == 1),
        isTrue,
      );
      expect(
        tester.widget<IconButton>(find.byType(IconButton)).isSelected,
        isTrue,
      );
    });

    testWidgets('reduced motion makes state animation instant', (tester) async {
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.push_pin_rounded,
          selectedIcon: Symbols.push_pin_rounded,
          label: 'Unpin',
          toggle: true,
          selected: true,
          onPressed: () {},
        ),
        reduceMotion: true,
      );

      final iconButton = tester.widget<IconButton>(find.byType(IconButton));
      final switcher = tester.widget<AnimatedSwitcher>(
        find.descendant(
          of: find.byType(BwIconButton),
          matching: find.byType(AnimatedSwitcher),
        ),
      );
      expect(iconButton.style!.animationDuration, BwDuration.instant);
      expect(switcher.duration, BwDuration.instant);
    });
  });

  group('dimensions and target size', () {
    final heights = <BwControlSize, double>{
      BwControlSize.sm: BwSize.controlHeightSm,
      BwControlSize.md: BwSize.controlHeightMd,
      BwControlSize.lg: BwSize.controlHeightLg,
      BwControlSize.xl: BwSize.controlHeightXl,
    };

    for (final entry in heights.entries) {
      testWidgets('${entry.key.name} uses the square size token',
          (tester) async {
        await pumpBw(
          tester,
          BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit device',
            size: entry.key,
            onPressed: () {},
          ),
        );

        final style = tester.widget<IconButton>(find.byType(IconButton)).style!;
        expect(
          style.fixedSize!.resolve(<WidgetState>{}),
          Size.square(entry.value),
        );
        expect(
          tester.getSize(find.byType(BwIconButton)).shortestSide,
          greaterThanOrEqualTo(BwLayout.mobile.minTarget),
        );
      });
    }

    for (final size in <BwControlSize>[BwControlSize.sm, BwControlSize.md]) {
      testWidgets('${size.name} meets the Android tap target guideline',
          (tester) async {
        await pumpBw(
          tester,
          BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit device',
            size: size,
            onPressed: () {},
          ),
        );

        await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
      });
    }
  });

  group('focus ring', () {
    testWidgets('keyboard focus shows the shared focus ring immediately',
        (tester) async {
      final oldStrategy = FocusManager.instance.highlightStrategy;
      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTraditional;
      addTearDown(() {
        FocusManager.instance.highlightStrategy = oldStrategy;
      });
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          onPressed: () {},
        ),
      );

      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();

      expect(
        find.byKey(const ValueKey<String>('BwIconButton.focus-ring')),
        findsOneWidget,
      );
      expect(
        find.descendant(
          of: find.byType(BwIconButton),
          matching: find.byType(AnimatedOpacity),
        ),
        findsNothing,
      );
    });

    testWidgets('inverse focus uses the inverse border token', (tester) async {
      final oldStrategy = FocusManager.instance.highlightStrategy;
      FocusManager.instance.highlightStrategy =
          FocusHighlightStrategy.alwaysTraditional;
      addTearDown(() {
        FocusManager.instance.highlightStrategy = oldStrategy;
      });
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          color: BwButtonColor.inverse,
          onPressed: () {},
        ),
      );

      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();

      final finder =
          find.byKey(const ValueKey<String>('BwIconButton.focus-ring'));
      final decoration =
          tester.widget<DecoratedBox>(finder).decoration as BoxDecoration;
      expect(
        (decoration.border! as Border).top.color,
        BwColors.of(tester.element(finder)).borderInverse,
      );
    });
  });

  group('semantics, tooltip, and loading', () {
    testWidgets('label is read once and toggle state is exposed',
        (tester) async {
      final semantics = tester.ensureSemantics();
      try {
        var presses = 0;
        await pumpBw(
          tester,
          BwIconButton(
            icon: Symbols.push_pin_rounded,
            selectedIcon: Symbols.push_pin_rounded,
            label: 'Unpin',
            toggle: true,
            selected: true,
            onPressed: () => presses += 1,
          ),
        );

        expect(find.bySemanticsLabel('Unpin'), findsOneWidget);
        final nodeBefore = tester.getSemantics(find.byType(BwIconButton));
        expect(nodeBefore.label, 'Unpin');
        expect(nodeBefore.flagsCollection.isButton, isTrue);
        expect(nodeBefore.flagsCollection.isToggled, ui.Tristate.isTrue);
        expect(nodeBefore.flagsCollection.isFocused, ui.Tristate.isFalse);
        expect(
          nodeBefore.getSemanticsData().hasAction(ui.SemanticsAction.tap),
          isTrue,
        );
        expect(
          nodeBefore.getSemanticsData().hasAction(ui.SemanticsAction.focus),
          isTrue,
        );

        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();

        expect(find.bySemanticsLabel('Unpin'), findsOneWidget);
        expect(find.semantics.byLabel('Unpin'), findsOne);
        final nodeAfter = tester.getSemantics(find.byType(BwIconButton));
        expect(nodeAfter.flagsCollection.isFocused, ui.Tristate.isTrue);
        expect(
          nodeAfter.getSemanticsData().hasAction(ui.SemanticsAction.focus),
          isTrue,
        );

        tester.semantics.tap(find.semantics.byLabel('Unpin'));
        await tester.pump();
        expect(presses, 1);
      } finally {
        semantics.dispose();
      }
    });

    testWidgets('tooltip uses the tooltip tokens and can be disabled',
        (tester) async {
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          onPressed: () {},
        ),
      );
      final context = tester.element(find.byType(BwIconButton));
      final colors = context.bw.colors;
      final tooltip = tester.widget<Tooltip>(find.byType(Tooltip));
      final decoration = tooltip.decoration! as BoxDecoration;

      expect(tooltip.excludeFromSemantics, isTrue);
      expect(tooltip.triggerMode, TooltipTriggerMode.longPress);
      expect(tooltip.verticalOffset, BwSpacing.xs);
      expect(tooltip.waitDuration, BwDuration.xl2);
      expect(tooltip.showDuration, BwDuration.md);
      expect(tooltip.exitDuration, BwDuration.sm);
      expect(decoration.color, colors.surfaceInverse);
      expect(
        decoration.borderRadius,
        const BorderRadiusDirectional.all(Radius.circular(BwRadius.sm)),
      );
      expect(tooltip.textStyle!.color, colors.textInverse);

      await tester.longPress(find.byType(IconButton));
      await tester.pump();
      expect(find.text('Edit device'), findsOneWidget);

      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.edit_rounded,
          label: 'Edit device',
          tooltip: false,
          onPressed: () {},
        ),
      );
      expect(find.byType(Tooltip), findsNothing);
    });

    testWidgets('loading keeps focus, blocks presses, and announces once',
        (tester) async {
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
      var loading = false;
      var presses = 0;
      late StateSetter setState;
      await pumpBw(
        tester,
        StatefulBuilder(
          builder: (context, setter) {
            setState = setter;
            return BwIconButton(
              icon: Symbols.edit_rounded,
              label: 'Edit device',
              loading: loading,
              loadingLabel: 'Editing…',
              onPressed: () => presses += 1,
            );
          },
        ),
      );
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      final focusedBefore = FocusManager.instance.primaryFocus;

      setState(() => loading = true);
      await tester.pump();
      await tester.pump();
      expect(find.byKey(const ValueKey<String>('BwIconButton.spinner')),
          findsOneWidget);
      expect(FocusManager.instance.primaryFocus, same(focusedBefore));
      await tester.tap(find.byType(IconButton));
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
      try {
        await pumpBw(
          tester,
          const BwIconButton(
            icon: Symbols.edit_rounded,
            label: 'Edit device',
            loading: true,
            onPressed: null,
          ),
        );

        final node = tester.getSemantics(find.byType(BwIconButton));
        expect(node.flagsCollection.isEnabled, ui.Tristate.isFalse);
      } finally {
        semantics.dispose();
      }
    });
  });

  group('RTL', () {
    testWidgets('directional icon mirrors and close does not', (tester) async {
      await pumpBw(
        tester,
        BwIconButton(
          icon: Symbols.arrow_forward_rounded,
          label: 'التالي',
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
        BwIconButton(
          icon: Symbols.close_rounded,
          label: 'إغلاق',
          onPressed: () {},
        ),
        locale: const Locale('ar'),
      );
      final closeIcon = find.byIcon(Symbols.close_rounded);
      expect(
        find.descendant(of: closeIcon, matching: find.byType(Transform)),
        findsNothing,
      );
    });
  });

  group('accessibility guidelines', () {
    for (final brightness in Brightness.values) {
      testWidgets('${brightness.name} allowed pairs meet contrast guidance',
          (tester) async {
        for (final (variant, color) in allowedPairs) {
          await pumpBw(
            tester,
            Builder(
              builder: (context) => ColoredBox(
                color: color == BwButtonColor.inverse
                    ? context.bw.colors.surfaceInverse
                    : context.bw.colors.surfacePage,
                child: BwIconButton(
                  icon: Symbols.edit_rounded,
                  label: 'Edit device',
                  variant: variant,
                  color: color,
                  onPressed: () {},
                ),
              ),
            ),
            brightness: brightness,
          );

          await expectLater(tester, meetsGuideline(textContrastGuideline));

          if (variant == BwButtonVariant.text ||
              variant == BwButtonVariant.outlined) {
            await pumpBw(
              tester,
              Builder(
                builder: (context) => ColoredBox(
                  color: color == BwButtonColor.inverse
                      ? context.bw.colors.surfaceInverse
                      : context.bw.colors.surfacePage,
                  child: BwIconButton(
                    icon: Symbols.push_pin_rounded,
                    selectedIcon: Symbols.push_pin_rounded,
                    label: 'Unpin',
                    variant: variant,
                    color: color,
                    toggle: true,
                    selected: true,
                    onPressed: () {},
                  ),
                ),
              ),
              brightness: brightness,
            );
            await expectLater(tester, meetsGuideline(textContrastGuideline));
          }
        }
      });
    }
  });

  group('golden render matrices', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} variants, states, sizes',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(640, 480));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            const goldenKey = ValueKey<String>('icon-button-golden');

            await pumpBw(
              tester,
              RepaintBoundary(
                key: goldenKey,
                child: SizedBox(
                  width: 640,
                  height: 480,
                  child: Builder(
                    builder: (context) => ColoredBox(
                      color: context.bw.colors.surfacePage,
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: <Widget>[
                            for (final (variant, color) in allowedPairs)
                              _GoldenCell(
                                inverse: color == BwButtonColor.inverse,
                                child: BwIconButton(
                                  icon: Symbols.edit_rounded,
                                  label: locale.languageCode == 'ar'
                                      ? 'تعديل الجهاز'
                                      : 'Edit device',
                                  variant: variant,
                                  color: color,
                                  onPressed: () {},
                                ),
                              ),
                            for (final variant in <BwButtonVariant>[
                              BwButtonVariant.text,
                              BwButtonVariant.outlined,
                            ])
                              for (final color in BwButtonColor.values)
                                _GoldenCell(
                                  inverse: color == BwButtonColor.inverse,
                                  child: BwIconButton(
                                    icon: Symbols.push_pin_rounded,
                                    selectedIcon: Symbols.push_pin_rounded,
                                    label: locale.languageCode == 'ar'
                                        ? 'إلغاء التثبيت'
                                        : 'Unpin',
                                    variant: variant,
                                    color: color,
                                    toggle: true,
                                    selected: true,
                                    onPressed: () {},
                                  ),
                                ),
                            for (final size in BwControlSize.values)
                              _GoldenCell(
                                child: BwIconButton(
                                  icon: Symbols.arrow_forward_rounded,
                                  label: locale.languageCode == 'ar'
                                      ? 'التالي'
                                      : 'Next',
                                  size: size,
                                  onPressed: () {},
                                ),
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
                'goldens/icon_button/icon-button-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test('component source contains no raw visual values', () {
    final source = File(
      'lib/src/components/icon_button/bw_icon_button.dart',
    ).readAsStringSync();

    expect(source, isNot(contains('Color(0x')));
    expect(
      source,
      isNot(matches(RegExp(r'EdgeInsets(?:Directional)?\.[^(]+\(\s*\d'))),
    );
    expect(
      source,
      isNot(matches(RegExp(r'SizedBox\([^)]*(?:width|height):\s*\d'))),
    );
    expect(source, isNot(contains('Duration(milliseconds:')));
    expect(source, isNot(contains('BwPalette')));
  });
}

class _GoldenCell extends StatelessWidget {
  const _GoldenCell({required this.child, this.inverse = false});

  final Widget child;
  final bool inverse;

  @override
  Widget build(BuildContext context) => ColoredBox(
        color: inverse
            ? context.bw.colors.surfaceInverse
            : context.bw.colors.surfacePage,
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: child,
        ),
      );
}

Color _selectedBackground(BwColors colors, BwButtonColor color) =>
    switch (color) {
      BwButtonColor.brand => colors.backgroundBrandSubtle,
      BwButtonColor.secondary => colors.backgroundSecondarySubtle,
      BwButtonColor.neutral => colors.backgroundNeutralDefault,
      BwButtonColor.error => colors.backgroundErrorSubtle,
      BwButtonColor.inverse => colors.backgroundInverseDefault,
    };

Color _selectedIcon(BwColors colors, BwButtonColor color) => switch (color) {
      BwButtonColor.brand => colors.iconRoleBrand,
      BwButtonColor.secondary => colors.iconRoleSecondary,
      BwButtonColor.neutral => colors.iconDefault,
      BwButtonColor.error => colors.iconRoleError,
      BwButtonColor.inverse => colors.iconRoleBrand,
    };

Color _outlineBorder(BwColors colors, BwButtonColor color) => switch (color) {
      BwButtonColor.brand => colors.borderBrand,
      BwButtonColor.secondary => colors.borderSecondary,
      BwButtonColor.neutral => colors.borderStrong,
      BwButtonColor.error => colors.borderError,
      BwButtonColor.inverse => colors.borderInverse,
    };
