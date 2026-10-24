import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon/bw_icon.dart';
import '../icon_button/bw_icon_button.dart';

enum _MenuFocusTarget { none, first, last }

/// One alternative exposed by [BwSplitButton]'s menu.
@immutable
final class BwSplitButtonOption {
  const BwSplitButtonOption({
    required this.label,
    required this.onSelected,
    this.icon,
    this.enabled = true,
  }) : assert(label != '', 'BwSplitButtonOption needs a non-empty label');

  /// Human-readable option label.
  final String label;

  /// Callback executed when this option is selected.
  final VoidCallback onSelected;

  /// Optional leading icon on this menu item.
  final IconData? icon;

  /// Whether this option can be selected.
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
  })  : assert(label.isNotEmpty, 'BwSplitButton needs a non-empty label'),
        assert(
          variant == BwButtonVariant.filled ||
              variant == BwButtonVariant.tonal ||
              variant == BwButtonVariant.outlined,
          'BwSplitButton supports filled, tonal, and outlined variants only',
        ),
        assert(
          color == BwButtonColor.brand ||
              color == BwButtonColor.secondary ||
              color == BwButtonColor.neutral,
          'BwSplitButton supports brand, secondary, and neutral colors only',
        ),
        assert(
          !(variant == BwButtonVariant.tonal && color == BwButtonColor.neutral),
          'BwSplitButton tonal does not support neutral color',
        ),
        assert(
          options.length >= 2 && options.length <= 5,
          'BwSplitButton options must have between 2 and 5 items',
        ),
        assert(
          !options.any((option) => option.label == label),
          'BwSplitButton option labels must differ from the primary action label',
        );

  /// Chevron half turn when expanded (B4).
  @visibleForTesting
  static const double chevronHalfTurn = 0.5;

  /// Primary action label.
  final String label;

  /// Primary action callback. Null disables both parts.
  final VoidCallback? onPressed;

  /// Alternatives shown in the menu (2–5 items).
  final List<BwSplitButtonOption> options;

  /// Visual style variant for both parts.
  final BwButtonVariant variant;

  /// Color palette for both parts.
  final BwButtonColor color;

  /// Control size for both parts.
  final BwControlSize size;

  /// Optional leading icon on the `primary-action` button.
  final IconData? leadingIcon;

  /// Whether the primary action is currently running; disables `menu-trigger`.
  final bool loading;

  /// Optional custom loading announcement label for the primary action.
  final String? loadingLabel;

  /// Optional accessible label for `menu-trigger`; defaults to localized
  /// `"More options for {label}"`.
  final String? menuLabel;

  @override
  State<BwSplitButton> createState() => _BwSplitButtonState();
}

class _BwSplitButtonState extends State<BwSplitButton> {
  final GlobalKey _containerKey = GlobalKey();
  final GlobalKey _menuSurfaceKey = GlobalKey();
  final MenuController _menuController = MenuController();
  late final FocusNode _primaryFocusNode = FocusNode(
    debugLabel: 'BwSplitButton.primary-action',
  );
  late final FocusNode _triggerFocusNode = FocusNode(
    debugLabel: 'BwSplitButton.menu-trigger',
  );
  final List<FocusNode> _optionFocusNodes = <FocusNode>[];
  final WidgetStatesController _triggerStates = WidgetStatesController();

  bool _isOpen = false;
  bool _restoreFocusOnClose = true;
  double? _containerWidth;
  double? _menuWidth;

  BwButtonColor get _effectiveColor =>
      widget.color == BwButtonColor.error ||
              widget.color == BwButtonColor.inverse
          ? BwButtonColor.brand
          : widget.color;

  BwButtonVariant get _effectiveVariant {
    if (widget.variant == BwButtonVariant.text) {
      return BwButtonVariant.outlined;
    }
    if (widget.variant == BwButtonVariant.tonal &&
        _effectiveColor == BwButtonColor.neutral) {
      return BwButtonVariant.outlined;
    }
    return widget.variant;
  }

  bool get _triggerEnabled => widget.onPressed != null && !widget.loading;

  @override
  void initState() {
    super.initState();
    _syncOptionFocusNodes();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final box =
          _containerKey.currentContext?.findRenderObject() as RenderBox?;
      if (box != null && box.hasSize) {
        setState(() => _containerWidth = box.size.width);
      }
    });
  }

  @override
  void didUpdateWidget(BwSplitButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncOptionFocusNodes();
    if (!_triggerEnabled && _menuController.isOpen) {
      _menuController.close();
    }
  }

  void _syncOptionFocusNodes() {
    while (_optionFocusNodes.length < widget.options.length) {
      final index = _optionFocusNodes.length;
      _optionFocusNodes.add(
        FocusNode(debugLabel: 'BwSplitButton.option.$index'),
      );
    }
    while (_optionFocusNodes.length > widget.options.length) {
      _optionFocusNodes.removeLast().dispose();
    }
  }

  @override
  void dispose() {
    for (final node in _optionFocusNodes) {
      node.dispose();
    }
    _primaryFocusNode.dispose();
    _triggerFocusNode.dispose();
    _triggerStates.dispose();
    super.dispose();
  }

  double _estimateMenuWidth(BuildContext context) {
    final text = context.bw.text.bodyMd;
    final textScaler = MediaQuery.textScalerOf(context);
    final textDirection = Directionality.of(context);
    final locale = Localizations.maybeLocaleOf(context);
    var maxWidth = _containerWidth ?? 0.0;
    for (final option in widget.options) {
      final painter = TextPainter(
        text: TextSpan(text: option.label, style: text),
        maxLines: 1,
        textDirection: textDirection,
        textScaler: textScaler,
        locale: locale,
      )..layout();
      final iconWidth = option.icon == null
          ? 0.0
          : BwSize.iconMd + BwSpacing.controlGapMd;
      final itemWidth = BwSpacing.controlPaddingInlineMd +
          iconWidth +
          painter.width +
          BwSpacing.controlPaddingInlineMd;
      painter.dispose();
      if (itemWidth > maxWidth) {
        maxWidth = itemWidth;
      }
    }
    return maxWidth;
  }

  Offset _resolveAlignmentOffset(BuildContext context) {
    final containerWidth = _containerWidth;
    final menuWidth = _menuWidth ?? _estimateMenuWidth(context);
    final extraWidth = containerWidth != null && menuWidth > containerWidth
        ? menuWidth - containerWidth
        : 0.0;
    return Offset(-extraWidth, BwSpacing.xs);
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.bw.colors;
    final reduceMotion = context.bw.reduceMotion;

    final effectiveMenuLabel = widget.menuLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'خيارات أخرى لـ${widget.label}'
            : 'More options for ${widget.label}');

    const menuBorderRadius = BorderRadiusDirectional.all(
      Radius.circular(BwRadius.lg),
    );

    return MenuAnchor(
      key: const ValueKey<String>('menu'),
      controller: _menuController,
      childFocusNode: _triggerFocusNode,
      alignmentOffset: _resolveAlignmentOffset(context),
      clipBehavior: Clip.none,
      animated: !reduceMotion,
      onOpen: _handleOpened,
      onClose: _handleClosed,
      style: MenuStyle(
        alignment: AlignmentDirectional.bottomStart,
        backgroundColor: WidgetStatePropertyAll<Color>(
          colors.backgroundTransparent,
        ),
        shadowColor: WidgetStatePropertyAll<Color>(
          colors.backgroundTransparent,
        ),
        surfaceTintColor: WidgetStatePropertyAll<Color>(
          colors.backgroundTransparent,
        ),
        minimumSize: WidgetStatePropertyAll<Size>(
          Size(_containerWidth ?? 0.0, 0.0),
        ),
        padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
          EdgeInsetsDirectional.all(BwSpacing.none),
        ),
        shape: const WidgetStatePropertyAll<OutlinedBorder>(
          RoundedRectangleBorder(borderRadius: menuBorderRadius),
        ),
      ),
      menuChildren: [
        Builder(
          builder: (context) {
            final menuColors = context.bw.colors;
            return Focus(
              canRequestFocus: false,
              skipTraversal: true,
              onKeyEvent: _handleMenuKeyEvent,
              child: DecoratedBox(
                key: _menuSurfaceKey,
                decoration: BoxDecoration(
                  color: menuColors.surfaceRaised,
                  borderRadius: menuBorderRadius,
                  boxShadow: context.bw.elevation.elevation3,
                ),
                child: ClipRRect(
                  borderRadius: menuBorderRadius,
                  child: IntrinsicWidth(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        for (var i = 0; i < widget.options.length; i++)
                          _buildMenuItem(context, i, widget.options[i]),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ],
      builder: (context, controller, child) => Semantics(
        key: _containerKey,
        container: true,
        label: widget.label,
        child: Row(
          key: const ValueKey<String>('container'),
          mainAxisSize: MainAxisSize.min,
          children: [
            BwButton(
              key: const ValueKey<String>('primary-action'),
              label: widget.label,
              onPressed: widget.onPressed,
              variant: _effectiveVariant,
              color: _effectiveColor,
              size: widget.size,
              leadingIcon: widget.leadingIcon,
              loading: widget.loading,
              loadingLabel: widget.loadingLabel,
              focusNode: _primaryFocusNode,
              segment: BwButtonSegment.start,
            ),
            const SizedBox(
              key: ValueKey<String>('gap'),
              width: BwSpacing.xxs,
            ),
            Focus(
              canRequestFocus: false,
              skipTraversal: true,
              onKeyEvent: _handleTriggerKeyEvent,
              child: BwIconButton(
                key: const ValueKey<String>('menu-trigger'),
                icon: Symbols.expand_more_rounded,
                label: effectiveMenuLabel,
                onPressed: _triggerEnabled ? _toggleMenu : null,
                variant: _effectiveVariant,
                color: _effectiveColor,
                size: widget.size,
                tooltip: false,
                focusNode: _triggerFocusNode,
                statesController: _triggerStates,
                segment: BwButtonSegment.end,
                iconTurns: _isOpen ? BwSplitButton.chevronHalfTurn : 0.0,
                iconRotationDuration: reduceMotion
                    ? BwDuration.instant
                    : (_isOpen ? BwDuration.md : BwDuration.sm),
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

  Widget _buildMenuItem(
    BuildContext context,
    int index,
    BwSplitButtonOption option,
  ) {
    final focusNode = _optionFocusNodes[index];
    final enabled = option.enabled;

    void activate() {
      _menuController.close();
      option.onSelected();
    }

    return Semantics(
      key: ValueKey<String>('BwSplitButton.option.$index'),
      container: true,
      label: option.label,
      button: true,
      enabled: enabled,
      focusable: enabled,
      focused: enabled && focusNode.hasFocus,
      onTap: enabled ? activate : null,
      onFocus: enabled ? focusNode.requestFocus : null,
      excludeSemantics: true,
      child: MenuItemButton(
        focusNode: focusNode,
        requestFocusOnHover: false,
        onPressed: enabled ? activate : null,
        semanticsLabel: option.label,
        style: _menuItemStyle(context),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (option.icon != null) ...[
              BwIcon(
                icon: option.icon!,
                color: enabled ? BwIconColor.subtle : null,
                directional: option.icon!.matchTextDirection,
              ),
              const SizedBox(width: BwSpacing.controlGapMd),
            ],
            Flexible(child: Text(option.label)),
          ],
        ),
      ),
    );
  }

  ButtonStyle _menuItemStyle(BuildContext context) {
    final colors = context.bw.colors;
    final reduceMotion = context.bw.reduceMotion;

    return ButtonStyle(
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(
          _containerWidth ?? BwLayout.mobile.minTarget,
          BwSize.controlHeightMd,
        ),
      ),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.symmetric(
          horizontal: BwSpacing.controlPaddingInlineMd,
        ),
      ),
      shape: const WidgetStatePropertyAll<OutlinedBorder>(
        RoundedRectangleBorder(),
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
      side: WidgetStateProperty.resolveWith<BorderSide?>((states) {
        if (!states.contains(WidgetState.disabled) &&
            states.contains(WidgetState.focused)) {
          return BorderSide(
            width: BwBorder.widthFocus,
            color: colors.borderFocus,
          );
        }
        return BorderSide.none;
      }),
      animationDuration: reduceMotion ? BwDuration.instant : BwDuration.sm,
      splashFactory: NoSplash.splashFactory,
    );
  }

  KeyEventResult _handleTriggerKeyEvent(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.tab && _menuController.isOpen) {
      _closeMenuForTab(isShift: HardwareKeyboard.instance.isShiftPressed);
      return KeyEventResult.handled;
    }
    if (!_triggerEnabled) return KeyEventResult.ignored;

    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      if (_menuController.isOpen) {
        _focusEdgeOption(last: false);
      } else {
        _openMenu(focusTarget: _MenuFocusTarget.first);
      }
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      if (_menuController.isOpen) {
        _focusEdgeOption(last: true);
      } else {
        _openMenu(focusTarget: _MenuFocusTarget.last);
      }
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.enter ||
        event.logicalKey == LogicalKeyboardKey.space) {
      if (event is KeyRepeatEvent) return KeyEventResult.handled;
      if (_menuController.isOpen) {
        _menuController.close();
      } else {
        _openMenu(focusTarget: _MenuFocusTarget.first);
      }
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  KeyEventResult _handleMenuKeyEvent(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent && event is! KeyRepeatEvent) {
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.tab) {
      _closeMenuForTab(isShift: HardwareKeyboard.instance.isShiftPressed);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      _moveOptionFocus(1);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      _moveOptionFocus(-1);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.home) {
      _focusEdgeOption(last: false);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.end) {
      _focusEdgeOption(last: true);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      _menuController.close();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  void _closeMenuForTab({required bool isShift}) {
    _restoreFocusOnClose = false;
    _menuController.close();
    _triggerFocusNode.requestFocus();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      if (isShift) {
        _triggerFocusNode.previousFocus();
      } else {
        _triggerFocusNode.nextFocus();
      }
    });
  }

  void _focusEdgeOption({required bool last}) {
    final indices = List<int>.generate(widget.options.length, (i) => i);
    final ordered = last ? indices.reversed : indices;
    for (final index in ordered) {
      if (widget.options[index].enabled) {
        _optionFocusNodes[index].requestFocus();
        return;
      }
    }
  }

  void _moveOptionFocus(int delta) {
    final count = widget.options.length;
    if (count == 0) return;

    final currentIndex = _optionFocusNodes.indexWhere((node) => node.hasFocus);
    if (currentIndex == -1) {
      _focusEdgeOption(last: delta < 0);
      return;
    }

    for (var step = 1; step <= count; step++) {
      final candidate = (currentIndex + delta * step) % count;
      final index = candidate < 0 ? candidate + count : candidate;
      if (widget.options[index].enabled) {
        _optionFocusNodes[index].requestFocus();
        return;
      }
    }
  }

  void _toggleMenu() {
    if (_menuController.isOpen) {
      _menuController.close();
    } else {
      _openMenu(focusTarget: _MenuFocusTarget.first);
    }
  }

  void _openMenu({_MenuFocusTarget focusTarget = _MenuFocusTarget.none}) {
    if (!_triggerEnabled || _menuController.isOpen) return;

    final renderBox =
        _containerKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox != null && renderBox.hasSize) {
      _containerWidth = renderBox.size.width;
    }
    _restoreFocusOnClose = true;
    _menuController.open();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !_menuController.isOpen) return;
      final containerBox =
          _containerKey.currentContext?.findRenderObject() as RenderBox?;
      final measuredContainerWidth = containerBox != null && containerBox.hasSize
          ? containerBox.size.width
          : null;
      final menuBox =
          _menuSurfaceKey.currentContext?.findRenderObject() as RenderBox?;
      final measuredMenuWidth =
          menuBox != null && menuBox.hasSize ? menuBox.size.width : null;
      if ((measuredContainerWidth != null &&
              measuredContainerWidth != _containerWidth) ||
          (measuredMenuWidth != null && measuredMenuWidth != _menuWidth)) {
        setState(() {
          if (measuredContainerWidth != null) {
            _containerWidth = measuredContainerWidth;
          }
          if (measuredMenuWidth != null) {
            _menuWidth = measuredMenuWidth;
          }
        });
      }
      if (focusTarget != _MenuFocusTarget.none) {
        _focusEdgeOption(last: focusTarget == _MenuFocusTarget.last);
      }
    });
  }

  void _handleOpened() {
    _triggerStates.update(WidgetState.pressed, true);
    if (mounted) setState(() => _isOpen = true);
  }

  void _handleClosed() {
    _triggerStates.update(WidgetState.pressed, false);
    final restoreFocus = _restoreFocusOnClose;
    _restoreFocusOnClose = true;
    if (!mounted) return;
    setState(() => _isOpen = false);
    if (!restoreFocus) return;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && _triggerEnabled) _triggerFocusNode.requestFocus();
    });
  }
}
