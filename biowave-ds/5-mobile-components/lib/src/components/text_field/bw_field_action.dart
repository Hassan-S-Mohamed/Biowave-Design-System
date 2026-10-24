import 'package:flutter/material.dart';

import '../../common/bw_control_size.dart';
import '../button/bw_button.dart';
import '../icon_button/bw_icon_button.dart';

/// The in-outline action used by Biowave field components.
class BwFieldAction extends StatelessWidget {
  const BwFieldAction({
    required this.icon,
    required this.label,
    required this.onPressed,
    this.toggle = false,
    this.selected = false,
    this.selectedIcon,
    super.key,
  });

  final IconData icon;
  final String label;
  final VoidCallback? onPressed;
  final bool toggle;
  final bool selected;
  final IconData? selectedIcon;

  @override
  Widget build(BuildContext context) {
    return BwIconButton(
      key: const ValueKey<String>('BwFieldAction.button'),
      icon: icon,
      label: label,
      onPressed: onPressed,
      variant: BwButtonVariant.text,
      color: BwButtonColor.neutral,
      size: BwControlSize.md,
      toggle: toggle,
      selected: selected,
      selectedIcon: selectedIcon,
      tooltip: false,
    );
  }
}
