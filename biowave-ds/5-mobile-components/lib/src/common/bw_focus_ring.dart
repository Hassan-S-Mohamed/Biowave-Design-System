import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// Paints a keyboard focus ring outside [child] without affecting its layout.
class BwFocusRing extends StatefulWidget {
  const BwFocusRing({
    required this.focused,
    required this.borderRadius,
    required this.color,
    required this.child,
    this.ringKey,
    super.key,
  });

  final bool focused;
  final BorderRadiusGeometry borderRadius;
  final Color color;
  final Key? ringKey;
  final Widget child;

  @override
  State<BwFocusRing> createState() => _BwFocusRingState();
}

class _BwFocusRingState extends State<BwFocusRing> {
  @override
  void initState() {
    super.initState();
    FocusManager.instance.addHighlightModeListener(_handleHighlightModeChange);
  }

  @override
  void dispose() {
    FocusManager.instance
        .removeHighlightModeListener(_handleHighlightModeChange);
    super.dispose();
  }

  void _handleHighlightModeChange(FocusHighlightMode mode) {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final showRing = widget.focused &&
        FocusManager.instance.highlightMode == FocusHighlightMode.traditional;
    if (!showRing) {
      return widget.child;
    }

    const inset = BwBorder.focusOffset + BwBorder.widthFocus;
    final resolvedRadius =
        widget.borderRadius.resolve(Directionality.of(context));
    final ringRadius = resolvedRadius.add(
      const BorderRadius.all(Radius.circular(inset)),
    );

    return Stack(
      clipBehavior: Clip.none,
      fit: StackFit.passthrough,
      children: <Widget>[
        widget.child,
        PositionedDirectional(
          start: -inset,
          end: -inset,
          top: -inset,
          bottom: -inset,
          child: IgnorePointer(
            child: DecoratedBox(
              key: widget.ringKey,
              decoration: BoxDecoration(
                border: Border.all(
                  width: BwBorder.widthFocus,
                  color: widget.color,
                ),
                borderRadius: ringRadius,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
