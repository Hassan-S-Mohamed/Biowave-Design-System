import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';
import 'bw_field_action.dart';
import 'bw_text_field_decoration.dart';

/// Package-private label row (`label`, `required-indicator`, `help-icon`)
/// shared across Biowave form fields.
class BwFieldLabel extends StatefulWidget {
  const BwFieldLabel({
    required this.label,
    required this.size,
    this.hideLabel = false,
    this.requiredField = false,
    this.enabled = true,
    this.helpText,
    this.helpLabel,
    this.onTapLabel,
    super.key,
  });

  final String label;
  final BwControlSize size;
  final bool hideLabel;
  final bool requiredField;
  final bool enabled;
  final String? helpText;
  final String? helpLabel;
  final VoidCallback? onTapLabel;

  @override
  State<BwFieldLabel> createState() => _BwFieldLabelState();
}

class _BwFieldLabelState extends State<BwFieldLabel> {
  final GlobalKey<TooltipState> _tooltipKey = GlobalKey<TooltipState>();

  String _resolvedHelpLabel(BuildContext context) {
    if (widget.helpLabel != null && widget.helpLabel!.isNotEmpty) {
      return widget.helpLabel!;
    }
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    return isArabic
        ? 'مزيد من المعلومات عن ${widget.label}'
        : 'More information about ${widget.label}';
  }

  void _showTooltip() {
    _tooltipKey.currentState?.ensureTooltipVisible();
  }

  void _dismissTooltip() {
    Tooltip.dismissAllToolTips();
  }

  KeyEventResult _handleKeyEvent(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      _dismissTooltip();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final normalizedSize = BwTextFieldDecoration.effectiveSize(widget.size);
    final metrics = BwTextFieldDecoration.sizeMetrics(normalizedSize);
    final state = widget.enabled
        ? BwTextFieldState.defaultState
        : BwTextFieldState.disabled;
    final stateColors = BwTextFieldDecoration.stateTokens(context, state);
    final labelStyle = BwTextFieldDecoration.labelTextStyle(
      context,
      normalizedSize,
      enabled: widget.enabled,
    );
    final hasHelp = widget.helpText != null && widget.helpText!.isNotEmpty;

    if (widget.hideLabel && !hasHelp) {
      return const SizedBox.shrink();
    }

    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    Widget? visibleLabel;
    if (!widget.hideLabel) {
      visibleLabel = ExcludeSemantics(
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: widget.enabled ? widget.onTapLabel : null,
          child: AnimatedDefaultTextStyle(
            duration: duration,
            curve: BwEasing.standard,
            style: labelStyle,
            child: Text.rich(
              TextSpan(
                text: widget.label,
                children: [
                  if (widget.requiredField)
                    TextSpan(
                      text: ' *',
                      style: labelStyle.copyWith(color: stateColors.required),
                    ),
                ],
              ),
              key: const ValueKey<String>('BwTextField.label'),
            ),
          ),
        ),
      );
      if (widget.requiredField) {
        visibleLabel = KeyedSubtree(
          key: const ValueKey<String>('BwTextField.required-indicator'),
          child: visibleLabel,
        );
      }
    }

    Widget? helpButton;
    if (hasHelp) {
      final resolvedHelpLabel = _resolvedHelpLabel(context);
      final reduceMotion = context.bw.reduceMotion;

      helpButton = Focus(
        canRequestFocus: false,
        onKeyEvent: _handleKeyEvent,
        child: TooltipTheme(
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
            waitDuration: BwDuration.instant,
            showDuration: BwDuration.xl2,
            exitDuration: reduceMotion ? BwDuration.instant : BwDuration.sm,
          ),
          child: Tooltip(
            key: _tooltipKey,
            message: widget.helpText!,
            triggerMode: TooltipTriggerMode.tap,
            excludeFromSemantics: true,
            child: BwFieldTargetBox(
              key: const ValueKey<String>('BwTextField.help-icon'),
              layoutSize: const Size.square(BwSize.iconSm),
              minTargetSize: Size.square(BwLayout.tablet.minTarget),
              child: BwIconButton(
                icon: Symbols.help_rounded,
                label: resolvedHelpLabel,
                onPressed: _showTooltip,
                variant: BwButtonVariant.text,
                color: BwButtonColor.neutral,
                size: BwControlSize.sm,
                tooltip: false,
              ),
            ),
          ),
        ),
      );
    }

    return Padding(
      padding: EdgeInsetsDirectional.only(bottom: metrics.labelGap),
      child: Row(
        key: const ValueKey<String>('BwTextField.label-row'),
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (visibleLabel != null) Flexible(child: visibleLabel),
          if (visibleLabel != null && helpButton != null)
            SizedBox(width: metrics.gap),
          if (helpButton != null) helpButton,
        ],
      ),
    );
  }
}
