// Builds Material 3 ThemeData from Biowave tokens. Hand-written; every value comes from
// the generated file. Rule: never put a raw color / number here — add a token first.
import 'package:flutter/material.dart';

import '../generated/bw_tokens.g.dart';

/// The Flutter platforms Biowave ships. (Web is React; see 3-web-components.)
enum BwPlatform { tablet, mobile }

abstract final class BwTheme {
  /// Theme for one platform, brightness and locale.
  ///
  /// ```dart
  /// MaterialApp(
  ///   theme: BwTheme.build(platform: BwPlatform.mobile, brightness: Brightness.light, locale: locale),
  ///   darkTheme: BwTheme.build(platform: BwPlatform.mobile, brightness: Brightness.dark, locale: locale),
  ///   locale: locale, // 'ar' makes Flutter lay out RTL automatically
  /// )
  /// ```
  static ThemeData build({
    required BwPlatform platform,
    required Brightness brightness,
    required Locale locale,
  }) {
    final isDark = brightness == Brightness.dark;
    final isArabic = locale.languageCode == 'ar';
    final colors = isDark ? BwColors.dark : BwColors.light;
    final elevation = isDark ? BwElevation.dark : BwElevation.light;
    final text = switch ((platform, isArabic)) {
      (BwPlatform.tablet, false) => BwTextStyles.tabletEn,
      (BwPlatform.tablet, true) => BwTextStyles.tabletAr,
      (BwPlatform.mobile, false) => BwTextStyles.mobileEn,
      (BwPlatform.mobile, true) => BwTextStyles.mobileAr,
    };
    final layout = platform == BwPlatform.tablet ? BwLayout.tablet : BwLayout.mobile;

    final scheme = ColorScheme(
      brightness: brightness,
      primary: colors.backgroundBrandDefault,
      onPrimary: colors.textOnBrand,
      primaryContainer: colors.backgroundBrandSubtle,
      onPrimaryContainer: colors.textRoleBrand,
      secondary: colors.backgroundSecondaryDefault,
      onSecondary: colors.textOnSecondary,
      secondaryContainer: colors.backgroundSecondarySubtle,
      onSecondaryContainer: colors.textRoleSecondary,
      tertiary: colors.backgroundInfoDefault,
      onTertiary: colors.textOnInfo,
      tertiaryContainer: colors.backgroundInfoSubtle,
      onTertiaryContainer: colors.textRoleInfo,
      error: colors.backgroundErrorDefault,
      onError: colors.textOnError,
      errorContainer: colors.backgroundErrorSubtle,
      onErrorContainer: colors.textRoleError,
      surface: colors.surfaceDefault,
      onSurface: colors.textNeutralDefault,
      onSurfaceVariant: colors.textNeutralMuted,
      surfaceDim: colors.surfacePage,
      surfaceBright: colors.surfaceRaised,
      surfaceContainerLowest: colors.surfaceDefault,
      surfaceContainerLow: colors.surfaceDefault,
      surfaceContainer: colors.surfaceSubtle,
      surfaceContainerHigh: colors.surfaceRaised,
      surfaceContainerHighest: colors.backgroundNeutralDefault,
      outline: colors.borderInputDefault,
      outlineVariant: colors.borderDefault,
      inverseSurface: colors.surfaceInverse,
      onInverseSurface: colors.textNeutralInverse,
      inversePrimary: isDark ? BwColors.light.backgroundBrandDefault : BwColors.dark.backgroundBrandDefault,
      shadow: colors.shadowAmbient,
      scrim: colors.overlayBackdrop,
    );

    final textTheme = TextTheme(
      displayLarge: text.displayLg,
      displayMedium: text.displayMd,
      displaySmall: text.headingLg,
      headlineLarge: text.headingLg,
      headlineMedium: text.headingMd,
      headlineSmall: text.headingSm,
      titleLarge: text.titleLg,
      titleMedium: text.titleMd,
      titleSmall: text.labelLg,
      bodyLarge: text.bodyLg,
      bodyMedium: text.bodyMd,
      bodySmall: text.bodySm,
      labelLarge: text.actionMd,
      labelMedium: text.labelMd,
      labelSmall: text.labelSm,
    ).apply(bodyColor: colors.textNeutralDefault, displayColor: colors.textNeutralDefault);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      textTheme: textTheme,
      fontFamily: isArabic ? BwFontFamily.ar : BwFontFamily.en,
      fontFamilyFallback: isArabic ? BwFontFamily.arFallback : null,
      scaffoldBackgroundColor: colors.surfacePage,
      dividerColor: colors.borderDefault,
      focusColor: colors.overlayBrand,
      hoverColor: colors.overlaySubtle,
      disabledColor: colors.textNeutralDisabled,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      extensions: <ThemeExtension<dynamic>>[colors, elevation, text, layout],
    );
  }
}

/// Short access to Biowave theme extensions: `context.bw.colors.textNeutralDefault`.
extension BwContext on BuildContext {
  BwThemeAccess get bw => BwThemeAccess(this);
}

class BwThemeAccess {
  const BwThemeAccess(this._context);
  final BuildContext _context;

  BwColors get colors => BwColors.of(_context);
  BwTextStyles get text => BwTextStyles.of(_context);
  BwElevation get elevation => BwElevation.of(_context);
  BwLayout get layout => BwLayout.of(_context);
  bool get isRtl => Directionality.of(_context) == TextDirection.rtl;

  /// True when the user asked the OS to reduce motion. Use [BwDuration.instant] then.
  bool get reduceMotion => MediaQuery.maybeDisableAnimationsOf(_context) ?? false;
}
