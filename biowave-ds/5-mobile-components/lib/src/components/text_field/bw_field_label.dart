import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';

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

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        if (!widget.hideLabel)
          Expanded(
            child: ExcludeSemantics(
              child: Text.rich(
                TextSpan(
                  children: <InlineSpan>[
                    TextSpan(
                      text: widget.label,
                      style: context.bw.text.labelLg.copyWith(
                        color: widget.labelColor,
                      ),
                    ),
                    if (widget.requiredField)
                      TextSpan(
                        text: ' *',
                        style: context.bw.text.labelLg.copyWith(
                          color: widget.requiredColor,
                        ),
                      ),
                  ],
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          )
        else
          const Spacer(),
        if (helpText != null) ...<Widget>[
          const SizedBox(width: BwSpacing.xs),
          CallbackShortcuts(
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
        ],
      ],
    );
  }
}
