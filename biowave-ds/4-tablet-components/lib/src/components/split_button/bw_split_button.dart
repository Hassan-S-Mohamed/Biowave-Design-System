import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon/bw_icon.dart';
import '../icon_button/bw_icon_button.dart';

/// One alternative exposed by [BwSplitButton]'s menu.
@immutable
final class BwSplitButtonOption {
  const BwSplitButtonOption({
    required this.label,
    required this.onSelected,
    this.icon,
    this.enabled = true,
  });

  final String label;
  final VoidCallback onSelected;
  final IconData? icon;
  final bool enabled;
}

/// A primary action paired with a short menu of related alternatives.
class BwSplitButton extends StatefulWidget {
  BwSplitButton({
    required this.label,
    required this.onPressed,
    required this.options,
    this.variant = BwButtonVariant.filled,
    this.color = BwButtonColor.brand,
    this.size = BwControlSize.lg,
    this.leadingIcon,
    this.loading = false,
    this.loadingLabel,
    this.menuLabel,
    super.key,
  })  : assert(
          variant == BwButtonVariant.filled ||
              variant == BwButtonVariant.tonal ||
              variant == BwButtonVariant.outlined,
          'BwSplitButton supports filled, tonal, or outlined variants',
        ),
        assert(
          color == BwButtonColor.brand ||
              color == BwButtonColor.secondary ||
              color == BwButtonColor.neutral,
          'BwSplitButton supports brand, secondary, or neutral colors',
        ),
        assert(
          variant != BwButtonVariant.tonal || color != BwButtonColor.neutral,
          'BwSplitButton tonal does not support neutral',
        ),
        assert(
          options.length >= 2 && options.length <= 5,
          'BwSplitButton needs between 2 and 5 options',
        ),
        assert(
          !options.any((option) => option.label == label),
          'BwSplitButton option labels must differ from the primary label',
        );

  final String label;
  final VoidCallback? onPressed;
  final List<BwSplitButtonOption> options;
  final BwButtonVariant variant;
  final BwButtonColor color;
  final BwControlSize size;
  final IconData? leadingIcon;
  final bool loading;
  final String? loadingLabel;
  final String? menuLabel;

  @override
  State<BwSplitButton> createState() => _BwSplitButtonState();
}

class _BwSplitButtonState extends State<BwSplitButton> {
  final MenuController _menuController = MenuController();
  final FocusNode _triggerFocusNode = FocusNode(
    debugLabel: 'BwSplitButton.menu-trigger',
  );
  final WidgetStatesController _triggerStates = WidgetStatesController();
  final GlobalKey _containerKey = GlobalKey();

  bool _isOpen = false;
  bool _opening = false;
  double? _containerWidth;

  bool get _enabled => widget.onPressed != null && !widget.loading;

  BwButtonVariant get _effectiveVariant {
    if (widget.variant == BwButtonVariant.tonal &&
        widget.color == BwButtonColor.neutral) {
      return BwButtonVariant.outlined;
    }
    return widget.variant;
  }

  @override
  void didUpdateWidget(BwSplitButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!_enabled && _menuController.isOpen) {
      _menuController.close();
    }
  }

  @override
  void dispose() {
    _triggerFocusNode.dispose();
    _triggerStates.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final reduceMotion = context.bw.reduceMotion;
    final resolvedMenuLabel = widget.menuLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'خيارات إضافية لـ ${widget.label}'
            : 'More options for ${widget.label}');

    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: widget.label,
      child: MenuAnchor(
        controller: _menuController,
        childFocusNode: _triggerFocusNode,
        alignmentOffset: const Offset(BwSpacing.none, BwSpacing.xs),
        animated: !reduceMotion,
        onOpen: _handleOpened,
        onClose: _handleClosed,
        style: MenuStyle(
          alignment: AlignmentDirectional.bottomEnd,
          backgroundColor: WidgetStatePropertyAll<Color>(
            context.bw.colors.surfaceRaised,
          ),
          surfaceTintColor: WidgetStatePropertyAll<Color>(
            context.bw.colors.backgroundTransparent,
          ),
          minimumSize: WidgetStatePropertyAll<Size>(
            Size(_containerWidth ?? BwSpacing.none, BwSpacing.none),
          ),
          padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
            EdgeInsetsDirectional.all(BwSpacing.none),
          ),
          shape: const WidgetStatePropertyAll<OutlinedBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadiusDirectional.all(
                Radius.circular(BwRadius.lg),
              ),
            ),
          ),
        ),
        menuChildren: [
          for (final option in widget.options)
            MenuItemButton(
              onPressed: option.enabled ? option.onSelected : null,
              semanticsLabel: option.label,
              style: _menuItemStyle(context),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (option.icon != null) ...[
                    BwIcon(
                      icon: option.icon!,
                      color: BwIconColor.subtle,
                      directional: option.icon!.matchTextDirection,
                    ),
                    const SizedBox(width: BwSpacing.controlGapMd),
                  ],
                  Flexible(child: Text(option.label)),
                ],
              ),
            ),
        ],
        builder: (context, controller, child) => Row(
          key: _containerKey,
          mainAxisSize: MainAxisSize.min,
          children: [
            BwButton(
              label: widget.label,
              onPressed: widget.onPressed,
              variant: _effectiveVariant,
              color: widget.color,
              size: widget.size,
              leadingIcon: widget.leadingIcon,
              loading: widget.loading,
              loadingLabel: widget.loadingLabel,
              segment: BwButtonSegment.start,
            ),
            const SizedBox(width: BwSpacing.xxs),
            CallbackShortcuts(
              bindings: <ShortcutActivator, VoidCallback>{
                const SingleActivator(LogicalKeyboardKey.arrowDown): _openMenu,
                const SingleActivator(LogicalKeyboardKey.arrowUp): _openMenu,
              },
              child: BwIconButton(
                icon: Symbols.expand_more_rounded,
                label: resolvedMenuLabel,
                onPressed: _enabled ? _toggleMenu : null,
                variant: _effectiveVariant,
                color: widget.color,
                size: widget.size,
                tooltip: false,
                focusNode: _triggerFocusNode,
                statesController: _triggerStates,
                segment: BwButtonSegment.end,
                iconTurns: _isOpen ? 0.5 : 0,
                iconRotationDuration:
                    reduceMotion ? BwDuration.instant : BwDuration.md,
                iconRotationCurve: _isOpen
                    ? BwEasing.standardDecelerate
                    : BwEasing.standardAccelerate,
                expanded: _isOpen,
              ),
            ),
          ],
        ),
      ),
    );
  }

  ButtonStyle _menuItemStyle(BuildContext context) {
    final colors = context.bw.colors;

    return ButtonStyle(
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(
          _containerWidth ?? BwLayout.tablet.minTarget,
          BwSize.controlHeightMd,
        ),
      ),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.symmetric(
          horizontal: BwSpacing.controlPaddingInlineMd,
        ),
      ),
      tapTargetSize: MaterialTapTargetSize.padded,
      textStyle: WidgetStatePropertyAll<TextStyle>(context.bw.text.bodyMd),
      foregroundColor: WidgetStateProperty.resolveWith<Color>(
        (states) => states.contains(WidgetState.disabled)
            ? colors.textNeutralDisabled
            : colors.textNeutralDefault,
      ),
      iconColor: WidgetStateProperty.resolveWith<Color>(
        (states) => states.contains(WidgetState.disabled)
            ? colors.iconNeutralDisabled
            : colors.iconNeutralSubtle,
      ),
      overlayColor: WidgetStateProperty.resolveWith<Color>((states) {
        if (states.contains(WidgetState.pressed)) {
          return colors.overlayPressed;
        }
        if (states.contains(WidgetState.hovered) ||
            states.contains(WidgetState.focused)) {
          return colors.overlayHover;
        }
        return colors.backgroundTransparent;
      }),
      backgroundBuilder: (context, states, child) {
        assert(child != null);
        return DecoratedBox(
          decoration: BoxDecoration(
            border: states.contains(WidgetState.focused)
                ? Border.all(
                    color: colors.borderFocus,
                    width: BwBorder.widthFocus,
                  )
                : null,
            borderRadius: const BorderRadiusDirectional.all(
              Radius.circular(BwRadius.xs),
            ),
          ),
          child: child!,
        );
      },
      splashFactory: NoSplash.splashFactory,
    );
  }

  void _toggleMenu() {
    if (_menuController.isOpen) {
      _menuController.close();
    } else {
      _openMenu();
    }
  }

  void _openMenu() {
    if (!_enabled || _menuController.isOpen || _opening) return;

    final renderBox =
        _containerKey.currentContext?.findRenderObject() as RenderBox?;
    _opening = true;
    setState(() => _containerWidth = renderBox?.size.width);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _opening = false;
      if (mounted && _enabled && !_menuController.isOpen) {
        _menuController.open();
      }
    });
  }

  void _handleOpened() {
    _triggerStates.update(WidgetState.pressed, true);
    if (mounted) setState(() => _isOpen = true);
  }

  void _handleClosed() {
    _triggerStates.update(WidgetState.pressed, false);
    if (!mounted) return;
    setState(() => _isOpen = false);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && _enabled) _triggerFocusNode.requestFocus();
    });
  }
}
