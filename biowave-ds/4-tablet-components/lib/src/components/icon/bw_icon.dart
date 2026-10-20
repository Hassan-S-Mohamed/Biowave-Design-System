import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// The semantic size scale for a [BwIcon].
enum BwIconSize { xs, sm, md, lg, xl, xl2, xl3 }

/// The semantic colour roles for a [BwIcon].
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
  info,
}

/// A Google Material Symbols Rounded glyph rendered with Biowave tokens.
class BwIcon extends StatelessWidget {
  const BwIcon({
    super.key,
    required this.icon,
    this.size,
    this.filled = false,
    this.color,
    this.directional = false,
    this.semanticLabel,
  }) : assert(
          size == null ||
              semanticLabel != null ||
              (color != BwIconColor.success &&
                  color != BwIconColor.warning &&
                  color != BwIconColor.error &&
                  color != BwIconColor.info),
          'status icons need text or a label',
        );

  final IconData icon;
  final BwIconSize? size;
  final bool filled;
  final BwIconColor? color;
  final bool directional;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final iconTheme = IconTheme.of(context);
    final resolvedSize = size?._value ?? iconTheme.size;
    final resolvedColor = color?._resolve(context) ?? iconTheme.color;

    Widget result = SizedBox.square(
      dimension: resolvedSize,
      // Neutralize IconData.matchTextDirection so [directional] is the only
      // source of mirroring and a directional Symbol can never flip twice.
      child: Directionality(
        textDirection: TextDirection.ltr,
        child: Icon(
          icon,
          size: resolvedSize,
          opticalSize: resolvedSize,
          fill: filled ? BwIconAxes.fillSelected : null,
          weight: BwIconAxes.weight,
          grade: BwIconAxes.grade,
          color: resolvedColor,
        ),
      ),
    );

    if (directional) {
      result = Transform.flip(
        flipX: Directionality.of(context) == TextDirection.rtl,
        child: result,
      );
    }

    if (semanticLabel == null) {
      return ExcludeSemantics(child: result);
    }

    return Semantics(
      label: semanticLabel,
      image: true,
      excludeSemantics: true,
      child: result,
    );
  }
}

extension on BwIconSize {
  double get _value => switch (this) {
        BwIconSize.xs => BwSize.iconXs,
        BwIconSize.sm => BwSize.iconSm,
        BwIconSize.md => BwSize.iconMd,
        BwIconSize.lg => BwSize.iconLg,
        BwIconSize.xl => BwSize.iconXl,
        BwIconSize.xl2 => BwSize.iconXl2,
        BwIconSize.xl3 => BwSize.iconXl3,
      };
}

extension on BwIconColor {
  Color _resolve(BuildContext context) => switch (this) {
        BwIconColor.defaultColor => context.bw.colors.iconNeutralDefault,
        BwIconColor.subtle => context.bw.colors.iconNeutralSubtle,
        BwIconColor.muted => context.bw.colors.iconNeutralMuted,
        BwIconColor.inverse => context.bw.colors.iconNeutralInverse,
        BwIconColor.brand => context.bw.colors.iconRoleBrand,
        BwIconColor.secondary => context.bw.colors.iconRoleSecondary,
        BwIconColor.success => context.bw.colors.iconRoleSuccess,
        BwIconColor.warning => context.bw.colors.iconRoleWarning,
        BwIconColor.error => context.bw.colors.iconRoleError,
        BwIconColor.info => context.bw.colors.iconRoleInfo,
      };
}
