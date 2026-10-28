// Builds Material 3 ThemeData from Biowave tokens. Hand-written; every value comes from
// the generated file. Rule: never put a raw color / number here — add a token first.
import 'package:flutter/material.dart';

import '../generated/bw_tokens.g.dart';
import 'bw_icons.dart';

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
      // M3 tertiary = Biowave accent (orange, separate from warning). Info is a status, not an accent.
      tertiary: colors.backgroundAccentDefault,
      onTertiary: colors.textOnAccent,
      tertiaryContainer: colors.backgroundAccentSubtle,
      onTertiaryContainer: colors.textRoleAccent,
      error: colors.backgroundErrorDefault,
      onError: colors.textOnError,
      errorContainer: colors.backgroundErrorSubtle,
      onErrorContainer: colors.textRoleError,
      surface: colors.surfaceDefault,
      onSurface: colors.textDefault,
      onSurfaceVariant: colors.textSubtlest,
      surfaceDim: colors.surfacePage,
      surfaceBright: colors.surfaceRaised,
      // Container ladder rises in emphasis. In dark, the lowest container is the darkest (page).
      // Highest is the fill M3 gives to filled text fields and chips, so it maps to background/base/subtle.
      surfaceContainerLowest: isDark ? colors.surfacePage : colors.surfaceDefault,
      surfaceContainerLow: isDark ? colors.surfaceDefault : colors.surfacePage,
      surfaceContainer: colors.surfaceSubtle,
      surfaceContainerHigh: colors.surfaceRaised,
      surfaceContainerHighest: colors.backgroundBaseSubtle,
      outline: colors.borderBold,
      outlineVariant: colors.borderDefault,
      inverseSurface: colors.surfaceInverse,
      onInverseSurface: colors.textInverse,
      inversePrimary: isDark ? BwColors.light.backgroundBrandDefault : BwColors.dark.backgroundBrandDefault,
      shadow: colors.shadowAmbient,
      scrim: colors.overlayDefault,
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
    ).apply(bodyColor: colors.textDefault, displayColor: colors.textDefault);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      textTheme: textTheme,
      fontFamily: isArabic ? BwFontFamily.ar : BwFontFamily.en,
      fontFamilyFallback: isArabic ? BwFontFamily.arFallback : null,
      scaffoldBackgroundColor: colors.surfacePage,
      dividerColor: colors.borderDefault,
      focusColor: colors.backgroundTransparentPressed,
      hoverColor: colors.backgroundTransparentHovered,
      disabledColor: colors.textDisabled,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      // D-18: Material Symbols Rounded defaults; components override size per their spec.
      iconTheme: IconThemeData(
        size: BwSize.iconLg,
        opticalSize: BwSize.iconLg,
        color: colors.iconDefault,
        fill: BwIconAxes.fill,
        weight: BwIconAxes.weight,
        grade: BwIconAxes.grade,
      ),
      extensions: <ThemeExtension<dynamic>>[colors, elevation, text, layout],
    );
  }
}

/// Short access to Biowave theme extensions: `context.bw.colors.textDefault`.
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
