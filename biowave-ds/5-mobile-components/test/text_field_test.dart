import 'dart:convert';
import 'dart:io';
import 'dart:ui' as ui;

import 'package:biowave_mobile/biowave_mobile.dart';
import 'package:biowave_mobile/src/components/text_field/bw_field_action.dart';
import 'package:biowave_mobile/src/components/text_field/bw_text_field_decoration.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

void main() {
  group('BwTextField API', () {
    test('defaults match the contract', () {
      const field = BwTextField(label: 'Work email');

      expect(field.hideLabel, isFalse);
      expect(field.size, BwControlSize.lg);
      expect(field.autovalidateMode, AutovalidateMode.disabled);
      expect(field.requiredField, isFalse);
      expect(field.multiline, isFalse);
      expect(field.minRows, 3);
      expect(field.maxRows, isNull);
      expect(field.showCounter, isFalse);
      expect(field.clearable, isFalse);
      expect(field.obscureText, isFalse);
      expect(field.passwordToggle, isTrue);
      expect(field.readOnly, isFalse);
      expect(field.enabled, isTrue);
    });

    test('invalid combinations assert', () {
      expect(
        () => BwTextField(label: 'Name', size: BwControlSize.md),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(label: 'Name', showCounter: true),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(label: 'Name', maxRows: 4),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          multiline: true,
          obscureText: true,
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          obscureText: true,
          clearable: true,
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          trailingIcon: Symbols.mail_rounded,
          clearable: true,
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          multiline: true,
          prefixText: 'https://',
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          suffixText: 'SAR',
          endButton: BwTextFieldEndButton(
            label: 'Copy',
            onPressed: () {},
          ),
        ),
        throwsA(isA<AssertionError>()),
      );
      expect(
        () => BwTextField(
          label: 'Name',
          controller: TextEditingController(),
          initialValue: 'Hassan',
        ),
        throwsA(isA<AssertionError>()),
      );
    });
  });

  group('rendering and dimensions', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} single and multiline',
          (tester) async {
            await pumpBw(
              tester,
              const SizedBox(
                width: BwSize.containerSm,
                child: Column(
                  children: <Widget>[
                    BwTextField(
                      label: 'Work email',
                      placeholder: 'name@example.com',
                    ),
                    BwTextField(
                      label: 'Request reason',
                      multiline: true,
                      helperText: 'Explain why you need remote work',
                    ),
                  ],
                ),
              ),
              brightness: brightness,
              locale: locale,
            );

            expect(find.byType(BwTextField), findsNWidgets(2));
            expect(tester.takeException(), isNull);
          },
        );
      }
    }

    testWidgets('field and action use mobile size tokens', (tester) async {
      await pumpBw(
        tester,
        const SizedBox(
          width: BwSize.containerSm,
          child: BwTextField(
            label: 'Search employees',
            initialValue: 'Mona',
            clearable: true,
          ),
        ),
      );

      final fieldRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.input')),
      );
      final actionBoxRect = tester.getRect(
        find.descendant(
          of: find.byType(BwFieldAction),
          matching: find.byWidgetPredicate(
            (widget) =>
                widget is Material && widget.type == MaterialType.button,
          ),
        ),
      );

      expect(fieldRect.height, BwSize.controlHeightLg);
      expect(actionBoxRect.size, const Size.square(BwSize.controlHeightMd));
      expect(actionBoxRect.top - fieldRect.top, BwSpacing.xs);
      expect(fieldRect.bottom - actionBoxRect.bottom, BwSpacing.xs);
      expect(fieldRect.right - actionBoxRect.right, BwSpacing.xs);
      expect(
        tester.getSize(find.byType(BwIconButton)).shortestSide,
        greaterThanOrEqualTo(BwLayout.mobile.minTarget),
      );
    });

    testWidgets('text scale 2 grows without overflow', (tester) async {
      await pumpBw(
        tester,
        const SizedBox(
          width: BwSize.containerSm,
          child: BwTextField(
            label: 'A persistent field label that can wrap',
            helperText: 'Supporting text also remains visible',
          ),
        ),
        textScale: 2,
      );

      expect(tester.takeException(), isNull);
      expect(
        tester
            .getSize(find.byKey(const ValueKey<String>('BwTextField.input')))
            .height,
        greaterThan(BwSize.controlHeightLg),
      );
    });
  });

  group('decoration tokens', () {
    for (final brightness in Brightness.values) {
      testWidgets('border, fill, and text resolve in ${brightness.name}',
          (tester) async {
        late InputDecoration decoration;
        late BwColors colors;
        await pumpBw(
          tester,
          Builder(
            builder: (context) {
              colors = context.bw.colors;
              decoration = buildBwTextFieldDecoration(
                context: context,
                enabled: true,
                readOnly: false,
                placeholder: 'Placeholder',
                prefixIcon: null,
                suffixIcon: null,
                helperText: null,
                counterText: null,
                borderRadius: const BorderRadiusDirectional.all(
                  Radius.circular(BwRadius.md),
                ),
              );
              return const SizedBox.shrink();
            },
          ),
          brightness: brightness,
        );

        final border = decoration.border! as WidgetStateInputBorder;
        BorderSide side(Set<WidgetState> states) =>
            (border.resolve(states) as OutlineInputBorder).borderSide;

        expect(side(<WidgetState>{}).color, colors.borderInputDefault);
        expect(
          side(<WidgetState>{WidgetState.hovered}).color,
          colors.borderInputHover,
        );
        expect(
          side(<WidgetState>{WidgetState.focused}).color,
          colors.borderFocus,
        );
        expect(
          side(<WidgetState>{WidgetState.focused}).width,
          BwBorder.widthFocus,
        );
        expect(
          side(<WidgetState>{WidgetState.error}).color,
          colors.borderInputError,
        );
        expect(
          side(<WidgetState>{WidgetState.disabled}).color,
          colors.borderDisabled,
        );

        final fill = decoration.fillColor! as WidgetStateColor;
        expect(fill.resolve(<WidgetState>{}), colors.backgroundBaseDefault);
        expect(
          fill.resolve(<WidgetState>{WidgetState.disabled}),
          colors.backgroundBaseDisabled,
        );
        final iconColor = decoration.prefixIconColor! as WidgetStateColor;
        expect(iconColor.resolve(<WidgetState>{}), colors.iconNeutralMuted);
        expect(
          iconColor.resolve(<WidgetState>{WidgetState.focused}),
          colors.iconNeutralDefault,
        );
        expect(
          iconColor.resolve(<WidgetState>{
            WidgetState.error,
            WidgetState.focused,
          }),
          colors.iconNeutralMuted,
        );
        expect(
          iconColor.resolve(<WidgetState>{WidgetState.disabled}),
          colors.iconNeutralDisabled,
        );
        expect(decoration.hintStyle!.color, colors.textNeutralPlaceholder);
        expect(decoration.labelStyle!.color, colors.textNeutralDefault);
      });

      testWidgets('read-only uses neutral fill and default border',
          (tester) async {
        late InputDecoration decoration;
        late BwColors colors;
        await pumpBw(
          tester,
          Builder(
            builder: (context) {
              colors = context.bw.colors;
              decoration = buildBwTextFieldDecoration(
                context: context,
                enabled: true,
                readOnly: true,
                placeholder: null,
                prefixIcon: null,
                suffixIcon: null,
                helperText: null,
                counterText: null,
                borderRadius: const BorderRadiusDirectional.all(
                  Radius.circular(BwRadius.md),
                ),
              );
              return const SizedBox.shrink();
            },
          ),
          brightness: brightness,
        );

        final border = decoration.border! as WidgetStateInputBorder;
        final resolved = border.resolve(<WidgetState>{}) as OutlineInputBorder;
        expect(resolved.borderSide.color, colors.borderDefault);
        expect(
          (decoration.fillColor! as WidgetStateColor)
              .resolve(<WidgetState>{}),
          colors.backgroundNeutralSubtle,
        );
      });
    }
  });

  group('behavior', () {
    testWidgets('clear visibility, callback, value, and focus', (tester) async {
      final controller = TextEditingController();
      addTearDown(controller.dispose);
      final changes = <String>[];
      var clears = 0;
      await pumpBw(
        tester,
        BwTextField(
          label: 'Search employees',
          controller: controller,
          clearable: true,
          onChanged: changes.add,
          onCleared: () => clears += 1,
        ),
      );

      expect(find.byIcon(Symbols.close_rounded), findsNothing);
      await tester.enterText(find.byType(TextFormField), 'Mona');
      await tester.pump();
      expect(find.byIcon(Symbols.close_rounded), findsOneWidget);

      await tester.tap(find.byIcon(Symbols.close_rounded));
      await tester.pump();
      expect(controller.text, isEmpty);
      expect(changes.last, isEmpty);
      expect(clears, 1);
      expect(
        tester.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
        isTrue,
      );
    });

    testWidgets('clear is hidden for disabled and read-only fields',
        (tester) async {
      await pumpBw(
        tester,
        const Column(
          children: <Widget>[
            BwTextField(
              label: 'Disabled',
              initialValue: 'Value',
              clearable: true,
              enabled: false,
            ),
            BwTextField(
              label: 'Read only',
              initialValue: 'Value',
              clearable: true,
              readOnly: true,
            ),
          ],
        ),
      );

      expect(find.byIcon(Symbols.close_rounded), findsNothing);
    });

    testWidgets('password toggle changes state and preserves caret',
        (tester) async {
      final controller = TextEditingController(text: 'secret')
        ..selection = const TextSelection.collapsed(offset: 3);
      addTearDown(controller.dispose);
      await pumpBw(
        tester,
        BwTextField(
          label: 'Password',
          controller: controller,
          obscureText: true,
        ),
      );

      expect(
        tester.widget<TextField>(find.byType(TextField)).obscureText,
        isTrue,
      );
      expect(find.bySemanticsLabel('Show password'), findsOneWidget);
      await tester.tap(find.byIcon(Symbols.visibility_rounded));
      await tester.pump();

      expect(
        tester.widget<TextField>(find.byType(TextField)).obscureText,
        isFalse,
      );
      expect(find.bySemanticsLabel('Hide password'), findsOneWidget);
      expect(controller.selection.baseOffset, 3);
    });

    testWidgets('help tooltip opens by semantics tap and closes with Escape',
        (tester) async {
      final semantics = tester.ensureSemantics();
      try {
        await pumpBw(
          tester,
          const BwTextField(
            label: 'Work email',
            helpText: 'We send reminders to this address',
          ),
        );

        tester.semantics.tap(
          find.semantics.byLabel('More information about Work email'),
        );
        await tester.pump();
        expect(find.text('We send reminders to this address'), findsOneWidget);

        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pump();
        expect(find.text('We send reminders to this address'), findsNothing);
      } finally {
        semantics.dispose();
      }
    });

    testWidgets('counter counts and enforces grapheme clusters', (tester) async {
      await pumpBw(
        tester,
        const BwTextField(
          label: 'Code',
          maxLength: 2,
          showCounter: true,
        ),
      );

      await tester.enterText(find.byType(TextFormField), '👨‍👩‍👧‍👦عx');
      await tester.pump();
      expect(
        tester.widget<TextFormField>(find.byType(TextFormField)).controller!.text,
        '👨‍👩‍👧‍👦ع',
      );
      expect(find.text('2/2'), findsOneWidget);
    });

    testWidgets('leading icon, prefix, and suffix focus the field',
        (tester) async {
      Future<void> expectTapFocus(Finder target) async {
        await tester.tap(target);
        await tester.pump();
        expect(
          tester.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
          isTrue,
        );
        tester.widget<TextField>(find.byType(TextField)).focusNode!.unfocus();
        await tester.pump();
      }

      await pumpBw(
        tester,
        const BwTextField(
          label: 'Website',
          leadingIcon: Symbols.link_rounded,
          prefixText: 'https://',
          suffixText: '.com',
        ),
      );

      await expectTapFocus(find.byIcon(Symbols.link_rounded));
      await expectTapFocus(
        find.byKey(const ValueKey<String>('BwFieldAddon.prefix')),
      );
      await expectTapFocus(
        find.byKey(const ValueKey<String>('BwFieldAddon.suffix')),
      );
    });
  });

  group('semantics and focus', () {
    testWidgets('field and each action are separate labelled nodes',
        (tester) async {
      final semantics = tester.ensureSemantics();
      try {
        var actionPresses = 0;
        var endPresses = 0;
        await pumpBw(
          tester,
          BwTextField(
            label: 'Work email',
            requiredField: true,
            helperText: 'Use your work email',
            helpText: 'Why this is needed',
            action: BwTextFieldAction(
              icon: Symbols.refresh_rounded,
              label: 'Refresh email',
              onPressed: () => actionPresses += 1,
            ),
            endButton: BwTextFieldEndButton(
              label: 'Copy',
              onPressed: () => endPresses += 1,
            ),
          ),
        );

        final fieldFinder = find.bySemanticsLabel(RegExp('Work email, required'));
        expect(
          find.semantics.byLabel(RegExp('Work email, required')),
          findsOne,
        );
        final fieldNode = tester.getSemantics(fieldFinder);
        expect(fieldNode.flagsCollection.isTextField, isTrue);
        expect(fieldNode.flagsCollection.isFocused, ui.Tristate.isFalse);
        expect(
          fieldNode.getSemanticsData().hasAction(ui.SemanticsAction.tap),
          isTrue,
        );
        expect(
          fieldNode.getSemanticsData().hasAction(ui.SemanticsAction.focus),
          isTrue,
        );

        for (final label in <String>[
          'More information about Work email',
          'Refresh email',
          'Copy',
        ]) {
          expect(find.semantics.byLabel(label), findsOne);
          final node = tester.getSemantics(find.bySemanticsLabel(label));
          expect(
            node.getSemanticsData().hasAction(ui.SemanticsAction.tap),
            isTrue,
          );
          expect(
            node.getSemanticsData().hasAction(ui.SemanticsAction.focus),
            isTrue,
          );
        }

        tester.semantics.tap(find.semantics.byLabel('Refresh email'));
        tester.semantics.tap(find.semantics.byLabel('Copy'));
        await tester.pump();
        expect(actionPresses, 1);
        expect(endPresses, 1);

        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(
          tester
              .getSemantics(
                find.bySemanticsLabel('More information about Work email'),
              )
              .flagsCollection
              .isFocused,
          ui.Tristate.isTrue,
        );
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(
          tester.getSemantics(fieldFinder).flagsCollection.isFocused,
          ui.Tristate.isTrue,
        );
      } finally {
        semantics.dispose();
      }
    });

    testWidgets('disabled controls leave help reachable', (tester) async {
      await pumpBw(
        tester,
        BwTextField(
          label: 'Disabled field',
          enabled: false,
          helpText: 'This help remains available',
          action: BwTextFieldAction(
            icon: Symbols.refresh_rounded,
            label: 'Refresh',
            onPressed: () {},
          ),
          endButton: BwTextFieldEndButton(
            label: 'Copy',
            onPressed: () {},
          ),
        ),
      );

      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(
        tester
            .getSemantics(
              find.bySemanticsLabel('More information about Disabled field'),
            )
            .flagsCollection
            .isFocused,
        ui.Tristate.isTrue,
      );
      expect(
        tester.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
        isFalse,
      );
      expect(
        tester
            .widget<BwIconButton>(
              find.byWidgetPredicate(
                (widget) => widget is BwIconButton && widget.label == 'Refresh',
              ),
            )
            .onPressed,
        isNull,
      );
      expect(
        tester
            .widget<BwButton>(
              find.byWidgetPredicate(
                (widget) => widget is BwButton && widget.label == 'Copy',
              ),
            )
            .onPressed,
        isNull,
      );
    });
  });

  group('RTL and lifecycle', () {
    testWidgets('RTL mirrors layout but not neutral glyphs', (tester) async {
      await pumpBw(
        tester,
        const SizedBox(
          width: BwSize.containerSm,
          child: BwTextField(
            label: 'البريد الإلكتروني للعمل',
            leadingIcon: Symbols.mail_rounded,
            clearable: true,
            initialValue: 'name@example.com',
            textDirection: TextDirection.ltr,
          ),
        ),
        locale: const Locale('ar'),
      );

      final input = tester.getRect(find.byType(TextFormField));
      final leading = tester.getRect(find.byIcon(Symbols.mail_rounded));
      final trailing = tester.getRect(find.byIcon(Symbols.close_rounded));
      expect(leading.center.dx, greaterThan(input.center.dx));
      expect(trailing.center.dx, lessThan(input.center.dx));
      expect(
        find.descendant(
          of: find.byIcon(Symbols.close_rounded),
          matching: find.byType(Transform),
        ),
        findsNothing,
      );
    });

    testWidgets('supplied controller and focus node are never disposed',
        (tester) async {
      final controller = _TrackedController();
      final focusNode = _TrackedFocusNode();
      addTearDown(() {
        controller.dispose();
        focusNode.dispose();
      });
      await pumpBw(
        tester,
        BwTextField(
          label: 'Name',
          controller: controller,
          focusNode: focusNode,
        ),
      );

      await pumpBw(tester, const SizedBox.shrink());
      expect(controller.disposed, isFalse);
      expect(focusNode.disposed, isFalse);
    });

    testWidgets('owned controller and focus node are disposed without leaks',
        (tester) async {
      await pumpBw(
        tester,
        const BwTextField(label: 'Name', initialValue: 'Mona'),
      );
      await pumpBw(tester, const SizedBox.shrink());
      expect(tester.takeException(), isNull);
    });
  });

  group('accessibility guidelines', () {
    testWidgets('targets, labels, and contrast meet guidance', (tester) async {
      await pumpBw(
        tester,
        BwTextField(
          label: 'Search employees',
          initialValue: 'Mona',
          helpText: 'Search help',
          clearable: true,
          endButton: BwTextFieldEndButton(
            label: 'Go',
            onPressed: () {},
          ),
        ),
      );

      await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
      await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
      await expectLater(tester, meetsGuideline(textContrastGuideline));
      await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
    });
  });

  group('source policy', () {
    test('component token file matches contract token map', () {
      final mobileTokens = jsonDecode(
        File('components/text-field/text-field.tokens.json').readAsStringSync(),
      ) as Map<String, dynamic>;
      final extendsPath = mobileTokens[r'$extends'] as String;
      final webTokens = jsonDecode(
        File('components/text-field/$extendsPath').readAsStringSync(),
      ) as Map<String, dynamic>;

      final tf = webTokens['text-field'] as Map<String, dynamic>;
      final sizeLg =
          (tf['size'] as Map<String, dynamic>)['lg'] as Map<String, dynamic>;
      expect((sizeLg['height'] as Map<String, dynamic>)[r'$value'],
          '{size.control.height.lg}');
      expect((sizeLg['padding-inline'] as Map<String, dynamic>)[r'$value'],
          '{spacing.control.padding-inline.lg}');
      expect((sizeLg['gap'] as Map<String, dynamic>)[r'$value'],
          '{spacing.control.gap.lg}');
      expect((sizeLg['label-gap'] as Map<String, dynamic>)[r'$value'],
          '{spacing.sm}');
      expect((sizeLg['supporting-gap'] as Map<String, dynamic>)[r'$value'],
          '{spacing.xs}');
      expect(
          (sizeLg['icon'] as Map<String, dynamic>)[r'$value'], '{size.icon.lg}');
      expect((sizeLg['radius'] as Map<String, dynamic>)[r'$value'],
          '{radius.md}');
      expect((sizeLg['border-width'] as Map<String, dynamic>)[r'$value'],
          '{border.width.default}');
      expect((sizeLg['action-box'] as Map<String, dynamic>)[r'$value'],
          '{size.control.height.md}');
      expect((sizeLg['action-inset'] as Map<String, dynamic>)[r'$value'],
          '{spacing.xs}');

      final states = tf['state'] as Map<String, dynamic>;
      expect(
        ((states['error'] as Map<String, dynamic>)['error-icon']
            as Map<String, dynamic>)[r'$value'],
        '{color.icon.role.error}',
      );
      expect(
        ((states['error'] as Map<String, dynamic>)['counter']
            as Map<String, dynamic>)[r'$value'],
        '{color.text.role.error}',
      );
      expect(
        ((states['error'] as Map<String, dynamic>)['icon']
            as Map<String, dynamic>)[r'$value'],
        '{color.icon.neutral.muted}',
      );
    });

    test('uses no raw colours, primitive palette, or numeric layout literals',
        () {
      final sources = Directory('lib/src/components/text_field')
          .listSync()
          .whereType<File>()
          .map((file) => file.readAsStringSync())
          .join('\n');

      expect(sources, isNot(contains('Color(0x')));
      expect(sources, isNot(contains('BwPalette')));
      expect(
        sources,
        isNot(matches(RegExp(r'EdgeInsets(?:Directional)?\.[^(]+\(\s*\d'))),
      );
      expect(sources, isNot(matches(RegExp(r'SizedBox\([^)]*:\s*\d'))));
      expect(sources, isNot(matches(RegExp(r'Duration\([^)]*:\s*\d'))));
      expect(sources, isNot(contains('Icons.')));
    });
  });

  group('golden render matrices', () {
    for (final brightness in Brightness.values) {
      for (final locale in const <Locale>[Locale('en'), Locale('ar')]) {
        testWidgets(
          '${brightness.name} ${locale.languageCode} states and parts',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(800, 1200));
            addTearDown(() => tester.binding.setSurfaceSize(null));
            final focusNode = FocusNode();
            addTearDown(focusNode.dispose);
            const goldenKey = ValueKey<String>('text-field-golden');
            final ar = locale.languageCode == 'ar';

            await pumpBw(
              tester,
              RepaintBoundary(
                key: goldenKey,
                child: SizedBox(
                  width: 760,
                  height: 1160,
                  child: Builder(
                    builder: (context) => ColoredBox(
                      color: context.bw.colors.surfacePage,
                      child: Padding(
                        padding: const EdgeInsets.all(BwSpacing.lg),
                        child: Column(
                          children: <Widget>[
                            BwTextField(
                              label: ar ? 'الافتراضي' : 'Default',
                              placeholder: ar ? 'نص العنصر النائب' : 'Placeholder',
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'التركيز' : 'Focus',
                              initialValue: ar ? 'قيمة' : 'Value',
                              focusNode: focusNode,
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'خطأ' : 'Error',
                              errorText: ar ? 'أدخل قيمة صالحة' : 'Enter a valid value',
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'معطّل' : 'Disabled',
                              initialValue: ar ? 'قيمة' : 'Value',
                              enabled: false,
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'للقراءة فقط' : 'Read-only',
                              initialValue: ar ? 'قيمة' : 'Value',
                              readOnly: true,
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'المعدل بالساعة' : 'Hourly rate',
                              prefixText: r'$',
                              suffixText: 'SAR',
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'رمز المشاركة' : 'Share code',
                              endButton: BwTextFieldEndButton(
                                label: ar ? 'نسخ' : 'Copy',
                                onPressed: () {},
                              ),
                            ),
                            const SizedBox(height: BwSpacing.md),
                            BwTextField(
                              label: ar ? 'البريد الإلكتروني' : 'Work email',
                              helpText: ar ? 'نص المساعدة' : 'Help text',
                              action: BwTextFieldAction(
                                icon: Symbols.refresh_rounded,
                                label: ar ? 'تحديث' : 'Refresh',
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
            focusNode.requestFocus();
            await tester.pumpAndSettle();

            await expectLater(
              find.byKey(goldenKey),
              matchesGoldenFile(
                'goldens/text_field/text-field-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });
}

class _TrackedController extends TextEditingController {
  bool disposed = false;

  @override
  void dispose() {
    disposed = true;
    super.dispose();
  }
}

class _TrackedFocusNode extends FocusNode {
  bool disposed = false;

  @override
  void dispose() {
    disposed = true;
    super.dispose();
  }
}
