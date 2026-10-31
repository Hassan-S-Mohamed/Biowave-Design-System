import 'package:flutter/material.dart';

import 'bw_button.dart' show BwButtonSegment;

/// Shape of one joined Split button segment (Split button B2).
///
/// Rounded outer corners and square inner corners like a
/// [RoundedRectangleBorder], but the stroke is not painted on the inner edge:
/// the vertical Divider between the two segments is their shared edge, so an
/// outlined Split button shows one line there, never a double border.
@immutable
class BwSegmentBorder extends OutlinedBorder {
  /// Creates the shape of the [segment] side of a joined control.
  const BwSegmentBorder({
    super.side,
    required this.borderRadius,
    required this.segment,
  });

  /// Corner radii (outer `radius-md` / `radius-xl`, inner `radius-none`).
  final BorderRadiusGeometry borderRadius;

  /// Which segment this shape belongs to; decides the inner (unstroked) edge.
  final BwButtonSegment segment;

  RoundedRectangleBorder get _shape =>
      RoundedRectangleBorder(side: side, borderRadius: borderRadius);

  @override
  BwSegmentBorder copyWith({
    BorderSide? side,
    BorderRadiusGeometry? borderRadius,
  }) =>
      BwSegmentBorder(
        side: side ?? this.side,
        borderRadius: borderRadius ?? this.borderRadius,
        segment: segment,
      );

  @override
  EdgeInsetsGeometry get dimensions => _shape.dimensions;

  @override
  ShapeBorder scale(double t) => BwSegmentBorder(
        side: side.scale(t),
        borderRadius: borderRadius * t,
        segment: segment,
      );

  @override
  Path getInnerPath(Rect rect, {TextDirection? textDirection}) =>
      _shape.getInnerPath(rect, textDirection: textDirection);

  @override
  Path getOuterPath(Rect rect, {TextDirection? textDirection}) =>
      _shape.getOuterPath(rect, textDirection: textDirection);

  @override
  void paint(Canvas canvas, Rect rect, {TextDirection? textDirection}) {
    if (side.style == BorderStyle.none || side.width == 0) return;
    // Inner edge = inline end of the start segment, inline start of the end
    // segment; physical side flips in RTL.
    final isRtl = textDirection == TextDirection.rtl;
    final innerOnRight = (segment == BwButtonSegment.start) != isRtl;
    final w = side.width;
    final innerStrip = innerOnRight
        ? Rect.fromLTRB(rect.right - w, rect.top + w, rect.right, rect.bottom - w)
        : Rect.fromLTRB(rect.left, rect.top + w, rect.left + w, rect.bottom - w);
    canvas.save();
    canvas.clipPath(
      Path.combine(
        PathOperation.difference,
        Path()..addRect(rect),
        Path()..addRect(innerStrip),
      ),
    );
    _shape.paint(canvas, rect, textDirection: textDirection);
    canvas.restore();
  }

  @override
  bool operator ==(Object other) =>
      other is BwSegmentBorder &&
      other.side == side &&
      other.borderRadius == borderRadius &&
      other.segment == segment;

  @override
  int get hashCode => Object.hash(side, borderRadius, segment);
}
