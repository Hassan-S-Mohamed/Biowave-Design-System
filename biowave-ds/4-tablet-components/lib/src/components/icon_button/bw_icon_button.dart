import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import '../../common/bw_control_size.dart';
import '../../common/bw_focus_ring.dart';
import '../button/bw_button.dart';
import '../button/bw_button_style.dart';
import '../icon/bw_icon.dart';

/// A token-driven Material 3 icon button for tablet experiences.
class BwIconButton extends StatelessWidget {
  const BwIconButton({
    required this.icon,
    required this.label,
    required this.onPressed,
    this.variant = BwButtonVariant.text,
    this.color = BwButtonColor.neutral,
    this.size = BwControlSize.lg,
    this.toggle = false,
    this.selected = false,
    this.selectedIcon,
    this.tooltip = true,
    this.loading = false,
    this.loadingLabel,
    super.key,
  })  : assert(label.length > 0, 'BwIconButton needs a label'),
        assert(
          variant != BwButtonVariant.tonal ||
              (color != BwButtonColor.neutral &&
                  color != BwButtonColor.inverse),
          'BwIconButton tonal supports brand, secondary, or error',
        ),
        assert(
          !toggle ||
              (variant != BwButtonVariant.filled &&
                  variant != BwButtonVariant.tonal),
          'BwIconButton toggles support outlined or text variants',
        ),
        assert(
          !toggle || selectedIcon != null,
          'BwIconButton toggles need a selectedIcon',
        );

  final IconData icon;
  final String label;
  final VoidCallback? onPressed;
  final BwButtonVariant variant;
  final BwButtonColor color;
  final BwControlSize size;
  final bool toggle;
  final bool selected;
  final IconData? selectedIcon;
  final bool tooltip;
  final bool loading;
  final String? loadingLabel;

  BwButtonVariant get _effectiveVariant {
    if (variant == BwButtonVariant.tonal &&
        (color == BwButtonColor.neutral || color == BwButtonColor.inverse)) {
      return BwButtonVariant.outlined;
    }
    return variant;
  }

  bool get _effectiveToggle =>
      toggle &&
      selectedIcon != null &&
      variant != BwButtonVariant.filled &&
      variant != BwButtonVariant.tonal;

  bool get _effectiveSelected => _effectiveToggle && selected;

  @override
  Widget build(BuildContext context) {
    final effectiveVariant = _effectiveVariant;
    final dimensions = BwButtonStyle.metrics(size);
    final baseStyle = BwButtonStyle.resolve(
      context,
      effectiveVariant,
      color,
      size,
    );
    final animationDuration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;
    final ringColor = color == BwButtonColor.inverse
        ? context.bw.colors.borderInverse
        : context.bw.colors.borderFocus;
    final ringBorderRadius = BorderRadiusDirectional.all(
      Radius.circular(dimensions.radius),
    ).resolve(Directionality.of(context));
    final style = baseStyle.copyWith(
      fixedSize: WidgetStatePropertyAll<Size>(Size.square(dimensions.height)),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.all(BwSpacing.none),
      ),
      backgroundColor: WidgetStateProperty.resolveWith<Color?>(
        (states) =>
            _selectedBackground(context, states) ??
            baseStyle.backgroundColor?.resolve(states),
      ),
      foregroundColor: WidgetStateProperty.resolveWith<Color?>(
        (states) =>
            _selectedIconColor(context, states) ??
            baseStyle.foregroundColor?.resolve(states),
      ),
      iconColor: WidgetStateProperty.resolveWith<Color?>(
        (states) =>
            _selectedIconColor(context, states) ??
            baseStyle.iconColor?.resolve(states),
      ),
      backgroundBuilder: (context, states, child) {
        assert(child != null);
        return BwFocusRing(
          focused: states.contains(WidgetState.focused),
          borderRadius: ringBorderRadius,
          color: ringColor,
          ringKey: const ValueKey<String>('BwIconButton.focus-ring'),
          child: child!,
        );
      },
    );
    final announcement = loadingLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'جارٍ التحميل'
            : 'Loading');
    final action = loading && onPressed != null ? () {} : onPressed;
    final activeIcon = _effectiveSelected ? selectedIcon! : icon;

    final content = Stack(
      alignment: AlignmentDirectional.center,
      children: [
        Visibility(
          maintainSize: true,
          maintainAnimation: true,
          maintainState: true,
          visible: !loading,
          child: AnimatedSwitcher(
            duration: animationDuration,
            switchInCurve: BwEasing.standard,
            switchOutCurve: BwEasing.standard,
            layoutBuilder: (currentChild, previousChildren) =>
                currentChild ?? const SizedBox.shrink(),
            child: BwIcon(
              key: ValueKey<bool>(_effectiveSelected),
              icon: activeIcon,
              filled: _effectiveSelected,
              directional: activeIcon.matchTextDirection,
            ),
          ),
        ),
        AnimatedSwitcher(
          duration: animationDuration,
          child: loading
              ? SizedBox.square(
                  key: const ValueKey<String>('BwIconButton.spinner'),
                  dimension: dimensions.iconSize,
                  child: CircularProgressIndicator(
                    color: style.iconColor?.resolve(const <WidgetState>{}),
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );

    Widget buildButton() => switch (effectiveVariant) {
          BwButtonVariant.filled => IconButton.filled(
              key: const ValueKey<String>('BwIconButton.container'),
              onPressed: action,
              style: style,
              isSelected: _effectiveToggle ? _effectiveSelected : null,
              icon: content,
            ),
          BwButtonVariant.tonal => IconButton.filledTonal(
              key: const ValueKey<String>('BwIconButton.container'),
              onPressed: action,
              style: style,
              isSelected: _effectiveToggle ? _effectiveSelected : null,
              icon: content,
            ),
          BwButtonVariant.outlined => IconButton.outlined(
              key: const ValueKey<String>('BwIconButton.container'),
              onPressed: action,
              style: style,
              isSelected: _effectiveToggle ? _effectiveSelected : null,
              icon: content,
            ),
          BwButtonVariant.text => IconButton(
              key: const ValueKey<String>('BwIconButton.container'),
              onPressed: action,
              style: style,
              isSelected: _effectiveToggle ? _effectiveSelected : null,
              icon: content,
            ),
        };

    Widget visual = buildButton();

    if (tooltip) {
      visual = TooltipTheme(
        data: TooltipTheme.of(context).copyWith(
          decoration: BoxDecoration(
            color: context.bw.colors.surfaceInverse,
            borderRadius: const BorderRadiusDirectional.all(
              Radius.circular(BwRadius.sm),
            ),
          ),
          textStyle: context.bw.text.labelSm.copyWith(
            color: context.bw.colors.textNeutralInverse,
          ),
          padding: const EdgeInsetsDirectional.symmetric(
            horizontal: BwSpacing.md,
            vertical: BwSpacing.xs,
          ),
          verticalOffset: BwSpacing.xs,
          waitDuration: BwDuration.xl2,
          exitDuration:
              context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm,
        ),
        child: Tooltip(
          message: label,
          excludeFromSemantics: true,
          child: visual,
        ),
      );
    }

    return _BwIconButtonLoadingAnnouncer(
      loading: loading,
      announcement: announcement,
      child: Semantics(
        button: true,
        label: label,
        value: loading ? announcement : null,
        enabled: onPressed != null,
        toggled: _effectiveToggle ? _effectiveSelected : null,
        excludeSemantics: true,
        child: visual,
      ),
    );
  }

  Color? _selectedBackground(BuildContext context, Set<WidgetState> states) {
    if (!states.contains(WidgetState.selected)) return null;
    final colors = context.bw.colors;
    if (states.contains(WidgetState.disabled)) {
      return colors.backgroundNeutralDisabled;
    }
    return switch (color) {
      BwButtonColor.brand => colors.backgroundBrandSubtle,
      BwButtonColor.secondary => colors.backgroundSecondarySubtle,
      BwButtonColor.neutral => colors.backgroundNeutralDefault,
      BwButtonColor.error => colors.backgroundErrorSubtle,
      BwButtonColor.inverse => colors.backgroundInverseDefault,
    };
  }

  Color? _selectedIconColor(BuildContext context, Set<WidgetState> states) {
    if (!states.contains(WidgetState.selected)) return null;
    final colors = context.bw.colors;
    if (states.contains(WidgetState.disabled)) {
      return colors.iconNeutralDisabled;
    }
    return switch (color) {
      BwButtonColor.brand => colors.iconRoleBrand,
      BwButtonColor.secondary => colors.iconRoleSecondary,
      BwButtonColor.neutral => colors.iconNeutralDefault,
      BwButtonColor.error => colors.iconRoleError,
      BwButtonColor.inverse => colors.iconRoleBrand,
    };
  }
}

class _BwIconButtonLoadingAnnouncer extends StatefulWidget {
  const _BwIconButtonLoadingAnnouncer({
    required this.loading,
    required this.announcement,
    required this.child,
  });

  final bool loading;
  final String announcement;
  final Widget child;

  @override
  State<_BwIconButtonLoadingAnnouncer> createState() =>
      _BwIconButtonLoadingAnnouncerState();
}

class _BwIconButtonLoadingAnnouncerState
    extends State<_BwIconButtonLoadingAnnouncer> {
  @override
  void initState() {
    super.initState();
    if (widget.loading) _announceAfterBuild();
  }

  @override
  void didUpdateWidget(_BwIconButtonLoadingAnnouncer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!oldWidget.loading && widget.loading) _announceAfterBuild();
  }

  void _announceAfterBuild() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !widget.loading) return;
      SemanticsService.sendAnnouncement(
        View.of(context),
        widget.announcement,
        Directionality.of(context),
      );
    });
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
