import 'package:biowave_foundations/biowave_foundations.dart';
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
    this.segment,
    this.expanded,
    this.iconChild,
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
  final FocusNode? focusNode;
  final BwButtonSegment? segment;
  final bool? expanded;
  final Widget? iconChild;

  @override
  State<BwIconButton> createState() => _BwIconButtonState();
}

class _BwIconButtonState extends State<BwIconButton> {
  FocusNode? _internalFocusNode;
  WidgetStatesController? _statesController;

  FocusNode get _focusNode =>
      widget.focusNode ?? (_internalFocusNode ??= FocusNode());

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(_handleFocusChange);
    _syncExpandedState();
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
    if (oldWidget.expanded != widget.expanded ||
        oldWidget.onPressed != widget.onPressed) {
      _syncExpandedState();
    }
    if (_announcesLoading && !oldWidget.loading) {
      _announceLoadingAfterFrame();
    }
  }

  @override
  void dispose() {
    _focusNode.removeListener(_handleFocusChange);
    _internalFocusNode?.dispose();
    _statesController?.dispose();
    super.dispose();
  }

  void _syncExpandedState() {
    if (widget.expanded == null && _statesController == null) {
      return;
    }
    final controller = _statesController ??= WidgetStatesController();
    controller.update(
      WidgetState.pressed,
      (widget.expanded ?? false) && widget.onPressed != null,
    );
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
    const focusRingKey = ValueKey<String>('BwIconButton.focus-ring');
    final baseStyle = BwButtonStyle.resolve(
      context,
      _effectiveVariant,
      widget.color,
      widget.size,
      focusRingKey: focusRingKey,
    );
    final segmentRadius = switch (widget.segment) {
      null => null,
      BwButtonSegment.start => BorderRadiusDirectional.only(
          topStart: Radius.circular(metrics.radius),
          bottomStart: Radius.circular(metrics.radius),
          topEnd: const Radius.circular(BwRadius.xs),
          bottomEnd: const Radius.circular(BwRadius.xs),
        ),
      BwButtonSegment.end => BorderRadiusDirectional.only(
          topStart: const Radius.circular(BwRadius.xs),
          bottomStart: const Radius.circular(BwRadius.xs),
          topEnd: Radius.circular(metrics.radius),
          bottomEnd: Radius.circular(metrics.radius),
        ),
    };
    final baseBackground = baseStyle.backgroundColor!;
    final baseIcon = baseStyle.iconColor!;
    final baseOverlay = baseStyle.overlayColor!;
    final baseSide = baseStyle.side;
    final forcePressed = (widget.expanded ?? false) && widget.onPressed != null;
    final style = baseStyle.copyWith(
      backgroundColor: WidgetStateProperty.resolveWith((states) {
        final effectiveStates =
            forcePressed && !states.contains(WidgetState.disabled)
                ? <WidgetState>{...states, WidgetState.pressed}
                : states;
        if (!effectiveStates.contains(WidgetState.selected)) {
          return baseBackground.resolve(effectiveStates);
        }
        if (effectiveStates.contains(WidgetState.disabled)) {
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
      overlayColor: WidgetStateProperty.resolveWith((states) {
        final effectiveStates =
            forcePressed && !states.contains(WidgetState.disabled)
                ? <WidgetState>{...states, WidgetState.pressed}
                : states;
        return baseOverlay.resolve(effectiveStates);
      }),
      side: _effectiveVariant == BwButtonVariant.outlined
          ? baseSide
          : const WidgetStatePropertyAll<BorderSide>(BorderSide.none),
      shape: segmentRadius == null
          ? null
          : WidgetStatePropertyAll<OutlinedBorder>(
              RoundedRectangleBorder(borderRadius: segmentRadius),
            ),
      backgroundBuilder: segmentRadius == null
          ? null
          : (
              BuildContext builderContext,
              Set<WidgetState> states,
              Widget? child,
            ) =>
              BwFocusRing(
                focused: states.contains(WidgetState.focused),
                borderRadius: segmentRadius,
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
          : (widget.iconChild ??
              Icon(
                effectiveSelected ? widget.selectedIcon : widget.icon,
                key: ValueKey<String>(
                  effectiveSelected
                      ? 'BwIconButton.icon.selected'
                      : 'BwIconButton.icon',
                ),
                fill: effectiveSelected ? BwIconAxes.fillSelected : null,
                semanticLabel: null,
              )),
    );
    final enabled = widget.onPressed != null;
    final effectiveOnPressed =
        widget.loading && enabled ? () {} : widget.onPressed;
    final iconButton = switch (_effectiveVariant) {
      BwButtonVariant.filled => IconButton.filled(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          statesController: _statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.tonal => IconButton.filledTonal(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          statesController: _statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.outlined => IconButton.outlined(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          statesController: _statesController,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.text => IconButton(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          statesController: _statesController,
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
