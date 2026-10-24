import 'dart:convert';
import 'dart:io';
import 'dart:ui' show PointerDeviceKind, SemanticsAction, Tristate;

import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:biowave_tablet/src/components/button/bw_button.dart';
import 'package:biowave_tablet/src/components/text_field/bw_field_action.dart';
import 'package:biowave_tablet/src/components/text_field/bw_field_addon.dart';
import 'package:biowave_tablet/src/components/text_field/bw_text_field_decoration.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

import 'helpers/bw_test_app.dart';

const _allowedSizes = <BwControlSize>[BwControlSize.md, BwControlSize.lg];
const _locales = <Locale>[Locale('en'), Locale('ar')];

Finder _fieldInputDecorator() => find
    .descendant(
      of: find.byKey(const ValueKey<String>('BwTextField.field')),
      matching: find.byType(InputDecorator),
    )
    .first;

void main() {
  group('BwTextField token contract', () {
    test('tokenAliases equals text-field.tokens.json', () {
      final tabletTokens = jsonDecode(
        File('components/text-field/text-field.tokens.json').readAsStringSync(),
      ) as Map<String, dynamic>;
      expect(
        tabletTokens[r'$extends'],
        '../../../3-web-components/components/text-field/text-field.tokens.json',
      );

      final webTokens = jsonDecode(
        File('../3-web-components/components/text-field/text-field.tokens.json')
            .readAsStringSync(),
      ) as Map<String, dynamic>;
      final tfTokens = webTokens['text-field'] as Map<String, dynamic>;

      for (final group in const ['size', 'state']) {
        final rawGroup = tfTokens[group] as Map<String, dynamic>;
        final expectedModes = <String, Map<String, String>>{};
        for (final entry in rawGroup.entries) {
          if (entry.key.startsWith(r'$')) continue;
          final modeMap = entry.value as Map<String, dynamic>;
          expectedModes[entry.key] = {
            for (final token in modeMap.entries)
              token.key: (token.value as Map<String, dynamic>)[r'$value']
                  as String,
          };
        }
        expect(BwTextFieldDecoration.tokenAliases[group], expectedModes);
      }
    });

    testWidgets(
      'bw_text_field_decoration unit test: resolved border, fill and text colours per WidgetState equal B3 tokens',
      (tester) async {
        for (final brightness in Brightness.values) {
          late BuildContext context;
          await tester.pumpBw(
            Builder(
              builder: (buildContext) {
                context = buildContext;
                return const SizedBox.shrink();
              },
            ),
            brightness: brightness,
          );

          final colors = context.bw.colors;

          // Default state
          expect(
            BwTextFieldDecoration.resolveBorderSide(context, const {}),
            BorderSide(
              color: colors.borderInputDefault,
              width: BwBorder.widthDefault,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveFillColor(context, const {}),
            colors.backgroundBaseDefault,
          );
          expect(
            BwTextFieldDecoration.resolveInputColor(context, const {}),
            colors.textNeutralDefault,
          );
          expect(
            BwTextFieldDecoration.resolvePlaceholderColor(context, const {}),
            colors.textNeutralPlaceholder,
          );
          expect(
            BwTextFieldDecoration.resolveIconColor(context, const {}),
            colors.iconNeutralMuted,
          );

          // Hover state
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.hovered},
            ),
            BorderSide(
              color: colors.borderInputHover,
              width: BwBorder.widthDefault,
            ),
          );

          // Focus state
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.focused},
            ),
            BorderSide(
              color: colors.borderFocus,
              width: BwBorder.widthFocus,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveIconColor(
              context,
              const {WidgetState.focused},
            ),
            colors.iconNeutralDefault,
          );

          // Error state (and Error + Focus)
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.error},
            ),
            BorderSide(
              color: colors.borderInputError,
              width: BwBorder.widthDefault,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.error, WidgetState.focused},
            ),
            BorderSide(
              color: colors.borderInputError,
              width: BwBorder.widthFocus,
            ),
          );
          // Neutral icons in error (AD-4)
          expect(
            BwTextFieldDecoration.resolveIconColor(
              context,
              const {WidgetState.error},
            ),
            colors.iconNeutralMuted,
          );

          // Disabled state
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.disabled, WidgetState.error, WidgetState.focused},
            ),
            BorderSide(
              color: colors.borderDisabled,
              width: BwBorder.widthDefault,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveFillColor(
              context,
              const {WidgetState.disabled},
            ),
            colors.backgroundBaseDisabled,
          );
          expect(
            BwTextFieldDecoration.resolveInputColor(
              context,
              const {WidgetState.disabled},
            ),
            colors.textNeutralDisabled,
          );
          expect(
            BwTextFieldDecoration.resolvePlaceholderColor(
              context,
              const {WidgetState.disabled},
            ),
            colors.textNeutralDisabled,
          );
          expect(
            BwTextFieldDecoration.resolveIconColor(
              context,
              const {WidgetState.disabled},
            ),
            colors.iconNeutralDisabled,
          );

          // Read-only state (and Read-only + Focus)
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {},
              readOnly: true,
            ),
            BorderSide(
              color: colors.borderDefault,
              width: BwBorder.widthDefault,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveBorderSide(
              context,
              const {WidgetState.focused},
              readOnly: true,
            ),
            BorderSide(
              color: colors.borderFocus,
              width: BwBorder.widthFocus,
            ),
          );
          expect(
            BwTextFieldDecoration.resolveFillColor(
              context,
              const {},
              readOnly: true,
            ),
            colors.backgroundNeutralSubtle,
          );
        }
      },
    );
  });

  group('BwTextField API and invalid combinations', () {
    testWidgets('uses documented defaults', (tester) async {
      await tester.pumpBw(
        const BwTextField(label: 'Work email'),
      );

      final field = tester.widget<BwTextField>(find.byType(BwTextField));
      expect(field.hideLabel, isFalse);
      expect(field.size, BwControlSize.lg);
      expect(field.requiredField, isFalse);
      expect(field.multiline, isFalse);
      expect(field.showCounter, isFalse);
      expect(field.clearable, isFalse);
      expect(field.obscureText, isFalse);
      expect(field.passwordToggle, isFalse);
      expect(field.readOnly, isFalse);
      expect(field.enabled, isTrue);
      expect(field.autovalidateMode, AutovalidateMode.disabled);
    });

    test('asserts every invalid combination', () {
      expect(
        () => BwTextField(label: ''),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(label: 'Small', size: BwControlSize.sm),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(label: 'XLarge', size: BwControlSize.xl),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(label: 'No limit', showCounter: true),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(label: 'Single minRows', minRows: 4),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(label: 'Single maxRows', maxRows: 6),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Multiline password',
          multiline: true,
          obscureText: true,
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Two actions',
          obscureText: true,
          clearable: true,
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Action and clear',
          action: BwTextFieldAction(
            icon: Symbols.search_rounded,
            label: 'Search',
            onPressed: () {},
          ),
          clearable: true,
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Trailing icon and action',
          trailingIcon: Symbols.lock_rounded,
          clearable: true,
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Multiline prefix',
          multiline: true,
          prefixText: 'http://',
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Multiline suffix',
          multiline: true,
          suffixText: 'SAR',
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Multiline endButton',
          multiline: true,
          endButton: BwTextFieldEndButton(label: 'Copy', onPressed: () {}),
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Suffix and endButton',
          suffixText: 'SAR',
          endButton: BwTextFieldEndButton(label: 'Copy', onPressed: () {}),
        ),
        throwsAssertionError,
      );
      expect(
        () => BwTextField(
          label: 'Controller and initial',
          controller: TextEditingController(),
          initialValue: 'test',
        ),
        throwsAssertionError,
      );
    });

    test('effectiveSize normalizes sm -> md and xl -> lg', () {
      expect(
        BwTextFieldDecoration.effectiveSize(BwControlSize.sm),
        BwControlSize.md,
      );
      expect(
        BwTextFieldDecoration.effectiveSize(BwControlSize.md),
        BwControlSize.md,
      );
      expect(
        BwTextFieldDecoration.effectiveSize(BwControlSize.lg),
        BwControlSize.lg,
      );
      expect(
        BwTextFieldDecoration.effectiveSize(BwControlSize.xl),
        BwControlSize.lg,
      );
    });

    testWidgets('owned controller and focusNode are disposed; supplied ones are never disposed', (
      tester,
    ) async {
      final suppliedController = TextEditingController(text: 'Hello');
      final suppliedFocus = FocusNode();
      addTearDown(suppliedController.dispose);
      addTearDown(suppliedFocus.dispose);

      // Mount with owned controller/focusNode first, then swap to supplied, then unmount.
      await tester.pumpBw(
        const BwTextField(label: 'Dynamic', initialValue: 'Owned'),
      );
      expect(find.text('Owned'), findsOneWidget);

      await tester.pumpBw(
        BwTextField(
          label: 'Dynamic',
          controller: suppliedController,
          focusNode: suppliedFocus,
        ),
      );
      expect(find.text('Hello'), findsOneWidget);

      await tester.pumpBw(const SizedBox.shrink());

      // Supplied controller and focusNode must still be usable (not disposed).
      expect(() => suppliedController.text = 'Still alive', returnsNormally);
      expect(() => suppliedFocus.hasFocus, returnsNormally);
    });
  });

  group('BwTextField rendering, dimensions, and layout', () {
    for (final brightness in Brightness.values) {
      for (final locale in _locales) {
        testWidgets(
          'renders every allowed size, single line and multiline, in ${brightness.name}/${locale.languageCode}',
          (tester) async {
            await tester.pumpBw(
              SingleChildScrollView(
                child: Column(
                  children: [
                    for (final size in _allowedSizes) ...[
                      BwTextField(
                        key: ValueKey<String>('single-${size.name}'),
                        label: 'Single ${size.name}',
                        size: size,
                        leadingIcon: Symbols.mail_rounded,
                        clearable: true,
                        initialValue: 'value',
                      ),
                      BwTextField(
                        key: ValueKey<String>('multi-${size.name}'),
                        label: 'Multi ${size.name}',
                        size: size,
                        multiline: true,
                        leadingIcon: Symbols.notes_rounded,
                        clearable: true,
                        initialValue: 'line 1',
                      ),
                    ],
                  ],
                ),
              ),
              brightness: brightness,
              locale: locale,
            );

            for (final size in _allowedSizes) {
              final singleFinder = find.descendant(
                of: find.byKey(ValueKey<String>('single-${size.name}')),
                matching: find.byType(InputDecorator),
              );
              final multiFinder = find.descendant(
                of: find.byKey(ValueKey<String>('multi-${size.name}')),
                matching: find.byType(InputDecorator),
              );
              final expectedHeight =
                  BwTextFieldDecoration.sizeMetrics(size).height;

              expect(tester.getSize(singleFinder).height, expectedHeight);
              expect(
                tester.getSize(multiFinder).height,
                greaterThan(expectedHeight),
              );
            }
          },
        );
      }
    }

    testWidgets(
      'exact field height per size; trailing action box = B2 action-box, inset BwSpacing.xs, inside the outline',
      (tester) async {
        for (final locale in _locales) {
          for (final size in _allowedSizes) {
            for (final multiline in const [false, true]) {
              await tester.pumpBw(
                SizedBox(
                  width: 480,
                  child: BwTextField(
                    label: 'Field',
                    size: size,
                    multiline: multiline,
                    action: BwTextFieldAction(
                      icon: Symbols.search_rounded,
                      label: 'Inspect',
                      onPressed: () {},
                    ),
                  ),
                ),
                locale: locale,
              );

              final metrics = BwTextFieldDecoration.sizeMetrics(size);
              final fieldRect = tester.getRect(_fieldInputDecorator());
              final actionRect = tester.getRect(
                find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
              );

              if (!multiline) {
                expect(fieldRect.height, metrics.height);
              }
              expect(actionRect.width, metrics.actionBox);
              expect(actionRect.height, metrics.actionBox);

              // Inside the outline on top and bottom by at least BwSpacing.xs
              expect(
                actionRect.top - fieldRect.top,
                greaterThanOrEqualTo(BwSpacing.xs),
              );
              expect(
                fieldRect.bottom - actionRect.bottom,
                greaterThanOrEqualTo(BwSpacing.xs),
              );

              // Inset BwSpacing.xs from inline end
              if (locale.languageCode == 'ar') {
                expect(actionRect.left - fieldRect.left, BwSpacing.xs);
              } else {
                expect(fieldRect.right - actionRect.right, BwSpacing.xs);
              }

              if (multiline) {
                final context = tester.element(find.byType(BwTextField));
                expect(
                  actionRect.top - fieldRect.top,
                  BwFieldAction.multilineTopInset(context, size),
                );
              }
            }
          }
        }
      },
    );

    testWidgets('text scale 2.0: no overflow, field grows', (tester) async {
      await tester.pumpBw(
        SizedBox(
          width: 480,
          child: BwTextField(
            label: 'Work email address',
            size: BwControlSize.md,
            initialValue: 'name@company.com',
            helperText: 'We send shift reminders to this address',
            maxLength: 80,
            showCounter: true,
            leadingIcon: Symbols.mail_rounded,
            clearable: true,
          ),
        ),
        textScaleFactor: 2.0,
      );

      expect(tester.takeException(), isNull);
      final fieldHeight = tester.getSize(_fieldInputDecorator()).height;
      expect(fieldHeight, greaterThan(BwSize.controlHeightMd));
    });
  });

  group('BwTextField semantics and accessibility', () {
    testWidgets(
      'semantics: one text-field node named by label (+ required), helper/error/counter read with it; trailing action, help icon and end button are separate nodes',
      (tester) async {
        final semantics = tester.ensureSemantics();
        await tester.pumpBw(
          SizedBox(
            width: 560,
            child: BwTextField(
              label: 'Work email',
              requiredField: true,
              helpText: 'Use your work email',
              helperText: 'Format: name@company.com',
              prefixText: 'https://',
              maxLength: 80,
              showCounter: true,
              clearable: true,
              initialValue: 'user@biowave.sa',
              endButton: BwTextFieldEndButton(
                label: 'Copy',
                onPressed: () {},
              ),
            ),
          ),
        );

        final helpSemantics = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.help-icon')),
            )
            .getSemanticsData();
        expect(helpSemantics.label, 'More information about Work email');
        expect(helpSemantics.flagsCollection.isButton, isTrue);
        expect(helpSemantics.hasAction(SemanticsAction.tap), isTrue);

        final clearSemantics = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            )
            .getSemanticsData();
        expect(clearSemantics.label, 'Clear Work email');
        expect(clearSemantics.flagsCollection.isButton, isTrue);
        expect(clearSemantics.hasAction(SemanticsAction.tap), isTrue);

        final endButtonSemantics = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.end-button')),
            )
            .getSemanticsData();
        expect(endButtonSemantics.label, 'Copy');
        expect(endButtonSemantics.flagsCollection.isButton, isTrue);
        expect(endButtonSemantics.hasAction(SemanticsAction.tap), isTrue);

        final textFieldNode = tester.getSemantics(find.byType(EditableText));
        final tfData = textFieldNode.getSemanticsData();
        expect(tfData.flagsCollection.isTextField, isTrue);
        expect(tfData.label, contains('Work email, required'));
        expect(tfData.label, contains('Format: name@company.com'));
        expect(tfData.label, contains('15 / 80'));
        // Inner buttons are NOT merged into the textField node's label
        expect(tfData.label, isNot(contains('Clear Work email')));
        expect(tfData.label, isNot(contains('More information')));
        expect(tfData.label, isNot(contains('Copy')));

        // Error state replaces helper text in semantics
        await tester.pumpBw(
          const SizedBox(
            width: 560,
            child: BwTextField(
              label: 'Work email',
              requiredField: true,
              helperText: 'Format: name@company.com',
              errorText: 'Enter a valid work email',
            ),
          ),
        );
        final errorData =
            tester.getSemantics(find.byType(EditableText)).getSemanticsData();
        expect(errorData.label, contains('Work email, required'));
        expect(errorData.label, contains('Enter a valid work email'));
        expect(errorData.label, isNot(contains('Format: name@company.com')));

        semantics.dispose();
      },
    );

    testWidgets(
      'disabled: field, trailing action and end button not focusable; help icon still reachable; helper text kept in semantics',
      (tester) async {
        final semantics = tester.ensureSemantics();
        var actionTapped = false;
        var endTapped = false;
        final secondFocus = FocusNode();
        addTearDown(secondFocus.dispose);

        await tester.pumpBw(
          SizedBox(
            width: 560,
            child: Column(
              children: [
                BwTextField(
                  label: 'Invite link',
                  enabled: false,
                  helpText: 'Share this URL',
                  helperText: 'Employee ID is fixed',
                  action: BwTextFieldAction(
                    icon: Symbols.search_rounded,
                    label: 'Inspect',
                    onPressed: () => actionTapped = true,
                  ),
                  endButton: BwTextFieldEndButton(
                    label: 'Copy',
                    onPressed: () => endTapped = true,
                  ),
                ),
                BwTextField(
                  label: 'Second field',
                  focusNode: secondFocus,
                ),
              ],
            ),
          ),
        );

        final helpData = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.help-icon')),
            )
            .getSemanticsData();
        final actionData = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            )
            .getSemanticsData();
        final endData = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.end-button')),
            )
            .getSemanticsData();

        expect(helpData.hasAction(SemanticsAction.tap), isTrue);
        expect(actionData.hasAction(SemanticsAction.tap), isFalse);
        expect(endData.hasAction(SemanticsAction.tap), isFalse);

        // Disabled field keeps helperText in semantics label
        final disabledFieldSemantics = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.field')).first,
            )
            .getSemanticsData();
        expect(disabledFieldSemantics.label, contains('Invite link'));
        expect(disabledFieldSemantics.label, contains('Employee ID is fixed'));
        expect(disabledFieldSemantics.flagsCollection.isFocused != Tristate.isTrue, isTrue);

        // Tab reaches help icon, and does not focus disabled field/action/endButton
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(
          tester
              .getSemantics(
                find.byKey(const ValueKey<String>('BwTextField.help-icon')),
              )
              .getSemanticsData()
              .flagsCollection
              .isFocused,
          Tristate.isTrue,
        );

        // Tab again skips the disabled field, trailing action, and end button, focusing the second field
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        expect(secondFocus.hasFocus, isTrue);

        final updatedFieldSemantics = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.field')).first,
            )
            .getSemanticsData();
        expect(updatedFieldSemantics.flagsCollection.isFocused != Tristate.isTrue, isTrue);

        final updatedActionData = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            )
            .getSemanticsData();
        final updatedEndData = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.end-button')),
            )
            .getSemanticsData();
        expect(updatedActionData.flagsCollection.isFocused != Tristate.isTrue, isTrue);
        expect(updatedActionData.flagsCollection.isEnabled, Tristate.isFalse);
        expect(updatedEndData.flagsCollection.isFocused != Tristate.isTrue, isTrue);
        expect(updatedEndData.flagsCollection.isEnabled, Tristate.isFalse);

        tester.semantics.tap(
          find.semantics.byLabel('More information about Invite link'),
        );
        await tester.pumpAndSettle();
        expect(find.text('Share this URL'), findsOneWidget);
        expect(actionTapped, isFalse);
        expect(endTapped, isFalse);

        semantics.dispose();
      },
    );

    testWidgets('hardware Tab order: help icon -> field -> trailing action -> end button', (
      tester,
    ) async {
      final fieldFocus = FocusNode();
      addTearDown(fieldFocus.dispose);

      await tester.pumpBw(
        SizedBox(
          width: 560,
          child: BwTextField(
            label: 'Invite link',
            focusNode: fieldFocus,
            helpText: 'Share this URL',
            action: BwTextFieldAction(
              icon: Symbols.search_rounded,
              label: 'Inspect',
              onPressed: () {},
            ),
            endButton: BwTextFieldEndButton(
              label: 'Copy',
              onPressed: () {},
            ),
          ),
        ),
      );

      // 1st Tab -> help icon
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(
        tester.getSemantics(
          find.descendant(
            of: find.byKey(const ValueKey<String>('BwTextField.help-icon')),
            matching: find.byType(BwIconButton),
          ),
        ).getSemanticsData().flagsCollection.isFocused,
        Tristate.isTrue,
      );

      // 2nd Tab -> field
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(fieldFocus.hasFocus, isTrue);

      // 3rd Tab -> trailing action
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(
        tester.getSemantics(
          find.descendant(
            of: find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            matching: find.byType(BwIconButton),
          ),
        ).getSemanticsData().flagsCollection.isFocused,
        Tristate.isTrue,
      );

      // 4th Tab -> end button
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      expect(
        tester.getSemantics(
          find.descendant(
            of: find.byKey(const ValueKey<String>('BwTextField.end-button')),
            matching: find.byType(BwButton),
          ),
        ).getSemanticsData().flagsCollection.isFocused,
        Tristate.isTrue,
      );
    });

    testWidgets(
      'meets tap target, labeled tap target, and text contrast guidelines',
      (tester) async {
        for (final brightness in Brightness.values) {
          for (final size in _allowedSizes) {
            await tester.pumpBw(
              SizedBox(
                width: 560,
                child: BwTextField(
                  label: 'Work email',
                  size: size,
                  helpText: 'We send shift reminders here',
                  helperText: 'Enter your company email',
                  clearable: true,
                  initialValue: 'name@biowave.sa',
                  endButton: BwTextFieldEndButton(
                    label: 'Copy',
                    onPressed: () {},
                  ),
                ),
              ),
              brightness: brightness,
            );

            if (size == BwControlSize.md) {
              final hitArea = tester.getSize(
                find.byKey(const ValueKey<String>('BwTextField.md-hit-area')),
              );
              expect(
                hitArea.height,
                greaterThanOrEqualTo(BwLayout.tablet.minTarget),
              );
            }

            await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
            await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
            await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
            await expectLater(tester, meetsGuideline(textContrastGuideline));
          }
        }
      },
    );

    testWidgets(
      'layout height equals control height at md and lg, label gap equals spacing-sm, and 48 dp tap target guideline passes',
      (tester) async {
        for (final size in _allowedSizes) {
          await tester.pumpBw(
            SizedBox(
              width: 560,
              child: BwTextField(
                label: 'Work email',
                size: size,
                helpText: 'We send shift reminders here',
                clearable: true,
                initialValue: 'name@biowave.sa',
              ),
            ),
          );

          final labelBottom = tester.getBottomLeft(
            find.byKey(const ValueKey<String>('BwTextField.label-row')),
          ).dy;
          final fieldTop = tester.getTopLeft(_fieldInputDecorator()).dy;
          final gap = fieldTop - labelBottom;
          expect(gap, BwSpacing.sm, reason: 'size ${size.name} label gap');

          final expectedHeight = size == BwControlSize.md
              ? BwSize.controlHeightMd
              : BwSize.controlHeightLg;
          final fieldHeight = tester.getSize(_fieldInputDecorator()).height;
          expect(
            fieldHeight,
            expectedHeight,
            reason: 'size ${size.name} layout height',
          );

          if (size == BwControlSize.md) {
            final hitAreaHeight = tester.getSize(
              find.byKey(const ValueKey<String>('BwTextField.md-hit-area')),
            ).height;
            expect(hitAreaHeight, BwSize.controlHeightMd);
          }

          await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
        }
      },
    );
  });

  group('BwTextField interactions', () {
    testWidgets(
      'clear: hidden when empty / read-only / disabled; clears, keeps focus, calls onChanged("") and onCleared',
      (tester) async {
        final semantics = tester.ensureSemantics();
        // Empty, read-only, disabled -> clear hidden
        await tester.pumpBw(
          const Column(
            children: [
              BwTextField(label: 'Empty', clearable: true),
              BwTextField(
                label: 'Read only',
                clearable: true,
                readOnly: true,
                initialValue: 'text',
              ),
              BwTextField(
                label: 'Disabled',
                clearable: true,
                enabled: false,
                initialValue: 'text',
              ),
            ],
          ),
        );
        expect(
          find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
          findsNothing,
        );

        // Editable with value -> clear visible and works via semantics tap
        String? changedValue;
        var clearedCount = 0;
        final focusNode = FocusNode();
        addTearDown(focusNode.dispose);

        await tester.pumpBw(
          BwTextField(
            label: 'Search',
            clearable: true,
            initialValue: 'Hassan',
            focusNode: focusNode,
            onChanged: (value) => changedValue = value,
            onCleared: () => clearedCount += 1,
          ),
        );

        expect(
          find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
          findsOneWidget,
        );

        tester.semantics.tap(find.semantics.byLabel('Clear Search'));
        await tester.pump();

        expect(changedValue, '');
        expect(clearedCount, 1);
        expect(focusNode.hasFocus, isTrue);
        expect(
          find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
          findsNothing,
        );
        semantics.dispose();
      },
    );

    testWidgets(
      'password toggle flips obscureText and semantics label; caret position kept',
      (tester) async {
        final semantics = tester.ensureSemantics();
        final controller = TextEditingController(text: 'secret123');
        final focusNode = FocusNode();
        addTearDown(controller.dispose);
        addTearDown(focusNode.dispose);

        await tester.pumpBw(
          BwTextField(
            label: 'Password',
            obscureText: true,
            controller: controller,
            focusNode: focusNode,
          ),
        );

        focusNode.requestFocus();
        controller.selection = const TextSelection.collapsed(offset: 4);
        await tester.pump();

        expect(
          tester.widget<EditableText>(find.byType(EditableText)).obscureText,
          isTrue,
        );
        final toggleNodeBefore = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            )
            .getSemanticsData();
        expect(toggleNodeBefore.label, 'Show password');
        expect(toggleNodeBefore.flagsCollection.isToggled, Tristate.isFalse);

        tester.semantics.tap(find.semantics.byLabel('Show password'));
        await tester.pump();

        expect(
          tester.widget<EditableText>(find.byType(EditableText)).obscureText,
          isFalse,
        );
        final toggleNodeAfter = tester
            .getSemantics(
              find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
            )
            .getSemanticsData();
        expect(toggleNodeAfter.label, 'Hide password');
        expect(toggleNodeAfter.flagsCollection.isToggled, Tristate.isTrue);
        expect(controller.selection.baseOffset, 4);
        expect(focusNode.hasFocus, isTrue);

        semantics.dispose();
      },
    );

    testWidgets(
      'help tooltip opens on tap and on keyboard activation, closes with Esc',
      (tester) async {
        await tester.pumpBw(
          const BwTextField(
            label: 'Work email',
            helpText: 'We send shift reminders here',
          ),
        );

        expect(find.text('We send shift reminders here'), findsNothing);

        // Open on tap
        await tester.tap(
          find.byKey(const ValueKey<String>('BwTextField.help-icon')),
        );
        await tester.pumpAndSettle();
        expect(find.text('We send shift reminders here'), findsOneWidget);

        // Close with Esc
        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
        expect(find.text('We send shift reminders here'), findsNothing);

        // Open via keyboard activation (Tab to help icon + Enter)
        await tester.sendKeyEvent(LogicalKeyboardKey.tab);
        await tester.pump();
        await tester.sendKeyEvent(LogicalKeyboardKey.enter);
        await tester.pumpAndSettle();
        expect(find.text('We send shift reminders here'), findsOneWidget);

        // Close with Esc again
        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pumpAndSettle();
        expect(find.text('We send shift reminders here'), findsNothing);
      },
    );

    testWidgets(
      'counter counts grapheme clusters (Arabic, emoji) and matches enforcement',
      (tester) async {
        final controller = TextEditingController(text: 'أ👨‍👩‍👧‍👦');
        addTearDown(controller.dispose);

        await tester.pumpBw(
          BwTextField(
            label: 'Note',
            controller: controller,
            maxLength: 5,
            showCounter: true,
          ),
        );

        // 'أ' (1 grapheme) + family emoji ZWJ sequence (1 grapheme) = 2 graphemes
        expect(find.text('2 / 5'), findsOneWidget);

        await tester.enterText(find.byType(TextFormField), 'أبجد👨‍👩‍👧‍👦هـ');
        await tester.pump();

        // Enforced at 5 grapheme clusters
        expect(controller.text.characters.length, 5);
        expect(find.text('5 / 5'), findsOneWidget);
      },
    );

    testWidgets('tap on leading icon, prefix, suffix, or md hit area focuses the field', (
      tester,
    ) async {
      final focusNode = FocusNode();
      addTearDown(focusNode.dispose);

      await tester.pumpBw(
        BwTextField(
          label: 'Website',
          size: BwControlSize.md,
          focusNode: focusNode,
          prefixText: 'https://',
          suffixText: '.com',
          leadingIcon: Symbols.mail_rounded,
        ),
      );

      for (final key in const [
        ValueKey<String>('BwTextField.leading-icon'),
        ValueKey<String>('BwTextField.prefix'),
        ValueKey<String>('BwTextField.suffix'),
        ValueKey<String>('BwTextField.label'),
      ]) {
        focusNode.unfocus();
        await tester.pump();
        expect(focusNode.hasFocus, isFalse);

        await tester.tap(find.byKey(key));
        await tester.pump();
        expect(focusNode.hasFocus, isTrue);
      }
    });

    testWidgets('RTL: layout mirrored, icons not mirrored, LTR content isolated', (
      tester,
    ) async {
      await tester.pumpBw(
        SizedBox(
          width: 560,
          child: BwTextField(
            label: 'الموقع',
            prefixText: 'https://',
            leadingIcon: Symbols.mail_rounded,
            clearable: true,
            initialValue: 'biowave',
            maxLength: 20,
            showCounter: true,
            endButton: BwTextFieldEndButton(
              label: 'نسخ',
              onPressed: () {},
            ),
          ),
        ),
        locale: const Locale('ar'),
      );

      final prefixRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.prefix')),
      );
      final leadingRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.leading-icon')),
      );
      final actionRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.trailing-action')),
      );
      final endButtonRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.end-button')),
      );

      // In RTL, prefix is on the right (inline start), then leading icon, then input, then action, then endButton on the left (inline end)
      expect(prefixRect.left, greaterThan(leadingRect.left));
      expect(leadingRect.left, greaterThan(actionRect.left));
      expect(actionRect.left, greaterThan(endButtonRect.left));

      // Non-directional icons (mail, close) do not add a horizontal flip Transform
      final leadingBwIcon = find.byKey(
        const ValueKey<String>('BwTextField.leading-icon'),
      );
      expect(
        find.descendant(of: leadingBwIcon, matching: find.byType(Transform)),
        findsNothing,
      );

      // Prefix ('https://') and counter ('7 / 20') are wrapped in LTR Directionality
      expect(BwFieldAddon.isIntrinsicallyLtr('https://'), isTrue);
      expect(BwFieldAddon.isIntrinsicallyLtr('ر.س'), isFalse);
      final counterElement = tester.element(
        find.byKey(const ValueKey<String>('BwTextField.counter')),
      );
      expect(Directionality.of(counterElement), TextDirection.ltr);
    });

    testWidgets('honours motion duration and reduced motion', (tester) async {
      // Default (reduceMotion: false): uses BwDuration.sm and BwEasing.standard
      await tester.pumpBw(
        const BwTextField(
          label: 'Work email',
          prefixText: 'https://',
          helperText: 'Helper',
          maxLength: 20,
          showCounter: true,
        ),
      );

      final defaultAddon = tester.widget<AnimatedContainer>(
        find.byKey(const ValueKey<String>('BwTextField.prefix')),
      );
      expect(defaultAddon.duration, BwDuration.sm);
      expect(defaultAddon.curve, BwEasing.standard);

      final defaultStyles = tester.widgetList<AnimatedDefaultTextStyle>(
        find.descendant(
          of: find.byType(BwTextField),
          matching: find.byType(AnimatedDefaultTextStyle),
        ),
      );
      for (final animated in defaultStyles) {
        expect(animated.duration, BwDuration.sm);
        expect(animated.curve, BwEasing.standard);
      }

      // reduceMotion: true: uses BwDuration.instant
      await tester.pumpBw(
        const BwTextField(
          label: 'Work email',
          prefixText: 'https://',
          helperText: 'Helper',
          maxLength: 20,
          showCounter: true,
        ),
        reduceMotion: true,
      );

      final addonContainer = tester.widget<AnimatedContainer>(
        find.byKey(const ValueKey<String>('BwTextField.prefix')),
      );
      expect(addonContainer.duration, BwDuration.instant);

      final animatedStyles = tester.widgetList<AnimatedDefaultTextStyle>(
        find.descendant(
          of: find.byType(BwTextField),
          matching: find.byType(AnimatedDefaultTextStyle),
        ),
      );
      for (final animated in animatedStyles) {
        expect(animated.duration, BwDuration.instant);
      }
    });

    testWidgets('Form integration: validator result is passed through to FormField', (
      tester,
    ) async {
      final formKey = GlobalKey<FormState>();
      final controller = TextEditingController();
      addTearDown(controller.dispose);

      await tester.pumpBw(
        SizedBox(
          width: 560,
          child: Form(
            key: formKey,
            child: BwTextField(
              label: 'Username',
              controller: controller,
              validator: (value) =>
                  (value == null || value.isEmpty) ? 'Username is required' : null,
            ),
          ),
        ),
      );

      // Initially valid before validate is called
      expect(find.text('Username is required'), findsNothing);
      expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsNothing);

      // Calling validate() on empty field must return false and show error message and error icon
      final isValidInitial = formKey.currentState!.validate();
      expect(isValidInitial, isFalse);
      await tester.pumpAndSettle();

      expect(find.text('Username is required'), findsOneWidget);
      expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsOneWidget);

      // Entering valid input and re-validating clears the error and returns true
      controller.text = 'hassansaid';
      final isValidFixed = formKey.currentState!.validate();
      expect(isValidFixed, isTrue);
      await tester.pumpAndSettle();

      expect(find.text('Username is required'), findsNothing);
      expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsNothing);
    });

    testWidgets(
      'Form integration: validate() then reset() removes error text, error border and error from semantics label',
      (tester) async {
        final formKey = GlobalKey<FormState>();
        final semantics = tester.ensureSemantics();

        await tester.pumpBw(
          SizedBox(
            width: 560,
            child: Form(
              key: formKey,
              child: BwTextField(
                label: 'Work email',
                helperText: 'Format: name@company.com',
                validator: (value) =>
                    (value == null || value.isEmpty) ? 'Email is required' : null,
              ),
            ),
          ),
        );

        // Initially: no error text, no error icon, helper text shown
        expect(find.text('Email is required'), findsNothing);
        expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsNothing);
        expect(find.text('Format: name@company.com'), findsOneWidget);

        var tfData = tester.getSemantics(find.byType(EditableText)).getSemanticsData();
        expect(tfData.label, contains('Work email'));
        expect(tfData.label, contains('Format: name@company.com'));
        expect(tfData.label, isNot(contains('Email is required')));

        // Validate -> returns false, error shown, error icon shown
        final valid = formKey.currentState!.validate();
        expect(valid, isFalse);
        await tester.pumpAndSettle();

        expect(find.text('Email is required'), findsOneWidget);
        expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsOneWidget);

        // Decoration error is shown
        var decorator = tester.widget<InputDecorator>(_fieldInputDecorator());
        expect(decorator.decoration.error, isNotNull);

        tfData = tester.getSemantics(find.byType(EditableText)).getSemanticsData();
        expect(tfData.label, contains('Work email'));
        expect(tfData.label, contains('Email is required'));
        expect(tfData.label, isNot(contains('Format: name@company.com')));

        // Reset -> removes error text, error border and error from semantics label
        formKey.currentState!.reset();
        await tester.pumpAndSettle();

        expect(find.text('Email is required'), findsNothing);
        expect(find.byKey(const ValueKey<String>('BwTextField.error-icon')), findsNothing);
        expect(find.text('Format: name@company.com'), findsOneWidget);

        decorator = tester.widget<InputDecorator>(_fieldInputDecorator());
        expect(decorator.decoration.error, isNull);

        tfData = tester.getSemantics(find.byType(EditableText)).getSemanticsData();
        expect(tfData.label, contains('Work email'));
        expect(tfData.label, contains('Format: name@company.com'));
        expect(tfData.label, isNot(contains('Email is required')));

        semantics.dispose();
      },
    );

    testWidgets('Form integration: autovalidateMode.onUserInteraction', (
      tester,
    ) async {
      final formKey = GlobalKey<FormState>();

      await tester.pumpBw(
        SizedBox(
          width: 560,
          child: Form(
            key: formKey,
            child: BwTextField(
              label: 'Email',
              autovalidateMode: AutovalidateMode.onUserInteraction,
              validator: (value) {
                if (value == null || value.isEmpty) return 'Email required';
                if (!value.contains('@')) return 'Must contain @';
                return null;
              },
            ),
          ),
        ),
      );

      expect(find.text('Email required'), findsNothing);

      // User types invalid text
      await tester.enterText(find.byType(EditableText), 'invalid');
      await tester.pumpAndSettle();
      expect(find.text('Must contain @'), findsOneWidget);
      expect(formKey.currentState!.validate(), isFalse);

      // User fixes the text
      await tester.enterText(find.byType(EditableText), 'user@biowave.sa');
      await tester.pumpAndSettle();
      expect(find.text('Must contain @'), findsNothing);
      expect(formKey.currentState!.validate(), isTrue);
    });

    testWidgets('empty field with affixes: shows no hintText, affixes in semantics hint only', (
      tester,
    ) async {
      final semantics = tester.ensureSemantics();

      await tester.pumpBw(
        const SizedBox(
          width: 560,
          child: BwTextField(
            label: 'Website',
            prefixText: 'https://',
            suffixText: '.sa',
          ),
        ),
      );

      final decorator = tester.widget<InputDecorator>(_fieldInputDecorator());
      expect(decorator.decoration.hintText, isNull);

      final tfNode = tester.getSemantics(find.byType(EditableText));
      final data = tfNode.getSemanticsData();
      expect(data.label, 'Website');
      expect(data.hint, 'https://, .sa');

      await tester.pumpBw(
        const SizedBox(
          width: 560,
          child: BwTextField(
            label: 'Website',
            placeholder: 'biowave',
            prefixText: 'https://',
            suffixText: '.sa',
          ),
        ),
      );
      final decoratorWithPlaceholder =
          tester.widget<InputDecorator>(_fieldInputDecorator());
      expect(decoratorWithPlaceholder.decoration.hintText, 'biowave');

      semantics.dispose();
    });

    testWidgets('end button: BwButton uses segment: BwButtonSegment.end; loading paints spinner', (
      tester,
    ) async {
      await tester.pumpBw(
        SizedBox(
          width: 560,
          child: BwTextField(
            label: 'API Key',
            endButton: BwTextFieldEndButton(
              label: 'Copy',
              loading: true,
              onPressed: () {},
            ),
          ),
        ),
      );

      final button = tester.widget<BwButton>(
        find.descendant(
          of: find.byKey(const ValueKey<String>('BwTextField.end-button')),
          matching: find.byType(BwButton),
        ),
      );
      expect(button.segment, BwButtonSegment.end);
      expect(button.loading, isTrue);

      final spinnerFinder = find.byType(CircularProgressIndicator);
      expect(spinnerFinder, findsOneWidget);

      final spinnerRender = tester.renderObject(spinnerFinder);
      expect(spinnerRender.attached, isTrue);
      expect(spinnerRender.debugNeedsPaint, isFalse);
      expect(spinnerRender.paintBounds.size, isNot(Size.zero));
    });

    testWidgets('supporting-row start and counter end insets are consistent across all layouts', (
      tester,
    ) async {
      // Field with leading icon
      await tester.pumpBw(
        const SizedBox(
          width: 560,
          child: BwTextField(
            label: 'Email',
            leadingIcon: Symbols.mail_rounded,
            helperText: 'Helper text',
          ),
        ),
      );
      final fieldWithIconRect = tester.getRect(_fieldInputDecorator());
      final helperWithIconRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.supporting-text')),
      );
      final insetWithIcon = helperWithIconRect.left - fieldWithIconRect.left;

      // Field without leading icon (multiline)
      await tester.pumpBw(
        const SizedBox(
          width: 560,
          child: BwTextField(
            label: 'Notes',
            multiline: true,
            helperText: 'Helper text',
          ),
        ),
      );
      final fieldMultiRect = tester.getRect(_fieldInputDecorator());
      final helperMultiRect = tester.getRect(
        find.byKey(const ValueKey<String>('BwTextField.supporting-text')),
      );
      final insetMulti = helperMultiRect.left - fieldMultiRect.left;

      expect(insetMulti, closeTo(insetWithIcon, 0.01));
      expect(insetWithIcon, closeTo(BwSpacing.xs, 0.01));
    });

    testWidgets('hover state updates add-on divider border colour', (
      tester,
    ) async {
      await tester.pumpBw(
        const BwTextField(
          label: 'Website',
          prefixText: 'https://',
        ),
      );

      final context = tester.element(find.byType(BwTextField));
      final gesture = await tester.createGesture(kind: PointerDeviceKind.mouse);
      await gesture.addPointer(location: Offset.zero);
      addTearDown(gesture.removePointer);

      await gesture.moveTo(tester.getCenter(_fieldInputDecorator()));
      await tester.pump();

      final addonContainer = tester.widget<AnimatedContainer>(
        find.byKey(const ValueKey<String>('BwTextField.prefix')),
      );
      final decoration = addonContainer.decoration! as BoxDecoration;
      final border = decoration.border! as BorderDirectional;
      expect(border.end.color, context.bw.colors.borderInputHover);
    });
  });

  group('BwTextField goldens', () {
    for (final brightness in Brightness.values) {
      for (final locale in _locales) {
        testWidgets(
          'B9 golden matrix ${brightness.name}/${locale.languageCode}',
          (tester) async {
            await tester.binding.setSurfaceSize(const Size(1100, 960));
            addTearDown(() => tester.binding.setSurfaceSize(null));

            final focusNode = FocusNode();
            addTearDown(focusNode.dispose);

            await tester.pumpBw(
              RepaintBoundary(
                key: const ValueKey<String>('text-field-golden'),
                child: _TextFieldGoldenBoard(
                  locale: locale,
                  focusNode: focusNode,
                ),
              ),
              brightness: brightness,
              locale: locale,
            );
            focusNode.requestFocus();
            await tester.pumpAndSettle();

            await expectLater(
              find.byKey(const ValueKey<String>('text-field-golden')),
              matchesGoldenFile(
                'goldens/text_field/'
                'text-field-${brightness.name}-${locale.languageCode}.png',
              ),
            );
          },
        );
      }
    }
  });

  test(
    'no raw colours, sizes or durations in the source (no Color(0x, no numeric EdgeInsets/SizedBox literals, no BwPalette)',
    () {
      final files = [
        'lib/src/components/text_field/bw_text_field.dart',
        'lib/src/components/text_field/bw_text_field_decoration.dart',
        'lib/src/components/text_field/bw_field_label.dart',
        'lib/src/components/text_field/bw_field_addon.dart',
        'lib/src/components/text_field/bw_field_action.dart',
        'lib/src/components/text_field/bw_field_supporting.dart',
      ];
      for (final path in files) {
        final source = File(path).readAsStringSync();
        expect(source, isNot(contains('Color(0x')), reason: path);
        expect(
          source,
          isNot(matches(RegExp(r'#[0-9a-fA-F]{3,8}'))),
          reason: path,
        );
        expect(
          source,
          isNot(matches(RegExp(r'EdgeInsets(?:Directional)?\.[^(]+\(\s*\d'))),
          reason: path,
        );
        expect(
          source,
          isNot(
            matches(
              RegExp(r'SizedBox(?:\.square)?\([^)]*(?:width|height|dimension):\s*\d'),
            ),
          ),
          reason: path,
        );
        expect(source, isNot(contains('Duration(milliseconds:')), reason: path);
        expect(source, isNot(contains('BwPalette')), reason: path);
        expect(source, isNot(contains('Icons.')), reason: path);
      }
    },
  );
}

class _TextFieldGoldenBoard extends StatelessWidget {
  const _TextFieldGoldenBoard({
    required this.locale,
    required this.focusNode,
  });

  final Locale locale;
  final FocusNode focusNode;

  @override
  Widget build(BuildContext context) {
    final isAr = locale.languageCode == 'ar';
    return Material(
      color: context.bw.colors.surfacePage,
      child: SizedBox(
        width: 1100,
        height: 960,
        child: Padding(
          padding: const EdgeInsetsDirectional.all(BwSpacing.xl3),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    BwTextField(
                      label: isAr ? 'البريد الإلكتروني للعمل' : 'Work email',
                      placeholder: 'name@company.com',
                      requiredField: true,
                      leadingIcon: Symbols.mail_rounded,
                      helpText: isAr
                          ? 'نرسل تذكيرات الورديات إلى هذا العنوان'
                          : 'We send shift reminders to this address',
                      helperText: isAr
                          ? 'استخدم بريد الشركة الرسمي'
                          : 'Use your company email address',
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'التركيز (Focus)' : 'Focused field',
                      focusNode: focusNode,
                      initialValue: isAr ? 'أحمد العتيبي' : 'Ahmed Al-Otaibi',
                      leadingIcon: Symbols.person_rounded,
                      clearable: true,
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'حالة الخطأ' : 'Error state',
                      initialValue: 'invalid-email',
                      leadingIcon: Symbols.mail_rounded,
                      errorText: isAr
                          ? 'أدخل بريدًا إلكترونيًا صالحًا للعمل'
                          : 'Enter a valid work email',
                      maxLength: 80,
                      showCounter: true,
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'معطل' : 'Disabled state',
                      enabled: false,
                      initialValue: 'BW-1042',
                      leadingIcon: Symbols.badge_rounded,
                      helperText: isAr ? 'معرف الموظف ثابت' : 'Employee ID is fixed',
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'للقراءة فقط' : 'Read-only state',
                      readOnly: true,
                      initialValue: 'https://biowave.sa/invite/9f3c',
                      endButton: BwTextFieldEndButton(
                        label: isAr ? 'نسخ' : 'Copy',
                        icon: Symbols.content_copy_rounded,
                        onPressed: _noop,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: BwSpacing.xl3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    BwTextField(
                      label: isAr ? 'أجر الساعة (MD)' : 'Hourly rate (MD)',
                      size: BwControlSize.md,
                      suffixText: 'SAR',
                      initialValue: '120',
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'الموقع الإلكتروني' : 'Website',
                      prefixText: 'https://',
                      initialValue: 'biowave.sa',
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'كلمة المرور' : 'Password',
                      obscureText: true,
                      initialValue: 'secret123',
                    ),
                    const SizedBox(height: BwSpacing.xl),
                    BwTextField(
                      label: isAr ? 'سبب الطلب' : 'Request reason',
                      multiline: true,
                      minRows: 3,
                      maxLength: 400,
                      showCounter: true,
                      clearable: true,
                      initialValue: isAr
                          ? 'أحتاج إلى العمل عن بُعد يوم الخميس.'
                          : 'Need remote work on Thursday for an appointment.',
                      helperText: isAr
                          ? 'اشرح سبب حاجتك إلى العمل عن بُعد'
                          : 'Explain why you need remote work',
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static void _noop() {}
}
