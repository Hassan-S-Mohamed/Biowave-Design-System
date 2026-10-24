import 'dart:math' as math;

import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';
import 'bw_text_field_decoration.dart';

/// Package-private trailing action (`trailing-action`) rendered inside the
/// text field outline.
class BwFieldAction extends StatelessWidget {
  const BwFieldAction({
    required this.icon,
    required this.label,
    required this.size,
    this.onPressed,
    this.multiline = false,
    this.toggle = false,
    this.selected = false,
    this.selectedIcon,
    super.key,
  });

  final IconData icon;
  final String label;
  final BwControlSize size;
  final VoidCallback? onPressed;
  final bool multiline;
  final bool toggle;
  final bool selected;
  final IconData? selectedIcon;

  /// Resolves the top offset inside a multiline field per B2:
  /// `max(actionInset, paddingBlock + (lineHeight - actionBox) / 2)`.
  static double multilineTopInset(BuildContext context, BwControlSize size) {
    final normalized = BwTextFieldDecoration.effectiveSize(size);
    final metrics = BwTextFieldDecoration.sizeMetrics(normalized);
    final inputStyle = BwTextFieldDecoration.inputTextStyle(
      context,
      normalized,
      enabled: true,
    );
    final lineHeight =
        (inputStyle.fontSize ?? BwSize.iconSm) * (inputStyle.height ?? 1.0);
    final marginBlockStart = math.max(
      metrics.actionInset - metrics.gap,
      (lineHeight - metrics.actionBox) / 2,
    );
    return metrics.gap + marginBlockStart;
  }

  @override
  Widget build(BuildContext context) {
    final normalized = BwTextFieldDecoration.effectiveSize(size);
    final metrics = BwTextFieldDecoration.sizeMetrics(normalized);
    final buttonSize = switch (normalized) {
      BwControlSize.sm || BwControlSize.md => BwControlSize.sm,
      BwControlSize.lg || BwControlSize.xl => BwControlSize.md,
    };

    final actionBox = BwFieldTargetBox(
      key: const ValueKey<String>('BwTextField.trailing-action'),
      layoutSize: Size.square(metrics.actionBox),
      minTargetSize: Size.square(BwLayout.tablet.minTarget),
      child: IconTheme.merge(
        data: IconThemeData(
          size: metrics.icon,
          opticalSize: metrics.icon,
        ),
        child: BwIconButton(
          icon: icon,
          selectedIcon: selectedIcon,
          label: label,
          onPressed: onPressed,
          variant: BwButtonVariant.text,
          color: BwButtonColor.neutral,
          size: buttonSize,
          toggle: toggle,
          selected: selected,
          tooltip: false,
        ),
      ),
    );

    final topInset = multiline
        ? multilineTopInset(context, normalized)
        : BwSpacing.none;

    return Padding(
      padding: EdgeInsetsDirectional.only(
        top: topInset,
        end: metrics.actionInset,
      ),
      child: actionBox,
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
  Rect get semanticBounds {
    final targetWidth = math.max(size.width, _minTargetSize.width);
    final targetHeight = math.max(size.height, _minTargetSize.height);
    return Rect.fromCenter(
      center: size.center(Offset.zero),
      width: targetWidth,
      height: targetHeight,
    );
  }

  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    config.isSemanticBoundary = true;
    config.isMergingSemanticsOfDescendants = true;
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
      if (hitTestChildren(result, position: position)) {
        result.add(BoxHitTestEntry(this, position));
        return true;
      }
    }
    return false;
  }
}

/// Package-private wrapper that top-aligns `prefixIcon` / `suffixIcon` slots
/// inside a multiline [InputDecorator] (which otherwise centers them vertically).
class BwFieldTopAlign extends SingleChildRenderObjectWidget {
  const BwFieldTopAlign({
    required super.child,
    super.key,
  });

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderBwFieldTopAlign();
}

class _RenderBwFieldTopAlign extends RenderShiftedBox {
  _RenderBwFieldTopAlign() : super(null);

  double get _decoratorCenterOffsetY {
    RenderObject? node = this;
    while (node is RenderBox) {
      final parent = node.parent;
      if (parent is RenderProxyBox || parent is RenderShiftedBox) {
        node = parent;
        continue;
      }
      final parentData = node.parentData;
      if (parentData is BoxParentData) {
        return parentData.offset.dy;
      }
      break;
    }
    return BwSpacing.none;
  }

  @override
  Size computeDryLayout(BoxConstraints constraints) {
    final child = this.child;
    if (child == null) return constraints.smallest;
    return constraints.constrain(child.getDryLayout(constraints.loosen()));
  }

  @override
  void performLayout() {
    final child = this.child;
    if (child == null) {
      size = constraints.smallest;
      return;
    }
    child.layout(constraints.loosen(), parentUsesSize: true);
    size = constraints.constrain(child.size);
    final childParentData = child.parentData! as BoxParentData;
    childParentData.offset = Offset.zero;
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    final child = this.child;
    if (child == null) return;
    context.paintChild(child, offset - Offset(BwSpacing.none, _decoratorCenterOffsetY));
  }

  @override
  void applyPaintTransform(RenderBox child, Matrix4 transform) {
    transform.translateByDouble(
      BwSpacing.none,
      -_decoratorCenterOffsetY,
      BwSpacing.none,
      BwBorder.widthDefault,
    );
  }

  @override
  bool hitTestChildren(BoxHitTestResult result, {required Offset position}) {
    final child = this.child;
    if (child == null) return false;
    final shift = Offset(BwSpacing.none, -_decoratorCenterOffsetY);
    return result.addWithPaintOffset(
      offset: shift,
      position: position,
      hitTest: (BoxHitTestResult result, Offset transformed) {
        return child.hitTest(result, position: transformed);
      },
    );
  }
}
