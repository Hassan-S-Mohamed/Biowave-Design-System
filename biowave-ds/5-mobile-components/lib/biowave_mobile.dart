/// Biowave Mobile components. Import this single file in the mobile app.
library;

import 'package:biowave_foundations/biowave_foundations.dart';
import 'package:flutter/material.dart';

export 'package:biowave_foundations/biowave_foundations.dart';

export 'src/common/bw_control_size.dart';

// Components (keep alphabetical):
export 'src/components/button/bw_button.dart';
export 'src/components/icon_button/bw_icon_button.dart';

/// Ready-made themes for the Mobile app.
abstract final class BwMobileTheme {
  static ThemeData light(Locale locale) => BwTheme.build(
    platform: BwPlatform.mobile,
    brightness: Brightness.light,
    locale: locale,
  );
  static ThemeData dark(Locale locale) => BwTheme.build(
    platform: BwPlatform.mobile,
    brightness: Brightness.dark,
    locale: locale,
  );
}
