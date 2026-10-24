import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  const label = 'Export report';
  const menuLabel = 'More options for Export report';

  List<BwSplitButtonOption> options({VoidCallback? onSelected}) => [
        BwSplitButtonOption(
          label: 'Export as Excel',
          onSelected: onSelected ?? () {},
          icon: Icons.table_chart_rounded,
        ),
        BwSplitButtonOption(label: 'Export as CSV', onSelected: () {}),
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
  }) async {
    final theme = brightness == Brightness.light
        ? BwTabletTheme.light(locale)
        : BwTabletTheme.dark(locale);

    await tester.pumpWidget(
      MaterialApp(
        theme: theme,
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
                    child: BwSplitButton(
                      label: label,
                      onPressed: disabled ? null : onPressed ?? () {},
                      options: menuOptions ?? options(),
                      variant: variant,
                      color: color,
                      size: size,
                      leadingIcon: Icons.download_rounded,
                      loading: loading,
                      loadingLabel: 'Exporting',
                      menuLabel: customMenuLabel,
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
      const combinations = <(BwButtonVariant, BwButtonColor)>[
        (BwButtonVariant.filled, BwButtonColor.brand),
        (BwButtonVariant.filled, BwButtonColor.secondary),
        (BwButtonVariant.filled, BwButtonColor.neutral),
        (BwButtonVariant.tonal, BwButtonColor.brand),
        (BwButtonVariant.tonal, BwButtonColor.secondary),
        (BwButtonVariant.outlined, BwButtonColor.brand),
        (BwButtonVariant.outlined, BwButtonColor.secondary),
        (BwButtonVariant.outlined, BwButtonColor.neutral),
      ];

      for (final (variant, color) in combinations) {
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
                  .resolve(const <WidgetState>{})! as RoundedRectangleBorder;
              final triggerShape = trigger.style!.shape!
                  .resolve(const <WidgetState>{})! as RoundedRectangleBorder;
              final primaryRadius = primaryShape.borderRadius.resolve(
                direction,
              );
              final triggerRadius = triggerShape.borderRadius.resolve(
                direction,
              );
              final outer = Radius.circular(
                size == BwControlSize.xl ? BwRadius.xl : BwRadius.md,
              );
              const inner = Radius.circular(BwRadius.xs);

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
              expect(
                direction == TextDirection.ltr
                    ? triggerRect.left - primaryRect.right
                    : primaryRect.left - triggerRect.right,
                BwSpacing.xxs,
              );
            }
          }
        }
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

  testWidgets('reduced motion makes chevron and menu transitions instant', (
    tester,
  ) async {
    await pumpSplitButton(tester, reduceMotion: true);

    expect(
        tester.widget<MenuAnchor>(find.byType(MenuAnchor)).animated, isFalse);
    expect(
      tester.widget<AnimatedRotation>(find.byType(AnimatedRotation)).duration,
      BwDuration.instant,
    );
  });

  testWidgets('selects one option once and restores trigger focus', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    var selections = 0;
    await pumpSplitButton(
      tester,
      menuOptions: options(onSelected: () => selections += 1),
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
}
