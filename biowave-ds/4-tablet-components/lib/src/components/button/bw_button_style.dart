import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/foundation.dart' show internal;
import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';
import 'bw_button.dart';
import 'bw_segment_border.dart';

/// Resolved dimensions used by both the button style and its child layout.
final class BwButtonMetrics {
  const BwButtonMetrics({
    required this.height,
    required this.paddingInline,
    required this.gap,
    required this.iconSize,
    required this.radius,
  });

  final double height;
  final double paddingInline;
  final double gap;
  final double iconSize;
  final double radius;
}

/// Token-only style resolver for [BwButton].
abstract final class BwButtonStyle {
  static BwButtonMetrics metrics(BwControlSize size) => switch (size) {
        BwControlSize.sm => const BwButtonMetrics(
            height: BwSize.controlHeightSm,
            paddingInline: BwSpacing.controlPaddingInlineSm,
            gap: BwSpacing.controlGapSm,
            iconSize: BwSize.iconSm,
            radius: BwRadius.md,
          ),
        BwControlSize.md => const BwButtonMetrics(
            height: BwSize.controlHeightMd,
            paddingInline: BwSpacing.controlPaddingInlineMd,
            gap: BwSpacing.controlGapMd,
            iconSize: BwSize.iconMd,
            radius: BwRadius.md,
          ),
        BwControlSize.lg => const BwButtonMetrics(
            height: BwSize.controlHeightLg,
            paddingInline: BwSpacing.controlPaddingInlineLg,
            gap: BwSpacing.controlGapLg,
            iconSize: BwSize.iconLg,
            radius: BwRadius.md,
          ),
        BwControlSize.xl => const BwButtonMetrics(
            height: BwSize.controlHeightXl,
            paddingInline: BwSpacing.controlPaddingInlineXl,
            gap: BwSpacing.controlGapXl,
            iconSize: BwSize.iconLg,
            radius: BwRadius.xl,
          ),
      };

  static ButtonStyle resolve(
    BuildContext context,
    BwButtonVariant variant,
    BwButtonColor color,
    BwControlSize size, {
    bool fullWidth = false,
  }) {
    final tokens = context.bw;
    final dimensions = metrics(size);
    final palette = _palette(context, variant, color);

    return ButtonStyle(
      animationDuration:
          tokens.reduceMotion ? BwDuration.instant : BwDuration.sm,
      backgroundColor: WidgetStateProperty.resolveWith(
        (states) => palette.background(states),
      ),
      foregroundColor: WidgetStateProperty.resolveWith(
        (states) => states.contains(WidgetState.disabled)
            ? palette.foregroundDisabled
            : palette.foreground,
      ),
      iconColor: WidgetStateProperty.resolveWith(
        (states) => states.contains(WidgetState.disabled)
            ? palette.iconDisabled
            : palette.icon,
      ),
      overlayColor: WidgetStateProperty.resolveWith(
        (states) => palette.overlay(states),
      ),
      side: WidgetStateProperty.resolveWith(
        (states) => palette.border(states),
      ),
      elevation: const WidgetStatePropertyAll<double>(0),
      shadowColor: WidgetStatePropertyAll<Color>(
        tokens.colors.backgroundTransparentDefault,
      ),
      splashFactory: NoSplash.splashFactory,
      visualDensity: VisualDensity.standard,
      tapTargetSize: MaterialTapTargetSize.padded,
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(fullWidth ? double.infinity : BwLayout.tablet.minTarget,
            dimensions.height),
      ),
      maximumSize: const WidgetStatePropertyAll<Size>(Size.infinite),
      padding: WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.symmetric(horizontal: dimensions.paddingInline),
      ),
      shape: WidgetStatePropertyAll<OutlinedBorder>(
        RoundedRectangleBorder(
          borderRadius: BorderRadiusDirectional.all(
            Radius.circular(dimensions.radius),
          ),
        ),
      ),
      textStyle: WidgetStatePropertyAll<TextStyle>(
        switch (size) {
          BwControlSize.sm => tokens.text.actionSm,
          BwControlSize.md => tokens.text.actionMd,
          BwControlSize.lg || BwControlSize.xl => tokens.text.actionLg,
        },
      ),
      iconSize: WidgetStatePropertyAll<double>(dimensions.iconSize),
    );
  }

  /// Shape for standalone and segmented buttons (B2): a joined Split button
  /// segment leaves its inner edge unstroked; the Divider is the shared edge.
  @internal
  static OutlinedBorder segmentShape(
    BorderRadiusGeometry borderRadius,
    BwButtonSegment? segment,
  ) =>
      segment == null
          ? RoundedRectangleBorder(borderRadius: borderRadius)
          : BwSegmentBorder(borderRadius: borderRadius, segment: segment);

  /// Resolves the corner radii for standalone and segmented buttons (B2).
  @internal
  static BorderRadiusDirectional segmentBorderRadius(
    BwButtonMetrics dimensions,
    BwButtonSegment? segment,
  ) {
    final outerRadius = Radius.circular(dimensions.radius);
    const innerRadius = Radius.circular(BwRadius.none);

    return switch (segment) {
      null => BorderRadiusDirectional.all(outerRadius),
      BwButtonSegment.start => BorderRadiusDirectional.only(
          topStart: outerRadius,
          bottomStart: outerRadius,
          topEnd: innerRadius,
          bottomEnd: innerRadius,
        ),
      BwButtonSegment.end => BorderRadiusDirectional.only(
          topStart: innerRadius,
          bottomStart: innerRadius,
          topEnd: outerRadius,
          bottomEnd: outerRadius,
        ),
    };
  }

  static _ButtonPalette _palette(
    BuildContext context,
    BwButtonVariant variant,
    BwButtonColor color,
  ) {
    final colors = context.bw.colors;
    final disabledBackground = colors.backgroundDisabled;
    final disabledForeground = colors.textDisabled;
    final disabledIcon = colors.iconDisabled;

    switch (variant) {
      case BwButtonVariant.filled:
        return _ButtonPalette(
          backgroundDefault: switch (color) {
            BwButtonColor.brand => colors.backgroundBrandDefault,
            BwButtonColor.secondary => colors.backgroundSecondaryDefault,
            BwButtonColor.neutral => colors.backgroundNeutralDefault,
            BwButtonColor.error => colors.backgroundErrorDefault,
            BwButtonColor.inverse => colors.backgroundInverseDefault,
          },
          backgroundHovered: switch (color) {
            BwButtonColor.brand => colors.backgroundBrandHovered,
            BwButtonColor.secondary => colors.backgroundSecondaryHovered,
            BwButtonColor.neutral => colors.backgroundNeutralHovered,
            BwButtonColor.error => colors.backgroundErrorHovered,
            BwButtonColor.inverse => colors.backgroundInverseHovered,
          },
          backgroundPressed: switch (color) {
            BwButtonColor.brand => colors.backgroundBrandPressed,
            BwButtonColor.secondary => colors.backgroundSecondaryPressed,
            BwButtonColor.neutral => colors.backgroundNeutralPressed,
            BwButtonColor.error => colors.backgroundErrorPressed,
            BwButtonColor.inverse => colors.backgroundInversePressed,
          },
          backgroundDisabled: disabledBackground,
          foreground: switch (color) {
            BwButtonColor.brand => colors.textOnBrand,
            BwButtonColor.secondary => colors.textOnSecondary,
            BwButtonColor.neutral => colors.textDefault,
            BwButtonColor.error => colors.textOnError,
            BwButtonColor.inverse => colors.textRoleBrand,
          },
          foregroundDisabled: disabledForeground,
          icon: switch (color) {
            BwButtonColor.brand => colors.iconOnBrand,
            BwButtonColor.secondary => colors.iconOnSecondary,
            BwButtonColor.neutral => colors.iconDefault,
            BwButtonColor.error => colors.iconOnError,
            BwButtonColor.inverse => colors.iconRoleBrand,
          },
          iconDisabled: disabledIcon,
          overlayDefault: colors.backgroundTransparentDefault,
          backgroundTransparentHovered: colors.backgroundTransparentDefault,
          backgroundTransparentPressed: colors.backgroundTransparentDefault,
        );
      case BwButtonVariant.tonal:
        return _ButtonPalette(
          backgroundDefault: switch (color) {
            BwButtonColor.brand => colors.backgroundBrandSubtle,
            BwButtonColor.secondary => colors.backgroundSecondarySubtle,
            BwButtonColor.error => colors.backgroundErrorSubtle,
            BwButtonColor.neutral ||
            BwButtonColor.inverse =>
              colors.backgroundTransparentDefault,
          },
          backgroundDisabled: disabledBackground,
          foreground: switch (color) {
            BwButtonColor.brand => colors.textRoleBrand,
            BwButtonColor.secondary => colors.textRoleSecondary,
            BwButtonColor.error => colors.textRoleError,
            BwButtonColor.neutral ||
            BwButtonColor.inverse =>
              colors.textDefault,
          },
          foregroundDisabled: disabledForeground,
          icon: switch (color) {
            BwButtonColor.brand => colors.iconRoleBrand,
            BwButtonColor.secondary => colors.iconRoleSecondary,
            BwButtonColor.error => colors.iconRoleError,
            BwButtonColor.neutral ||
            BwButtonColor.inverse =>
              colors.iconDefault,
          },
          iconDisabled: disabledIcon,
          overlayDefault: colors.backgroundTransparentDefault,
          backgroundTransparentHovered: colors.backgroundTransparentHovered,
          backgroundTransparentPressed: colors.backgroundTransparentPressed,
        );
      case BwButtonVariant.outlined:
      case BwButtonVariant.text:
        return _ButtonPalette(
          backgroundDefault: colors.backgroundTransparentDefault,
          backgroundDisabled: colors.backgroundTransparentDefault,
          foreground: switch (color) {
            BwButtonColor.brand => colors.textRoleBrand,
            BwButtonColor.secondary => colors.textRoleSecondary,
            BwButtonColor.neutral => colors.textDefault,
            BwButtonColor.error => colors.textRoleError,
            BwButtonColor.inverse => colors.textOnBrand,
          },
          foregroundDisabled: disabledForeground,
          icon: switch (color) {
            BwButtonColor.brand => colors.iconRoleBrand,
            BwButtonColor.secondary => colors.iconRoleSecondary,
            BwButtonColor.neutral => colors.iconDefault,
            BwButtonColor.error => colors.iconRoleError,
            BwButtonColor.inverse => colors.iconOnBrand,
          },
          iconDisabled: disabledIcon,
          overlayDefault: colors.backgroundTransparentDefault,
          backgroundTransparentHovered: colors.backgroundTransparentHovered,
          backgroundTransparentPressed: colors.backgroundTransparentPressed,
          borderDefault: variant == BwButtonVariant.outlined
              ? switch (color) {
                  BwButtonColor.brand => colors.borderBrand,
                  BwButtonColor.secondary => colors.borderSecondary,
                  BwButtonColor.neutral => colors.borderStrong,
                  BwButtonColor.error => colors.borderError,
                  BwButtonColor.inverse => colors.borderInverse,
                }
              : null,
          borderDisabled: variant == BwButtonVariant.outlined
              ? colors.borderDisabled
              : null,
        );
    }
  }
}

final class _ButtonPalette {
  const _ButtonPalette({
    required this.backgroundDefault,
    required this.backgroundDisabled,
    required this.foreground,
    required this.foregroundDisabled,
    required this.icon,
    required this.iconDisabled,
    required this.overlayDefault,
    required this.backgroundTransparentHovered,
    required this.backgroundTransparentPressed,
    this.backgroundHovered,
    this.backgroundPressed,
    this.borderDefault,
    this.borderDisabled,
  });

  final Color backgroundDefault;
  final Color? backgroundHovered;
  final Color? backgroundPressed;
  final Color backgroundDisabled;
  final Color foreground;
  final Color foregroundDisabled;
  final Color icon;
  final Color iconDisabled;
  final Color overlayDefault;
  final Color backgroundTransparentHovered;
  final Color backgroundTransparentPressed;
  final Color? borderDefault;
  final Color? borderDisabled;

  Color background(Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled)) return backgroundDisabled;
    if (states.contains(WidgetState.pressed)) {
      return backgroundPressed ?? backgroundDefault;
    }
    if (states.contains(WidgetState.hovered)) {
      return backgroundHovered ?? backgroundDefault;
    }
    return backgroundDefault;
  }

  Color overlay(Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled) ||
        states.contains(WidgetState.focused)) {
      return overlayDefault;
    }
    if (states.contains(WidgetState.pressed)) return backgroundTransparentPressed;
    if (states.contains(WidgetState.hovered)) return backgroundTransparentHovered;
    return overlayDefault;
  }

  BorderSide border(Set<WidgetState> states) {
    final color =
        states.contains(WidgetState.disabled) ? borderDisabled : borderDefault;
    if (color == null) return BorderSide.none;
    return BorderSide(color: color, width: BwBorder.widthDefault);
  }
}
