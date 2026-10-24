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

  @override
  Widget build(BuildContext context) {
    final radius = atStart
        ? const BorderRadiusDirectional.only(
            topStart: Radius.circular(BwRadius.md),
            bottomStart: Radius.circular(BwRadius.md),
          )
        : const BorderRadiusDirectional.only(
            topEnd: Radius.circular(BwRadius.md),
            bottomEnd: Radius.circular(BwRadius.md),
          );
    final borderSide = BorderSide(
      width: BwBorder.widthDefault,
      color: borderColor,
    );

    return ExcludeSemantics(
      child: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: onTap,
        child: IntrinsicHeight(
          child: Container(
            key: ValueKey<String>(
              atStart ? 'BwFieldAddon.prefix' : 'BwFieldAddon.suffix',
            ),
            constraints: const BoxConstraints(
              minHeight: BwSize.controlHeightLg,
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
              borderRadius: radius,
            ),
            child: Directionality(
              textDirection: _isIntrinsicallyLtr(text)
                  ? TextDirection.ltr
                  : Directionality.of(context),
              child: Text(
                text,
                maxLines: 1,
                style: context.bw.text.bodyLg.copyWith(color: textColor),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

bool _isIntrinsicallyLtr(String value) {
  return RegExp(r'[0-9]|[:/.%+\-]').hasMatch(value);
}
