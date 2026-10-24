import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';

/// The in-outline action used by Biowave field components.
class BwFieldAction extends StatelessWidget {
  const BwFieldAction({
    required this.icon,
    required this.label,
    required this.onPressed,
    this.toggle = false,
    this.selected = false,
    this.selectedIcon,
    super.key,
  });

  final IconData icon;
  final String label;
  final VoidCallback? onPressed;
  final bool toggle;
  final bool selected;
  final IconData? selectedIcon;

  @override
  Widget build(BuildContext context) {
    return BwIconButton(
      key: const ValueKey<String>('BwFieldAction.button'),
      icon: icon,
      label: label,
      onPressed: onPressed,
      variant: BwButtonVariant.text,
      color: BwButtonColor.neutral,
      size: BwControlSize.md,
      toggle: toggle,
      selected: selected,
      selectedIcon: selectedIcon,
      tooltip: false,
    );
  }
}

/// Package-private layout wrapper that reports [layoutSize] to its parent so
/// visual layout stays unchanged while laying out its child at
/// `max(layoutSize, minTargetSize)` so touch hit testing and accessibility
/// semantics targets remain at least [minTargetSize].
class BwFieldTargetBox extends SingleChildRenderObjectWidget {
  const BwFieldTargetBox({
    required this.layoutSize,
    required this.minTargetSize,
    required super.child,
    super.key,
  });

  final Size layoutSize;
  final Size minTargetSize;

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderBwFieldTargetBox(
        layoutSize: layoutSize,
        minTargetSize: minTargetSize,
      );

  @override
  void updateRenderObject(
    BuildContext context,
    covariant RenderObject renderObject,
  ) {
    final box = renderObject as _RenderBwFieldTargetBox;
    box
      ..layoutSize = layoutSize
      ..minTargetSize = minTargetSize;
  }
}

class _RenderBwFieldTargetBox extends RenderShiftedBox {
  _RenderBwFieldTargetBox({
    required Size layoutSize,
    required Size minTargetSize,
  })  : _layoutSize = layoutSize,
        _minTargetSize = minTargetSize,
        super(null);

  Size _layoutSize;
  Size get layoutSize => _layoutSize;
  set layoutSize(Size value) {
    if (_layoutSize == value) return;
    _layoutSize = value;
    markNeedsLayout();
  }

  Size _minTargetSize;
  Size get minTargetSize => _minTargetSize;
  set minTargetSize(Size value) {
    if (_minTargetSize == value) return;
    _minTargetSize = value;
    markNeedsLayout();
  }

  @override
  Size computeDryLayout(BoxConstraints constraints) =>
      constraints.constrain(_layoutSize);

  @override
  void performLayout() {
    size = constraints.constrain(_layoutSize);
    final child = this.child;
    if (child == null) return;

    final targetWidth = math.max(size.width, _minTargetSize.width);
    final targetHeight = math.max(size.height, _minTargetSize.height);
    child.layout(
      BoxConstraints.tight(Size(targetWidth, targetHeight)),
      parentUsesSize: true,
    );
    final childParentData = child.parentData! as BoxParentData;
    childParentData.offset = Offset(
      (size.width - child.size.width) / 2,
      (size.height - child.size.height) / 2,
    );
  }

  @override
  bool hitTest(BoxHitTestResult result, {required Offset position}) {
    final child = this.child;
    if (child == null) return false;
    final childParentData = child.parentData! as BoxParentData;
    final transformed = position - childParentData.offset;
    if ((Offset.zero & child.size).contains(transformed)) {
      final isHit = result.addWithPaintOffset(
        offset: childParentData.offset,
        position: position,
        hitTest: (BoxHitTestResult result, Offset transformed) {
          return child.hitTest(result, position: transformed);
        },
      );
      if (isHit) {
        result.add(BoxHitTestEntry(this, position));
        return true;
      }
    }
    return false;
  }
}
