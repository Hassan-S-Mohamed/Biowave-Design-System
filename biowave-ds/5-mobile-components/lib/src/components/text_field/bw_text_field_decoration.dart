import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import 'bw_field_supporting.dart';

/// Builds the token-only input decoration shared by Biowave field components.
InputDecoration buildBwTextFieldDecoration({
  required BuildContext context,
  required bool enabled,
  required bool readOnly,
  required String? placeholder,
  required Widget? prefixIcon,
  required Widget? suffixIcon,
  required String? helperText,
  required String? counterText,
  required BorderRadiusGeometry borderRadius,
  bool hasError = false,
}) {
  final colors = context.bw.colors;
  final resolvedRadius = borderRadius.resolve(Directionality.of(context));

  Color borderColor(Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled)) {
      return colors.borderDisabled;
    }
    if (states.contains(WidgetState.error)) {
      return colors.borderInputError;
    }
    if (states.contains(WidgetState.focused)) {
      return colors.borderFocus;
    }
    if (states.contains(WidgetState.hovered)) {
      return colors.borderInputHover;
    }
    if (readOnly) {
      return colors.borderDefault;
    }
    return colors.borderInputDefault;
  }

  double borderWidth(Set<WidgetState> states) {
    return states.contains(WidgetState.focused)
        ? BwBorder.widthFocus
        : BwBorder.widthDefault;
  }

  final stateBorder = WidgetStateInputBorder.resolveWith(
    (Set<WidgetState> states) => OutlineInputBorder(
      borderRadius: resolvedRadius,
      borderSide: BorderSide(
        width: borderWidth(states),
        color: borderColor(states),
      ),
    ),
  );
  final fillColor = WidgetStateColor.resolveWith((Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled)) {
      return colors.backgroundBaseDisabled;
    }
    if (readOnly) {
      return colors.backgroundNeutralSubtle;
    }
    return colors.backgroundBaseDefault;
  });
  final iconColor = WidgetStateColor.resolveWith((Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled)) {
      return colors.iconNeutralDisabled;
    }
    if (states.contains(WidgetState.error)) {
      return colors.iconNeutralMuted;
    }
    if (states.contains(WidgetState.focused)) {
      return colors.iconNeutralDefault;
    }
    return colors.iconNeutralMuted;
  });
  final inputColor =
      enabled ? colors.textNeutralDefault : colors.textNeutralDisabled;
  final placeholderColor =
      enabled ? colors.textNeutralPlaceholder : colors.textNeutralDisabled;
  final supportingColor =
      enabled ? colors.textNeutralMuted : colors.textNeutralDisabled;
  final counterColor = !enabled
      ? colors.textNeutralDisabled
      : hasError
          ? colors.textRoleError
          : colors.textNeutralMuted;

  return InputDecoration(
    isDense: false,
    filled: true,
    fillColor: fillColor,
    focusColor: Colors.transparent,
    hoverColor: Colors.transparent,
    hintText: placeholder,
    hintStyle: context.bw.text.bodyLg.copyWith(color: placeholderColor),
    helper: helperText == null
        ? null
        : BwFieldSupporting.message(
            text: helperText,
            color: supportingColor,
            error: false,
          ),
    counter: counterText == null
        ? null
        : BwFieldSupporting.counter(text: counterText, color: counterColor),
    prefixIcon: prefixIcon,
    suffixIcon: suffixIcon,
    prefixIconColor: iconColor,
    suffixIconColor: iconColor,
    prefixIconConstraints: const BoxConstraints(),
    suffixIconConstraints: const BoxConstraints(),
    contentPadding: const EdgeInsetsDirectional.symmetric(
      horizontal: BwSpacing.controlPaddingInlineLg,
      vertical: BwSpacing.controlGapLg,
    ),
    constraints: const BoxConstraints(minHeight: BwSize.controlHeightLg),
    border: stateBorder,
    floatingLabelBehavior: FloatingLabelBehavior.never,
    visualDensity: VisualDensity.standard,
    helperStyle: context.bw.text.captionMd.copyWith(color: supportingColor),
    errorStyle: context.bw.text.captionMd.copyWith(color: colors.textRoleError),
    counterStyle: context.bw.text.captionMd.copyWith(color: counterColor),
    errorMaxLines: 2,
  ).copyWith(
    // Keep input text resolution next to the decoration for unit verification.
    labelStyle: context.bw.text.bodyLg.copyWith(color: inputColor),
  );
}
