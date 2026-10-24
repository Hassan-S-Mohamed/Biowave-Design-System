import 'dart:io';
import 'dart:ui' as ui;

import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

void main() {
  final allowedPairs = <(BwButtonVariant, BwButtonColor)>[
    for (final color in <BwButtonColor>[
      BwButtonColor.brand,
      BwButtonColor.secondary,
      BwButtonColor.neutral,
    ])
      (BwButtonVariant.filled, color),
    for (final color in <BwButtonColor>[
      BwButtonColor.brand,
      BwButtonColor.secondary,
    ])
      (BwButtonVariant.tonal, color),
    for (final color in <BwButtonColor>[
      BwButtonColor.brand,
      BwButtonColor.secondary,
      BwButtonColor.neutral,
    ])
      (BwButtonVariant.outlined, color),
  ];

  List<BwSplitButtonOption> sampleOptions({
    VoidCallback? onFirst,
    VoidCallback? onSecond,
    String firstLabel = 'Export as Excel',
    String secondLabel = 'Export as CSV',
    IconData? firstIcon,
    bool secondEnabled = true,
  }) =>
      <BwSplitButtonOption>[
        BwSplitButtonOption(
          label: firstLabel,
          icon: firstIcon,
          onSelected: onFirst ?? () {},
        ),
        BwSplitButtonOption(
          label: secondLabel,
          enabled: secondEnabled,
          onSelected: onSecond ?? () {},
        ),
      ];

  group('BwSplitButton API', () {
    test('defaults and invalid combinations assert', () {
      final split = BwSplitButton(
        label: 'Export report',
        onPressed: () {},
        options: sampleOptions(),
      );

      expect(split.variant, BwButtonVariant.filled);
      expect(split.color, BwButtonColor.brand);
      expect(split.size, BwControlSize.lg);
      expect(split.leadingIcon, isNull);
      expect(split.loading, isFalse);
      expect(split.loadingLabel, isNull);
      expect(split.menuLabel, isNull);
      expect(split.options.first.enabled, isTrue);
      expect(split.options.first.icon, isNull);

      expect(
        () => BwSplitButtonOption(label: '', onSelected: () {}),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: '',
          onPressed: () {},
          options: sampleOptions(),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          variant: BwButtonVariant.tonal,
          color: BwButtonColor.neutral,
          onPressed: () {},
          options: sampleOptions(),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          variant: BwButtonVariant.text,
          onPressed: () {},
          options: sampleOptions(),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          color: BwButtonColor.error,
          onPressed: () {},
          options: sampleOptions(),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          color: BwButtonColor.inverse,
          onPressed: () {},
          options: sampleOptions(),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: <BwSplitButtonOption>[
            BwSplitButtonOption(label: 'Only one', onSelected: () {}),
          ],
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: <BwSplitButtonOption>[
            for (var i = 0; i < 6; i++)
              BwSplitButtonOption(label: 'Option $i', onSelected: () {}),
          ],
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: <BwSplitButtonOption>[
            BwSplitButtonOption(label: 'Export report', onSelected: () {}),
            BwSplitButtonOption(label: 'Export as CSV', onSelected: () {}),
          ],
        ),
        throwsA(isA<AssertionError>()),
      );
    });
  });

  group('dimensions, segment radii, and tokens', () {
    for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
      testWidgets(
        'segment corner radii and gap resolve in ${locale.languageCode}',
        (tester) async {
          final isRtl = locale.languageCode == 'ar';
          for (final (variant, color) in allowedPairs) {
            for (final size in BwControlSize.values) {
              await pumpBw(
                tester,
                BwSplitButton(
                  key: ValueKey<String>(
                    '${locale.languageCode}-${variant.name}-${color.name}-${size.name}',
                  ),
                  label: isRtl ? 'تصدير التقرير' : 'Export report',
                  variant: variant,
                  color: color,
                  size: size,
                  onPressed: () {},
                  options: <BwSplitButtonOption>[
                    BwSplitButtonOption(
                      label: isRtl ? 'تصدير بصيغة PDF' : 'Export as PDF',
                      onSelected: () {},
                    ),
                    BwSplitButtonOption(
                      label: isRtl ? 'تصدير بصيغة CSV' : 'Export as CSV',
                      onSelected: () {},
                    ),
                  ],
                ),
                locale: locale,
              );

              final gapBox = tester.widget<SizedBox>(
                find.byKey(const ValueKey<String>('gap')),
              );
              expect(gapBox.width, BwSpacing.xxs);

              final outerRadius =
                  size == BwControlSize.xl ? BwRadius.xl : BwRadius.md;
              const innerRadius = BwRadius.xs;
              final direction = isRtl ? TextDirection.rtl : TextDirection.ltr;

              final primaryMaterial = tester.widget<Material>(
                find.descendant(
                  of: find.byKey(const ValueKey<String>('primary-action')),
                  matching: find.byWidgetPredicate(
                    (w) => w is Material && w.type == MaterialType.button,
                  ),
                ),
              );
              final triggerStyle = tester
                  .widget<IconButton>(
                    find.descendant(
                      of: find.byKey(const ValueKey<String>('menu-trigger')),
                      matching: find.byType(IconButton),
                    ),
                  )
                  .style!;

              final primaryShape =
                  primaryMaterial.shape! as RoundedRectangleBorder;
              final triggerShape = triggerStyle.shape!.resolve(<WidgetState>{})!
                  as RoundedRectangleBorder;

              final primaryResolved =
                  primaryShape.borderRadius.resolve(direction);
              final triggerResolved =
                  triggerShape.borderRadius.resolve(direction);

              if (!isRtl) {
                expect(primaryResolved.topLeft.x, outerRadius);
                expect(primaryResolved.bottomLeft.x, outerRadius);
                expect(primaryResolved.topRight.x, innerRadius);
                expect(primaryResolved.bottomRight.x, innerRadius);

                expect(triggerResolved.topLeft.x, innerRadius);
                expect(triggerResolved.bottomLeft.x, innerRadius);
                expect(triggerResolved.topRight.x, outerRadius);
                expect(triggerResolved.bottomRight.x, outerRadius);
              } else {
                expect(primaryResolved.topRight.x, outerRadius);
                expect(primaryResolved.bottomRight.x, outerRadius);
                expect(primaryResolved.topLeft.x, innerRadius);
                expect(primaryResolved.bottomLeft.x, innerRadius);

                expect(triggerResolved.topRight.x, innerRadius);
                expect(triggerResolved.bottomRight.x, innerRadius);
                expect(triggerResolved.topLeft.x, outerRadius);
                expect(triggerResolved.bottomLeft.x, outerRadius);
              }

              expect(
                tester
                    .getSize(
                      find.byKey(const ValueKey<String>('primary-action')),
                    )
                    .height,
                greaterThanOrEqualTo(BwLayout.mobile.minTarget),
              );
              expect(
                tester
                    .getSize(find.byKey(const ValueKey<String>('menu-trigger')))
                    .shortestSide,
                greaterThanOrEqualTo(BwLayout.mobile.minTarget),
              );
            }
          }
        },
      );
    }

    for (final brightness in Brightness.values) {
      testWidgets(
        'expanded trigger forces WidgetState.pressed and menu uses B2/B3 tokens in ${brightness.name}',
        (tester) async {
          for (final (variant, color) in allowedPairs) {
            await pumpBw(
              tester,
              BwSplitButton(
                key: ValueKey<String>(
                  'tokens-${brightness.name}-${variant.name}-${color.name}',
                ),
                label: 'Export report',
                variant: variant,
                color: color,
                onPressed: () {},
                options: sampleOptions(
                  firstIcon: Symbols.table_rows_rounded,
                  secondEnabled: false,
                ),
              ),
              brightness: brightness,
            );

            await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
            await tester.pumpAndSettle();

            final context = tester.element(find.byType(BwSplitButton));
            final colors = context.bw.colors;
            final triggerButton = tester.widget<IconButton>(
              find.descendant(
                of: find.byKey(const ValueKey<String>('menu-trigger')),
                matching: find.byType(IconButton),
              ),
            );
            expect(
              triggerButton.statesController!.value,
              contains(WidgetState.pressed),
            );

            final triggerStyle = triggerButton.style!;
            if (variant == BwButtonVariant.filled) {
              final expectedPressed = switch (color) {
                BwButtonColor.brand => colors.backgroundBrandPressed,
                BwButtonColor.secondary => colors.backgroundSecondaryPressed,
                BwButtonColor.neutral => colors.backgroundNeutralPressed,
                BwButtonColor.error => colors.backgroundErrorPressed,
                BwButtonColor.inverse => colors.backgroundInversePressed,
              };
              expect(
                triggerStyle.backgroundColor!.resolve(
                  triggerButton.statesController!.value,
                ),
                expectedPressed,
              );
            } else {
              expect(
                triggerStyle.overlayColor!.resolve(
                  triggerButton.statesController!.value,
                ),
                colors.overlayPressed,
              );
            }

            final menuAnchor = tester.widget<MenuAnchor>(
              find.byKey(const ValueKey<String>('menu')),
            );
            expect(menuAnchor.clipBehavior, Clip.none);
            final menuStyle = menuAnchor.style!;
            expect(
              menuStyle.backgroundColor!.resolve(<WidgetState>{}),
              colors.backgroundTransparent,
            );
            expect(
              menuStyle.shadowColor!.resolve(<WidgetState>{}),
              colors.backgroundTransparent,
            );
            expect(
              menuStyle.surfaceTintColor!.resolve(<WidgetState>{}),
              colors.backgroundTransparent,
            );
            final menuShape = menuStyle.shape!.resolve(<WidgetState>{})!
                as RoundedRectangleBorder;
            expect(
              menuShape.borderRadius.resolve(TextDirection.ltr),
              const BorderRadius.all(Radius.circular(BwRadius.lg)),
            );

            final surfaceBox = tester.widget<DecoratedBox>(
              find.descendant(
                of: find.byKey(const ValueKey<String>('menu')),
                matching: find.byType(DecoratedBox),
              ).first,
            );
            final surfaceDecoration = surfaceBox.decoration as BoxDecoration;
            expect(surfaceDecoration.color, colors.surfaceRaised);
            expect(
              surfaceDecoration.boxShadow,
              equals(context.bw.elevation.elevation3),
            );
            expect(
              surfaceDecoration.borderRadius,
              const BorderRadiusDirectional.all(Radius.circular(BwRadius.lg)),
            );

            final firstItem = tester.widget<MenuItemButton>(
              find.descendant(
                of: find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
                matching: find.byType(MenuItemButton),
              ),
            );
            final itemStyle = firstItem.style!;
            expect(
              itemStyle.textStyle!.resolve(<WidgetState>{}),
              context.bw.text.bodyMd,
            );
            expect(
              itemStyle.foregroundColor!.resolve(<WidgetState>{}),
              colors.textNeutralDefault,
            );
            expect(
              itemStyle.foregroundColor!.resolve(<WidgetState>{
                WidgetState.disabled,
              }),
              colors.textNeutralDisabled,
            );
            expect(
              itemStyle.iconColor!.resolve(<WidgetState>{}),
              colors.iconNeutralSubtle,
            );
            expect(
              itemStyle.iconColor!.resolve(<WidgetState>{WidgetState.disabled}),
              colors.iconNeutralDisabled,
            );
            expect(
              itemStyle.overlayColor!.resolve(<WidgetState>{
                WidgetState.hovered,
              }),
              colors.overlayHover,
            );
            expect(
              itemStyle.overlayColor!.resolve(<WidgetState>{
                WidgetState.pressed,
              }),
              colors.overlayPressed,
            );
            expect(
              itemStyle.overlayColor!.resolve(<WidgetState>{
                WidgetState.focused,
              }),
              colors.overlayHover,
            );
            expect(
              itemStyle.side!.resolve(<WidgetState>{WidgetState.focused}),
              BorderSide(
                width: BwBorder.widthFocus,
                color: colors.borderFocus,
              ),
            );
          }
        },
      );
    }
  });

  group('states, transitions, and reduced motion', () {
    testWidgets('chevron rotates with B4 open/close durations and curves',
        (tester) async {
      await pumpBw(
        tester,
        BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: sampleOptions(),
        ),
      );

      final chevronFinder = find.descendant(
        of: find.byKey(const ValueKey<String>('menu-trigger')),
        matching: find.byType(AnimatedRotation),
      );
      final closedRotation = tester.widget<AnimatedRotation>(chevronFinder);
      expect(closedRotation.turns, 0);
      expect(closedRotation.duration, BwDuration.sm);
      expect(closedRotation.curve, BwEasing.standardAccelerate);

      await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
      await tester.pump();

      final openRotation = tester.widget<AnimatedRotation>(chevronFinder);
      expect(openRotation.turns, BwSplitButton.chevronHalfTurn);
      expect(openRotation.duration, BwDuration.md);
      expect(openRotation.curve, BwEasing.standardDecelerate);

      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pump();

      final closingRotation = tester.widget<AnimatedRotation>(chevronFinder);
      expect(closingRotation.turns, 0);
      expect(closingRotation.duration, BwDuration.sm);
      expect(closingRotation.curve, BwEasing.standardAccelerate);
    });

    testWidgets(
        'reduced motion makes chevron and menu item transitions instant',
        (tester) async {
      await pumpBw(
        tester,
        BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: sampleOptions(),
        ),
        reduceMotion: true,
      );

      final chevronFinder = find.descendant(
        of: find.byKey(const ValueKey<String>('menu-trigger')),
        matching: find.byType(AnimatedRotation),
      );
      expect(
        tester.widget<AnimatedRotation>(chevronFinder).duration,
        BwDuration.instant,
      );
      expect(
        tester.widget<MenuAnchor>(find.byType(MenuAnchor)).animated,
        isFalse,
      );

      await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
      await tester.pump();

      expect(
        tester.widget<AnimatedRotation>(chevronFinder).duration,
        BwDuration.instant,
      );
      final firstItem = tester.widget<MenuItemButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
          matching: find.byType(MenuItemButton),
        ),
      );
      expect(firstItem.style!.animationDuration, BwDuration.instant);
    });
  });

  group('open/close, keyboard, and focus', () {
    testWidgets('opens and closes by tap, runs option once, and returns focus',
        (tester) async {
      var primaryCount = 0;
      var excelCount = 0;
      var csvCount = 0;

      await pumpBw(
        tester,
        BwSplitButton(
          label: 'Export report',
          leadingIcon: Symbols.download_rounded,
          onPressed: () => primaryCount += 1,
          options: sampleOptions(
            onFirst: () => excelCount += 1,
            onSecond: () => csvCount += 1,
            firstIcon: Symbols.table_rows_rounded,
          ),
        ),
      );

      await tester.tap(find.byKey(const ValueKey<String>('primary-action')));
      await tester.pump();
      expect(primaryCount, 1);

      await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
      await tester.pumpAndSettle();
      expect(find.text('Export as Excel'), findsOneWidget);
      expect(find.text('Export as CSV'), findsOneWidget);

      await tester.tap(find.text('Export as Excel'));
      await tester.pumpAndSettle();

      expect(excelCount, 1);
      expect(csvCount, 0);
      expect(find.text('Export as Excel'), findsNothing);

      final triggerIconButton = tester.widget<IconButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('menu-trigger')),
          matching: find.byType(IconButton),
        ),
      );
      expect(triggerIconButton.focusNode!.hasFocus, isTrue);
    });

    testWidgets('menu geometry and end alignment in en and ar', (tester) async {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        await pumpBw(
          tester,
          BwSplitButton(
            key: ValueKey<String>('split-${locale.languageCode}'),
            label: locale.languageCode == 'ar' ? 'تصدير' : 'Export',
            onPressed: () {},
            options: <BwSplitButtonOption>[
              BwSplitButtonOption(
                label: locale.languageCode == 'ar'
                    ? 'تصدير التقرير الكامل بصيغة PDF'
                    : 'Export full detailed report as PDF',
                onSelected: () {},
              ),
              BwSplitButtonOption(
                label: locale.languageCode == 'ar'
                    ? 'تصدير بصيغة CSV'
                    : 'Export as CSV',
                onSelected: () {},
              ),
            ],
          ),
          locale: locale,
        );
        await tester.pumpAndSettle();

        final primaryRect = tester.getRect(
          find.byKey(const ValueKey<String>('primary-action')),
        );
        final triggerRect = tester.getRect(
          find.byKey(const ValueKey<String>('menu-trigger')),
        );
        if (locale.languageCode == 'ar') {
          expect(primaryRect.left, greaterThan(triggerRect.right));
        } else {
          expect(triggerRect.left, greaterThan(primaryRect.right));
        }

        await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
        await tester.pumpAndSettle();

        final containerRect = tester.getRect(
          find.byKey(const ValueKey<String>('container')),
        );
        final itemRect = tester.getRect(
          find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
        );
        expect(itemRect.top, closeTo(containerRect.bottom + BwSpacing.xs, 1.0));
        if (locale.languageCode == 'ar') {
          expect(itemRect.left, closeTo(containerRect.left, 1.0));
        } else {
          expect(itemRect.right, closeTo(containerRect.right, 1.0));
        }

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
      }
    });

    testWidgets(
      'keyboard navigation: two focus stops, Enter/Space/ArrowDown/ArrowUp/Home/End/Esc',
      (tester) async {
        var primaryCount = 0;
        var firstCount = 0;
        var secondCount = 0;
        var thirdCount = 0;

        await pumpBw(
          tester,
          BwSplitButton(
            label: 'Export report',
            onPressed: () => primaryCount += 1,
            options: <BwSplitButtonOption>[
              BwSplitButtonOption(
                label: 'Export as Excel',
                onSelected: () => firstCount += 1,
              ),
              BwSplitButtonOption(
                label: 'Export as CSV',
                onSelected: () => secondCount += 1,
              ),
              BwSplitButtonOption(
                label: 'Export as JSON',
                onSelected: () => thirdCount += 1,
              ),
            ],
          ),
        );

        final primaryButton = tester.widget<FilledButton>(
          find.descendant(
            of: find.byKey(const ValueKey<String>('primary-action')),
            matching: find.byType(FilledButton),
          ),
        );
        final triggerButton = tester.widget<IconButton>(
          find.descendant(
            of: find.byKey(const ValueKey<String>('menu-trigger')),
            matching: find.byType(IconButton),
          ),
        );

        // First Tab -> primary-action
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(primaryButton.focusNode!.hasFocus, isTrue);
        expect(triggerButton.focusNode!.hasFocus, isFalse);

        await tester.sendKeyEvent(LogicalKeyboardKey.enter);
        await tester.pump();
        expect(primaryCount, 1);

        // Second Tab -> menu-trigger
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(primaryButton.focusNode!.hasFocus, isFalse);
        expect(triggerButton.focusNode!.hasFocus, isTrue);

        // Enter opens menu and focuses first option
        await tester.sendKeyEvent(LogicalKeyboardKey.enter);
        await tester.pumpAndSettle();
        expect(find.text('Export as Excel'), findsOneWidget);
        final firstOption = tester.widget<MenuItemButton>(
          find.descendant(
            of: find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
            matching: find.byType(MenuItemButton),
          ),
        );
        final lastOption = tester.widget<MenuItemButton>(
          find.descendant(
            of: find.byKey(const ValueKey<String>('BwSplitButton.option.2')),
            matching: find.byType(MenuItemButton),
          ),
        );
        expect(firstOption.focusNode!.hasFocus, isTrue);

        // End moves to last option; Home moves back to first option
        await tester.sendKeyEvent(LogicalKeyboardKey.end);
        await tester.pump();
        expect(lastOption.focusNode!.hasFocus, isTrue);

        await tester.sendKeyEvent(LogicalKeyboardKey.home);
        await tester.pump();
        expect(firstOption.focusNode!.hasFocus, isTrue);

        // Escape closes menu and returns focus to trigger
        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
        expect(find.text('Export as Excel'), findsNothing);
        expect(triggerButton.focusNode!.hasFocus, isTrue);

        // ArrowUp opens menu and focuses last option
        await tester.sendKeyEvent(LogicalKeyboardKey.arrowUp);
        await tester.pumpAndSettle();
        expect(
          tester
              .widget<MenuItemButton>(
                find.descendant(
                  of: find.byKey(
                    const ValueKey<String>('BwSplitButton.option.2'),
                  ),
                  matching: find.byType(MenuItemButton),
                ),
              )
              .focusNode!
              .hasFocus,
          isTrue,
        );
        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();

        // ArrowDown opens menu and focuses first item; ArrowDown moves to second; Space selects
        await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
        await tester.pumpAndSettle();
        await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
        await tester.pump();
        await tester.sendKeyEvent(LogicalKeyboardKey.space);
        await tester.pumpAndSettle();

        expect(firstCount, 0);
        expect(secondCount, 1);
        expect(thirdCount, 0);
        expect(find.text('Export as CSV'), findsNothing);
        expect(triggerButton.focusNode!.hasFocus, isTrue);
      },
    );

    testWidgets('Tab and Shift+Tab close the open menu and move focus on', (
      tester,
    ) async {
      final trailingFocusNode = FocusNode(debugLabel: 'trailing');
      addTearDown(trailingFocusNode.dispose);

      await pumpBw(
        tester,
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            BwSplitButton(
              label: 'Export report',
              onPressed: () {},
              options: sampleOptions(),
            ),
            ElevatedButton(
              focusNode: trailingFocusNode,
              onPressed: () {},
              child: const Text('After'),
            ),
          ],
        ),
      );

      // Tab to primary, then Tab to trigger:
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();

      // Enter opens menu and focuses first option:
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      expect(find.text('Export as Excel'), findsOneWidget);

      // Tab closes the menu and moves focus to the trailing button:
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pumpAndSettle();
      expect(find.text('Export as Excel'), findsNothing);
      expect(trailingFocusNode.hasFocus, isTrue);

      // Shift+Tab back to trigger:
      await tester.sendKeyDownEvent(LogicalKeyboardKey.shiftLeft);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.sendKeyUpEvent(LogicalKeyboardKey.shiftLeft);
      await tester.pump();

      // Enter opens menu again:
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      expect(find.text('Export as Excel'), findsOneWidget);

      // Shift+Tab closes menu and moves focus back to primary:
      await tester.sendKeyDownEvent(LogicalKeyboardKey.shiftLeft);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.sendKeyUpEvent(LogicalKeyboardKey.shiftLeft);
      await tester.pumpAndSettle();
      expect(find.text('Export as Excel'), findsNothing);
      final primaryButton = tester.widget<FilledButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('primary-action')),
          matching: find.byType(FilledButton),
        ),
      );
      expect(primaryButton.focusNode!.hasFocus, isTrue);
    });

    testWidgets('arrow keys wrap around enabled options in open menu', (
      tester,
    ) async {
      await pumpBw(
        tester,
        BwSplitButton(
          label: 'Export report',
          onPressed: () {},
          options: <BwSplitButtonOption>[
            BwSplitButtonOption(
              label: 'First',
              onSelected: () {},
            ),
            BwSplitButtonOption(
              label: 'Disabled',
              enabled: false,
              onSelected: () {},
            ),
            BwSplitButtonOption(
              label: 'Last',
              onSelected: () {},
            ),
          ],
        ),
      );

      await tester.tap(find.byKey(const ValueKey<String>('menu-trigger')));
      await tester.pumpAndSettle();

      final firstItem = tester.widget<MenuItemButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
          matching: find.byType(MenuItemButton),
        ),
      );
      final lastItem = tester.widget<MenuItemButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('BwSplitButton.option.2')),
          matching: find.byType(MenuItemButton),
        ),
      );

      firstItem.focusNode!.requestFocus();
      await tester.pump();
      expect(firstItem.focusNode!.hasFocus, isTrue);

      // ArrowUp on first option wraps to last option (skipping disabled):
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowUp);
      await tester.pump();
      expect(lastItem.focusNode!.hasFocus, isTrue);

      // ArrowDown on last option wraps back to first option:
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
      await tester.pump();
      expect(firstItem.focusNode!.hasFocus, isTrue);
    });
  });

  group('semantics, loading, and RTL', () {
    testWidgets(
      'exposes container semantics, single labelled button nodes with tap/focus, and toggles expanded',
      (tester) async {
        final semantics = tester.ensureSemantics();
        try {
          var primaryPresses = 0;
          var firstOptionSelections = 0;
          await pumpBw(
            tester,
            BwSplitButton(
              label: 'Export report',
              onPressed: () => primaryPresses += 1,
              options: sampleOptions(
                onFirst: () => firstOptionSelections += 1,
              ),
            ),
          );

          final containerFinder =
              find.byKey(const ValueKey<String>('container'));
          final primaryFinder =
              find.byKey(const ValueKey<String>('primary-action'));
          final triggerFinder =
              find.byKey(const ValueKey<String>('menu-trigger'));

          expect(tester.getSemantics(containerFinder).label, 'Export report');

          final primaryNodeBefore = tester.getSemantics(primaryFinder);
          expect(primaryNodeBefore.label, 'Export report');
          expect(primaryNodeBefore.flagsCollection.isButton, isTrue);
          expect(
            primaryNodeBefore.flagsCollection.isFocused,
            ui.Tristate.isFalse,
          );
          expect(
            primaryNodeBefore
                .getSemanticsData()
                .hasAction(ui.SemanticsAction.tap),
            isTrue,
          );
          expect(
            primaryNodeBefore
                .getSemanticsData()
                .hasAction(ui.SemanticsAction.focus),
            isTrue,
          );

          final triggerNodeBefore = tester.getSemantics(triggerFinder);
          expect(triggerNodeBefore.label, 'More options for Export report');
          expect(triggerNodeBefore.flagsCollection.isButton, isTrue);
          expect(
            triggerNodeBefore.flagsCollection.isExpanded,
            ui.Tristate.isFalse,
          );
          expect(
            triggerNodeBefore.flagsCollection.isFocused,
            ui.Tristate.isFalse,
          );
          expect(
            triggerNodeBefore
                .getSemanticsData()
                .hasAction(ui.SemanticsAction.tap),
            isTrue,
          );
          expect(
            triggerNodeBefore
                .getSemanticsData()
                .hasAction(ui.SemanticsAction.focus),
            isTrue,
          );

          // Tab 1 -> primary-action isFocused
          await tester.sendKeyEvent(LogicalKeyboardKey.tab);
          await tester.pump();
          expect(
            tester.getSemantics(primaryFinder).flagsCollection.isFocused,
            ui.Tristate.isTrue,
          );

          // Tab 2 -> menu-trigger isFocused
          await tester.sendKeyEvent(LogicalKeyboardKey.tab);
          await tester.pump();
          expect(
            tester.getSemantics(primaryFinder).flagsCollection.isFocused,
            ui.Tristate.isFalse,
          );
          expect(
            tester.getSemantics(triggerFinder).flagsCollection.isFocused,
            ui.Tristate.isTrue,
          );

          // Semantics tap on primary-action
          final primarySemantics = find.semantics.byPredicate(
            (node) =>
                node.label == 'Export report' && node.flagsCollection.isButton,
          );
          expect(primarySemantics, findsOne);
          tester.semantics.tap(primarySemantics);
          await tester.pump();
          expect(primaryPresses, 1);

          // Semantics tap on menu-trigger opens menu and toggles expanded to true
          expect(
            find.semantics.byLabel('More options for Export report'),
            findsOne,
          );
          tester.semantics.tap(
            find.semantics.byLabel('More options for Export report'),
          );
          await tester.pumpAndSettle();

          expect(
            tester.getSemantics(triggerFinder).flagsCollection.isExpanded,
            ui.Tristate.isTrue,
          );

          // Open menu item exposes one labelled semantics node with tap/focus
          final optionSemantics = find.semantics.byLabel('Export as Excel');
          expect(optionSemantics, findsOne);
          final optionNode = tester.getSemantics(
            find.byKey(const ValueKey<String>('BwSplitButton.option.0')),
          );
          expect(optionNode.flagsCollection.isButton, isTrue);
          expect(optionNode.flagsCollection.isFocused, ui.Tristate.isTrue);
          expect(
            optionNode.getSemanticsData().hasAction(ui.SemanticsAction.tap),
            isTrue,
          );
          expect(
            optionNode.getSemanticsData().hasAction(ui.SemanticsAction.focus),
            isTrue,
          );

          tester.semantics.tap(optionSemantics);
          await tester.pumpAndSettle();
          expect(firstOptionSelections, 1);
          expect(
            tester.getSemantics(triggerFinder).flagsCollection.isExpanded,
            ui.Tristate.isFalse,
          );
        } finally {
          semantics.dispose();
        }
      },
    );

    testWidgets(
      'Arabic default menuLabel and RTL icon mirroring follow B5',
      (tester) async {
        final semantics = tester.ensureSemantics();
        try {
          await pumpBw(
            tester,
            BwSplitButton(
              label: 'موافقة',
              leadingIcon: Symbols.arrow_forward_rounded,
              onPressed: () {},
              options: <BwSplitButtonOption>[
                BwSplitButtonOption(
                  label: 'موافقة مع ملاحظة',
                  onSelected: () {},
                ),
                BwSplitButtonOption(
                  label: 'موافقة للكل',
                  onSelected: () {},
                ),
              ],
            ),
            locale: const Locale('ar'),
          );

          expect(find.semantics.byLabel('خيارات أخرى لـموافقة'), findsOne);

          final directionalIcon = find.byIcon(Symbols.arrow_forward_rounded);
          expect(
            find.descendant(
              of: directionalIcon,
              matching: find.byType(Transform),
            ),
            findsOneWidget,
          );

          final chevronIcon = find.byKey(
            const ValueKey<String>('BwIcon.glyph'),
          );
          expect(
            find.descendant(
              of: chevronIcon,
              matching: find.byType(Transform),
            ),
            findsNothing,
          );
        } finally {
          semantics.dispose();
        }
      },
    );

    testWidgets(
      'loading disables trigger, keeps focus on primary action, and closes open menu',
      (tester) async {
        final semantics = tester.ensureSemantics();
        try {
          var loading = false;
          late StateSetter setState;

          await pumpBw(
            tester,
            StatefulBuilder(
              builder: (context, setter) {
                setState = setter;
                return BwSplitButton(
                  label: 'Export report',
                  loading: loading,
                  loadingLabel: 'Exporting…',
                  onPressed: () {},
                  options: sampleOptions(),
                );
              },
            ),
          );

          await tester.sendKeyEvent(LogicalKeyboardKey.tab);
          await tester.pump();
          final primaryButton = tester.widget<FilledButton>(
            find.descendant(
              of: find.byKey(const ValueKey<String>('primary-action')),
              matching: find.byType(FilledButton),
            ),
          );
          expect(primaryButton.focusNode!.hasFocus, isTrue);

          setState(() => loading = true);
          await tester.pump();
          await tester.pump();

          expect(
            find.byKey(const ValueKey<String>('BwButton.spinner')),
            findsOneWidget,
          );
          expect(primaryButton.focusNode!.hasFocus, isTrue);
          final triggerNode = tester.getSemantics(
            find.byKey(const ValueKey<String>('menu-trigger')),
          );
          expect(triggerNode.flagsCollection.isEnabled, ui.Tristate.isFalse);
        } finally {
          semantics.dispose();
        }
      },
    );

    testWidgets('null onPressed disables both parts', (tester) async {
      final semantics = tester.ensureSemantics();
      try {
        await pumpBw(
          tester,
          BwSplitButton(
            label: 'Export report',
            onPressed: null,
            options: sampleOptions(),
          ),
        );

        expect(
          tester
              .getSemantics(find.byKey(const ValueKey<String>('primary-action')))
              .flagsCollection
              .isEnabled,
          ui.Tristate.isFalse,
        );
        expect(
          tester
              .getSemantics(find.byKey(const ValueKey<String>('menu-trigger')))
              .flagsCollection
              .isEnabled,
          ui.Tristate.isFalse,
        );
      } finally {
        semantics.dispose();
      }
    });
  });

  group('accessibility guidelines', () {
    for (final brightness in Brightness.values) {
      testWidgets(
        '${brightness.name} allowed pairs meet tap target and contrast guidelines',
        (tester) async {
          for (final (variant, color) in allowedPairs) {
            await pumpBw(
              tester,
              Builder(
                builder: (context) => ColoredBox(
                  color: context.bw.colors.surfacePage,
                  child: BwSplitButton(
                    key: ValueKey<String>(
                      'a11y-${brightness.name}-${variant.name}-${color.name}',
                    ),
                    label: 'Export report',
                    variant: variant,
                    color: color,
                    onPressed: () {},
                    options: sampleOptions(),
                  ),
                ),
              ),
              brightness: brightness,
            );

            await expectLater(
              tester,
              meetsGuideline(androidTapTargetGuideline),
            );
            await expectLater(tester, meetsGuideline(textContrastGuideline));
          }
        },
      );
    }
  });

  group('golden render matrices', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} variants, colors, and sizes',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(960, 640));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            const goldenKey = ValueKey<String>('split-button-golden');
            final isAr = locale.languageCode == 'ar';
            final label = isAr ? 'تصدير التقرير' : 'Export report';
            final options = <BwSplitButtonOption>[
              BwSplitButtonOption(
                label: isAr ? 'تصدير بصيغة Excel' : 'Export as Excel',
                onSelected: () {},
              ),
              BwSplitButtonOption(
                label: isAr ? 'تصدير بصيغة CSV' : 'Export as CSV',
                onSelected: () {},
              ),
            ];

            await pumpBw(
              tester,
              RepaintBoundary(
                key: goldenKey,
                child: SizedBox(
                  width: 960,
                  height: 640,
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
                              BwSplitButton(
                                label: label,
                                variant: variant,
                                color: color,
                                leadingIcon: Symbols.download_rounded,
                                onPressed: () {},
                                options: options,
                              ),
                            for (final size in BwControlSize.values)
                              BwSplitButton(
                                label: label,
                                size: size,
                                onPressed: () {},
                                options: options,
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
                'goldens/split_button/split-button-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test('component source contains no raw visual values', () {
    final source = <String>[
      'lib/src/components/split_button/bw_split_button.dart',
      'lib/src/components/button/bw_button.dart',
      'lib/src/components/icon_button/bw_icon_button.dart',
    ].map((path) => File(path).readAsStringSync()).join('\n');

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
