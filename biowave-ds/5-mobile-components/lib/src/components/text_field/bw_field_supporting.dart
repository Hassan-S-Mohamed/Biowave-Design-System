import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import '../icon/bw_icon.dart';

/// Supporting message or counter used below Biowave fields.
class BwFieldSupporting extends StatelessWidget {
  const BwFieldSupporting.message({
    required this.text,
    required this.color,
    required this.error,
    this.iconColor,
    super.key,
  }) : counter = false;

  const BwFieldSupporting.counter({
    required this.text,
    required this.color,
    super.key,
  })  : counter = true,
        error = false,
        iconColor = null;

  final String text;
  final Color color;
  final Color? iconColor;
  final bool error;
  final bool counter;

  @override
  Widget build(BuildContext context) {
    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    if (counter) {
      return Directionality(
        textDirection: TextDirection.ltr,
        child: AnimatedDefaultTextStyle(
          duration: duration,
          curve: BwEasing.standard,
          style: context.bw.text.captionMd.copyWith(color: color),
          child: Text(
            text,
            key: const ValueKey<String>('BwFieldSupporting.counter'),
          ),
        ),
      );
    }

    return Row(
      key: ValueKey<String>(
        error ? 'BwFieldSupporting.error' : 'BwFieldSupporting.helper',
      ),
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        if (error) ...<Widget>[
          ExcludeSemantics(
            child: IconTheme(
              data: IconThemeData(color: iconColor ?? color),
              child: const BwIcon(
                icon: Symbols.error_rounded,
                size: BwIconSize.sm,
              ),
            ),
          ),
          const SizedBox(width: BwSpacing.xs),
        ],
        Expanded(
          child: AnimatedDefaultTextStyle(
            duration: duration,
            curve: BwEasing.standard,
            style: context.bw.text.captionMd.copyWith(color: color),
            child: Text(text),
          ),
        ),
      ],
    );
  }
}
