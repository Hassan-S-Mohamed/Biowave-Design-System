import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';
import '../icon/bw_icon.dart';
import 'bw_text_field_decoration.dart';

/// Package-private supporting text, error icon and counter widgets
/// (`supporting-text`, `error-icon`, `counter`) shared across Biowave form fields.
abstract final class BwFieldSupporting {
  /// Builds the `helper` widget for [InputDecoration.helper].
  static Widget? buildHelper(
    BuildContext context, {
    required String? helperText,
    required BwControlSize size,
    required bool enabled,
  }) {
    if (helperText == null || helperText.isEmpty) return null;
    final state =
        enabled ? BwTextFieldState.defaultState : BwTextFieldState.disabled;
    final stateColors = BwTextFieldDecoration.stateTokens(context, state);
    final style = context.bw.text.captionMd.copyWith(
      color: stateColors.supporting,
    );
    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    return ExcludeSemantics(
      child: AnimatedDefaultTextStyle(
        duration: duration,
        curve: BwEasing.standard,
        style: style,
        child: Text(
          helperText,
          key: const ValueKey<String>('BwTextField.supporting-text'),
        ),
      ),
    );
  }

  /// Builds the `error` widget (`error-icon` + `supporting-text`) for
  /// [InputDecoration.error].
  static Widget? buildError(
    BuildContext context, {
    required String? errorText,
    required BwControlSize size,
    required bool enabled,
  }) {
    if (!enabled || errorText == null || errorText.isEmpty) return null;
    final stateColors = BwTextFieldDecoration.stateTokens(
      context,
      BwTextFieldState.error,
    );
    final style = context.bw.text.captionMd.copyWith(
      color: stateColors.supporting,
    );
    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    return ExcludeSemantics(
      child: Row(
        key: const ValueKey<String>('BwTextField.supporting-row'),
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsetsDirectional.only(end: BwSpacing.xs),
            child: IconTheme.merge(
              data: IconThemeData(
                size: BwSize.iconSm,
                opticalSize: BwSize.iconSm,
                color: stateColors.errorIcon,
              ),
              child: const BwIcon(
                key: ValueKey<String>('BwTextField.error-icon'),
                icon: Symbols.error_rounded,
              ),
            ),
          ),
          Flexible(
            child: AnimatedDefaultTextStyle(
              duration: duration,
              curve: BwEasing.standard,
              style: style,
              child: Text(
                errorText,
                key: const ValueKey<String>('BwTextField.supporting-text'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// Builds the `counter` widget for [InputDecoration.counter].
  static Widget? buildCounter(
    BuildContext context, {
    required String value,
    required int? maxLength,
    required bool showCounter,
    required bool enabled,
    required bool hasError,
  }) {
    if (!showCounter || maxLength == null) return null;
    final state = !enabled
        ? BwTextFieldState.disabled
        : (hasError ? BwTextFieldState.error : BwTextFieldState.defaultState);
    final stateColors = BwTextFieldDecoration.stateTokens(context, state);
    final style = context.bw.text.captionMd.copyWith(
      color: stateColors.counter,
    );
    final count = value.characters.length;
    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    return Directionality(
      textDirection: TextDirection.ltr,
      child: AnimatedDefaultTextStyle(
        duration: duration,
        curve: BwEasing.standard,
        style: style,
        child: Text(
          '$count / $maxLength',
          key: const ValueKey<String>('BwTextField.counter'),
        ),
      ),
    );
  }
}
