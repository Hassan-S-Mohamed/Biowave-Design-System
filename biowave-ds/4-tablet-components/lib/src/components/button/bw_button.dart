import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/foundation.dart' show internal;
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import '../../common/bw_control_size.dart';
import '../../common/bw_focus_ring.dart';
import '../icon/bw_icon.dart';
import 'bw_button_style.dart';

enum BwButtonVariant { filled, tonal, outlined, text }

enum BwButtonColor { brand, secondary, neutral, error, inverse }

/// Logical segment placement for package-owned composite controls.
@internal
enum BwButtonSegment { start, end }

/// A token-driven Material 3 action button for tablet experiences.
class BwButton extends StatelessWidget {
  const BwButton({
    required this.label,
    required this.onPressed,
    this.variant = BwButtonVariant.filled,
    this.color = BwButtonColor.brand,
    this.size = BwControlSize.lg,
    this.leadingIcon,
    this.trailingIcon,
    this.fullWidth = false,
    this.loading = false,
    this.loadingLabel,
    this.focusNode,
    this.autofocus = false,
    this.segment,
    super.key,
  })  : assert(
          label.length > 0,
          'BwButton needs a label — use BwIconButton',
        ),
        assert(
          leadingIcon == null || trailingIcon == null,
          'BwButton supports either a leadingIcon or a trailingIcon, not both',
        ),
        assert(
          variant != BwButtonVariant.tonal ||
              (color != BwButtonColor.neutral &&
                  color != BwButtonColor.inverse),
          'BwButton tonal supports brand, secondary, or error',
        );

  final String label;
  final VoidCallback? onPressed;
  final BwButtonVariant variant;
  final BwButtonColor color;
  final BwControlSize size;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final bool fullWidth;
  final bool loading;
  final String? loadingLabel;
  final FocusNode? focusNode;
  final bool autofocus;

  /// Used by package-owned controls that join buttons into one control.
  @internal
  final BwButtonSegment? segment;

  BwButtonVariant get _effectiveVariant {
    if (variant == BwButtonVariant.tonal &&
        (color == BwButtonColor.neutral || color == BwButtonColor.inverse)) {
      return BwButtonVariant.outlined;
    }
    return variant;
  }

  IconData? get _effectiveTrailingIcon =>
      leadingIcon == null ? trailingIcon : null;

  @override
  Widget build(BuildContext context) {
    final effectiveVariant = _effectiveVariant;
    final dimensions = BwButtonStyle.metrics(size);
    final baseStyle = BwButtonStyle.resolve(
      context,
      effectiveVariant,
      color,
      size,
      fullWidth: fullWidth,
    );
    final animationDuration =
        context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm;
    final announcement = loadingLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'جارٍ التحميل'
            : 'Loading');
    final action = loading && onPressed != null ? () {} : onPressed;
    final ringColor = color == BwButtonColor.inverse
        ? context.bw.colors.borderInverse
        : context.bw.colors.borderFocus;
    final borderRadius = BwButtonStyle.segmentBorderRadius(dimensions, segment);
    final ringBorderRadius = borderRadius.resolve(Directionality.of(context));
    final style = baseStyle.copyWith(
      shape: WidgetStatePropertyAll<OutlinedBorder>(
        BwButtonStyle.segmentShape(borderRadius, segment),
      ),
      backgroundBuilder: (context, states, child) {
        assert(child != null);
        return BwFocusRing(
          focused: states.contains(WidgetState.focused),
          borderRadius: ringBorderRadius,
          color: ringColor,
          ringKey: const ValueKey<String>('BwButton.focus-ring'),
          child: child!,
        );
      },
    );

    final labelWidget = Text(
      label,
      key: const ValueKey<String>('BwButton.label'),
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      softWrap: false,
    );
    final content = Stack(
      alignment: AlignmentDirectional.center,
      children: [
        Visibility(
          maintainSize: true,
          maintainAnimation: true,
          maintainState: true,
          visible: !loading,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (leadingIcon != null) ...[
                BwIcon(
                  key: const ValueKey<String>('BwButton.leading-icon'),
                  icon: leadingIcon!,
                  directional: leadingIcon!.matchTextDirection,
                ),
                SizedBox(width: dimensions.gap),
              ],
              Flexible(child: labelWidget),
              if (_effectiveTrailingIcon != null) ...[
                SizedBox(width: dimensions.gap),
                BwIcon(
                  key: const ValueKey<String>('BwButton.trailing-icon'),
                  icon: _effectiveTrailingIcon!,
                  directional: _effectiveTrailingIcon!.matchTextDirection,
                ),
              ],
            ],
          ),
        ),
        AnimatedSwitcher(
          duration: animationDuration,
          child: loading
              ? SizedBox.square(
                  key: const ValueKey<String>('BwButton.spinner'),
                  dimension: dimensions.iconSize,
                  child: CircularProgressIndicator(
                    color:
                        style.foregroundColor?.resolve(const <WidgetState>{}),
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );

    Widget buildButton(FocusNode? resolvedFocusNode) {
      return switch (effectiveVariant) {
        BwButtonVariant.filled => FilledButton(
            key: const ValueKey<String>('BwButton.container'),
            onPressed: action,
            focusNode: resolvedFocusNode,
            autofocus: autofocus,
            style: style,
            clipBehavior: Clip.none,
            child: content,
          ),
        BwButtonVariant.tonal => FilledButton.tonal(
            key: const ValueKey<String>('BwButton.container'),
            onPressed: action,
            focusNode: resolvedFocusNode,
            autofocus: autofocus,
            style: style,
            clipBehavior: Clip.none,
            child: content,
          ),
        BwButtonVariant.outlined => OutlinedButton(
            key: const ValueKey<String>('BwButton.container'),
            onPressed: action,
            focusNode: resolvedFocusNode,
            autofocus: autofocus,
            style: style,
            clipBehavior: Clip.none,
            child: content,
          ),
        BwButtonVariant.text => TextButton(
            key: const ValueKey<String>('BwButton.container'),
            onPressed: action,
            focusNode: resolvedFocusNode,
            autofocus: autofocus,
            style: style,
            clipBehavior: Clip.none,
            child: content,
          ),
      };
    }

    Widget result = buildButton(focusNode);

    if (loading) {
      result = Semantics(
        key: const ValueKey<String>('BwButton.loading-semantics'),
        label: label,
        value: announcement,
        button: true,
        enabled: onPressed != null,
        excludeSemantics: true,
        child: result,
      );
    }

    return _BwLoadingAnnouncer(
      loading: loading,
      announcement: announcement,
      child: result,
    );
  }
}

class _BwLoadingAnnouncer extends StatefulWidget {
  const _BwLoadingAnnouncer({
    required this.loading,
    required this.announcement,
    required this.child,
  });

  final bool loading;
  final String announcement;
  final Widget child;

  @override
  State<_BwLoadingAnnouncer> createState() => _BwLoadingAnnouncerState();
}

class _BwLoadingAnnouncerState extends State<_BwLoadingAnnouncer> {
  @override
  void initState() {
    super.initState();
    if (widget.loading) _announceAfterBuild();
  }

  @override
  void didUpdateWidget(_BwLoadingAnnouncer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!oldWidget.loading && widget.loading) _announceAfterBuild();
  }

  void _announceAfterBuild() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !widget.loading) return;
      SemanticsService.sendAnnouncement(
        View.of(context),
        widget.announcement,
        Directionality.of(context),
      );
    });
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
