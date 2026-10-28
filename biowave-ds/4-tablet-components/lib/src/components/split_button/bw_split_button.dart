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
  final List<FocusNode> _optionFocusNodes = <FocusNode>[];
  final WidgetStatesController _triggerStates = WidgetStatesController();
  final GlobalKey _containerKey = GlobalKey();
  final GlobalKey _menuSurfaceKey = GlobalKey();

  bool _isOpen = false;
  bool _opening = false;
  bool _restoreFocusOnClose = true;
  double? _containerWidth;
  double? _menuWidth;

  bool get _enabled => widget.onPressed != null && !widget.loading;

  BwButtonVariant get _effectiveVariant {
    if (widget.variant == BwButtonVariant.tonal &&
        widget.color == BwButtonColor.neutral) {
      return BwButtonVariant.outlined;
    }
    return widget.variant;
  }

  @override
  void initState() {
    super.initState();
    _syncOptionFocusNodes();
  }

  @override
  void didUpdateWidget(BwSplitButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncOptionFocusNodes();
    if (!_enabled && _menuController.isOpen) {
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
    _triggerFocusNode.dispose();
    _triggerStates.dispose();
    super.dispose();
  }

  Offset _resolveAlignmentOffset(BuildContext context) {
    final containerWidth = _containerWidth;
    final menuWidth = _menuWidth;
    final extraWidth =
        containerWidth != null && menuWidth != null && menuWidth > containerWidth
            ? menuWidth - containerWidth
            : BwSpacing.none;
    return Offset(-extraWidth, BwSpacing.xs);
  }

  @override
  Widget build(BuildContext context) {
    final reduceMotion = context.bw.reduceMotion;
    final colors = context.bw.colors;
    final resolvedMenuLabel = widget.menuLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'خيارات إضافية لـ ${widget.label}'
            : 'More options for ${widget.label}');
    const menuBorderRadius = BorderRadiusDirectional.all(
      Radius.circular(BwRadius.lg),
    );

    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: widget.label,
      child: MenuAnchor(
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
            colors.backgroundTransparentDefault,
          ),
          shadowColor: WidgetStatePropertyAll<Color>(
            colors.backgroundTransparentDefault,
          ),
          surfaceTintColor: WidgetStatePropertyAll<Color>(
            colors.backgroundTransparentDefault,
          ),
          minimumSize: WidgetStatePropertyAll<Size>(
            Size(_containerWidth ?? BwSpacing.none, BwSpacing.none),
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
            Focus(
              canRequestFocus: false,
              skipTraversal: true,
              onKeyEvent: _handleTriggerKeyEvent,
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
    return MenuItemButton(
      focusNode: _optionFocusNodes[index],
      requestFocusOnHover: false,
      onPressed: option.enabled ? option.onSelected : null,
      semanticsLabel: option.label,
      style: _menuItemStyle(context),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (option.icon != null) ...[
            BwIcon(
              icon: option.icon!,
              color: option.enabled ? BwIconColor.subtle : null,
              directional: option.icon!.matchTextDirection,
            ),
            const SizedBox(width: BwSpacing.controlGapMd),
          ],
          Flexible(child: Text(option.label)),
        ],
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
      shape: const WidgetStatePropertyAll<OutlinedBorder>(
        RoundedRectangleBorder(),
      ),
      tapTargetSize: MaterialTapTargetSize.padded,
      textStyle: WidgetStatePropertyAll<TextStyle>(context.bw.text.bodyMd),
      foregroundColor: WidgetStateProperty.resolveWith<Color>(
        (states) => states.contains(WidgetState.disabled)
            ? colors.textDisabled
            : colors.textDefault,
      ),
      iconColor: WidgetStateProperty.resolveWith<Color>(
        (states) => states.contains(WidgetState.disabled)
            ? colors.iconDisabled
            : colors.iconSubtle,
      ),
      overlayColor: WidgetStateProperty.resolveWith<Color>((states) {
        if (states.contains(WidgetState.pressed)) {
          return colors.backgroundTransparentPressed;
        }
        if (states.contains(WidgetState.hovered) ||
            states.contains(WidgetState.focused)) {
          return colors.backgroundTransparentHovered;
        }
        return colors.backgroundTransparentDefault;
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
          ),
          child: child!,
        );
      },
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
    if (!_enabled) return KeyEventResult.ignored;

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
      _openMenu();
    }
  }

  void _openMenu({_MenuFocusTarget focusTarget = _MenuFocusTarget.none}) {
    if (!_enabled || _menuController.isOpen || _opening) return;

    final renderBox =
        _containerKey.currentContext?.findRenderObject() as RenderBox?;
    _opening = true;
    _restoreFocusOnClose = true;
    setState(() {
      _containerWidth = renderBox?.size.width;
      _menuWidth = null;
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _opening = false;
      if (!mounted || !_enabled || _menuController.isOpen) return;
      final latestContainerBox =
          _containerKey.currentContext?.findRenderObject() as RenderBox?;
      final latestContainerWidth =
          latestContainerBox?.hasSize ?? false ? latestContainerBox!.size.width : null;
      if (latestContainerWidth != null &&
          latestContainerWidth != _containerWidth) {
        setState(() => _containerWidth = latestContainerWidth);
      }
      _menuController.open();
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted || !_menuController.isOpen) return;
        final containerBox =
            _containerKey.currentContext?.findRenderObject() as RenderBox?;
        final measuredContainerWidth =
            containerBox?.hasSize ?? false ? containerBox!.size.width : null;
        final menuBox =
            _menuSurfaceKey.currentContext?.findRenderObject() as RenderBox?;
        final measuredMenuWidth =
            menuBox?.hasSize ?? false ? menuBox!.size.width : null;
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
      if (mounted && _enabled) _triggerFocusNode.requestFocus();
    });
  }
}
