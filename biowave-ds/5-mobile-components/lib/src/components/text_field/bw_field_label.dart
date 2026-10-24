import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';
import 'bw_field_action.dart';

/// Persistent label, required indicator, and optional help action for fields.
class BwFieldLabel extends StatefulWidget {
  const BwFieldLabel({
    required this.label,
    required this.labelColor,
    required this.requiredColor,
    required this.requiredField,
    required this.hideLabel,
    required this.helpText,
    required this.helpLabel,
    super.key,
  });

  final String label;
  final Color labelColor;
  final Color requiredColor;
  final bool requiredField;
  final bool hideLabel;
  final String? helpText;
  final String helpLabel;

  @override
  State<BwFieldLabel> createState() => _BwFieldLabelState();
}

class _BwFieldLabelState extends State<BwFieldLabel> {
  final GlobalKey<TooltipState> _tooltipKey = GlobalKey<TooltipState>();

  void _showTooltip() {
    _tooltipKey.currentState?.ensureTooltipVisible();
  }

  @override
  Widget build(BuildContext context) {
    final helpText = widget.helpText;
    if (widget.hideLabel && helpText == null) {
      return const SizedBox.shrink();
    }

    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    Widget? helpButton;
    if (helpText != null) {
      helpButton = CallbackShortcuts(
        bindings: <ShortcutActivator, VoidCallback>{
          const SingleActivator(LogicalKeyboardKey.escape): () {
            Tooltip.dismissAllToolTips();
          },
        },
        child: Tooltip(
          key: _tooltipKey,
          message: helpText,
          excludeFromSemantics: true,
          triggerMode: TooltipTriggerMode.tap,
          preferBelow: false,
          verticalOffset: BwSpacing.xs,
          padding: const EdgeInsetsDirectional.symmetric(
            horizontal: BwSpacing.md,
            vertical: BwSpacing.xs,
          ),
          decoration: BoxDecoration(
            color: context.bw.colors.surfaceInverse,
            borderRadius: const BorderRadiusDirectional.all(
              Radius.circular(BwRadius.sm),
            ),
          ),
          textStyle: context.bw.text.labelSm.copyWith(
            color: context.bw.colors.textNeutralInverse,
          ),
          waitDuration: BwDuration.instant,
          showDuration:
              context.bw.reduceMotion ? BwDuration.instant : BwDuration.xl2,
          exitDuration:
              context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm,
          child: BwFieldTargetBox(
            layoutSize: const Size.square(BwSize.iconSm),
            minTargetSize: Size.square(BwLayout.mobile.minTarget),
            child: BwIconButton(
              icon: Symbols.help_rounded,
              label: widget.helpLabel,
              onPressed: _showTooltip,
              variant: BwButtonVariant.text,
              color: BwButtonColor.neutral,
              size: BwControlSize.sm,
              tooltip: false,
            ),
          ),
        ),
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        if (!widget.hideLabel)
          Flexible(
            child: ExcludeSemantics(
              child: AnimatedDefaultTextStyle(
                duration: duration,
                curve: BwEasing.standard,
                style: context.bw.text.labelLg.copyWith(
                  color: widget.labelColor,
                ),
                child: Text.rich(
                  TextSpan(
                    children: <InlineSpan>[
                      TextSpan(
                        text: widget.label,
                      ),
                      if (widget.requiredField)
                        TextSpan(
                          text: ' *',
                          style: TextStyle(
                            color: widget.requiredColor,
                          ),
                        ),
                    ],
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),
        if (!widget.hideLabel && helpButton != null)
          const SizedBox(width: BwSpacing.xs),
        if (helpButton != null) helpButton,
      ],
    );
  }
}
