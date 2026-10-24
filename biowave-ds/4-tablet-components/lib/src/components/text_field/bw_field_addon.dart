import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

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

/// Package-private wrapper that squares the inline-start corners of an
/// attached `end-button` ([BwButton]) so it shares a flat vertical seam with
/// the text field outline.
class BwFieldEndButtonSquareStart extends SingleChildRenderObjectWidget {
  const BwFieldEndButtonSquareStart({
    required this.isRtl,
    required super.child,
    super.key,
  });

  final bool isRtl;

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderBwFieldEndButtonSquareStart(isRtl: isRtl);

  @override
  void updateRenderObject(
    BuildContext context,
    covariant RenderObject renderObject,
  ) {
    (renderObject as _RenderBwFieldEndButtonSquareStart).isRtl = isRtl;
  }
}

class _RenderBwFieldEndButtonSquareStart extends RenderProxyBox {
  _RenderBwFieldEndButtonSquareStart({required bool isRtl}) : _isRtl = isRtl;

  bool _isRtl;
  bool get isRtl => _isRtl;
  set isRtl(bool value) {
    if (_isRtl == value) return;
    _isRtl = value;
    markNeedsPaint();
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    final child = this.child;
    if (child == null) return;
    final squareContext = _SquareStartPaintingContext(
      context,
      estimatedBounds: paintBounds,
      isRtl: _isRtl,
    );
    squareContext.paintChild(child, offset);
  }
}

class _SquareStartPaintingContext extends PaintingContext {
  _SquareStartPaintingContext(
    this._parent, {
    required Rect estimatedBounds,
    required this.isRtl,
  }) : super(OffsetLayer(), estimatedBounds);

  final PaintingContext _parent;
  final bool isRtl;
  _SquareStartCanvas? _canvas;

  @override
  Canvas get canvas =>
      _canvas ??= _SquareStartCanvas(_parent.canvas, isRtl: isRtl);

  @override
  ClipPathLayer? pushClipPath(
    bool needsCompositing,
    Offset offset,
    Rect bounds,
    Path clipPath,
    PaintingContextCallback painter, {
    Clip clipBehavior = Clip.antiAlias,
    ClipPathLayer? oldLayer,
  }) {
    return _parent.pushClipPath(
      needsCompositing,
      offset,
      bounds,
      clipPath,
      (innerContext, innerOffset) {
        painter(
          _SquareStartPaintingContext(
            innerContext,
            estimatedBounds: innerContext.estimatedBounds,
            isRtl: isRtl,
          ),
          innerOffset,
        );
      },
      clipBehavior: clipBehavior,
      oldLayer: oldLayer,
    );
  }

  @override
  ClipRRectLayer? pushClipRRect(
    bool needsCompositing,
    Offset offset,
    Rect bounds,
    RRect clipRRect,
    PaintingContextCallback painter, {
    Clip clipBehavior = Clip.antiAlias,
    ClipRRectLayer? oldLayer,
  }) {
    return _parent.pushClipRRect(
      needsCompositing,
      offset,
      bounds,
      clipRRect,
      (innerContext, innerOffset) {
        painter(
          _SquareStartPaintingContext(
            innerContext,
            estimatedBounds: innerContext.estimatedBounds,
            isRtl: isRtl,
          ),
          innerOffset,
        );
      },
      clipBehavior: clipBehavior,
      oldLayer: oldLayer,
    );
  }

  @override
  TransformLayer? pushTransform(
    bool needsCompositing,
    Offset offset,
    Matrix4 transform,
    PaintingContextCallback painter, {
    TransformLayer? oldLayer,
  }) {
    return _parent.pushTransform(
      needsCompositing,
      offset,
      transform,
      (innerContext, innerOffset) {
        painter(
          _SquareStartPaintingContext(
            innerContext,
            estimatedBounds: innerContext.estimatedBounds,
            isRtl: isRtl,
          ),
          innerOffset,
        );
      },
      oldLayer: oldLayer,
    );
  }
}

class _SquareStartCanvas implements Canvas {
  _SquareStartCanvas(this._inner, {required this.isRtl});

  final Canvas _inner;
  final bool isRtl;

  RRect _squareStart(RRect rrect) {
    if (isRtl) {
      return RRect.fromRectAndCorners(
        rrect.outerRect,
        topLeft: rrect.tlRadius,
        bottomLeft: rrect.blRadius,
        topRight: Radius.zero,
        bottomRight: Radius.zero,
      );
    }
    return RRect.fromRectAndCorners(
      rrect.outerRect,
      topLeft: Radius.zero,
      bottomLeft: Radius.zero,
      topRight: rrect.trRadius,
      bottomRight: rrect.brRadius,
    );
  }

  @override
  void drawRRect(RRect rrect, Paint paint) =>
      _inner.drawRRect(_squareStart(rrect), paint);

  @override
  void drawDRRect(RRect outer, RRect inner, Paint paint) =>
      _inner.drawDRRect(_squareStart(outer), _squareStart(inner), paint);

  @override
  void clipRRect(RRect rrect, {bool doAntiAlias = true}) =>
      _inner.clipRRect(_squareStart(rrect), doAntiAlias: doAntiAlias);

  @override
  void clipRSuperellipse(
    ui.RSuperellipse rsuperellipse, {
    bool doAntiAlias = true,
  }) =>
      _inner.clipRSuperellipse(rsuperellipse, doAntiAlias: doAntiAlias);

  @override
  void drawRSuperellipse(ui.RSuperellipse rsuperellipse, Paint paint) =>
      _inner.drawRSuperellipse(rsuperellipse, paint);

  @override
  void clipPath(Path path, {bool doAntiAlias = true}) =>
      _inner.clipPath(path, doAntiAlias: doAntiAlias);

  @override
  void clipRect(
    Rect rect, {
    ui.ClipOp clipOp = ui.ClipOp.intersect,
    bool doAntiAlias = true,
  }) =>
      _inner.clipRect(rect, clipOp: clipOp, doAntiAlias: doAntiAlias);

  @override
  void drawArc(
    Rect rect,
    double startAngle,
    double sweepAngle,
    bool useCenter,
    Paint paint,
  ) =>
      _inner.drawArc(rect, startAngle, sweepAngle, useCenter, paint);

  @override
  void drawAtlas(
    ui.Image atlas,
    List<RSTransform> transforms,
    List<Rect> rects,
    List<Color>? colors,
    BlendMode? blendMode,
    Rect? cullRect,
    Paint paint,
  ) =>
      _inner.drawAtlas(
        atlas,
        transforms,
        rects,
        colors,
        blendMode,
        cullRect,
        paint,
      );

  @override
  void drawCircle(Offset c, double radius, Paint paint) =>
      _inner.drawCircle(c, radius, paint);

  @override
  void drawColor(Color color, BlendMode blendMode) =>
      _inner.drawColor(color, blendMode);

  @override
  void drawImage(ui.Image image, Offset offset, Paint paint) =>
      _inner.drawImage(image, offset, paint);

  @override
  void drawImageNine(ui.Image image, Rect center, Rect dst, Paint paint) =>
      _inner.drawImageNine(image, center, dst, paint);

  @override
  void drawImageRect(ui.Image image, Rect src, Rect dst, Paint paint) =>
      _inner.drawImageRect(image, src, dst, paint);

  @override
  void drawLine(Offset p1, Offset p2, Paint paint) =>
      _inner.drawLine(p1, p2, paint);

  @override
  void drawOval(Rect rect, Paint paint) => _inner.drawOval(rect, paint);

  @override
  void drawPaint(Paint paint) => _inner.drawPaint(paint);

  @override
  void drawParagraph(ui.Paragraph paragraph, Offset offset) =>
      _inner.drawParagraph(paragraph, offset);

  @override
  void drawPath(Path path, Paint paint) => _inner.drawPath(path, paint);

  @override
  void drawPicture(ui.Picture picture) => _inner.drawPicture(picture);

  @override
  void drawPoints(
    ui.PointMode pointMode,
    List<Offset> points,
    Paint paint,
  ) =>
      _inner.drawPoints(pointMode, points, paint);

  @override
  void drawRawAtlas(
    ui.Image atlas,
    Float32List rstTransforms,
    Float32List rects,
    Int32List? colors,
    BlendMode? blendMode,
    Rect? cullRect,
    Paint paint,
  ) =>
      _inner.drawRawAtlas(
        atlas,
        rstTransforms,
        rects,
        colors,
        blendMode,
        cullRect,
        paint,
      );

  @override
  void drawRawPoints(
    ui.PointMode pointMode,
    Float32List points,
    Paint paint,
  ) =>
      _inner.drawRawPoints(pointMode, points, paint);

  @override
  void drawRect(Rect rect, Paint paint) => _inner.drawRect(rect, paint);

  @override
  void drawShadow(
    Path path,
    Color color,
    double elevation,
    bool transparentOccluder,
  ) =>
      _inner.drawShadow(path, color, elevation, transparentOccluder);

  @override
  void drawVertices(
    ui.Vertices vertices,
    BlendMode blendMode,
    Paint paint,
  ) =>
      _inner.drawVertices(vertices, blendMode, paint);

  @override
  int getSaveCount() => _inner.getSaveCount();

  @override
  Rect getLocalClipBounds() => _inner.getLocalClipBounds();

  @override
  Rect getDestinationClipBounds() => _inner.getDestinationClipBounds();

  @override
  Float64List getTransform() => _inner.getTransform();

  @override
  void restore() => _inner.restore();

  @override
  void restoreToCount(int count) => _inner.restoreToCount(count);

  @override
  void rotate(double radians) => _inner.rotate(radians);

  @override
  void save() => _inner.save();

  @override
  void saveLayer(Rect? bounds, Paint paint) => _inner.saveLayer(bounds, paint);

  @override
  void scale(double sx, [double? sy]) => _inner.scale(sx, sy);

  @override
  void skew(double sx, double sy) => _inner.skew(sx, sy);

  @override
  void transform(Float64List matrix4) => _inner.transform(matrix4);

  @override
  void translate(double dx, double dy) => _inner.translate(dx, dy);
}
