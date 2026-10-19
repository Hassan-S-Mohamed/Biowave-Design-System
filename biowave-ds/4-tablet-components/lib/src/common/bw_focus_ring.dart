import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

/// Package-private focus treatment shared by interactive tablet controls.
///
/// The class is intentionally not exported from `biowave_tablet.dart`.
class BwFocusRing extends StatefulWidget {
  const BwFocusRing({
    required this.childBuilder,
    required this.color,
    required this.radius,
    required this.duration,
    this.focusNode,
    super.key,
  });

  final Widget Function(BuildContext context, FocusNode focusNode) childBuilder;
  final Color color;
  final double radius;
  final Duration duration;
  final FocusNode? focusNode;

  @override
  State<BwFocusRing> createState() => _BwFocusRingState();
}

class _BwFocusRingState extends State<BwFocusRing> {
  late FocusNode _focusNode;

  bool get _showRing =>
      _focusNode.hasFocus &&
      FocusManager.instance.highlightMode == FocusHighlightMode.traditional;

  @override
  void initState() {
    super.initState();
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_handleFocusChange);
    FocusManager.instance.addHighlightModeListener(_handleHighlightModeChange);
  }

  @override
  void didUpdateWidget(BwFocusRing oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.focusNode == widget.focusNode) return;
    _focusNode.removeListener(_handleFocusChange);
    if (oldWidget.focusNode == null) _focusNode.dispose();
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_handleFocusChange);
  }

  @override
  void dispose() {
    FocusManager.instance
        .removeHighlightModeListener(_handleHighlightModeChange);
    _focusNode.removeListener(_handleFocusChange);
    if (widget.focusNode == null) _focusNode.dispose();
    super.dispose();
  }

  void _handleFocusChange() => setState(() {});

  void _handleHighlightModeChange(FocusHighlightMode _) => setState(() {});

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      key: const ValueKey<String>('BwButton.focus-ring'),
      duration: widget.duration,
      decoration: _showRing
          ? BoxDecoration(
              border: Border.all(
                color: widget.color,
                width: BwBorder.widthFocus,
              ),
              borderRadius: BorderRadiusDirectional.all(
                Radius.circular(widget.radius + BwBorder.focusOffset),
              ),
            )
          : const BoxDecoration(),
      child: Padding(
        padding: const EdgeInsetsDirectional.all(BwBorder.focusOffset),
        child: widget.childBuilder(context, _focusNode),
      ),
    );
  }
}
