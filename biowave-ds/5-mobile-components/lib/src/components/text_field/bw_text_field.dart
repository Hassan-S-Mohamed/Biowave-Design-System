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

/// A custom trailing action for [BwTextField].
@immutable
class BwTextFieldAction {
  const BwTextFieldAction({
    required this.icon,
    required this.label,
    required this.onPressed,
  });

  final IconData icon;
  final String label;
  final VoidCallback onPressed;
}

/// An attached action button rendered after [BwTextField].
@immutable
class BwTextFieldEndButton {
  const BwTextFieldEndButton({
    required this.label,
    required this.onPressed,
    this.icon,
    this.loading = false,
  });

  final String label;
  final IconData? icon;
  final VoidCallback onPressed;
  final bool loading;
}

/// A token-driven, accessible text field for Biowave mobile experiences.
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
    this.placeholder,
    this.helperText,
    this.errorText,
    this.helpText,
    this.helpLabel,
    this.requiredField = false,
    this.multiline = false,
    this.minRows = 3,
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
    this.passwordToggle = true,
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
    super.key,
  })  : assert(size == BwControlSize.lg, 'Mobile text fields support lg only'),
        assert(
            !showCounter || maxLength != null, 'showCounter needs maxLength'),
        assert(
          multiline || (minRows == 3 && maxRows == null),
          'minRows and maxRows apply to multiline fields only',
        ),
        assert(
          !(multiline && obscureText),
          'Multiline fields cannot obscure text',
        ),
        assert(
          ((obscureText && passwordToggle ? 1 : 0) +
                  (action == null ? 0 : 1) +
                  (clearable ? 1 : 0)) <=
              1,
          'Choose only one trailing action',
        ),
        assert(
          trailingIcon == null ||
              (!(obscureText && passwordToggle) &&
                  action == null &&
                  !clearable),
          'trailingIcon cannot be combined with a trailing action',
        ),
        assert(
          !multiline ||
              (prefixText == null && suffixText == null && endButton == null),
          'Multiline fields do not support attached segments',
        ),
        assert(
          suffixText == null || endButton == null,
          'suffixText and endButton cannot be combined',
        ),
        assert(
          controller == null || initialValue == null,
          'controller and initialValue cannot both be supplied',
        );

  final String label;
  final bool hideLabel;
  final BwControlSize size;
  final TextEditingController? controller;
  final String? initialValue;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final GestureTapCallback? onTap;
  final FormFieldValidator<String>? validator;
  final AutovalidateMode autovalidateMode;
  final String? placeholder;
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

  @override
  State<BwTextField> createState() => _BwTextFieldState();
}

class _BwTextFieldState extends State<BwTextField> {
  final GlobalKey<FormFieldState<String>> _formFieldKey =
      GlobalKey<FormFieldState<String>>();
  late TextEditingController _controller;
  late FocusNode _focusNode;
  late bool _ownsController;
  late bool _ownsFocusNode;
  late bool _obscured;
  bool _hovered = false;

  bool get _editable => widget.enabled && !widget.readOnly;
  bool get _effectiveObscure => !widget.multiline && _obscured;
  bool get _hasPasswordAction =>
      !widget.multiline && widget.obscureText && widget.passwordToggle;
  bool get _hasConfiguredAction =>
      _hasPasswordAction || widget.action != null || widget.clearable;

  bool get _hasError =>
      widget.enabled &&
      ((widget.errorText != null && widget.errorText!.isNotEmpty) ||
          (_formFieldKey.currentState?.hasError ?? false));

  @override
  void initState() {
    super.initState();
    _ownsController = widget.controller == null;
    _controller = widget.controller ??
        TextEditingController(
          text: widget.initialValue ?? '',
        );
    _controller.addListener(_handleControllerChange);
    _ownsFocusNode = widget.focusNode == null;
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_handleFocusChange);
    _obscured = widget.obscureText && !widget.multiline;
  }

  @override
  void didUpdateWidget(BwTextField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      _controller.removeListener(_handleControllerChange);
      if (_ownsController) {
        _controller.dispose();
      }
      _ownsController = widget.controller == null;
      _controller = widget.controller ??
          TextEditingController(
            text: widget.initialValue ?? '',
          );
      _controller.addListener(_handleControllerChange);
    } else if (_ownsController &&
        oldWidget.initialValue != widget.initialValue) {
      _controller.text = widget.initialValue ?? '';
    }

    if (oldWidget.focusNode != widget.focusNode) {
      _focusNode.removeListener(_handleFocusChange);
      if (_ownsFocusNode) {
        _focusNode.dispose();
      }
      _ownsFocusNode = widget.focusNode == null;
      _focusNode = widget.focusNode ?? FocusNode();
      _focusNode.addListener(_handleFocusChange);
    }

    if (oldWidget.obscureText != widget.obscureText ||
        oldWidget.multiline != widget.multiline) {
      _obscured = widget.obscureText && !widget.multiline;
    }
  }

  @override
  void dispose() {
    _controller.removeListener(_handleControllerChange);
    _focusNode.removeListener(_handleFocusChange);
    if (_ownsController) {
      _controller.dispose();
    }
    if (_ownsFocusNode) {
      _focusNode.dispose();
    }
    super.dispose();
  }

  void _handleControllerChange() {
    if (mounted) {
      setState(() {});
    }
  }

  void _handleFocusChange() {
    if (mounted) {
      setState(() {});
    }
  }

  void _requestFocus() {
    if (widget.enabled) {
      _focusNode.requestFocus();
    }
  }

  void _clear() {
    _controller.clear();
    widget.onChanged?.call('');
    widget.onCleared?.call();
    _focusNode.requestFocus();
  }

  void _togglePassword() {
    final selection = _controller.selection;
    setState(() {
      _obscured = !_obscured;
    });
    _controller.selection = selection;
    _focusNode.requestFocus();
  }

  bool get _isArabic =>
      Localizations.localeOf(context).languageCode.toLowerCase() == 'ar';

  String get _requiredWord => _isArabic ? 'مطلوب' : 'required';

  String get _effectiveHelpLabel =>
      widget.helpLabel ??
      (_isArabic
          ? 'مزيد من المعلومات عن ${widget.label}'
          : 'More information about ${widget.label}');

  String get _effectiveClearLabel =>
      widget.clearLabel ??
      (_isArabic ? 'مسح ${widget.label}' : 'Clear ${widget.label}');

  String get _showPasswordLabel =>
      _isArabic ? 'إظهار كلمة المرور' : 'Show password';

  String get _hidePasswordLabel =>
      _isArabic ? 'إخفاء كلمة المرور' : 'Hide password';

  Color _borderColor(BwColors colors) {
    if (!widget.enabled) {
      return colors.borderDisabled;
    }
    if (_hasError) {
      return colors.borderInputError;
    }
    if (_focusNode.hasFocus) {
      return colors.borderFocus;
    }
    if (_hovered) {
      return colors.borderInputHover;
    }
    if (widget.readOnly) {
      return colors.borderDefault;
    }
    return colors.borderInputDefault;
  }

  Widget? _buildPrefix(BwColors colors) {
    final children = <Widget>[];
    final prefixText = !widget.multiline ? widget.prefixText : null;
    if (prefixText != null) {
      children.add(
        BwFieldAddon(
          text: prefixText,
          atStart: true,
          backgroundColor: widget.enabled
              ? colors.backgroundNeutralDefault
              : colors.backgroundBaseDisabled,
          textColor: widget.enabled
              ? colors.textNeutralSubtle
              : colors.textNeutralDisabled,
          borderColor: _borderColor(colors),
          onTap: widget.enabled ? _requestFocus : null,
        ),
      );
    }
    final leadingIcon = widget.leadingIcon;
    if (leadingIcon != null) {
      children.add(
        GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: widget.enabled ? _requestFocus : null,
          child: Padding(
            padding: EdgeInsetsDirectional.only(
              start: prefixText == null
                  ? BwSpacing.controlPaddingInlineLg
                  : BwSpacing.controlGapLg,
              end: BwSpacing.controlGapLg,
            ),
            child: BwIcon(icon: leadingIcon, size: BwIconSize.lg),
          ),
        ),
      );
    }
    if (children.isEmpty) {
      return null;
    }
    return Row(mainAxisSize: MainAxisSize.min, children: children);
  }

  Widget? _buildTrailing(BwColors colors) {
    final children = <Widget>[];
    final trailingIcon = !_hasConfiguredAction ? widget.trailingIcon : null;
    if (trailingIcon != null) {
      children.add(
        GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: widget.enabled ? _requestFocus : null,
          child: Padding(
            padding: const EdgeInsetsDirectional.only(
              start: BwSpacing.controlGapLg,
              end: BwSpacing.controlPaddingInlineLg,
            ),
            child: BwIcon(icon: trailingIcon, size: BwIconSize.lg),
          ),
        ),
      );
    }

    final action = _buildAction();
    if (action != null) {
      children.add(action);
    }

    final suffixText =
        !widget.multiline && widget.endButton == null ? widget.suffixText : null;
    if (suffixText != null) {
      children.add(
        BwFieldAddon(
          text: suffixText,
          atStart: false,
          backgroundColor: widget.enabled
              ? colors.backgroundNeutralDefault
              : colors.backgroundBaseDisabled,
          textColor: widget.enabled
              ? colors.textNeutralSubtle
              : colors.textNeutralDisabled,
          borderColor: _borderColor(colors),
          onTap: widget.enabled ? _requestFocus : null,
        ),
      );
    }
    if (children.isEmpty) {
      return null;
    }
    return Row(mainAxisSize: MainAxisSize.min, children: children);
  }

  Widget? _buildAction() {
    if (_hasPasswordAction) {
      final showing = !_effectiveObscure;
      return BwFieldAction(
        key: const ValueKey<String>('BwTextField.password-action'),
        icon: Symbols.visibility_rounded,
        selectedIcon: Symbols.visibility_off_rounded,
        label: showing ? _hidePasswordLabel : _showPasswordLabel,
        onPressed: widget.enabled ? _togglePassword : null,
        toggle: true,
        selected: showing,
      );
    }

    final customAction = widget.action;
    if (customAction != null) {
      return BwFieldAction(
        key: const ValueKey<String>('BwTextField.custom-action'),
        icon: customAction.icon,
        label: customAction.label,
        onPressed: widget.enabled ? customAction.onPressed : null,
      );
    }

    if (widget.clearable && _controller.text.isNotEmpty && _editable) {
      return BwFieldAction(
        key: const ValueKey<String>('BwTextField.clear-action'),
        icon: Symbols.close_rounded,
        label: _effectiveClearLabel,
        onPressed: _clear,
      );
    }
    return null;
  }

  BorderRadiusGeometry get _fieldRadius {
    if (!widget.multiline && widget.endButton != null) {
      return const BorderRadiusDirectional.only(
        topStart: Radius.circular(BwRadius.md),
        bottomStart: Radius.circular(BwRadius.md),
      );
    }
    return const BorderRadiusDirectional.all(Radius.circular(BwRadius.md));
  }

  String get _semanticsLabel =>
      widget.requiredField ? '${widget.label}, $_requiredWord' : widget.label;

  String? get _semanticsHint {
    if (widget.multiline) {
      return null;
    }
    final affixes = <String>[
      if (widget.prefixText != null) widget.prefixText!,
      if (widget.endButton == null && widget.suffixText != null)
        widget.suffixText!,
    ];
    if (affixes.isEmpty) {
      return null;
    }
    return affixes.join(', ');
  }

  Widget _buildField(BuildContext context) {
    final colors = context.bw.colors;
    final effectiveError = widget.enabled ? widget.errorText : null;
    final enabledTextColor =
        widget.enabled ? colors.textNeutralDefault : colors.textNeutralDisabled;
    final counterText = widget.showCounter && widget.maxLength != null
        ? '${_controller.text.characters.length}/${widget.maxLength}'
        : null;
    final decoration = buildBwTextFieldDecoration(
      context: context,
      enabled: widget.enabled,
      readOnly: widget.readOnly,
      placeholder: widget.placeholder,
      prefixIcon: _buildPrefix(colors),
      suffixIcon: _buildTrailing(colors),
      helperText: effectiveError == null ? widget.helperText : null,
      counterText: counterText,
      borderRadius: _fieldRadius,
      hasError: _hasError,
    );

    final textField = TextFormField(
      key: _formFieldKey,
      controller: _controller,
      focusNode: _focusNode,
      autofocus: widget.autofocus,
      enabled: widget.enabled,
      readOnly: widget.readOnly,
      obscureText: _effectiveObscure,
      minLines: widget.multiline ? widget.minRows : 1,
      maxLines: widget.multiline ? widget.maxRows : 1,
      keyboardType: widget.multiline
          ? TextInputType.multiline
          : widget.keyboardType ??
              (widget.obscureText ? TextInputType.visiblePassword : null),
      textInputAction:
          widget.multiline ? TextInputAction.newline : widget.textInputAction,
      autofillHints: widget.autofillHints,
      textCapitalization: widget.textCapitalization,
      inputFormatters: widget.inputFormatters,
      textDirection: widget.textDirection,
      maxLength: widget.maxLength,
      maxLengthEnforcement: MaxLengthEnforcement.enforced,
      buildCounter: (
        BuildContext context, {
        required int currentLength,
        required bool isFocused,
        required int? maxLength,
      }) =>
          null,
      onChanged: widget.onChanged,
      onFieldSubmitted: widget.onSubmitted,
      onTap: widget.onTap,
      validator: widget.validator == null
          ? null
          : (value) {
              final result = widget.validator!(value);
              WidgetsBinding.instance.addPostFrameCallback((_) {
                if (mounted) setState(() {});
              });
              return result;
            },
      autovalidateMode: widget.autovalidateMode,
      forceErrorText: effectiveError,
      errorBuilder: (BuildContext context, String message) {
        final fieldColors = context.bw.colors;
        return BwFieldSupporting.message(
          text: message,
          color: widget.enabled
              ? fieldColors.textRoleError
              : fieldColors.textNeutralDisabled,
          iconColor: widget.enabled
              ? fieldColors.iconRoleError
              : fieldColors.iconNeutralDisabled,
          error: true,
        );
      },
      scrollPadding: const EdgeInsets.all(BwSpacing.xl3),
      style: context.bw.text.bodyLg.copyWith(color: enabledTextColor),
      cursorColor: colors.borderFocus,
      decoration: decoration,
    );

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: Semantics(
        label: _semanticsLabel,
        hint: _semanticsHint,
        child: KeyedSubtree(
          key: const ValueKey<String>('BwTextField.input'),
          child: textField,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.bw.colors;
    final labelColor =
        widget.enabled ? colors.textNeutralDefault : colors.textNeutralDisabled;
    final requiredColor =
        widget.enabled ? colors.textRoleError : colors.textNeutralDisabled;
    final showsLabelRow = !widget.hideLabel || widget.helpText != null;
    Widget field = _buildField(context);

    final endButton = !widget.multiline ? widget.endButton : null;
    if (endButton != null) {
      final direction = Directionality.of(context);
      field = Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Expanded(child: field),
          Transform.translate(
            offset: Offset(
              direction == TextDirection.ltr
                  ? -BwBorder.widthDefault
                  : BwBorder.widthDefault,
              0.0,
            ),
            child: BwButton(
              key: const ValueKey<String>('BwTextField.end-button'),
              label: endButton.label,
              onPressed: widget.enabled ? endButton.onPressed : null,
              variant: BwButtonVariant.outlined,
              color: BwButtonColor.neutral,
              size: BwControlSize.lg,
              leadingIcon: endButton.icon,
              loading: endButton.loading,
              segment: BwButtonSegment.end,
            ),
          ),
        ],
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        if (showsLabelRow) ...<Widget>[
          BwFieldLabel(
            label: widget.label,
            labelColor: labelColor,
            requiredColor: requiredColor,
            requiredField: widget.requiredField,
            hideLabel: widget.hideLabel,
            helpText: widget.helpText,
            helpLabel: _effectiveHelpLabel,
          ),
          const SizedBox(height: BwSpacing.sm),
        ],
        field,
      ],
    );
  }
}
