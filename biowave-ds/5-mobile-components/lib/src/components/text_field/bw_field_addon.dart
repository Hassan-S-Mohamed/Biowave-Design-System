import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// An attached prefix or suffix segment inside a Biowave field outline.
class BwFieldAddon extends StatelessWidget {
  const BwFieldAddon({
    required this.text,
    required this.atStart,
    required this.backgroundColor,
    required this.textColor,
    required this.borderColor,
    required this.onTap,
    super.key,
  });

  final String text;
  final bool atStart;
  final Color backgroundColor;
  final Color textColor;
  final Color borderColor;
  final VoidCallback? onTap;

  static bool isIntrinsicallyLtr(String value) =>
      !RegExp(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]').hasMatch(value);

  @override
  Widget build(BuildContext context) {
    const borderWidth = BwBorder.widthDefault;
    const innerRadius = Radius.circular(BwRadius.md - borderWidth);
    final segmentRadius = atStart
        ? const BorderRadiusDirectional.only(
            topStart: innerRadius,
            bottomStart: innerRadius,
          ).resolve(Directionality.of(context))
        : const BorderRadiusDirectional.only(
            topEnd: innerRadius,
            bottomEnd: innerRadius,
          ).resolve(Directionality.of(context));

    final borderSide = BorderSide(
      width: borderWidth,
      color: borderColor,
    );

    final duration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;

    return ExcludeSemantics(
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        excludeFromSemantics: true,
        onTap: onTap,
        child: Padding(
          padding: EdgeInsetsDirectional.only(
            top: borderWidth,
            bottom: borderWidth,
            start: atStart ? borderWidth : 0.0,
            end: !atStart ? borderWidth : 0.0,
          ),
          child: IntrinsicHeight(
            child: AnimatedContainer(
              key: ValueKey<String>(
                atStart ? 'BwFieldAddon.prefix' : 'BwFieldAddon.suffix',
              ),
              duration: duration,
              curve: BwEasing.standard,
              constraints: const BoxConstraints(
                minHeight: BwSize.controlHeightLg - (borderWidth * 2),
              ),
              alignment: AlignmentDirectional.center,
              padding: const EdgeInsetsDirectional.symmetric(
                horizontal: BwSpacing.controlPaddingInlineLg,
              ),
              decoration: BoxDecoration(
                color: backgroundColor,
                border: atStart
                    ? BorderDirectional(end: borderSide)
                    : BorderDirectional(start: borderSide),
                borderRadius: segmentRadius,
              ),
              child: Directionality(
                textDirection: isIntrinsicallyLtr(text)
                    ? TextDirection.ltr
                    : Directionality.of(context),
                child: AnimatedDefaultTextStyle(
                  duration: duration,
                  curve: BwEasing.standard,
                  style: context.bw.text.bodyLg.copyWith(color: textColor),
                  child: Text(
                    text,
                    maxLines: 1,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
