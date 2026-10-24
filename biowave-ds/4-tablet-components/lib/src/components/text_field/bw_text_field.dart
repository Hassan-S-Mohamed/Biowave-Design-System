import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';
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
  TextEditingController? _ownedController;
  FocusNode? _ownedFocusNode;
  bool _passwordVisible = false;
  bool _hovered = false;
  String? _validatorErrorText;

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

  String? get _effectiveErrorText =>
      !widget.enabled ? null : (widget.errorText ?? _validatorErrorText);

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

    if (widget.validator == null && _validatorErrorText != null) {
      _validatorErrorText = null;
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
    final selection = _effectiveController.selection;
    setState(() {
      _passwordVisible = !_passwordVisible;
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _effectiveFocusNode.requestFocus();
      if (selection.isValid) {
        _effectiveController.selection = selection;
      }
    });
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
        offset: Offset((isRtl ? 1 : -1) * startPadding, BwSpacing.none),
        child: child,
      );
    }

    Widget? offsetCounter(Widget? child) {
      if (child == null || endPadding == BwSpacing.none) return child;
      final isRtl = context.bw.isRtl;
      return Transform.translate(
        offset: Offset((isRtl ? -1 : 1) * endPadding, BwSpacing.none),
        child: child,
      );
    }

    final helperWidget = _hasError
        ? null
        : offsetSupporting(
            BwFieldSupporting.buildHelper(
              context,
              helperText: widget.helperText,
              size: normalizedSize,
              enabled: widget.enabled,
            ),
          );
    final errorWidget = offsetSupporting(
      BwFieldSupporting.buildError(
        context,
        errorText: _effectiveErrorText,
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
      error: errorWidget,
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
      key: const ValueKey<String>('BwTextField.input'),
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
      onChanged: widget.onChanged,
      onFieldSubmitted: widget.onSubmitted,
      onTap: widget.onTap,
      autovalidateMode: widget.autovalidateMode,
      forceErrorText: !widget.enabled ? null : widget.errorText,
      validator: widget.validator == null
          ? null
          : (value) {
              final result = widget.validator!(value);
              if (_validatorErrorText != result) {
                WidgetsBinding.instance.addPostFrameCallback((_) {
                  if (mounted) {
                    setState(() {
                      _validatorErrorText = result;
                    });
                  }
                });
              }
              return result;
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

    textFormField = Semantics(
      label: _resolvedSemanticLabel(context),
      hint: affixHints.isEmpty ? null : affixHints.join(', '),
      child: KeyedSubtree(
        key: const ValueKey<String>('BwTextField.field'),
        child: textFormField,
      ),
    );

    if (normalizedSize == BwControlSize.md && !widget.multiline) {
      textFormField = GestureDetector(
        behavior: HitTestBehavior.translucent,
        excludeFromSemantics: true,
        onTap: widget.enabled ? _focusField : null,
        child: ConstrainedBox(
          key: const ValueKey<String>('BwTextField.md-hit-area'),
          constraints: BoxConstraints(minHeight: BwLayout.tablet.minTarget),
          child: Align(
            alignment: AlignmentDirectional.centerStart,
            heightFactor: 1.0,
            child: textFormField,
          ),
        ),
      );
    }

    Widget fieldRow = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: textFormField,
    );

    if (endButton != null) {
      fieldRow = Row(
        key: const ValueKey<String>('BwTextField.field-row'),
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: fieldRow),
          Transform.translate(
            offset: Offset(
              (context.bw.isRtl ? 1 : -1) * BwBorder.widthDefault,
              BwSpacing.none,
            ),
            child: _buildEndButton(context, endButton),
          ),
        ],
      );
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
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
