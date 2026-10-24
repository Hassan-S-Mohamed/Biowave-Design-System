import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon/bw_icon.dart';
import 'bw_field_action.dart';
import 'bw_field_addon.dart';
import 'bw_field_label.dart';
import 'bw_field_supporting.dart';
import 'bw_text_field_decoration.dart';

/// Custom trailing action configuration for [BwTextField].
@immutable
final class BwTextFieldAction {
  const BwTextFieldAction({
    required this.icon,
    required this.label,
    required this.onPressed,
  }) : assert(label.length > 0, 'BwTextFieldAction needs a label');

  final IconData icon;
  final String label;
  final VoidCallback? onPressed;
}

/// Attached end-button configuration for [BwTextField].
@immutable
final class BwTextFieldEndButton {
  const BwTextFieldEndButton({
    required this.label,
    required this.onPressed,
    this.icon,
    this.loading = false,
  }) : assert(label.length > 0, 'BwTextFieldEndButton needs a label');

  final String label;
  final IconData? icon;
  final VoidCallback? onPressed;
  final bool loading;
}

/// A token-driven Material 3 text field and multiline text area for tablet experiences.
class BwTextField extends StatefulWidget {
  const BwTextField({
    required this.label,
    this.hideLabel = false,
    this.size = BwControlSize.lg,
    this.controller,
    this.initialValue,
    this.onChanged,
    this.onSubmitted,
    this.onTap,
    this.validator,
    this.autovalidateMode = AutovalidateMode.disabled,
    this.helperText,
    this.errorText,
    this.helpText,
    this.helpLabel,
    this.requiredField = false,
    this.multiline = false,
    this.minRows,
    this.maxRows,
    this.maxLength,
    this.showCounter = false,
    this.leadingIcon,
    this.trailingIcon,
    this.action,
    this.clearable = false,
    this.clearLabel,
    this.onCleared,
    this.obscureText = false,
    bool? passwordToggle,
    this.prefixText,
    this.suffixText,
    this.endButton,
    this.keyboardType,
    this.textInputAction,
    this.autofillHints,
    this.textCapitalization = TextCapitalization.none,
    this.inputFormatters,
    this.textDirection,
    this.readOnly = false,
    this.enabled = true,
    this.focusNode,
    this.autofocus = false,
    this.placeholder,
    super.key,
  })  : passwordToggle = passwordToggle ?? obscureText,
        assert(label.length > 0, 'BwTextField needs a label'),
        assert(
          size == BwControlSize.md || size == BwControlSize.lg,
          'BwTextField on Tablet supports md and lg sizes',
        ),
        assert(
          !showCounter || maxLength != null,
          'BwTextField showCounter requires maxLength',
        ),
        assert(
          multiline || (minRows == null && maxRows == null),
          'BwTextField minRows and maxRows apply only when multiline is true',
        ),
        assert(
          !multiline || !obscureText,
          'BwTextField does not support obscureText when multiline is true',
        ),
        assert(
          ((!multiline && obscureText && (passwordToggle ?? obscureText))
                      ? 1
                      : 0) +
                  (action != null ? 1 : 0) +
                  (clearable ? 1 : 0) <=
              1,
          'BwTextField supports at most one trailing action (passwordToggle, action, or clearable)',
        ),
        assert(
          trailingIcon == null ||
              (!(!multiline && obscureText && (passwordToggle ?? obscureText)) &&
                  action == null &&
                  !clearable),
          'BwTextField trailingIcon cannot be combined with a trailing action',
        ),
        assert(
          !multiline ||
              (prefixText == null && suffixText == null && endButton == null),
          'BwTextField prefixText, suffixText, and endButton are single-line only',
        ),
        assert(
          suffixText == null || endButton == null,
          'BwTextField cannot combine suffixText and endButton',
        ),
        assert(
          controller == null || initialValue == null,
          'BwTextField cannot supply both controller and initialValue',
        );

  final String label;
  final bool hideLabel;
  final BwControlSize size;
  final TextEditingController? controller;
  final String? initialValue;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final VoidCallback? onTap;
  final FormFieldValidator<String>? validator;
  final AutovalidateMode autovalidateMode;
  final String? helperText;
  final String? errorText;
  final String? helpText;
  final String? helpLabel;
  final bool requiredField;
  final bool multiline;
  final int? minRows;
  final int? maxRows;
  final int? maxLength;
  final bool showCounter;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final BwTextFieldAction? action;
  final bool clearable;
  final String? clearLabel;
  final VoidCallback? onCleared;
  final bool obscureText;
  final bool passwordToggle;
  final String? prefixText;
  final String? suffixText;
  final BwTextFieldEndButton? endButton;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final Iterable<String>? autofillHints;
  final TextCapitalization textCapitalization;
  final List<TextInputFormatter>? inputFormatters;
  final TextDirection? textDirection;
  final bool readOnly;
  final bool enabled;
  final FocusNode? focusNode;
  final bool autofocus;
  final String? placeholder;

  @override
  State<BwTextField> createState() => _BwTextFieldState();
}

class _BwTextFieldState extends State<BwTextField> {
  final GlobalKey<FormFieldState<String>> _formFieldKey =
      GlobalKey<FormFieldState<String>>();
  TextEditingController? _ownedController;
  FocusNode? _ownedFocusNode;
  bool _passwordVisible = false;
  bool _hovered = false;
  String? _lastValidatorError;

  TextEditingController get _effectiveController =>
      widget.controller ?? _ownedController!;

  FocusNode get _effectiveFocusNode => widget.focusNode ?? _ownedFocusNode!;

  BwControlSize get _effectiveSize =>
      BwTextFieldDecoration.effectiveSize(widget.size);

  bool get _effectiveReadOnly => widget.readOnly && widget.enabled;

  bool get _effectiveObscure =>
      !widget.multiline && widget.obscureText && !_passwordVisible;

  bool get _hasPasswordAction =>
      !widget.multiline && widget.obscureText && widget.passwordToggle;

  bool get _hasConfiguredAction =>
      _hasPasswordAction || widget.action != null || widget.clearable;

  bool get _hasClearAction =>
      !_hasPasswordAction &&
      widget.action == null &&
      widget.clearable &&
      widget.enabled &&
      !_effectiveReadOnly &&
      _effectiveController.text.isNotEmpty;

  bool get _hasRenderedAction =>
      _hasPasswordAction || widget.action != null || _hasClearAction;

  IconData? get _effectiveTrailingIcon =>
      _hasConfiguredAction ? null : widget.trailingIcon;

  String? get _effectivePrefixText =>
      widget.multiline ? null : widget.prefixText;

  BwTextFieldEndButton? get _effectiveEndButton =>
      widget.multiline ? null : widget.endButton;

  String? get _effectiveSuffixText =>
      (widget.multiline || _effectiveEndButton != null)
          ? null
          : widget.suffixText;

  String? get _effectiveErrorText => !widget.enabled
      ? null
      : (widget.errorText ?? _formFieldKey.currentState?.errorText);

  bool get _hasError =>
      widget.enabled &&
      _effectiveErrorText != null &&
      _effectiveErrorText!.isNotEmpty;

  @override
  void initState() {
    super.initState();
    if (widget.controller == null) {
      _ownedController = TextEditingController(text: widget.initialValue ?? '');
    }
    _effectiveController.addListener(_handleControllerChanged);

    if (widget.focusNode == null) {
      _ownedFocusNode = FocusNode();
    }
    _effectiveFocusNode.addListener(_handleFocusChanged);
  }

  @override
  void didUpdateWidget(BwTextField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.controller != oldWidget.controller) {
      oldWidget.controller?.removeListener(_handleControllerChanged);
      if (widget.controller == null) {
        _ownedController ??= TextEditingController(
          text: widget.initialValue ?? oldWidget.controller?.text ?? '',
        );
      } else {
        _ownedController?.removeListener(_handleControllerChanged);
        _ownedController?.dispose();
        _ownedController = null;
      }
      _effectiveController.addListener(_handleControllerChanged);
    }

    if (widget.focusNode != oldWidget.focusNode) {
      oldWidget.focusNode?.removeListener(_handleFocusChanged);
      if (widget.focusNode == null) {
        _ownedFocusNode ??= FocusNode();
      } else {
        _ownedFocusNode?.removeListener(_handleFocusChanged);
        _ownedFocusNode?.dispose();
        _ownedFocusNode = null;
      }
      _effectiveFocusNode.addListener(_handleFocusChanged);
    }

    if (!widget.obscureText && _passwordVisible) {
      _passwordVisible = false;
    }
  }

  @override
  void dispose() {
    _effectiveController.removeListener(_handleControllerChanged);
    _ownedController?.dispose();
    _effectiveFocusNode.removeListener(_handleFocusChanged);
    _ownedFocusNode?.dispose();
    super.dispose();
  }

  void _handleControllerChanged() {
    if (mounted) setState(() {});
  }

  void _handleFocusChanged() {
    if (mounted) setState(() {});
  }

  void _focusField() {
    if (!widget.enabled) return;
    _effectiveFocusNode.requestFocus();
  }

  void _handleClear() {
    if (!widget.enabled || _effectiveReadOnly) return;
    _effectiveController.clear();
    _effectiveFocusNode.requestFocus();
    widget.onChanged?.call('');
    widget.onCleared?.call();
  }

  void _handlePasswordToggle() {
    if (!widget.enabled) return;
    final hadFocus = _effectiveFocusNode.hasFocus;
    final selection = _effectiveController.selection;
    setState(() {
      _passwordVisible = !_passwordVisible;
    });
    if (hadFocus) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted) return;
        _effectiveFocusNode.requestFocus();
        if (selection.isValid) {
          _effectiveController.selection = selection;
        }
      });
    }
  }

  String _resolvedClearLabel(BuildContext context) {
    if (widget.clearLabel != null && widget.clearLabel!.isNotEmpty) {
      return widget.clearLabel!;
    }
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    return isArabic ? 'مسح ${widget.label}' : 'Clear ${widget.label}';
  }

  String _resolvedPasswordLabel(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    if (_passwordVisible) {
      return isArabic ? 'إخفاء كلمة المرور' : 'Hide password';
    }
    return isArabic ? 'إظهار كلمة المرور' : 'Show password';
  }

  String _resolvedSemanticLabel(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';
    final requiredSuffix = widget.requiredField
        ? (isArabic ? '، مطلوب' : ', required')
        : '';
    final baseLabel = '${widget.label}$requiredSuffix';
    final supporting = _hasError ? _effectiveErrorText : widget.helperText;
    if (supporting != null && supporting.isNotEmpty) {
      return '$baseLabel\n$supporting';
    }
    return baseLabel;
  }

  Color _currentBorderColor(BuildContext context) {
    final states = <WidgetState>{
      if (!widget.enabled) WidgetState.disabled,
      if (_hasError) WidgetState.error,
      if (_effectiveFocusNode.hasFocus) WidgetState.focused,
      if (_hovered) WidgetState.hovered,
    };
    return BwTextFieldDecoration.resolveBorderSide(
      context,
      states,
      readOnly: _effectiveReadOnly,
    ).color;
  }

  Widget? _buildPrefixSlot(
    BuildContext context,
    BwTextFieldSizeMetrics metrics,
    Color borderColor,
  ) {
    final prefixText = _effectivePrefixText;
    final leadingIcon = widget.leadingIcon;
    if (prefixText == null && leadingIcon == null) return null;

    Widget? leadingIconWidget;
    if (leadingIcon != null) {
      leadingIconWidget = ExcludeSemantics(
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          excludeFromSemantics: true,
          onTap: widget.enabled ? _focusField : null,
          child: Padding(
            padding: EdgeInsetsDirectional.only(
              start: prefixText != null ? metrics.gap : metrics.paddingInline,
              end: metrics.gap,
              top: widget.multiline ? metrics.gap : BwSpacing.none,
            ),
            child: IconTheme.merge(
              data: IconThemeData(
                size: metrics.icon,
                opticalSize: metrics.icon,
              ),
              child: BwIcon(
                key: const ValueKey<String>('BwTextField.leading-icon'),
                icon: leadingIcon,
                directional: leadingIcon.matchTextDirection,
              ),
            ),
          ),
        ),
      );
    }

    if (prefixText == null) {
      return widget.multiline && leadingIconWidget != null
          ? BwFieldTopAlign(child: leadingIconWidget)
          : leadingIconWidget;
    }

    final addon = BwFieldAddon(
      text: prefixText,
      position: BwFieldAddonPosition.prefix,
      size: _effectiveSize,
      borderColor: borderColor,
      hasEndButton: _effectiveEndButton != null,
      enabled: widget.enabled,
      readOnly: _effectiveReadOnly,
      onTap: _focusField,
    );

    if (leadingIconWidget == null) {
      return Padding(
        padding: EdgeInsetsDirectional.only(end: metrics.paddingInline),
        child: addon,
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment:
          widget.multiline ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        addon,
        leadingIconWidget,
      ],
    );
  }

  Widget? _buildTrailingActionWidget(BuildContext context) {
    if (_hasPasswordAction) {
      final icon = _passwordVisible
          ? Symbols.visibility_off_rounded
          : Symbols.visibility_rounded;
      return BwFieldAction(
        icon: icon,
        selectedIcon: icon,
        label: _resolvedPasswordLabel(context),
        size: _effectiveSize,
        multiline: widget.multiline,
        toggle: true,
        selected: _passwordVisible,
        onPressed: widget.enabled ? _handlePasswordToggle : null,
      );
    }

    if (widget.action != null) {
      final custom = widget.action!;
      return BwFieldAction(
        icon: custom.icon,
        label: custom.label,
        size: _effectiveSize,
        multiline: widget.multiline,
        onPressed: widget.enabled ? custom.onPressed : null,
      );
    }

    if (_hasClearAction) {
      return BwFieldAction(
        icon: Symbols.close_rounded,
        label: _resolvedClearLabel(context),
        size: _effectiveSize,
        multiline: widget.multiline,
        onPressed: widget.enabled ? _handleClear : null,
      );
    }

    return null;
  }

  Widget? _buildSuffixSlot(
    BuildContext context,
    BwTextFieldSizeMetrics metrics,
    Color borderColor,
  ) {
    final actionWidget = _buildTrailingActionWidget(context);
    final trailingIcon = _effectiveTrailingIcon;
    final suffixText = _effectiveSuffixText;

    if (actionWidget == null && trailingIcon == null && suffixText == null) {
      return null;
    }

    Widget? trailingIconWidget;
    if (trailingIcon != null) {
      trailingIconWidget = ExcludeSemantics(
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          excludeFromSemantics: true,
          onTap: widget.enabled ? _focusField : null,
          child: Padding(
            padding: EdgeInsetsDirectional.only(
              start: metrics.gap,
              end: suffixText != null ? metrics.gap : metrics.paddingInline,
              top: widget.multiline ? metrics.gap : BwSpacing.none,
            ),
            child: IconTheme.merge(
              data: IconThemeData(
                size: metrics.icon,
                opticalSize: metrics.icon,
              ),
              child: BwIcon(
                key: const ValueKey<String>('BwTextField.trailing-icon'),
                icon: trailingIcon,
                directional: trailingIcon.matchTextDirection,
              ),
            ),
          ),
        ),
      );
    }

    Widget? suffixAddonWidget;
    if (suffixText != null) {
      suffixAddonWidget = BwFieldAddon(
        text: suffixText,
        position: BwFieldAddonPosition.suffix,
        size: _effectiveSize,
        borderColor: borderColor,
        hasEndButton: _effectiveEndButton != null,
        enabled: widget.enabled,
        readOnly: _effectiveReadOnly,
        onTap: _focusField,
      );
    }

    final children = <Widget>[
      if (actionWidget != null)
        Padding(
          padding: EdgeInsetsDirectional.only(start: metrics.gap),
          child: actionWidget,
        ),
      if (trailingIconWidget != null) trailingIconWidget,
      if (suffixAddonWidget != null)
        Padding(
          padding: EdgeInsetsDirectional.only(
            start: (actionWidget == null && trailingIconWidget == null)
                ? metrics.paddingInline
                : BwSpacing.none,
          ),
          child: suffixAddonWidget,
        ),
    ];

    final Widget slot = children.length == 1
        ? children.single
        : Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: widget.multiline
                ? CrossAxisAlignment.start
                : CrossAxisAlignment.center,
            children: children,
          );

    return widget.multiline ? BwFieldTopAlign(child: slot) : slot;
  }

  Widget _buildEndButton(BuildContext context, BwTextFieldEndButton endButton) {
    return KeyedSubtree(
      key: const ValueKey<String>('BwTextField.end-button'),
      child: BwButton(
        label: endButton.label,
        leadingIcon: endButton.icon,
        loading: endButton.loading,
        variant: BwButtonVariant.outlined,
        color: BwButtonColor.neutral,
        size: _effectiveSize,
        segment: BwButtonSegment.end,
        onPressed: widget.enabled ? endButton.onPressed : null,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    _lastValidatorError = _formFieldKey.currentState?.errorText;
    final normalizedSize = _effectiveSize;
    final metrics = BwTextFieldDecoration.sizeMetrics(normalizedSize);
    final borderColor = _currentBorderColor(context);
    final hasPrefixAddon = _effectivePrefixText != null;
    final hasLeadingIcon = widget.leadingIcon != null;
    final hasTrailingAction = _hasRenderedAction;
    final hasTrailingIcon = _effectiveTrailingIcon != null;
    final hasSuffixAddon = _effectiveSuffixText != null;
    final endButton = _effectiveEndButton;
    final hasEndButton = endButton != null;

    final prefixSlot = _buildPrefixSlot(context, metrics, borderColor);
    final suffixSlot = _buildSuffixSlot(context, metrics, borderColor);

    final startPadding = (hasPrefixAddon || hasLeadingIcon)
        ? BwSpacing.none
        : metrics.paddingInline;
    final endPadding =
        (hasTrailingAction || hasTrailingIcon || hasSuffixAddon)
            ? BwSpacing.none
            : metrics.paddingInline;

    Widget? offsetSupporting(Widget? child) {
      if (child == null || startPadding == BwSpacing.none) return child;
      final isRtl = context.bw.isRtl;
      return Transform.translate(
        offset: Offset((isRtl ? 1 : -1) * startPadding, 0),
        child: child,
      );
    }

    Widget? offsetCounter(Widget? child) {
      if (child == null || endPadding == BwSpacing.none) return child;
      final isRtl = context.bw.isRtl;
      return Transform.translate(
        offset: Offset((isRtl ? -1 : 1) * endPadding, 0),
        child: child,
      );
    }

    final helperWidget = offsetSupporting(
      BwFieldSupporting.buildHelper(
        context,
        helperText: widget.helperText,
        size: normalizedSize,
        enabled: widget.enabled,
      ),
    );
    final counterWidget = offsetCounter(
      BwFieldSupporting.buildCounter(
        context,
        value: _effectiveController.text,
        maxLength: widget.maxLength,
        showCounter: widget.showCounter,
        enabled: widget.enabled,
        hasError: _hasError,
      ),
    );

    final decoration = BwTextFieldDecoration.resolve(
      context: context,
      size: normalizedSize,
      enabled: widget.enabled,
      readOnly: _effectiveReadOnly,
      hasError: _hasError,
      multiline: widget.multiline,
      hasPrefixAddon: hasPrefixAddon,
      hasLeadingIcon: hasLeadingIcon,
      hasTrailingAction: hasTrailingAction,
      hasTrailingIcon: hasTrailingIcon,
      hasSuffixAddon: hasSuffixAddon,
      hasEndButton: hasEndButton,
      hintText: widget.placeholder,
      prefixIcon: prefixSlot,
      suffixIcon: suffixSlot,
      helper: helperWidget,
      error: null,
      counter: counterWidget,
    );

    final effectiveKeyboardType = widget.multiline
        ? TextInputType.multiline
        : (widget.keyboardType ??
            (_effectiveObscure
                ? TextInputType.visiblePassword
                : TextInputType.text));
    final effectiveTextInputAction = widget.multiline
        ? TextInputAction.newline
        : widget.textInputAction;

    final int effectiveMinLines =
        widget.multiline ? (widget.minRows ?? 3) : 1;
    final int? effectiveMaxLines =
        widget.multiline ? widget.maxRows : 1;

    final affixHints = <String>[
      if (hasPrefixAddon &&
          _effectivePrefixText != null &&
          _effectivePrefixText!.isNotEmpty)
        _effectivePrefixText!,
      if (hasSuffixAddon &&
          _effectiveSuffixText != null &&
          _effectiveSuffixText!.isNotEmpty)
        _effectiveSuffixText!,
    ];

    Widget textFormField = TextFormField(
      key: _formFieldKey,
      controller: _effectiveController,
      focusNode: _effectiveFocusNode,
      autofocus: widget.autofocus,
      enabled: widget.enabled,
      readOnly: _effectiveReadOnly,
      obscureText: _effectiveObscure,
      keyboardType: effectiveKeyboardType,
      textInputAction: effectiveTextInputAction,
      autofillHints: widget.autofillHints,
      textCapitalization: widget.textCapitalization,
      inputFormatters: widget.inputFormatters,
      textDirection: widget.textDirection,
      minLines: effectiveMinLines,
      maxLines: effectiveMaxLines,
      maxLength: widget.maxLength,
      maxLengthEnforcement: widget.maxLength != null
          ? MaxLengthEnforcement.enforced
          : null,
      scrollPadding: const EdgeInsets.all(BwSpacing.xl3),
      style: BwTextFieldDecoration.inputTextStyle(
        context,
        normalizedSize,
        enabled: widget.enabled,
        readOnly: _effectiveReadOnly,
      ),
      decoration: decoration,
      onChanged: (value) {
        if (mounted) {
          setState(() {});
        }
        widget.onChanged?.call(value);
      },
      onFieldSubmitted: widget.onSubmitted,
      onTap: widget.onTap,
      autovalidateMode: widget.autovalidateMode,
      forceErrorText: !widget.enabled ? null : widget.errorText,
      validator: (value) {
        final error = widget.validator?.call(value);
        if (mounted && error != _lastValidatorError) {
          _lastValidatorError = error;
          if (SchedulerBinding.instance.schedulerPhase ==
              SchedulerPhase.persistentCallbacks) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              if (mounted) setState(() {});
            });
          } else {
            setState(() {});
          }
        }
        return error;
      },
      errorBuilder: (context, errorText) =>
          offsetSupporting(
            BwFieldSupporting.buildError(
              context,
              errorText: errorText,
              size: normalizedSize,
              enabled: widget.enabled,
            ),
          ) ??
          const SizedBox.shrink(),
    );

    Widget fieldRow = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: textFormField,
    );

    fieldRow = _BwFieldHitArea(
      key: const ValueKey<String>('BwTextField.field'),
      minTargetHeight: BwLayout.tablet.minTarget,
      onTap: widget.enabled ? _focusField : null,
      semanticLabel: () => _resolvedSemanticLabel(context),
      semanticHint: affixHints.isEmpty ? null : affixHints.join(', '),
      child: fieldRow,
    );

    if (normalizedSize == BwControlSize.md && !widget.multiline) {
      fieldRow = KeyedSubtree(
        key: const ValueKey<String>('BwTextField.md-hit-area'),
        child: fieldRow,
      );
    }

    if (endButton != null) {
      fieldRow = _BwFlex(
        key: const ValueKey<String>('BwTextField.field-row'),
        direction: Axis.horizontal,
        crossAxisAlignment: CrossAxisAlignment.start,
        hitTestPadding: const EdgeInsets.symmetric(vertical: 4.0),
        children: [
          Expanded(child: fieldRow),
          Transform.translate(
            offset: Offset(
              (context.bw.isRtl ? 1 : -1) * BwBorder.widthDefault,
              0,
            ),
            child: _buildEndButton(context, endButton),
          ),
        ],
      );
    }

    return _BwFlex(
      direction: Axis.vertical,
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      hitTestPadding: const EdgeInsets.symmetric(vertical: 4.0),
      children: [
        BwFieldLabel(
          label: widget.label,
          size: normalizedSize,
          hideLabel: widget.hideLabel,
          requiredField: widget.requiredField,
          enabled: widget.enabled,
          helpText: widget.helpText,
          helpLabel: widget.helpLabel,
          onTapLabel: _focusField,
        ),
        fieldRow,
      ],
    );
  }
}

class _BwFlex extends Flex {
  const _BwFlex({
    super.key,
    required super.direction,
    super.mainAxisSize,
    super.crossAxisAlignment,
    super.children,
    this.hitTestPadding = EdgeInsets.zero,
  });

  final EdgeInsets hitTestPadding;

  @override
  RenderFlex createRenderObject(BuildContext context) {
    return _RenderBwFlex(
      direction: direction,
      mainAxisSize: mainAxisSize,
      crossAxisAlignment: crossAxisAlignment,
      textDirection: getEffectiveTextDirection(context),
      hitTestPadding: hitTestPadding,
    );
  }

  @override
  void updateRenderObject(
    BuildContext context,
    covariant _RenderBwFlex renderObject,
  ) {
    super.updateRenderObject(context, renderObject);
    renderObject.hitTestPadding = hitTestPadding;
  }
}

class _RenderBwFlex extends RenderFlex {
  _RenderBwFlex({
    required super.direction,
    required super.mainAxisSize,
    required super.crossAxisAlignment,
    required super.textDirection,
    required EdgeInsets hitTestPadding,
  }) : _hitTestPadding = hitTestPadding;

  EdgeInsets _hitTestPadding;
  EdgeInsets get hitTestPadding => _hitTestPadding;
  set hitTestPadding(EdgeInsets value) {
    if (_hitTestPadding == value) return;
    _hitTestPadding = value;
  }

  @override
  bool hitTest(BoxHitTestResult result, {required Offset position}) {
    final hitRect = hitTestPadding.inflateRect(Offset.zero & size);
    if (hitRect.contains(position)) {
      if (hitTestChildren(result, position: position) ||
          hitTestSelf(position)) {
        result.add(BoxHitTestEntry(this, position));
        return true;
      }
    }
    return false;
  }
}

class _BwFieldHitArea extends SingleChildRenderObjectWidget {
  const _BwFieldHitArea({
    required this.minTargetHeight,
    required this.onTap,
    required this.semanticLabel,
    this.semanticHint,
    required super.child,
    super.key,
  });

  final double minTargetHeight;
  final VoidCallback? onTap;
  final ValueGetter<String> semanticLabel;
  final String? semanticHint;

  @override
  RenderObject createRenderObject(BuildContext context) =>
      _RenderBwFieldHitArea(
        minTargetHeight: minTargetHeight,
        onTap: onTap,
        semanticLabel: semanticLabel,
        semanticHint: semanticHint,
      );

  @override
  void updateRenderObject(
    BuildContext context,
    covariant RenderObject renderObject,
  ) {
    (renderObject as _RenderBwFieldHitArea)
      ..minTargetHeight = minTargetHeight
      ..onTap = onTap
      ..semanticLabel = semanticLabel
      ..semanticHint = semanticHint;
  }
}

class _RenderBwFieldHitArea extends RenderShiftedBox {
  _RenderBwFieldHitArea({
    required double minTargetHeight,
    required this.onTap,
    required ValueGetter<String> semanticLabel,
    required String? semanticHint,
  })  : _minTargetHeight = minTargetHeight,
        _semanticLabel = semanticLabel,
        _semanticHint = semanticHint,
        super(null) {
    _tapRecognizer = TapGestureRecognizer()..onTap = _handleTap;
  }

  late final TapGestureRecognizer _tapRecognizer;

  void _handleTap() {
    onTap?.call();
  }

  @override
  void dispose() {
    _tapRecognizer.dispose();
    super.dispose();
  }

  double _minTargetHeight;
  double get minTargetHeight => _minTargetHeight;
  set minTargetHeight(double value) {
    if (_minTargetHeight == value) return;
    _minTargetHeight = value;
    markNeedsLayout();
  }

  VoidCallback? onTap;

  ValueGetter<String> _semanticLabel;
  ValueGetter<String> get semanticLabel => _semanticLabel;
  set semanticLabel(ValueGetter<String> value) {
    _semanticLabel = value;
    markNeedsSemanticsUpdate();
  }

  String? _semanticHint;
  String? get semanticHint => _semanticHint;
  set semanticHint(String? value) {
    if (_semanticHint == value) return;
    _semanticHint = value;
    markNeedsSemanticsUpdate();
  }

  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    config.label = _semanticLabel();
    if (_semanticHint != null && _semanticHint!.isNotEmpty) {
      config.hint = _semanticHint!;
    }
  }

  @override
  Rect get semanticBounds {
    if (size.height >= _minTargetHeight) {
      return Offset.zero & size;
    }
    return Rect.fromCenter(
      center: size.center(Offset.zero),
      width: size.width,
      height: _minTargetHeight,
    );
  }

  @override
  Size computeDryLayout(BoxConstraints constraints) {
    final child = this.child;
    if (child == null) return constraints.smallest;
    return child.getDryLayout(constraints);
  }

  @override
  void performLayout() {
    final child = this.child;
    if (child == null) {
      size = constraints.smallest;
      return;
    }
    child.layout(constraints, parentUsesSize: true);
    size = child.size;
    final childParentData = child.parentData! as BoxParentData;
    childParentData.offset = Offset.zero;
  }

  @override
  bool hitTest(BoxHitTestResult result, {required Offset position}) {
    final child = this.child;
    if (child == null) return false;

    // 1. Give child first opportunity to hit-test within its normal bounds
    if (child.hitTest(result, position: position)) {
      return true;
    }

    // 2. Only claim touches in the 4 dp band above/below for controls smaller than minTargetHeight
    if (onTap != null && size.height < _minTargetHeight) {
      final extraHeight = _minTargetHeight - size.height;
      final halfBand = extraHeight / 2;
      final targetRect = Rect.fromLTRB(
        0.0,
        -halfBand,
        size.width,
        size.height + halfBand,
      );
      if (targetRect.contains(position)) {
        result.add(BoxHitTestEntry(this, position));
        return true;
      }
    }
    return false;
  }

  @override
  void handleEvent(PointerEvent event, BoxHitTestEntry entry) {
    if (event is PointerDownEvent) {
      _tapRecognizer.addPointer(event);
    }
  }
}
