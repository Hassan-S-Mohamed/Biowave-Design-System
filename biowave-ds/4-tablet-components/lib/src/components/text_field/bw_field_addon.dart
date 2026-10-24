import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';
import 'bw_text_field_decoration.dart';

/// Position of an attached text-field add-on segment.
enum BwFieldAddonPosition { prefix, suffix }

/// Package-private attached add-on segment (`prefix`, `suffix`) rendered
/// inside the text field outline.
class BwFieldAddon extends StatelessWidget {
  const BwFieldAddon({
    required this.text,
    required this.position,
    required this.size,
    required this.borderColor,
    this.hasEndButton = false,
    this.enabled = true,
    this.readOnly = false,
    this.onTap,
    super.key,
  });

  final String text;
  final BwFieldAddonPosition position;
  final BwControlSize size;
  final Color borderColor;
  final bool hasEndButton;
  final bool enabled;
  final bool readOnly;
  final VoidCallback? onTap;

  /// Returns true when [value] contains no Arabic characters and should be
  /// isolated as LTR in RTL layouts (e.g. URLs, currency codes, digits).
  static bool isIntrinsicallyLtr(String value) =>
      !RegExp(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]').hasMatch(value);

  @override
  Widget build(BuildContext context) {
    final normalized = BwTextFieldDecoration.effectiveSize(size);
    final metrics = BwTextFieldDecoration.sizeMetrics(normalized);
    final state = !enabled
        ? BwTextFieldState.disabled
        : (readOnly ? BwTextFieldState.readOnly : BwTextFieldState.defaultState);
    final stateColors = BwTextFieldDecoration.stateTokens(context, state);
    final textStyle = BwTextFieldDecoration.inputTextStyle(
      context,
      normalized,
      enabled: enabled,
      readOnly: readOnly,
    ).copyWith(color: stateColors.addonText);

    final isPrefix = position == BwFieldAddonPosition.prefix;
    final innerRadius = Radius.circular(metrics.radius - metrics.borderWidth);
    final segmentRadius = BorderRadiusDirectional.only(
      topStart: isPrefix ? innerRadius : Radius.zero,
      bottomStart: isPrefix ? innerRadius : Radius.zero,
      topEnd: isPrefix || hasEndButton ? Radius.zero : innerRadius,
      bottomEnd: isPrefix || hasEndButton ? Radius.zero : innerRadius,
    ).resolve(Directionality.of(context));

    final border = BorderDirectional(
      end: isPrefix
          ? BorderSide(color: borderColor, width: metrics.borderWidth)
          : BorderSide.none,
      start: !isPrefix
          ? BorderSide(color: borderColor, width: metrics.borderWidth)
          : BorderSide.none,
    );

    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    Widget labelWidget = Text(
      text,
      style: textStyle,
      maxLines: 1,
      softWrap: false,
    );
    if (isIntrinsicallyLtr(text)) {
      labelWidget = Directionality(
        textDirection: TextDirection.ltr,
        child: labelWidget,
      );
    }

    return ExcludeSemantics(
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        excludeFromSemantics: true,
        onTap: enabled ? onTap : null,
        child: Padding(
          padding: EdgeInsetsDirectional.only(
            top: metrics.borderWidth,
            bottom: metrics.borderWidth,
            start: isPrefix ? metrics.borderWidth : BwSpacing.none,
            end: !isPrefix ? metrics.borderWidth : BwSpacing.none,
          ),
          child: BwFieldAddonHeightBox(
            minHeight: metrics.height - (metrics.borderWidth * 2),
            child: AnimatedContainer(
              key: ValueKey<String>(
                isPrefix ? 'BwTextField.prefix' : 'BwTextField.suffix',
              ),
              duration: duration,
              curve: BwEasing.standard,
              padding: EdgeInsetsDirectional.symmetric(
                horizontal: metrics.paddingInline,
              ),
              decoration: BoxDecoration(
                color: stateColors.addonBackground,
                borderRadius: segmentRadius,
                border: border,
              ),
              child: Center(
                widthFactor: 1.0,
                heightFactor: 1.0,
                child: labelWidget,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class BwFieldAddonHeightBox extends StatelessWidget {
  const BwFieldAddonHeightBox({
    required this.minHeight,
    required this.child,
    super.key,
  });

  final double minHeight;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: minHeight),
        child: child,
      ),
    );
  }
}
