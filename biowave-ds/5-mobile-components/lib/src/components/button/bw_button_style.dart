import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';
import '../../common/bw_focus_ring.dart';
import 'bw_button.dart';

/// Token-only style resolver for [BwButton].
abstract final class BwButtonStyle {
  static ButtonStyle resolve(
    BuildContext context,
    BwButtonVariant variant,
    BwButtonColor color,
    BwControlSize size, {
    Key? focusRingKey,
    bool fullWidth = false,
  }) {
    final colors = context.bw.colors;
    final metrics = BwButtonStyle.metrics(context, size);
    final transparent = colors.backgroundTransparent;

    Color background(Set<WidgetState> states) {
      if (states.contains(WidgetState.disabled)) {
        return switch (variant) {
          BwButtonVariant.filled ||
          BwButtonVariant.tonal =>
            colors.backgroundNeutralDisabled,
          BwButtonVariant.outlined || BwButtonVariant.text => transparent,
        };
      }
      if (variant != BwButtonVariant.filled) {
        return variant == BwButtonVariant.tonal
            ? _tonalBackground(colors, color)
            : transparent;
      }
      if (states.contains(WidgetState.pressed)) {
        return _filledPressed(colors, color);
      }
      if (states.contains(WidgetState.hovered)) {
        return _filledHover(colors, color);
      }
      return _filledBackground(colors, color);
    }

    Color foreground(Set<WidgetState> states) {
      if (states.contains(WidgetState.disabled)) {
        return colors.textNeutralDisabled;
      }
      return variant == BwButtonVariant.filled
          ? _filledForeground(colors, color)
          : _quietForeground(colors, color);
    }

    Color icon(Set<WidgetState> states) {
      if (states.contains(WidgetState.disabled)) {
        return colors.iconNeutralDisabled;
      }
      return variant == BwButtonVariant.filled
          ? _filledIcon(colors, color)
          : _quietIcon(colors, color);
    }

    Color overlay(Set<WidgetState> states) {
      if (variant == BwButtonVariant.filled ||
          states.contains(WidgetState.disabled) ||
          states.contains(WidgetState.focused)) {
        return transparent;
      }
      if (states.contains(WidgetState.pressed)) {
        return colors.overlayPressed;
      }
      if (states.contains(WidgetState.hovered)) {
        return colors.overlayHover;
      }
      return transparent;
    }

    BorderSide side(Set<WidgetState> states) {
      final sideColor = states.contains(WidgetState.disabled)
          ? colors.borderDisabled
          : _outlineBorder(colors, color);
      return BorderSide(width: BwBorder.widthDefault, color: sideColor);
    }

    final radius = BorderRadiusDirectional.all(
      Radius.circular(metrics.radius),
    );

    return ButtonStyle(
      textStyle: WidgetStatePropertyAll<TextStyle>(metrics.textStyle),
      backgroundColor: WidgetStateProperty.resolveWith(background),
      foregroundColor: WidgetStateProperty.resolveWith(foreground),
      overlayColor: WidgetStateProperty.resolveWith(overlay),
      shadowColor: WidgetStatePropertyAll<Color>(transparent),
      surfaceTintColor: WidgetStatePropertyAll<Color>(transparent),
      elevation: const WidgetStatePropertyAll<double>(BwSpacing.none),
      padding: WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.only(
          start: metrics.paddingInline,
          end: metrics.paddingInline,
        ),
      ),
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(
          fullWidth ? double.infinity : BwSpacing.none,
          metrics.height,
        ),
      ),
      iconColor: WidgetStateProperty.resolveWith(icon),
      iconSize: WidgetStatePropertyAll<double>(metrics.iconSize),
      side: variant == BwButtonVariant.outlined
          ? WidgetStateProperty.resolveWith(side)
          : null,
      shape: WidgetStatePropertyAll<OutlinedBorder>(
        RoundedRectangleBorder(borderRadius: radius),
      ),
      visualDensity: VisualDensity.standard,
      tapTargetSize: MaterialTapTargetSize.padded,
      animationDuration:
          context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm,
      alignment: AlignmentDirectional.center,
      splashFactory: NoSplash.splashFactory,
      backgroundBuilder: (
        BuildContext builderContext,
        Set<WidgetState> states,
        Widget? child,
      ) =>
          BwFocusRing(
        focused: states.contains(WidgetState.focused),
        borderRadius: radius,
        color: color == BwButtonColor.inverse
            ? colors.borderInverse
            : colors.borderFocus,
        ringKey: focusRingKey,
        child: child ?? const SizedBox.shrink(),
      ),
    );
  }

  static BwButtonMetrics metrics(
    BuildContext context,
    BwControlSize size,
  ) =>
      switch (size) {
        BwControlSize.sm => BwButtonMetrics(
            height: BwSize.controlHeightSm,
            paddingInline: BwSpacing.controlPaddingInlineSm,
            gap: BwSpacing.controlGapSm,
            iconSize: BwSize.iconSm,
            radius: BwRadius.md,
            textStyle: context.bw.text.actionSm,
          ),
        BwControlSize.md => BwButtonMetrics(
            height: BwSize.controlHeightMd,
            paddingInline: BwSpacing.controlPaddingInlineMd,
            gap: BwSpacing.controlGapMd,
            iconSize: BwSize.iconMd,
            radius: BwRadius.md,
            textStyle: context.bw.text.actionMd,
          ),
        BwControlSize.lg => BwButtonMetrics(
            height: BwSize.controlHeightLg,
            paddingInline: BwSpacing.controlPaddingInlineLg,
            gap: BwSpacing.controlGapLg,
            iconSize: BwSize.iconLg,
            radius: BwRadius.md,
            textStyle: context.bw.text.actionLg,
          ),
        BwControlSize.xl => BwButtonMetrics(
            height: BwSize.controlHeightXl,
            paddingInline: BwSpacing.controlPaddingInlineXl,
            gap: BwSpacing.controlGapXl,
            iconSize: BwSize.iconLg,
            radius: BwRadius.xl,
            textStyle: context.bw.text.actionLg,
          ),
      };

  static Color _filledBackground(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.backgroundBrandDefault,
        BwButtonColor.secondary => colors.backgroundSecondaryDefault,
        BwButtonColor.neutral => colors.backgroundNeutralDefault,
        BwButtonColor.error => colors.backgroundErrorDefault,
        BwButtonColor.inverse => colors.backgroundInverseDefault,
      };

  static Color _filledHover(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.backgroundBrandHover,
        BwButtonColor.secondary => colors.backgroundSecondaryHover,
        BwButtonColor.neutral => colors.backgroundNeutralHover,
        BwButtonColor.error => colors.backgroundErrorHover,
        BwButtonColor.inverse => colors.backgroundInverseHover,
      };

  static Color _filledPressed(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.backgroundBrandPressed,
        BwButtonColor.secondary => colors.backgroundSecondaryPressed,
        BwButtonColor.neutral => colors.backgroundNeutralPressed,
        BwButtonColor.error => colors.backgroundErrorPressed,
        BwButtonColor.inverse => colors.backgroundInversePressed,
      };

  static Color _tonalBackground(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.backgroundBrandSubtle,
        BwButtonColor.secondary => colors.backgroundSecondarySubtle,
        BwButtonColor.error => colors.backgroundErrorSubtle,
        BwButtonColor.neutral ||
        BwButtonColor.inverse =>
          colors.backgroundTransparent,
      };

  static Color _filledForeground(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.textOnBrand,
        BwButtonColor.secondary => colors.textOnSecondary,
        BwButtonColor.error => colors.textOnError,
        BwButtonColor.neutral => colors.textNeutralDefault,
        BwButtonColor.inverse => colors.textRoleBrand,
      };

  static Color _filledIcon(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.iconOnBrand,
        BwButtonColor.secondary => colors.iconOnSecondary,
        BwButtonColor.error => colors.iconOnError,
        BwButtonColor.neutral => colors.iconNeutralDefault,
        BwButtonColor.inverse => colors.iconRoleBrand,
      };

  static Color _quietForeground(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.textRoleBrand,
        BwButtonColor.secondary => colors.textRoleSecondary,
        BwButtonColor.error => colors.textRoleError,
        BwButtonColor.neutral => colors.textNeutralDefault,
        BwButtonColor.inverse => colors.textOnBrand,
      };

  static Color _quietIcon(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.iconRoleBrand,
        BwButtonColor.secondary => colors.iconRoleSecondary,
        BwButtonColor.error => colors.iconRoleError,
        BwButtonColor.neutral => colors.iconNeutralDefault,
        BwButtonColor.inverse => colors.iconOnBrand,
      };

  static Color _outlineBorder(BwColors colors, BwButtonColor color) =>
      switch (color) {
        BwButtonColor.brand => colors.borderBrand,
        BwButtonColor.secondary => colors.borderSecondary,
        BwButtonColor.error => colors.borderError,
        BwButtonColor.neutral => colors.borderStrong,
        BwButtonColor.inverse => colors.borderInverse,
      };
}

class BwButtonMetrics {
  const BwButtonMetrics({
    required this.height,
    required this.paddingInline,
    required this.gap,
    required this.iconSize,
    required this.radius,
    required this.textStyle,
  });

  final double height;
  final double paddingInline;
  final double gap;
  final double iconSize;
  final double radius;
  final TextStyle textStyle;
}
