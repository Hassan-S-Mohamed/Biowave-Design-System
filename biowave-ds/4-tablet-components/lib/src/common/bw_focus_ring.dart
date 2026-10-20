import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// Package-private focus treatment shared by interactive tablet controls.
///
/// The class is intentionally not exported from `biowave_tablet.dart`.
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
  bool get _showRing =>
      widget.focused &&
      FocusManager.instance.highlightMode == FocusHighlightMode.traditional;

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

  void _handleHighlightModeChange(FocusHighlightMode _) => setState(() {});

  @override
  Widget build(BuildContext context) {
    final inset = BwBorder.focusOffset + BwBorder.widthFocus;
    final outerRadius = widget.borderRadius
        .add(BorderRadius.all(Radius.circular(inset)))
        .resolve(Directionality.of(context));

    return Stack(
      clipBehavior: Clip.none,
      fit: StackFit.passthrough,
      children: [
        widget.child,
        if (_showRing)
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
                    color: widget.color,
                    width: BwBorder.widthFocus,
                  ),
                  borderRadius: outerRadius,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
