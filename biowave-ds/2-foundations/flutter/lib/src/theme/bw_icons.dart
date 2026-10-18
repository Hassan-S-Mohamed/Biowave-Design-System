// Icon defaults for Google Material Symbols (decision D-18, 2-foundations/guidelines/icons.md).
// These are font-axis values of the Material Symbols Rounded style, not design tokens:
// weight 400, grade 0, fill 0 (fill 1 for selected states). Sizes come from BwSize.icon*.
abstract final class BwIconAxes {
  /// Default (unselected) fill.
  static const double fill = 0;

  /// Selected / active state: same glyph, filled.
  static const double fillSelected = 1;

  /// Stroke weight of every Biowave icon.
  static const double weight = 400;

  /// Grade of every Biowave icon.
  static const double grade = 0;
}
