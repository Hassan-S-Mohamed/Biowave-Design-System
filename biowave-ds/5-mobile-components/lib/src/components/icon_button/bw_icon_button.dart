import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import '../../common/bw_control_size.dart';
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

  @override
  State<BwIconButton> createState() => _BwIconButtonState();
}

class _BwIconButtonState extends State<BwIconButton> {
  late final FocusNode _focusNode = FocusNode()..addListener(_handleFocusChange);

  @override
  void initState() {
    super.initState();
    if (_announcesLoading) {
      _announceLoadingAfterFrame();
    }
  }

  @override
  void didUpdateWidget(BwIconButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (_announcesLoading && !oldWidget.loading) {
      _announceLoadingAfterFrame();
    }
  }

  @override
  void dispose() {
    _focusNode
      ..removeListener(_handleFocusChange)
      ..dispose();
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
    final baseStyle = BwButtonStyle.resolve(
      context,
      _effectiveVariant,
      widget.color,
      widget.size,
      focusRingKey: const ValueKey<String>('BwIconButton.focus-ring'),
    );
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
          : Icon(
              effectiveSelected ? widget.selectedIcon : widget.icon,
              key: ValueKey<String>(
                effectiveSelected
                    ? 'BwIconButton.icon.selected'
                    : 'BwIconButton.icon',
              ),
              fill: effectiveSelected ? BwIconAxes.fillSelected : null,
              semanticLabel: null,
            ),
    );
    final enabled = widget.onPressed != null;
    final effectiveOnPressed =
        widget.loading && enabled ? () {} : widget.onPressed;
    final iconButton = switch (_effectiveVariant) {
      BwButtonVariant.filled => IconButton.filled(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.tonal => IconButton.filledTonal(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.outlined => IconButton.outlined(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
          style: style,
          isSelected: _effectiveToggle ? widget.selected : null,
          selectedIcon: visual,
          icon: visual,
        ),
      BwButtonVariant.text => IconButton(
          onPressed: effectiveOnPressed,
          focusNode: _focusNode,
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
      onTap: effectiveOnPressed,
      onFocus: enabled ? _focusNode.requestFocus : null,
      excludeSemantics: true,
      child: tooltipOrButton,
    );
  }
}
