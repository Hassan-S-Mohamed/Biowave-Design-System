import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';

/// State keys matching `text-field.tokens.json` (`Text field / State`).
enum BwTextFieldState {
  defaultState('default'),
  hover('hover'),
  focus('focus'),
  error('error'),
  disabled('disabled'),
  readOnly('read-only');

  const BwTextFieldState(this.tokenKey);
  final String tokenKey;
}

/// Resolved size metrics for [BwTextField] matching `Text field / Size`.
@immutable
final class BwTextFieldSizeMetrics {
  const BwTextFieldSizeMetrics({
    required this.height,
    required this.paddingInline,
    required this.gap,
    required this.labelGap,
    required this.supportingGap,
    required this.icon,
    required this.radius,
    required this.borderWidth,
    required this.actionBox,
    required this.actionInset,
  });

  final double height;
  final double paddingInline;
  final double gap;
  final double labelGap;
  final double supportingGap;
  final double icon;
  final double radius;
  final double borderWidth;
  final double actionBox;
  final double actionInset;
}

/// Resolved state colors and border width for [BwTextField] matching `Text field / State`.
@immutable
final class BwTextFieldStateColors {
  const BwTextFieldStateColors({
    required this.background,
    required this.border,
    required this.borderWidth,
    required this.label,
    required this.input,
    required this.placeholder,
    required this.icon,
    required this.supporting,
    required this.counter,
    required this.required,
    required this.addonBackground,
    required this.addonText,
    required this.errorIcon,
  });

  final Color background;
  final Color border;
  final double borderWidth;
  final Color label;
  final Color input;
  final Color placeholder;
  final Color icon;
  final Color supporting;
  final Color counter;
  final Color required;
  final Color addonBackground;
  final Color addonText;
  final Color errorIcon;
}

/// Token-only decoration and metrics resolver for [BwTextField].
abstract final class BwTextFieldDecoration {
  /// Component token alias map matching `text-field.tokens.json`.
  static const Map<String, Map<String, Map<String, String>>> tokenAliases = {
    'size': {
      'sm': {
        'height': '{size.control.height.sm}',
        'padding-inline': '{spacing.control.padding-inline.sm}',
        'gap': '{spacing.control.gap.sm}',
        'label-gap': '{spacing.sm}',
        'supporting-gap': '{spacing.xs}',
        'icon': '{size.icon.sm}',
        'radius': '{radius.md}',
        'border-width': '{border.width.default}',
        'action-box': '{size.icon.lg}',
        'action-inset': '{spacing.xs}',
      },
      'md': {
        'height': '{size.control.height.md}',
        'padding-inline': '{spacing.control.padding-inline.md}',
        'gap': '{spacing.control.gap.md}',
        'label-gap': '{spacing.sm}',
        'supporting-gap': '{spacing.xs}',
        'icon': '{size.icon.md}',
        'radius': '{radius.md}',
        'border-width': '{border.width.default}',
        'action-box': '{size.control.height.sm}',
        'action-inset': '{spacing.xs}',
      },
      'lg': {
        'height': '{size.control.height.lg}',
        'padding-inline': '{spacing.control.padding-inline.lg}',
        'gap': '{spacing.control.gap.lg}',
        'label-gap': '{spacing.sm}',
        'supporting-gap': '{spacing.xs}',
        'icon': '{size.icon.lg}',
        'radius': '{radius.md}',
        'border-width': '{border.width.default}',
        'action-box': '{size.control.height.md}',
        'action-inset': '{spacing.xs}',
      },
    },
    'state': {
      'default': {
        'background': '{color.background.base.default}',
        'border': '{color.border.input.default}',
        'border-width': '{border.width.default}',
        'label': '{color.text.neutral.default}',
        'input': '{color.text.neutral.default}',
        'placeholder': '{color.text.neutral.placeholder}',
        'icon': '{color.icon.neutral.muted}',
        'supporting': '{color.text.neutral.muted}',
        'counter': '{color.text.neutral.muted}',
        'required': '{color.text.role.error}',
        'addon-background': '{color.background.neutral.default}',
        'addon-text': '{color.text.neutral.subtle}',
        'error-icon': '{color.icon.role.error}',
      },
      'hover': {
        'background': '{color.background.base.default}',
        'border': '{color.border.input.hover}',
        'border-width': '{border.width.default}',
        'label': '{color.text.neutral.default}',
        'input': '{color.text.neutral.default}',
        'placeholder': '{color.text.neutral.placeholder}',
        'icon': '{color.icon.neutral.muted}',
        'supporting': '{color.text.neutral.muted}',
        'counter': '{color.text.neutral.muted}',
        'required': '{color.text.role.error}',
        'addon-background': '{color.background.neutral.default}',
        'addon-text': '{color.text.neutral.subtle}',
        'error-icon': '{color.icon.role.error}',
      },
      'focus': {
        'background': '{color.background.base.default}',
        'border': '{color.border.focus}',
        'border-width': '{border.width.focus}',
        'label': '{color.text.neutral.default}',
        'input': '{color.text.neutral.default}',
        'placeholder': '{color.text.neutral.placeholder}',
        'icon': '{color.icon.neutral.default}',
        'supporting': '{color.text.neutral.muted}',
        'counter': '{color.text.neutral.muted}',
        'required': '{color.text.role.error}',
        'addon-background': '{color.background.neutral.default}',
        'addon-text': '{color.text.neutral.subtle}',
        'error-icon': '{color.icon.role.error}',
      },
      'error': {
        'background': '{color.background.base.default}',
        'border': '{color.border.input.error}',
        'border-width': '{border.width.default}',
        'label': '{color.text.neutral.default}',
        'input': '{color.text.neutral.default}',
        'placeholder': '{color.text.neutral.placeholder}',
        'icon': '{color.icon.neutral.muted}',
        'supporting': '{color.text.role.error}',
        'counter': '{color.text.role.error}',
        'required': '{color.text.role.error}',
        'addon-background': '{color.background.neutral.default}',
        'addon-text': '{color.text.neutral.subtle}',
        'error-icon': '{color.icon.role.error}',
      },
      'disabled': {
        'background': '{color.background.base.disabled}',
        'border': '{color.border.disabled}',
        'border-width': '{border.width.default}',
        'label': '{color.text.neutral.disabled}',
        'input': '{color.text.neutral.disabled}',
        'placeholder': '{color.text.neutral.disabled}',
        'icon': '{color.icon.neutral.disabled}',
        'supporting': '{color.text.neutral.disabled}',
        'counter': '{color.text.neutral.disabled}',
        'required': '{color.text.neutral.disabled}',
        'addon-background': '{color.background.base.disabled}',
        'addon-text': '{color.text.neutral.disabled}',
        'error-icon': '{color.icon.neutral.disabled}',
      },
      'read-only': {
        'background': '{color.background.neutral.subtle}',
        'border': '{color.border.default}',
        'border-width': '{border.width.default}',
        'label': '{color.text.neutral.default}',
        'input': '{color.text.neutral.default}',
        'placeholder': '{color.text.neutral.placeholder}',
        'icon': '{color.icon.neutral.muted}',
        'supporting': '{color.text.neutral.muted}',
        'counter': '{color.text.neutral.muted}',
        'required': '{color.text.role.error}',
        'addon-background': '{color.background.neutral.default}',
        'addon-text': '{color.text.neutral.subtle}',
        'error-icon': '{color.icon.role.error}',
      },
    },
  };

  /// Normalizes [size] to the nearest allowed Tablet size (`md` or `lg`).
  static BwControlSize effectiveSize(BwControlSize size) => switch (size) {
        BwControlSize.sm || BwControlSize.md => BwControlSize.md,
        BwControlSize.lg || BwControlSize.xl => BwControlSize.lg,
      };

  /// Returns the size token metrics for [size].
  static BwTextFieldSizeMetrics sizeMetrics(BwControlSize size) =>
      switch (size) {
        BwControlSize.sm => const BwTextFieldSizeMetrics(
            height: BwSize.controlHeightSm,
            paddingInline: BwSpacing.controlPaddingInlineSm,
            gap: BwSpacing.controlGapSm,
            labelGap: BwSpacing.sm,
            supportingGap: BwSpacing.xs,
            icon: BwSize.iconSm,
            radius: BwRadius.md,
            borderWidth: BwBorder.widthDefault,
            actionBox: BwSize.iconLg,
            actionInset: BwSpacing.xs,
          ),
        BwControlSize.md => const BwTextFieldSizeMetrics(
            height: BwSize.controlHeightMd,
            paddingInline: BwSpacing.controlPaddingInlineMd,
            gap: BwSpacing.controlGapMd,
            labelGap: BwSpacing.sm,
            supportingGap: BwSpacing.xs,
            icon: BwSize.iconMd,
            radius: BwRadius.md,
            borderWidth: BwBorder.widthDefault,
            actionBox: BwSize.controlHeightSm,
            actionInset: BwSpacing.xs,
          ),
        BwControlSize.lg || BwControlSize.xl => const BwTextFieldSizeMetrics(
            height: BwSize.controlHeightLg,
            paddingInline: BwSpacing.controlPaddingInlineLg,
            gap: BwSpacing.controlGapLg,
            labelGap: BwSpacing.sm,
            supportingGap: BwSpacing.xs,
            icon: BwSize.iconLg,
            radius: BwRadius.md,
            borderWidth: BwBorder.widthDefault,
            actionBox: BwSize.controlHeightMd,
            actionInset: BwSpacing.xs,
          ),
      };

  /// Returns the state tokens for a given [BwTextFieldState].
  static BwTextFieldStateColors stateTokens(
    BuildContext context,
    BwTextFieldState state,
  ) {
    final colors = context.bw.colors;
    return switch (state) {
      BwTextFieldState.defaultState => BwTextFieldStateColors(
          background: colors.backgroundBaseDefault,
          border: colors.borderInputDefault,
          borderWidth: BwBorder.widthDefault,
          label: colors.textNeutralDefault,
          input: colors.textNeutralDefault,
          placeholder: colors.textNeutralPlaceholder,
          icon: colors.iconNeutralMuted,
          supporting: colors.textNeutralMuted,
          counter: colors.textNeutralMuted,
          required: colors.textRoleError,
          addonBackground: colors.backgroundNeutralDefault,
          addonText: colors.textNeutralSubtle,
          errorIcon: colors.iconRoleError,
        ),
      BwTextFieldState.hover => BwTextFieldStateColors(
          background: colors.backgroundBaseDefault,
          border: colors.borderInputHover,
          borderWidth: BwBorder.widthDefault,
          label: colors.textNeutralDefault,
          input: colors.textNeutralDefault,
          placeholder: colors.textNeutralPlaceholder,
          icon: colors.iconNeutralMuted,
          supporting: colors.textNeutralMuted,
          counter: colors.textNeutralMuted,
          required: colors.textRoleError,
          addonBackground: colors.backgroundNeutralDefault,
          addonText: colors.textNeutralSubtle,
          errorIcon: colors.iconRoleError,
        ),
      BwTextFieldState.focus => BwTextFieldStateColors(
          background: colors.backgroundBaseDefault,
          border: colors.borderFocus,
          borderWidth: BwBorder.widthFocus,
          label: colors.textNeutralDefault,
          input: colors.textNeutralDefault,
          placeholder: colors.textNeutralPlaceholder,
          icon: colors.iconNeutralDefault,
          supporting: colors.textNeutralMuted,
          counter: colors.textNeutralMuted,
          required: colors.textRoleError,
          addonBackground: colors.backgroundNeutralDefault,
          addonText: colors.textNeutralSubtle,
          errorIcon: colors.iconRoleError,
        ),
      BwTextFieldState.error => BwTextFieldStateColors(
          background: colors.backgroundBaseDefault,
          border: colors.borderInputError,
          borderWidth: BwBorder.widthDefault,
          label: colors.textNeutralDefault,
          input: colors.textNeutralDefault,
          placeholder: colors.textNeutralPlaceholder,
          icon: colors.iconNeutralMuted,
          supporting: colors.textRoleError,
          counter: colors.textRoleError,
          required: colors.textRoleError,
          addonBackground: colors.backgroundNeutralDefault,
          addonText: colors.textNeutralSubtle,
          errorIcon: colors.iconRoleError,
        ),
      BwTextFieldState.disabled => BwTextFieldStateColors(
          background: colors.backgroundBaseDisabled,
          border: colors.borderDisabled,
          borderWidth: BwBorder.widthDefault,
          label: colors.textNeutralDisabled,
          input: colors.textNeutralDisabled,
          placeholder: colors.textNeutralDisabled,
          icon: colors.iconNeutralDisabled,
          supporting: colors.textNeutralDisabled,
          counter: colors.textNeutralDisabled,
          required: colors.textNeutralDisabled,
          addonBackground: colors.backgroundBaseDisabled,
          addonText: colors.textNeutralDisabled,
          errorIcon: colors.iconNeutralDisabled,
        ),
      BwTextFieldState.readOnly => BwTextFieldStateColors(
          background: colors.backgroundNeutralSubtle,
          border: colors.borderDefault,
          borderWidth: BwBorder.widthDefault,
          label: colors.textNeutralDefault,
          input: colors.textNeutralDefault,
          placeholder: colors.textNeutralPlaceholder,
          icon: colors.iconNeutralMuted,
          supporting: colors.textNeutralMuted,
          counter: colors.textNeutralMuted,
          required: colors.textRoleError,
          addonBackground: colors.backgroundNeutralDefault,
          addonText: colors.textNeutralSubtle,
          errorIcon: colors.iconRoleError,
        ),
    };
  }

  /// Resolves the border [BorderSide] for a set of [WidgetState]s and `readOnly`.
  static BorderSide resolveBorderSide(
    BuildContext context,
    Set<WidgetState> states, {
    bool readOnly = false,
  }) {
    final disabledTokens = stateTokens(context, BwTextFieldState.disabled);
    if (states.contains(WidgetState.disabled)) {
      return BorderSide(
        color: disabledTokens.border,
        width: disabledTokens.borderWidth,
      );
    }

    final isFocused = states.contains(WidgetState.focused);
    if (states.contains(WidgetState.error)) {
      final errorTokens = stateTokens(context, BwTextFieldState.error);
      final focusTokens = stateTokens(context, BwTextFieldState.focus);
      return BorderSide(
        color: errorTokens.border,
        width: isFocused ? focusTokens.borderWidth : errorTokens.borderWidth,
      );
    }

    if (isFocused) {
      final focusTokens = stateTokens(context, BwTextFieldState.focus);
      return BorderSide(
        color: focusTokens.border,
        width: focusTokens.borderWidth,
      );
    }

    if (readOnly) {
      final readOnlyTokens = stateTokens(context, BwTextFieldState.readOnly);
      return BorderSide(
        color: readOnlyTokens.border,
        width: readOnlyTokens.borderWidth,
      );
    }

    if (states.contains(WidgetState.hovered)) {
      final hoverTokens = stateTokens(context, BwTextFieldState.hover);
      return BorderSide(
        color: hoverTokens.border,
        width: hoverTokens.borderWidth,
      );
    }

    final defaultTokens = stateTokens(context, BwTextFieldState.defaultState);
    return BorderSide(
      color: defaultTokens.border,
      width: defaultTokens.borderWidth,
    );
  }

  /// Resolves the background fill color for a set of [WidgetState]s and `readOnly`.
  static Color resolveFillColor(
    BuildContext context,
    Set<WidgetState> states, {
    bool readOnly = false,
  }) {
    if (states.contains(WidgetState.disabled)) {
      return stateTokens(context, BwTextFieldState.disabled).background;
    }
    if (readOnly) {
      return stateTokens(context, BwTextFieldState.readOnly).background;
    }
    if (states.contains(WidgetState.error)) {
      return stateTokens(context, BwTextFieldState.error).background;
    }
    if (states.contains(WidgetState.focused)) {
      return stateTokens(context, BwTextFieldState.focus).background;
    }
    if (states.contains(WidgetState.hovered)) {
      return stateTokens(context, BwTextFieldState.hover).background;
    }
    return stateTokens(context, BwTextFieldState.defaultState).background;
  }

  /// Resolves the input text color for a set of [WidgetState]s and `readOnly`.
  static Color resolveInputColor(
    BuildContext context,
    Set<WidgetState> states, {
    bool readOnly = false,
  }) {
    if (states.contains(WidgetState.disabled)) {
      return stateTokens(context, BwTextFieldState.disabled).input;
    }
    if (readOnly) {
      return stateTokens(context, BwTextFieldState.readOnly).input;
    }
    return stateTokens(context, BwTextFieldState.defaultState).input;
  }

  /// Resolves the placeholder text color for a set of [WidgetState]s and `readOnly`.
  static Color resolvePlaceholderColor(
    BuildContext context,
    Set<WidgetState> states, {
    bool readOnly = false,
  }) {
    if (states.contains(WidgetState.disabled)) {
      return stateTokens(context, BwTextFieldState.disabled).placeholder;
    }
    if (readOnly) {
      return stateTokens(context, BwTextFieldState.readOnly).placeholder;
    }
    return stateTokens(context, BwTextFieldState.defaultState).placeholder;
  }

  /// Resolves the leading/trailing icon color for a set of [WidgetState]s and `readOnly`.
  static Color resolveIconColor(
    BuildContext context,
    Set<WidgetState> states, {
    bool readOnly = false,
  }) {
    if (states.contains(WidgetState.disabled)) {
      return stateTokens(context, BwTextFieldState.disabled).icon;
    }
    if (states.contains(WidgetState.error)) {
      return stateTokens(context, BwTextFieldState.error).icon;
    }
    if (states.contains(WidgetState.focused)) {
      return stateTokens(context, BwTextFieldState.focus).icon;
    }
    if (readOnly) {
      return stateTokens(context, BwTextFieldState.readOnly).icon;
    }
    if (states.contains(WidgetState.hovered)) {
      return stateTokens(context, BwTextFieldState.hover).icon;
    }
    return stateTokens(context, BwTextFieldState.defaultState).icon;
  }

  /// Resolves the input [TextStyle] for [size].
  static TextStyle inputTextStyle(
    BuildContext context,
    BwControlSize size, {
    required bool enabled,
    bool readOnly = false,
  }) {
    final normalized = effectiveSize(size);
    final baseStyle = switch (normalized) {
      BwControlSize.sm => context.bw.text.bodySm,
      BwControlSize.md => context.bw.text.bodyMd,
      BwControlSize.lg || BwControlSize.xl => context.bw.text.bodyLg,
    };
    final states = <WidgetState>{
      if (!enabled) WidgetState.disabled,
    };
    return baseStyle.copyWith(
      color: resolveInputColor(context, states, readOnly: readOnly),
    );
  }

  /// Resolves the label [TextStyle] for [size].
  static TextStyle labelTextStyle(
    BuildContext context,
    BwControlSize size, {
    required bool enabled,
  }) {
    final normalized = effectiveSize(size);
    final baseStyle = switch (normalized) {
      BwControlSize.sm => context.bw.text.labelSm,
      BwControlSize.md => context.bw.text.labelMd,
      BwControlSize.lg || BwControlSize.xl => context.bw.text.labelLg,
    };
    final state =
        enabled ? BwTextFieldState.defaultState : BwTextFieldState.disabled;
    return baseStyle.copyWith(
      color: stateTokens(context, state).label,
    );
  }

  /// Resolves the border radius for the field container.
  static BorderRadius resolveBorderRadius(
    BuildContext context,
    BwControlSize size, {
    bool hasEndButton = false,
  }) {
    final metrics = sizeMetrics(effectiveSize(size));
    final radius = Radius.circular(metrics.radius);
    return BorderRadiusDirectional.only(
      topStart: radius,
      bottomStart: radius,
      topEnd: hasEndButton ? Radius.zero : radius,
      bottomEnd: hasEndButton ? Radius.zero : radius,
    ).resolve(Directionality.of(context));
  }

  /// Pure function building an [InputDecoration] from Biowave tokens only.
  static InputDecoration resolve({
    required BuildContext context,
    required BwControlSize size,
    required bool enabled,
    bool readOnly = false,
    bool hasError = false,
    bool multiline = false,
    bool hasPrefixAddon = false,
    bool hasLeadingIcon = false,
    bool hasTrailingAction = false,
    bool hasTrailingIcon = false,
    bool hasSuffixAddon = false,
    bool hasEndButton = false,
    String? hintText,
    Widget? prefixIcon,
    Widget? suffixIcon,
    Widget? helper,
    Widget? error,
    Widget? counter,
  }) {
    final normalized = effectiveSize(size);
    final metrics = sizeMetrics(normalized);
    final colors = context.bw.colors;
    final borderRadius = resolveBorderRadius(
      context,
      normalized,
      hasEndButton: hasEndButton,
    );

    final startPadding = (hasPrefixAddon || hasLeadingIcon)
        ? BwSpacing.none
        : metrics.paddingInline;
    final endPadding =
        (hasTrailingAction || hasTrailingIcon || hasSuffixAddon)
            ? BwSpacing.none
            : metrics.paddingInline;

    final double blockPadding;
    if (multiline) {
      blockPadding = metrics.gap;
    } else {
      final style = inputTextStyle(
        context,
        normalized,
        enabled: enabled,
        readOnly: readOnly,
      );
      assert(style.fontSize != null, 'style.fontSize must be non-null');
      final lineHeight = style.fontSize! * (style.height ?? 1.0);
      final computed = (metrics.height - lineHeight) / 2;
      blockPadding = computed > BwSpacing.none ? computed : BwSpacing.none;
    }

    final border = WidgetStateInputBorder.resolveWith((states) {
      final effectiveStates = <WidgetState>{
        ...states,
        if (!enabled) WidgetState.disabled,
        if (hasError && enabled) WidgetState.error,
      };
      return OutlineInputBorder(
        borderRadius: borderRadius,
        borderSide: resolveBorderSide(
          context,
          effectiveStates,
          readOnly: readOnly && enabled,
        ),
      );
    });

    final fillColor = WidgetStateColor.resolveWith((states) {
      final effectiveStates = <WidgetState>{
        ...states,
        if (!enabled) WidgetState.disabled,
        if (hasError && enabled) WidgetState.error,
      };
      return resolveFillColor(
        context,
        effectiveStates,
        readOnly: readOnly && enabled,
      );
    });

    final iconColor = WidgetStateColor.resolveWith((states) {
      final effectiveStates = <WidgetState>{
        ...states,
        if (!enabled) WidgetState.disabled,
        if (hasError && enabled) WidgetState.error,
      };
      return resolveIconColor(
        context,
        effectiveStates,
        readOnly: readOnly && enabled,
      );
    });

    final hintStyle = inputTextStyle(
      context,
      normalized,
      enabled: enabled,
      readOnly: readOnly,
    ).copyWith(
      color: resolvePlaceholderColor(
        context,
        <WidgetState>{if (!enabled) WidgetState.disabled},
        readOnly: readOnly && enabled,
      ),
    );

    return InputDecoration(
      isDense: false,
      isCollapsed: !multiline,
      filled: true,
      fillColor: fillColor,
      hoverColor: colors.backgroundTransparent,
      focusColor: colors.backgroundTransparent,
      floatingLabelBehavior: FloatingLabelBehavior.never,
      alignLabelWithHint: multiline,
      constraints: BoxConstraints(minHeight: metrics.height),
      contentPadding: EdgeInsetsDirectional.only(
        start: startPadding,
        end: endPadding,
        top: blockPadding,
        bottom: blockPadding,
      ),
      border: border,
      hintText: hintText,
      hintStyle: hintStyle,
      prefixIcon: prefixIcon,
      prefixIconColor: iconColor,
      prefixIconConstraints: const BoxConstraints(
        minWidth: BwSpacing.none,
        minHeight: BwSpacing.none,
      ),
      suffixIcon: suffixIcon,
      suffixIconColor: iconColor,
      suffixIconConstraints: const BoxConstraints(
        minWidth: BwSpacing.none,
        minHeight: BwSpacing.none,
      ),
      helper: helper,
      error: error,
      counter: counter,
      counterText: '',
    );
  }
}
