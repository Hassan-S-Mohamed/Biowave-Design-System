import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/foundation.dart' show internal;
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import '../../common/bw_control_size.dart';
import '../../common/bw_focus_ring.dart';
import '../button/bw_button.dart';
import '../button/bw_button_style.dart';

/// A token-driven icon-only action for Biowave mobile experiences.
class BwIconButton extends StatefulWidget {
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
    this.focusNode,
    this.autofocus = false,
    this.statesController,
    this.segment,
    this.iconTurns = 0,
    this.iconRotationDuration = BwDuration.instant,
    this.iconRotationCurve = BwEasing.standard,
    this.expanded,
    super.key,
  })  : assert(label != '', 'BwIconButton needs a label'),
        assert(
          !(variant == BwButtonVariant.tonal &&
              (color == BwButtonColor.neutral ||
                  color == BwButtonColor.inverse)),
          'BwIconButton tonal supports brand, secondary, and error colors only',
        ),
        assert(
          !(toggle &&
              (variant == BwButtonVariant.filled ||
                  variant == BwButtonVariant.tonal)),
          'BwIconButton toggles support text and outlined variants only',
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

  /// Used by package-owned composite controls that manage trigger focus.
  @internal
  final FocusNode? focusNode;

  /// Used by package-owned composite controls that manage trigger focus.
  @internal
  final bool autofocus;

  /// Used by package-owned composite controls to force interaction states.
  @internal
  final WidgetStatesController? statesController;

  /// Used by package-owned controls that join buttons into one control.
  @internal
  final BwButtonSegment? segment;

  /// Used by package-owned composite controls with animated glyphs.
  @internal
  final double iconTurns;

  /// Used by package-owned composite controls with animated glyphs.
  @internal
  final Duration iconRotationDuration;

  /// Used by package-owned composite controls with animated glyphs.
  @internal
  final Curve iconRotationCurve;

  /// Used by package-owned menu triggers to expose expanded state.
  @internal
  final bool? expanded;

  @override
  State<BwIconButton> createState() => _BwIconButtonState();
}

class _BwIconButtonState extends State<BwIconButton> {
  FocusNode? _internalFocusNode;

  FocusNode get _focusNode =>
      widget.focusNode ?? (_internalFocusNode ??= FocusNode());

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(_handleFocusChange);
    if (_announcesLoading) {
      _announceLoadingAfterFrame();
    }
  }

  @override
  void didUpdateWidget(BwIconButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.focusNode != widget.focusNode) {
      (oldWidget.focusNode ?? _internalFocusNode)
          ?.removeListener(_handleFocusChange);
      _focusNode.addListener(_handleFocusChange);
    }
    if (_announcesLoading && !oldWidget.loading) {
      _announceLoadingAfterFrame();
    }
  }

  @override
  void dispose() {
    _focusNode.removeListener(_handleFocusChange);
    _internalFocusNode?.dispose();
    super.dispose();
  }

  void _handleFocusChange() {
    if (mounted) {
      setState(() {});
    }
  }

  bool get _announcesLoading => widget.loading && widget.onPressed != null;

  BwButtonVariant get _effectiveVariant =>
      widget.variant == BwButtonVariant.tonal &&
              (widget.color == BwButtonColor.neutral ||
                  widget.color == BwButtonColor.inverse)
          ? BwButtonVariant.outlined
          : widget.variant;

  bool get _effectiveToggle =>
      widget.toggle &&
      widget.selectedIcon != null &&
      (_effectiveVariant == BwButtonVariant.text ||
          _effectiveVariant == BwButtonVariant.outlined);

  String get _loadingMessage =>
      widget.loadingLabel ??
      (Localizations.localeOf(context).languageCode == 'ar'
          ? 'جارٍ التحميل'
          : 'Loading');

  void _announceLoadingAfterFrame() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && _announcesLoading) {
        SemanticsService.sendAnnouncement(
          View.of(context),
          _loadingMessage,
          Directionality.of(context),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.bw.colors;
    final metrics = BwButtonStyle.metrics(context, widget.size);
    final effectiveSelected = _effectiveToggle && widget.selected;
    final motionDuration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;
    final focusRingKey = const ValueKey<String>('BwIconButton.focus-ring');
    final baseStyle = BwButtonStyle.resolve(
      context,
      _effectiveVariant,
      widget.color,
      widget.size,
      focusRingKey: focusRingKey,
    );
    final borderRadius =
        BwButtonStyle.segmentBorderRadius(metrics, widget.segment);
    final baseBackground = baseStyle.backgroundColor!;
    final baseIcon = baseStyle.iconColor!;
    final baseSide = baseStyle.side;
    final style = baseStyle.copyWith(
      backgroundColor: WidgetStateProperty.resolveWith((states) {
        if (!states.contains(WidgetState.selected)) {
          return baseBackground.resolve(states);
        }
        if (states.contains(WidgetState.disabled)) {
          return colors.backgroundNeutralDisabled;
        }
        return switch (widget.color) {
          BwButtonColor.brand => colors.backgroundBrandSubtle,
          BwButtonColor.secondary => colors.backgroundSecondarySubtle,
          BwButtonColor.neutral => colors.backgroundNeutralDefault,
          BwButtonColor.error => colors.backgroundErrorSubtle,
          BwButtonColor.inverse => colors.backgroundInverseDefault,
        };
      }),
      iconColor: WidgetStateProperty.resolveWith((states) {
        if (!states.contains(WidgetState.selected)) {
          return baseIcon.resolve(states);
        }
        if (states.contains(WidgetState.disabled)) {
          return colors.iconNeutralDisabled;
        }
        return switch (widget.color) {
          BwButtonColor.brand => colors.iconRoleBrand,
          BwButtonColor.secondary => colors.iconRoleSecondary,
          BwButtonColor.neutral => colors.iconNeutralDefault,
          BwButtonColor.error => colors.iconRoleError,
          BwButtonColor.inverse => colors.iconRoleBrand,
        };
      }),
      side: _effectiveVariant == BwButtonVariant.outlined
          ? baseSide
          : const WidgetStatePropertyAll<BorderSide>(BorderSide.none),
      shape: widget.segment == null
          ? null
          : WidgetStatePropertyAll<OutlinedBorder>(
              RoundedRectangleBorder(borderRadius: borderRadius),
            ),
      backgroundBuilder: widget.segment == null
          ? null
          : (
              BuildContext builderContext,
              Set<WidgetState> states,
              Widget? child,
            ) =>
              BwFocusRing(
                focused: states.contains(WidgetState.focused),
                borderRadius: borderRadius,
                color: widget.color == BwButtonColor.inverse
                    ? colors.borderInverse
                    : colors.borderFocus,
                ringKey: focusRingKey,
                child: child ?? const SizedBox.shrink(),
              ),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.zero,
      ),
      fixedSize: WidgetStatePropertyAll<Size>(Size.square(metrics.height)),
    );
    final resolvedIconColor = style.iconColor!.resolve(<WidgetState>{
      if (widget.onPressed == null) WidgetState.disabled,
      if (effectiveSelected) WidgetState.selected,
    })!;
    final visual = AnimatedSwitcher(
      duration: motionDuration,
      switchInCurve: BwEasing.standard,
      switchOutCurve: BwEasing.standard,
      child: widget.loading
          ? SizedBox.square(
              key: const ValueKey<String>('BwIconButton.spinner'),
              dimension: metrics.iconSize,
              child: CircularProgressIndicator(color: resolvedIconColor),
            )
          : AnimatedRotation(
              turns: widget.iconTurns,
              duration: widget.iconRotationDuration,
              curve: widget.iconRotationCurve,
              child: Icon(
                effectiveSelected ? widget.selectedIcon : widget.icon,
                key: ValueKey<String>(
                  effectiveSelected
                      ? 'BwIconButton.icon.selected'
                      : 'BwIconButton.icon',
                ),
                fill: effectiveSelected ? BwIconAxes.fillSelected : null,
                semanticLabel: null,
              ),
            ),
    );
    final enabled = widget.onPressed != null;
    final effectiveOnPressed =
        widget.loading && enabled ? () {} : widget.onPressed;
    final iconButton = switch (_effectiveVariant) {
      BwButtonVariant.filled => IconButton.filled(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          autofocus: widget.autofocus,
          statesController: widget.statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.tonal => IconButton.filledTonal(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          autofocus: widget.autofocus,
          statesController: widget.statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.outlined => IconButton.outlined(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          autofocus: widget.autofocus,
          statesController: widget.statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.text => IconButton(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          autofocus: widget.autofocus,
          statesController: widget.statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
    };
    final tooltipOrButton = widget.tooltip
        ? Tooltip(
            message: widget.label,
            excludeFromSemantics: true,
            triggerMode: TooltipTriggerMode.longPress,
            preferBelow: false,
            verticalOffset: BwSpacing.xs,
            padding: const EdgeInsetsDirectional.symmetric(
              horizontal: BwSpacing.md,
              vertical: BwSpacing.xs,
            ),
            decoration: BoxDecoration(
              color: colors.surfaceInverse,
              borderRadius: const BorderRadiusDirectional.all(
                Radius.circular(BwRadius.sm),
              ),
            ),
            textStyle: context.bw.text.labelSm.copyWith(
              color: colors.textNeutralInverse,
            ),
            waitDuration: BwDuration.xl2,
            showDuration:
                context.bw.reduceMotion ? BwDuration.instant : BwDuration.md,
            exitDuration:
                context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm,
            child: iconButton,
          )
        : iconButton;

    return Semantics(
      container: true,
      label: widget.label,
      value: _announcesLoading ? _loadingMessage : null,
      button: true,
      enabled: enabled,
      focusable: enabled,
      focused: enabled && _focusNode.hasFocus,
      toggled: _effectiveToggle ? widget.selected : null,
      expanded: widget.expanded,
      onTap: effectiveOnPressed,
      onFocus: enabled ? _focusNode.requestFocus : null,
      excludeSemantics: true,
      child: tooltipOrButton,
    );
  }
}
