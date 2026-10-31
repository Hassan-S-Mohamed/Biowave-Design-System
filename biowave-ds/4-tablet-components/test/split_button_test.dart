import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:biowave_tablet/src/components/button/bw_button.dart'
    show BwButtonSegment;
import 'package:biowave_tablet/src/components/button/bw_button_style.dart';
import 'package:biowave_tablet/src/components/button/bw_segment_border.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  const label = 'Export report';
  const menuLabel = 'More options for Export report';

  const allowedCombinations = <(BwButtonVariant, BwButtonColor)>[
    (BwButtonVariant.filled, BwButtonColor.brand),
    (BwButtonVariant.filled, BwButtonColor.secondary),
    (BwButtonVariant.filled, BwButtonColor.neutral),
    (BwButtonVariant.tonal, BwButtonColor.brand),
    (BwButtonVariant.tonal, BwButtonColor.secondary),
    (BwButtonVariant.outlined, BwButtonColor.brand),
    (BwButtonVariant.outlined, BwButtonColor.secondary),
    (BwButtonVariant.outlined, BwButtonColor.neutral),
  ];

  List<BwSplitButtonOption> options({
    VoidCallback? onFirstSelected,
    VoidCallback? onSecondSelected,
  }) =>
      [
        BwSplitButtonOption(
          label: 'Export as Excel',
          onSelected: onFirstSelected ?? () {},
          icon: Symbols.table_chart_rounded,
        ),
        BwSplitButtonOption(
          label: 'Export as CSV',
          onSelected: onSecondSelected ?? () {},
        ),
      ];

  Future<void> pumpSplitButton(
    WidgetTester tester, {
    VoidCallback? onPressed,
    List<BwSplitButtonOption>? menuOptions,
    BwButtonVariant variant = BwButtonVariant.filled,
    BwButtonColor color = BwButtonColor.brand,
    BwControlSize size = BwControlSize.lg,
    bool loading = false,
    Brightness brightness = Brightness.light,
    TextDirection textDirection = TextDirection.ltr,
    Locale locale = const Locale('en'),
    String? customMenuLabel = menuLabel,
    bool disabled = false,
    bool reduceMotion = false,
    Widget? trailingFocusTarget,
  }) async {
    final theme = brightness == Brightness.light
        ? BwTabletTheme.light(locale)
        : BwTabletTheme.dark(locale);

    await tester.pumpWidget(
      MaterialApp(
        theme: theme,
        themeAnimationDuration: Duration.zero,
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: MediaQuery(
                data: MediaQuery.of(
                  context,
                ).copyWith(disableAnimations: reduceMotion),
                child: Localizations.override(
                  context: context,
                  locale: locale,
                  child: Directionality(
                    textDirection: textDirection,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        BwSplitButton(
                          label: label,
                          onPressed: disabled ? null : onPressed ?? () {},
                          options: menuOptions ?? options(),
                          variant: variant,
                          color: color,
                          size: size,
                          leadingIcon: Symbols.download_rounded,
                          loading: loading,
                          loadingLabel: 'Exporting',
                          menuLabel: customMenuLabel,
                        ),
                        if (trailingFocusTarget != null) trailingFocusTarget,
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  SemanticsFinder interactiveSemantics(String semanticsLabel) =>
      find.semantics.byPredicate(
        (node) =>
            node.label == semanticsLabel &&
            node.getSemanticsData().hasAction(SemanticsAction.tap),
      );

  testWidgets(
    'renders every allowed variant, color, size, theme, and direction',
    (tester) async {
      for (final (variant, color) in allowedCombinations) {
        for (final size in BwControlSize.values) {
          for (final brightness in Brightness.values) {
            for (final direction in TextDirection.values) {
              await pumpSplitButton(
                tester,
                variant: variant,
                color: color,
                size: size,
                brightness: brightness,
                textDirection: direction,
              );

              expect(tester.takeException(), isNull);

              final primary = tester.widget<ButtonStyleButton>(
                find.byKey(const ValueKey<String>('BwButton.container')),
              );
              final trigger = tester.widget<IconButton>(
                find.byKey(const ValueKey<String>('BwIconButton.container')),
              );
              final primaryShape = primary.style!.shape!
                  .resolve(const <WidgetState>{})! as BwSegmentBorder;
              final triggerShape = trigger.style!.shape!
                  .resolve(const <WidgetState>{})! as BwSegmentBorder;
              expect(primaryShape.segment, BwButtonSegment.start);
              expect(triggerShape.segment, BwButtonSegment.end);
              final primaryRadius = primaryShape.borderRadius.resolve(
                direction,
              );
              final triggerRadius = triggerShape.borderRadius.resolve(
                direction,
              );
              final outer = Radius.circular(
                size == BwControlSize.xl ? BwRadius.xl : BwRadius.md,
              );
              const inner = Radius.circular(BwRadius.none);

              expect(
                primaryRadius.topLeft,
                direction == TextDirection.ltr ? outer : inner,
              );
              expect(
                primaryRadius.topRight,
                direction == TextDirection.ltr ? inner : outer,
              );
              expect(
                triggerRadius.topLeft,
                direction == TextDirection.ltr ? inner : outer,
              );
              expect(
                triggerRadius.topRight,
                direction == TextDirection.ltr ? outer : inner,
              );

              final primaryRect = tester.getRect(
                find.byKey(const ValueKey<String>('BwButton.container')),
              );
              final triggerRect = tester.getRect(
                find.byKey(const ValueKey<String>('BwIconButton.container')),
              );
              expect(
                primaryRect.height,
                greaterThanOrEqualTo(BwLayout.tablet.minTarget),
              );
              expect(
                triggerRect.height,
                greaterThanOrEqualTo(BwLayout.tablet.minTarget),
              );
              expect(
                triggerRect.width,
                greaterThanOrEqualTo(BwLayout.tablet.minTarget),
              );
              // Segments touch; the 1px Divider (border-width-default,
              // color-border-default) is the only thing between them.
              final dividerRect = tester.getRect(
                find.byKey(const ValueKey<String>('divider')),
              );
              final divider = tester.widget<VerticalDivider>(
                find.descendant(
                  of: find.byKey(const ValueKey<String>('divider')),
                  matching: find.byType(VerticalDivider),
                ),
              );
              expect(divider.thickness, BwBorder.widthDefault);
              expect(dividerRect.width, BwBorder.widthDefault);
              expect(
                dividerRect.height,
                BwButtonStyle.metrics(size).height,
              );
              expect(
                direction == TextDirection.ltr
                    ? triggerRect.left - primaryRect.right
                    : primaryRect.left - triggerRect.right,
                BwBorder.widthDefault,
              );
            }
          }
        }
      }
    },
  );

  testWidgets(
    'positions menu under container with end edge aligned and BwSpacing.xs vertical offset in LTR and RTL',
    (tester) async {
      for (final direction in TextDirection.values) {
        await pumpSplitButton(
          tester,
          textDirection: direction,
          locale: direction == TextDirection.rtl
              ? const Locale('ar')
              : const Locale('en'),
        );

        await tester.tap(
          find.byKey(const ValueKey<String>('BwIconButton.container')),
        );
        await tester.pumpAndSettle();

        final containerRect = tester.getRect(find.byType(BwSplitButton));
        final firstItemRect = tester.getRect(
          find.widgetWithText(MenuItemButton, 'Export as Excel'),
        );

        expect(firstItemRect.top, containerRect.bottom + BwSpacing.xs);
        // Touch menu rows: size-control-height-lg, spacing-xl.
        final itemStyle = tester.widget<MenuItemButton>(find.widgetWithText(MenuItemButton, 'Export as Excel')).style!;
        expect(
          itemStyle.minimumSize!.resolve(<WidgetState>{})!.height,
          BwSize.controlHeightLg,
        );
        expect(
          itemStyle.padding!.resolve(<WidgetState>{}),
          const EdgeInsetsDirectional.symmetric(horizontal: BwSpacing.xl),
        );
        if (direction == TextDirection.ltr) {
          expect(firstItemRect.right, closeTo(containerRect.right, 0.01));
        } else {
          expect(firstItemRect.left, closeTo(containerRect.left, 0.01));
        }

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();

        // Also verify when menu items are wider than the container:
        await pumpSplitButton(
          tester,
          textDirection: direction,
          locale: direction == TextDirection.rtl
              ? const Locale('ar')
              : const Locale('en'),
          menuOptions: [
            BwSplitButtonOption(
              label: 'Export full detailed quarterly financial report as Excel',
              onSelected: () {},
            ),
            BwSplitButtonOption(
              label: 'Export as CSV',
              onSelected: () {},
            ),
          ],
        );

        await tester.tap(
          find.byKey(const ValueKey<String>('BwIconButton.container')),
        );
        await tester.pumpAndSettle();

        final wideContainerRect = tester.getRect(find.byType(BwSplitButton));
        final wideItemRect = tester.getRect(
          find.widgetWithText(
            MenuItemButton,
            'Export full detailed quarterly financial report as Excel',
          ),
        );

        expect(wideItemRect.width, greaterThan(wideContainerRect.width));
        expect(wideItemRect.top, wideContainerRect.bottom + BwSpacing.xs);
        if (direction == TextDirection.ltr) {
          expect(wideItemRect.right, closeTo(wideContainerRect.right, 0.01));
        } else {
          expect(wideItemRect.left, closeTo(wideContainerRect.left, 0.01));
        }

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
      }
    },
  );

  testWidgets(
    'menu surface uses surfaceRaised, radius-lg, elevation-3, and transparent M3 MenuStyle with Clip.none',
    (tester) async {
      for (final brightness in Brightness.values) {
        await pumpSplitButton(tester, brightness: brightness);

        final menuAnchor = tester.widget<MenuAnchor>(find.byType(MenuAnchor));
        final context = tester.element(find.byType(BwSplitButton));
        final colors = context.bw.colors;

        expect(menuAnchor.clipBehavior, Clip.none);
        expect(
          menuAnchor.style!.backgroundColor!.resolve(const <WidgetState>{}),
          colors.backgroundTransparentDefault,
        );
        expect(
          menuAnchor.style!.shadowColor!.resolve(const <WidgetState>{}),
          colors.backgroundTransparentDefault,
        );
        expect(
          menuAnchor.style!.surfaceTintColor!.resolve(const <WidgetState>{}),
          colors.backgroundTransparentDefault,
        );
        expect(menuAnchor.style!.elevation, isNull);

        await tester.tap(
          find.byKey(const ValueKey<String>('BwIconButton.container')),
        );
        await tester.pumpAndSettle();

        final decoratedBoxes = tester
            .widgetList<DecoratedBox>(find.byType(DecoratedBox))
            .where((box) {
          final dec = box.decoration;
          return dec is BoxDecoration && dec.boxShadow != null;
        }).toList();
        expect(decoratedBoxes, hasLength(1));
        final surfaceDecoration =
            decoratedBoxes.single.decoration as BoxDecoration;
        expect(surfaceDecoration.color, colors.surfaceRaised);
        expect(
          surfaceDecoration.boxShadow,
          equals(context.bw.elevation.elevation3),
        );
        expect(
          surfaceDecoration.borderRadius,
          const BorderRadiusDirectional.all(Radius.circular(BwRadius.lg)),
        );

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
      }
    },
  );

  testWidgets('semantic actions expose two focus stops and expanded state', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    var primaryCount = 0;

    await pumpSplitButton(tester, onPressed: () => primaryCount += 1);

    final primary = interactiveSemantics(label);
    final trigger = interactiveSemantics(menuLabel);
    expect(primary, findsOne);
    expect(trigger, findsOne);
    expect(
      primary,
      isSemantics(
        label: label,
        isButton: true,
        hasEnabledState: true,
        isEnabled: true,
        hasTapAction: true,
        hasFocusAction: true,
      ),
    );
    expect(
      trigger,
      isSemantics(
        label: menuLabel,
        isButton: true,
        hasEnabledState: true,
        isEnabled: true,
        hasExpandedState: true,
        isExpanded: false,
        hasTapAction: true,
        hasFocusAction: true,
      ),
    );

    tester.semantics.tap(primary);
    await tester.pump();
    expect(primaryCount, 1);

    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();
    expect(primary, isSemantics(isFocused: true));

    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();
    expect(trigger, isSemantics(isFocused: true));

    tester.semantics.tap(trigger);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);
    expect(
      trigger,
      isSemantics(
        label: menuLabel,
        isButton: true,
        isFocused: true,
        hasEnabledState: true,
        isEnabled: true,
        hasExpandedState: true,
        isExpanded: true,
        hasTapAction: true,
      ),
    );
    final materialTrigger = tester.widget<IconButton>(
      find.byKey(const ValueKey<String>('BwIconButton.container')),
    );
    expect(
      materialTrigger.statesController!.value,
      contains(WidgetState.pressed),
    );

    tester.semantics.tap(trigger);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsNothing);
    expect(trigger, isSemantics(isExpanded: false, hasTapAction: true));
    expect(
      materialTrigger.statesController!.value,
      isNot(contains(WidgetState.pressed)),
    );
    semantics.dispose();
  });

  testWidgets('opens and closes by keyboard and returns focus to trigger', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    await pumpSplitButton(tester);

    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();

    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);

    await tester.sendKeyEvent(LogicalKeyboardKey.escape);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsNothing);
    expect(interactiveSemantics(menuLabel), isSemantics(isFocused: true));

    await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);

    await tester.sendKeyEvent(LogicalKeyboardKey.escape);
    await tester.pumpAndSettle();
    await tester.sendKeyEvent(LogicalKeyboardKey.space);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);
    semantics.dispose();
  });

  testWidgets(
    'keyboard navigates menu items with arrows and selects with Enter and Space',
    (tester) async {
      final semantics = tester.ensureSemantics();
      var firstCount = 0;
      var secondCount = 0;
      await pumpSplitButton(
        tester,
        menuOptions: options(
          onFirstSelected: () => firstCount += 1,
          onSecondSelected: () => secondCount += 1,
        ),
      );

      // Tab to primary, then Tab to trigger:
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();

      // Enter opens the menu and focuses the 1st enabled item:
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      final firstItem = tester.widget<MenuItemButton>(
        find.widgetWithText(MenuItemButton, 'Export as Excel'),
      );
      final secondItem = tester.widget<MenuItemButton>(
        find.widgetWithText(MenuItemButton, 'Export as CSV'),
      );
      expect(firstItem.focusNode!.hasFocus, isTrue);

      // ArrowDown moves focus to the 2nd item:
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
      await tester.pump();
      expect(secondItem.focusNode!.hasFocus, isTrue);

      // Enter selects the 2nd option once, closes the menu, and restores trigger focus:
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      expect(firstCount, 0);
      expect(secondCount, 1);
      expect(find.text('Export as Excel'), findsNothing);
      expect(interactiveSemantics(menuLabel), isSemantics(isFocused: true));

      // ArrowUp on the trigger opens the menu and focuses the last enabled item:
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowUp);
      await tester.pumpAndSettle();
      final reopenedSecondItem = tester.widget<MenuItemButton>(
        find.widgetWithText(MenuItemButton, 'Export as CSV'),
      );
      final reopenedFirstItem = tester.widget<MenuItemButton>(
        find.widgetWithText(MenuItemButton, 'Export as Excel'),
      );
      expect(reopenedSecondItem.focusNode!.hasFocus, isTrue);

      // ArrowUp moves to the 1st item and Space selects it:
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowUp);
      await tester.pump();
      expect(reopenedFirstItem.focusNode!.hasFocus, isTrue);

      await tester.sendKeyEvent(LogicalKeyboardKey.space);
      await tester.pumpAndSettle();
      expect(firstCount, 1);
      expect(secondCount, 1);
      expect(find.text('Export as Excel'), findsNothing);
      expect(interactiveSemantics(menuLabel), isSemantics(isFocused: true));
      semantics.dispose();
    },
  );

  testWidgets('Tab and Shift+Tab close the open menu and move focus on', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    final trailingFocusNode = FocusNode(debugLabel: 'trailing');
    addTearDown(trailingFocusNode.dispose);

    await pumpSplitButton(
      tester,
      trailingFocusTarget: ElevatedButton(
        focusNode: trailingFocusNode,
        onPressed: () {},
        child: const Text('After'),
      ),
    );

    // Tab to trigger and open menu with Enter:
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);

    // Tab closes the menu and moves focus to the trailing button:
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsNothing);
    expect(trailingFocusNode.hasFocus, isTrue);

    // Shift+Tab back to trigger, open menu, then Shift+Tab closes menu and focuses primary:
    await tester.sendKeyDownEvent(LogicalKeyboardKey.shiftLeft);
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.sendKeyUpEvent(LogicalKeyboardKey.shiftLeft);
    await tester.pump();
    expect(interactiveSemantics(menuLabel), isSemantics(isFocused: true));

    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsOneWidget);

    await tester.sendKeyDownEvent(LogicalKeyboardKey.shiftLeft);
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.sendKeyUpEvent(LogicalKeyboardKey.shiftLeft);
    await tester.pumpAndSettle();
    expect(find.text('Export as Excel'), findsNothing);
    expect(interactiveSemantics(label), isSemantics(isFocused: true));
    semantics.dispose();
  });

  testWidgets(
    'chevron uses BwDuration.md + decelerate on open, BwDuration.sm + accelerate on close, and instant under reduced motion',
    (tester) async {
      await pumpSplitButton(tester);

      // Initially closed:
      var rotation = tester.widget<AnimatedRotation>(
        find.byType(AnimatedRotation),
      );
      expect(rotation.turns, 0);
      expect(rotation.duration, BwDuration.sm);
      expect(rotation.curve, BwEasing.standardAccelerate);

      // Open menu -> BwDuration.md + standardDecelerate:
      await tester.tap(
        find.byKey(const ValueKey<String>('BwIconButton.container')),
      );
      await tester.pumpAndSettle();
      rotation = tester.widget<AnimatedRotation>(
        find.byType(AnimatedRotation),
      );
      expect(rotation.turns, 0.5);
      expect(rotation.duration, BwDuration.md);
      expect(rotation.curve, BwEasing.standardDecelerate);

      // Close menu -> BwDuration.sm + standardAccelerate:
      await tester.tap(
        find.byKey(const ValueKey<String>('BwIconButton.container')),
      );
      await tester.pumpAndSettle();
      rotation = tester.widget<AnimatedRotation>(
        find.byType(AnimatedRotation),
      );
      expect(rotation.turns, 0);
      expect(rotation.duration, BwDuration.sm);
      expect(rotation.curve, BwEasing.standardAccelerate);

      // Reduced motion -> BwDuration.instant and MenuAnchor.animated == false:
      await pumpSplitButton(tester, reduceMotion: true);
      expect(
        tester.widget<MenuAnchor>(find.byType(MenuAnchor)).animated,
        isFalse,
      );
      expect(
        tester.widget<AnimatedRotation>(find.byType(AnimatedRotation)).duration,
        BwDuration.instant,
      );
    },
  );

  testWidgets('selects one option once and restores trigger focus', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    var selections = 0;
    await pumpSplitButton(
      tester,
      menuOptions: options(onFirstSelected: () => selections += 1),
    );

    tester.semantics.tap(interactiveSemantics(menuLabel));
    await tester.pumpAndSettle();

    final containerWidth = tester.getSize(find.byType(BwSplitButton)).width;
    final firstOption = find.widgetWithText(MenuItemButton, 'Export as Excel');
    expect(
      tester.getSize(firstOption).width,
      greaterThanOrEqualTo(containerWidth),
    );
    expect(
      tester.getSize(firstOption).height,
      greaterThanOrEqualTo(BwLayout.tablet.minTarget),
    );

    await tester.tap(firstOption);
    await tester.pumpAndSettle();
    expect(selections, 1);
    expect(find.text('Export as Excel'), findsNothing);
    expect(interactiveSemantics(menuLabel), isSemantics(isFocused: true));
    semantics.dispose();
  });

  testWidgets('loading and a null primary callback disable the trigger', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();

    await pumpSplitButton(tester, loading: true);
    var trigger = find.semantics.byLabel(menuLabel);
    expect(trigger, findsOne);
    expect(
      trigger,
      isSemantics(
        label: menuLabel,
        isButton: true,
        hasEnabledState: true,
        isEnabled: false,
        hasExpandedState: true,
        isExpanded: false,
      ),
    );

    await pumpSplitButton(tester, disabled: true);
    trigger = find.semantics.byLabel(menuLabel);
    expect(trigger, findsOne);
    expect(
      trigger,
      isSemantics(
        label: menuLabel,
        isButton: true,
        hasEnabledState: true,
        isEnabled: false,
        hasExpandedState: true,
        isExpanded: false,
      ),
    );
    semantics.dispose();
  });

  testWidgets('derives an Arabic menu label when none is provided', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    await pumpSplitButton(
      tester,
      locale: const Locale('ar'),
      textDirection: TextDirection.rtl,
      customMenuLabel: null,
    );

    expect(interactiveSemantics('خيارات إضافية لـ $label'), findsOne);
    semantics.dispose();
  });

  test('asserts invalid combinations', () {
    final validOptions = options();

    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: [validOptions.first],
      ),
      throwsAssertionError,
    );
    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: List.generate(
          6,
          (index) =>
              BwSplitButtonOption(label: 'Option $index', onSelected: () {}),
        ),
      ),
      throwsAssertionError,
    );
    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: [
          BwSplitButtonOption(label: label, onSelected: () {}),
          validOptions.last,
        ],
      ),
      throwsAssertionError,
    );
    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: validOptions,
        variant: BwButtonVariant.tonal,
        color: BwButtonColor.neutral,
      ),
      throwsAssertionError,
    );
    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: validOptions,
        variant: BwButtonVariant.text,
      ),
      throwsAssertionError,
    );
    expect(
      () => BwSplitButton(
        label: label,
        onPressed: () {},
        options: validOptions,
        color: BwButtonColor.error,
      ),
      throwsAssertionError,
    );
  });

  group('goldens', () {
    for (final brightness in Brightness.values) {
      for (final locale in const [Locale('en'), Locale('ar')]) {
        testWidgets(
          'B9 matrix ${brightness.name}/${locale.languageCode}',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(1080, 680));
            addTearDown(() => tester.binding.setSurfaceSize(null));

            final theme = brightness == Brightness.light
                ? BwTabletTheme.light(locale)
                : BwTabletTheme.dark(locale);
            final direction = locale.languageCode == 'ar'
                ? TextDirection.rtl
                : TextDirection.ltr;

            await tester.pumpWidget(
              RepaintBoundary(
                key: const ValueKey<String>('split-button-golden'),
                child: MaterialApp(
                  debugShowCheckedModeBanner: false,
                  theme: theme,
                  home: Builder(
                    builder: (context) => Localizations.override(
                      context: context,
                      locale: locale,
                      child: Directionality(
                        textDirection: direction,
                        child: _SplitButtonGoldenBoard(locale: locale),
                      ),
                    ),
                  ),
                ),
              ),
            );

            // Open the menu on the showcase split button so both closed and open
            // states (including end alignment and elevation-3) are captured:
            await tester.tap(
              find.descendant(
                of: find.byKey(
                  const ValueKey<String>('golden-open-split-button'),
                ),
                matching: find.byKey(
                  const ValueKey<String>('BwIconButton.container'),
                ),
              ),
            );
            await tester.pumpAndSettle();

            await expectLater(
              find.byKey(const ValueKey<String>('split-button-golden')),
              matchesGoldenFile(
                'goldens/split_button/'
                '${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });
}

class _SplitButtonGoldenBoard extends StatelessWidget {
  const _SplitButtonGoldenBoard({required this.locale});

  final Locale locale;

  @override
  Widget build(BuildContext context) {
    final isArabic = locale.languageCode == 'ar';
    final primaryLabel = isArabic ? 'تصدير التقرير' : 'Export report';
    final goldenOptions = <BwSplitButtonOption>[
      BwSplitButtonOption(
        label: isArabic ? 'تصدير بصيغة Excel' : 'Export as Excel',
        onSelected: _noop,
        icon: Symbols.table_chart_rounded,
      ),
      BwSplitButtonOption(
        label: isArabic ? 'تصدير بصيغة CSV' : 'Export as CSV',
        onSelected: _noop,
      ),
      BwSplitButtonOption(
        label: isArabic ? 'مشاركة الرابط' : 'Share link',
        onSelected: _noop,
        icon: Symbols.arrow_forward_rounded,
        enabled: false,
      ),
    ];

    final allowedColors = <BwButtonVariant, List<BwButtonColor>>{
      BwButtonVariant.filled: const [
        BwButtonColor.brand,
        BwButtonColor.secondary,
        BwButtonColor.neutral,
      ],
      BwButtonVariant.tonal: const [
        BwButtonColor.brand,
        BwButtonColor.secondary,
      ],
      BwButtonVariant.outlined: const [
        BwButtonColor.brand,
        BwButtonColor.secondary,
        BwButtonColor.neutral,
      ],
    };

    return Scaffold(
      body: Padding(
        padding: const EdgeInsetsDirectional.all(BwSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final entry in allowedColors.entries) ...[
              _GoldenRow(
                label: entry.key.name,
                children: [
                  for (final color in entry.value)
                    BwSplitButton(
                      label: primaryLabel,
                      onPressed: _noop,
                      options: goldenOptions,
                      variant: entry.key,
                      color: color,
                      leadingIcon: Symbols.download_rounded,
                    ),
                ],
              ),
              const SizedBox(height: BwSpacing.md),
            ],
            _GoldenRow(
              label: isArabic ? 'الأحجام' : 'sizes',
              children: [
                for (final size in BwControlSize.values)
                  BwSplitButton(
                    label: primaryLabel,
                    onPressed: _noop,
                    options: goldenOptions,
                    size: size,
                  ),
              ],
            ),
            const SizedBox(height: BwSpacing.lg),
            _GoldenRow(
              label: isArabic ? 'مفتوح' : 'open',
              children: [
                BwSplitButton(
                  key: const ValueKey<String>('golden-open-split-button'),
                  label: primaryLabel,
                  onPressed: _noop,
                  options: goldenOptions,
                  leadingIcon: Symbols.download_rounded,
                ),
                BwSplitButton(
                  label: primaryLabel,
                  onPressed: null,
                  options: goldenOptions,
                  leadingIcon: Symbols.download_rounded,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  static void _noop() {}
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
              spacing: BwSpacing.md,
              runSpacing: BwSpacing.sm,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: children,
            ),
          ),
        ],
      );
}
