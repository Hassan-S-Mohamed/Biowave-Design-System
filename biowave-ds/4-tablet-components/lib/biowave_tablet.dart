/// Biowave Tablet components. Import this single file in the tablet app.
library;

import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

export 'package:biowave_foundations/biowave_foundations.dart';

// Components (keep alphabetical):
export 'src/components/icon/bw_icon.dart';
// export 'src/components/button/bw_button.dart';

/// Ready-made themes for the Tablet app.
abstract final class BwTabletTheme {
  static ThemeData light(Locale locale) =>
      BwTheme.build(platform: BwPlatform.tablet, brightness: Brightness.light, locale: locale);
  static ThemeData dark(Locale locale) =>
      BwTheme.build(platform: BwPlatform.tablet, brightness: Brightness.dark, locale: locale);
}
