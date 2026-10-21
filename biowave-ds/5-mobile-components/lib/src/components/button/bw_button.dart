import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import '../../common/bw_control_size.dart';
import 'bw_button_style.dart';

enum BwButtonVariant { filled, tonal, outlined, text }

enum BwButtonColor { brand, secondary, neutral, error, inverse }

/// A token-driven action button for Biowave mobile experiences.
class BwButton extends StatelessWidget {
  BwButton({
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
    super.key,
  })  : assert(
          label.isNotEmpty,
          'BwButton needs a label — use BwIconButton',
        ),
        assert(
          !(variant == BwButtonVariant.tonal &&
              (color == BwButtonColor.neutral ||
                  color == BwButtonColor.inverse)),
          'BwButton tonal supports brand, secondary, and error colors only',
        ),
        assert(
          leadingIcon == null || trailingIcon == null,
          'BwButton accepts either a leadingIcon or a trailingIcon, not both',
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

  @override
  Widget build(BuildContext context) {
    final effectiveVariant = variant == BwButtonVariant.tonal &&
            (color == BwButtonColor.neutral || color == BwButtonColor.inverse)
        ? BwButtonVariant.outlined
        : variant;
    final effectiveTrailingIcon = leadingIcon == null ? trailingIcon : null;
    final metrics = BwButtonStyle.metrics(context, size);
    final style = BwButtonStyle.resolve(
      context,
      effectiveVariant,
      color,
      size,
      focusRingKey: const ValueKey<String>('BwButton.focus-ring'),
      fullWidth: fullWidth,
    );
    final foreground = style.foregroundColor!.resolve(<WidgetState>{
      if (onPressed == null) WidgetState.disabled,
    })!;
    final content = Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        if (leadingIcon != null) ...<Widget>[
          Icon(
            leadingIcon,
            size: metrics.iconSize,
            semanticLabel: null,
          ),
          SizedBox(width: metrics.gap),
        ],
        Flexible(
          child: Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            softWrap: false,
          ),
        ),
        if (effectiveTrailingIcon != null) ...<Widget>[
          SizedBox(width: metrics.gap),
          Icon(
            effectiveTrailingIcon,
            size: metrics.iconSize,
            semanticLabel: null,
          ),
        ],
      ],
    );
    final child = Stack(
      alignment: AlignmentDirectional.center,
      children: <Widget>[
        Visibility(
          visible: !loading,
          maintainSize: true,
          maintainAnimation: true,
          maintainState: true,
          child: content,
        ),
        AnimatedSwitcher(
          duration:
              context.bw.reduceMotion ? BwDuration.instant : BwDuration.sm,
          child: loading
              ? SizedBox.square(
                  key: const ValueKey<String>('BwButton.spinner'),
                  dimension: metrics.iconSize,
                  child: CircularProgressIndicator(color: foreground),
                )
              : const SizedBox.shrink(
                  key: ValueKey<String>('BwButton.spinner.empty'),
                ),
        ),
      ],
    );

    final effectiveOnPressed = loading && onPressed != null ? () {} : onPressed;
    final button = switch (effectiveVariant) {
      BwButtonVariant.filled => FilledButton(
          onPressed: effectiveOnPressed,
          focusNode: focusNode,
          autofocus: autofocus,
          style: style,
          clipBehavior: Clip.none,
          child: child,
        ),
      BwButtonVariant.tonal => FilledButton.tonal(
          onPressed: effectiveOnPressed,
          focusNode: focusNode,
          autofocus: autofocus,
          style: style,
          clipBehavior: Clip.none,
          child: child,
        ),
      BwButtonVariant.outlined => OutlinedButton(
          onPressed: effectiveOnPressed,
          focusNode: focusNode,
          autofocus: autofocus,
          style: style,
          clipBehavior: Clip.none,
          child: child,
        ),
      BwButtonVariant.text => TextButton(
          onPressed: effectiveOnPressed,
          focusNode: focusNode,
          autofocus: autofocus,
          style: style,
          clipBehavior: Clip.none,
          child: child,
        ),
    };
    final message = loadingLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'جارٍ التحميل'
            : 'Loading');
    final semanticButton = loading && onPressed != null
        ? Semantics(
            label: label,
            value: message,
            button: true,
            enabled: true,
            excludeSemantics: true,
            child: button,
          )
        : button;

    return _LoadingAnnouncement(
      loading: loading && onPressed != null,
      message: message,
      child: semanticButton,
    );
  }
}

class _LoadingAnnouncement extends StatefulWidget {
  const _LoadingAnnouncement({
    required this.loading,
    required this.message,
    required this.child,
  });

  final bool loading;
  final String message;
  final Widget child;

  @override
  State<_LoadingAnnouncement> createState() => _LoadingAnnouncementState();
}

class _LoadingAnnouncementState extends State<_LoadingAnnouncement> {
  @override
  void initState() {
    super.initState();
    if (widget.loading) {
      _announceAfterFrame();
    }
  }

  @override
  void didUpdateWidget(_LoadingAnnouncement oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.loading && !oldWidget.loading) {
      _announceAfterFrame();
    }
  }

  void _announceAfterFrame() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && widget.loading) {
        SemanticsService.sendAnnouncement(
          View.of(context),
          widget.message,
          Directionality.of(context),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
