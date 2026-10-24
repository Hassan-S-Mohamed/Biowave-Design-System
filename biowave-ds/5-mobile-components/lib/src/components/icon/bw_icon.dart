import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// Size scale for [BwIcon] mapped to Biowave icon size tokens.
enum BwIconSize {
  xs,
  sm,
  md,
  lg,
  xl,
  xl2,
  xl3;

  /// Resolved logical-pixel dimension from [BwSize].
  double get dimension => switch (this) {
        BwIconSize.xs => BwSize.iconXs,
        BwIconSize.sm => BwSize.iconSm,
        BwIconSize.md => BwSize.iconMd,
        BwIconSize.lg => BwSize.iconLg,
        BwIconSize.xl => BwSize.iconXl,
        BwIconSize.xl2 => BwSize.iconXl2,
        BwIconSize.xl3 => BwSize.iconXl3,
      };
}

/// Semantic colour roles for [BwIcon] mapped to Biowave icon colour tokens.
enum BwIconColor {
  defaultColor,
  subtle,
  muted,
  inverse,
  brand,
  secondary,
  success,
  warning,
  error,
  info;

  /// Resolves this icon colour role from the active [BwColors] theme extension.
  Color resolve(BwColors colors) => switch (this) {
        BwIconColor.defaultColor => colors.iconNeutralDefault,
        BwIconColor.subtle => colors.iconNeutralSubtle,
        BwIconColor.muted => colors.iconNeutralMuted,
        BwIconColor.inverse => colors.iconNeutralInverse,
        BwIconColor.brand => colors.iconRoleBrand,
        BwIconColor.secondary => colors.iconRoleSecondary,
        BwIconColor.success => colors.iconRoleSuccess,
        BwIconColor.warning => colors.iconRoleWarning,
        BwIconColor.error => colors.iconRoleError,
        BwIconColor.info => colors.iconRoleInfo,
      };
}

/// Biowave Material Symbols Rounded icon component for Mobile.
class BwIcon extends StatelessWidget {
  const BwIcon({
    required this.icon,
    this.size,
    this.filled = false,
    this.color,
    this.directional = false,
    this.semanticLabel,
    super.key,
  }) : assert(
          !(size != null &&
              (color == BwIconColor.success ||
                  color == BwIconColor.warning ||
                  color == BwIconColor.error ||
                  color == BwIconColor.info) &&
              (semanticLabel == null || semanticLabel == '')),
          'status icons need text or a label',
        );

  /// The Material Symbols Rounded glyph (`Symbols.<name>_rounded`).
  final IconData icon;

  /// Optional explicit icon size; when `null`, inherits from [IconTheme].
  final BwIconSize? size;

  /// Whether to render the filled (`FILL 1`) glyph for selected/active states.
  final bool filled;

  /// Optional semantic icon colour; when `null`, inherits from [IconTheme].
  final BwIconColor? color;

  /// Whether the glyph mirrors horizontally in RTL layouts.
  final bool directional;

  /// Accessible label for standalone meaningful icons; when `null`, excluded from semantics.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final iconTheme = IconTheme.of(context);
    final resolvedSize = size?.dimension ?? iconTheme.size ?? BwSize.iconLg;
    final resolvedColor = color?.resolve(context.bw.colors) ??
        iconTheme.color ??
        context.bw.colors.iconNeutralDefault;
    final resolvedFill = filled ? BwIconAxes.fillSelected : BwIconAxes.fill;

    // Pass textDirection: TextDirection.ltr to the inner Icon so Flutter's built-in
    // IconData.matchTextDirection never performs an implicit flip; RTL mirroring is
    // controlled exclusively by `directional` via Transform.flip below.
    Widget glyph = Icon(
      icon,
      key: const ValueKey<String>('BwIcon.glyph'),
      size: resolvedSize,
      opticalSize: resolvedSize,
      fill: resolvedFill,
      weight: BwIconAxes.weight,
      grade: BwIconAxes.grade,
      color: resolvedColor,
      textDirection: TextDirection.ltr,
    );

    if (directional) {
      glyph = Transform.flip(
        flipX: Directionality.of(context) == TextDirection.rtl,
        child: glyph,
      );
    }

    final Widget container = SizedBox.square(
      key: const ValueKey<String>('BwIcon.container'),
      dimension: resolvedSize,
      child: glyph,
    );

    final label = semanticLabel;
    if (label == null || label.isEmpty) {
      return ExcludeSemantics(child: container);
    }

    return Semantics(
      label: label,
      image: true,
      child: ExcludeSemantics(child: container),
    );
  }
}
