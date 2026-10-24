import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon/bw_icon.dart';
import '../icon_button/bw_icon_button.dart';

/// A single menu option in [BwSplitButton].
class BwSplitButtonOption {
  const BwSplitButtonOption({
    required this.label,
    required this.onSelected,
    this.icon,
    this.enabled = true,
  }) : assert(label != '', 'BwSplitButtonOption needs a label');

  /// Visible label for this menu item.
  final String label;

  /// Callback invoked when the user chooses this option.
  final VoidCallback? onSelected;

  /// Optional leading icon (`Symbols.*_rounded`).
  final IconData? icon;

  /// Whether this option can be selected.
  final bool enabled;
}

/// A split button pairing a primary [BwButton] action with a [BwIconButton]
/// menu trigger and a temporary Material 3 [MenuAnchor] menu (until Menu on Day 10).
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
          label.isNotEmpty,
          'BwSplitButton needs a label',
        ),
        assert(
          variant != BwButtonVariant.text,
          'BwSplitButton supports filled, tonal, and outlined variants only',
        ),
        assert(
          color != BwButtonColor.error && color != BwButtonColor.inverse,
          'BwSplitButton supports brand, secondary, and neutral colors only',
        ),
        assert(
          !(variant == BwButtonVariant.tonal &&
              color == BwButtonColor.neutral),
          'BwSplitButton tonal supports brand and secondary colors only',
        ),
        assert(
          options.length >= 2 && options.length <= 5,
          'BwSplitButton requires between 2 and 5 options',
        ),
        assert(
          options.every((option) => option.label != label),
          'Do not repeat the primary action in the menu',
        );

  /// Label for the `primary-action` button.
  final String label;

  /// Callback for the primary action; `null` disables both parts.
  final VoidCallback? onPressed;

  /// Related alternative actions (2–5 items).
  final List<BwSplitButtonOption> options;

  /// Visual emphasis shared by both parts (`filled`, `tonal`, `outlined`).
  final BwButtonVariant variant;

  /// Semantic colour shared by both parts (`brand`, `secondary`, `neutral`).
  final BwButtonColor color;

  /// Control size shared by both parts (`sm`, `md`, `lg`, `xl`).
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
  static const double _expandedTurns =
      BwIconAxes.fillSelected / BwBorder.widthStrong;

  final GlobalKey _containerKey = GlobalKey();
  final GlobalKey _firstItemKey = GlobalKey();
  final MenuController _menuController = MenuController();
  late final FocusNode _primaryFocusNode = FocusNode();
  late final FocusNode _triggerFocusNode = FocusNode(
    onKeyEvent: _handleTriggerKeyEvent,
  );
  final List<FocusNode> _itemFocusNodes = <FocusNode>[];

  bool _isOpen = false;
  double _containerWidth = BwSpacing.none;
  double _menuWidth = BwSpacing.none;

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
    _syncItemFocusNodes();
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureContainer());
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureContainer());
  }

  @override
  void didUpdateWidget(BwSplitButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncItemFocusNodes();
    if (!_triggerEnabled && _menuController.isOpen) {
      _menuController.close();
    }
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureContainer());
  }

  @override
  void dispose() {
    _primaryFocusNode.dispose();
    _triggerFocusNode.dispose();
    for (final node in _itemFocusNodes) {
      node
        ..removeListener(_handleItemFocusChange)
        ..dispose();
    }
    super.dispose();
  }

  void _handleItemFocusChange() {
    if (mounted) {
      setState(() {});
    }
  }

  void _syncItemFocusNodes() {
    while (_itemFocusNodes.length < widget.options.length) {
      _itemFocusNodes.add(
        FocusNode(onKeyEvent: _handleMenuItemKeyEvent)
          ..addListener(_handleItemFocusChange),
      );
    }
    while (_itemFocusNodes.length > widget.options.length) {
      _itemFocusNodes.removeLast()
        ..removeListener(_handleItemFocusChange)
        ..dispose();
    }
  }

  double _resolveMenuWidth(BuildContext context, TextStyle itemTextStyle) {
    final textScaler = MediaQuery.textScalerOf(context);
    final textDirection = Directionality.of(context);
    final locale = Localizations.maybeLocaleOf(context);
    final effectiveStyle =
        DefaultTextStyle.of(context).style.merge(itemTextStyle);
    var maxWidth = _containerWidth;
    if (_menuWidth > maxWidth) {
      maxWidth = _menuWidth;
    }
    for (final option in widget.options) {
      final painter = TextPainter(
        text: TextSpan(text: option.label, style: effectiveStyle),
        maxLines: 1,
        textDirection: textDirection,
        textScaler: textScaler,
        locale: locale,
      )..layout();
      final iconWidth = option.icon == null
          ? BwSpacing.none
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

  void _measureContainer() {
    if (!mounted) {
      return;
    }
    final renderObject = _containerKey.currentContext?.findRenderObject();
    final itemObject = _firstItemKey.currentContext?.findRenderObject();
    final nextContainerWidth =
        renderObject is RenderBox && renderObject.hasSize
            ? renderObject.size.width
            : _containerWidth;
    final nextMenuWidth = itemObject is RenderBox && itemObject.hasSize
        ? itemObject.size.width
        : _menuWidth;
    if (nextContainerWidth != _containerWidth || nextMenuWidth != _menuWidth) {
      setState(() {
        _containerWidth = nextContainerWidth;
        _menuWidth = nextMenuWidth;
      });
    }
  }

  List<int> get _enabledOptionIndices => <int>[
        for (var i = 0; i < widget.options.length; i++)
          if (widget.options[i].enabled &&
              widget.options[i].onSelected != null)
            i,
      ];

  void _openMenu({required bool focusLast}) {
    if (!_triggerEnabled) {
      return;
    }
    final renderObject = _containerKey.currentContext?.findRenderObject();
    if (renderObject is RenderBox && renderObject.hasSize) {
      _containerWidth = renderObject.size.width;
    }
    _menuController.open();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !_menuController.isOpen) {
        return;
      }
      _measureContainer();
      final enabledIndices = _enabledOptionIndices;
      if (enabledIndices.isEmpty) {
        return;
      }
      final targetIndex =
          focusLast ? enabledIndices.last : enabledIndices.first;
      _itemFocusNodes[targetIndex].requestFocus();
    });
  }

  void _toggleMenu() {
    if (!_triggerEnabled) {
      return;
    }
    if (_menuController.isOpen) {
      _menuController.close();
    } else {
      _openMenu(focusLast: false);
    }
  }

  void _handleMenuOpen() {
    if (!mounted) {
      return;
    }
    final renderObject = _containerKey.currentContext?.findRenderObject();
    final measuredWidth = renderObject is RenderBox && renderObject.hasSize
        ? renderObject.size.width
        : _containerWidth;
    setState(() {
      _containerWidth = measuredWidth;
      _isOpen = true;
    });
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureContainer());
  }

  void _handleMenuClose() {
    if (!mounted) {
      return;
    }
    setState(() {
      _isOpen = false;
      _menuWidth = BwSpacing.none;
    });
    if (_triggerEnabled) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && _triggerEnabled) {
          _triggerFocusNode.requestFocus();
        }
      });
    }
  }

  KeyEventResult _handleTriggerKeyEvent(FocusNode node, KeyEvent event) {
    if (!_triggerEnabled || event is! KeyDownEvent) {
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      _openMenu(focusLast: false);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      _openMenu(focusLast: true);
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  KeyEventResult _handleMenuItemKeyEvent(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) {
      return KeyEventResult.ignored;
    }
    final enabledIndices = _enabledOptionIndices;
    if (enabledIndices.isEmpty) {
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.home) {
      _itemFocusNodes[enabledIndices.first].requestFocus();
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.end) {
      _itemFocusNodes[enabledIndices.last].requestFocus();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.bw.colors;
    final text = context.bw.text;
    final elevation = context.bw.elevation;
    final reduceMotion = context.bw.reduceMotion;

    final effectiveMenuLabel = widget.menuLabel ??
        (Localizations.localeOf(context).languageCode == 'ar'
            ? 'خيارات أخرى لـ${widget.label}'
            : 'More options for ${widget.label}');

    // TODO(menu): Replace temporary MenuAnchor/MenuItemButton styling with BwMenu on Day 10.
    final menuStyle = MenuStyle(
      backgroundColor: WidgetStatePropertyAll<Color>(colors.surfaceRaised),
      surfaceTintColor:
          WidgetStatePropertyAll<Color>(colors.backgroundTransparent),
      shadowColor: WidgetStatePropertyAll<Color>(colors.shadowAmbient),
      elevation: WidgetStatePropertyAll<double>(
        elevation.elevation3.first.offset.dy,
      ),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.zero,
      ),
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(_containerWidth, BwSpacing.none),
      ),
      shape: const WidgetStatePropertyAll<OutlinedBorder>(
        RoundedRectangleBorder(
          borderRadius: BorderRadiusDirectional.all(
            Radius.circular(BwRadius.lg),
          ),
        ),
      ),
      alignment: AlignmentDirectional.bottomStart,
      visualDensity: VisualDensity.standard,
    );

    final itemStyle = ButtonStyle(
      textStyle: WidgetStatePropertyAll<TextStyle>(text.bodyMd),
      backgroundColor:
          WidgetStatePropertyAll<Color>(colors.backgroundTransparent),
      foregroundColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return colors.textNeutralDisabled;
        }
        return colors.textNeutralDefault;
      }),
      iconColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return colors.iconNeutralDisabled;
        }
        return colors.iconNeutralSubtle;
      }),
      iconSize: const WidgetStatePropertyAll<double>(BwSize.iconMd),
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return colors.backgroundTransparent;
        }
        if (states.contains(WidgetState.pressed)) {
          return colors.overlayPressed;
        }
        if (states.contains(WidgetState.hovered) ||
            states.contains(WidgetState.focused)) {
          return colors.overlayHover;
        }
        return colors.backgroundTransparent;
      }),
      side: WidgetStateProperty.resolveWith((states) {
        if (!states.contains(WidgetState.disabled) &&
            states.contains(WidgetState.focused)) {
          return BorderSide(
            width: BwBorder.widthFocus,
            color: colors.borderFocus,
          );
        }
        return BorderSide.none;
      }),
      padding: const WidgetStatePropertyAll<EdgeInsetsGeometry>(
        EdgeInsetsDirectional.symmetric(
          horizontal: BwSpacing.controlPaddingInlineMd,
        ),
      ),
      minimumSize: WidgetStatePropertyAll<Size>(
        Size(_containerWidth, BwSize.controlHeightMd),
      ),
      tapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      animationDuration: reduceMotion ? BwDuration.instant : BwDuration.sm,
      splashFactory: NoSplash.splashFactory,
    );

    final chevronDuration = reduceMotion
        ? BwDuration.instant
        : (_isOpen ? BwDuration.md : BwDuration.sm);
    final chevronCurve =
        _isOpen ? BwEasing.standardDecelerate : BwEasing.standardAccelerate;
    final resolvedMenuWidth = _resolveMenuWidth(context, text.bodyMd);
    final excessMenuWidth = resolvedMenuWidth > _containerWidth
        ? resolvedMenuWidth - _containerWidth
        : BwSpacing.none;

    return MenuAnchor(
      key: const ValueKey<String>('menu'),
      controller: _menuController,
      childFocusNode: _triggerFocusNode,
      style: menuStyle,
      alignmentOffset: Offset(-excessMenuWidth, BwSpacing.xs),
      onOpen: _handleMenuOpen,
      onClose: _handleMenuClose,
      menuChildren: <Widget>[
        for (var i = 0; i < widget.options.length; i++)
          _buildMenuItem(context, i, itemStyle),
      ],
      child: Semantics(
        key: _containerKey,
        container: true,
        label: widget.label,
        child: Row(
          key: const ValueKey<String>('container'),
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
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
            BwIconButton(
              key: const ValueKey<String>('menu-trigger'),
              icon: Symbols.expand_more_rounded,
              label: effectiveMenuLabel,
              onPressed: _triggerEnabled ? _toggleMenu : null,
              variant: _effectiveVariant,
              color: _effectiveColor,
              size: widget.size,
              focusNode: _triggerFocusNode,
              segment: BwButtonSegment.end,
              expanded: _isOpen,
              iconChild: AnimatedRotation(
                key: const ValueKey<String>('BwSplitButton.chevron'),
                turns: _isOpen ? _expandedTurns : BwSpacing.none,
                duration: chevronDuration,
                curve: chevronCurve,
                child: const BwIcon(
                  icon: Symbols.expand_more_rounded,
                ),
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
    ButtonStyle itemStyle,
  ) {
    final option = widget.options[index];
    final focusNode = _itemFocusNodes[index];
    final enabled = option.enabled && option.onSelected != null;

    void activate() {
      _menuController.close();
      option.onSelected?.call();
    }

    final item = Semantics(
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
        style: itemStyle,
        onPressed: enabled ? option.onSelected : null,
        leadingIcon: option.icon == null
            ? null
            : Padding(
                padding: const EdgeInsetsDirectional.only(
                  end: BwSpacing.controlGapMd,
                ),
                child: BwIcon(
                  icon: option.icon!,
                  size: BwIconSize.md,
                ),
              ),
        child: Text(
          option.label,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          softWrap: false,
        ),
      ),
    );
    return index == 0 ? KeyedSubtree(key: _firstItemKey, child: item) : item;
  }
}
