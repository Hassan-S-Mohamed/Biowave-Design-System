import 'dart:convert';
import 'dart:io';

import 'package:biowave_tablet/biowave_tablet.dart';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';

const _locales = <Locale>[Locale('en'), Locale('ar')];
const _goldenKey = ValueKey<String>('bw-icon-golden');

Future<void> _loadMaterialSymbolsRoundedFont() async {
  final packageConfigFile = File('.dart_tool/package_config.json');
  final config = jsonDecode(await packageConfigFile.readAsString())
      as Map<String, dynamic>;
  final packages = (config['packages'] as List<dynamic>)
      .cast<Map<String, dynamic>>();
  final symbolsPackage = packages.firstWhere(
    (package) => package['name'] == 'material_symbols_icons',
  );
  final rawRootUri = symbolsPackage['rootUri'] as String;
  final rootUri = packageConfigFile.uri.resolve(
    rawRootUri.endsWith('/') ? rawRootUri : '$rawRootUri/',
  );
  final fontUri = rootUri.resolve('lib/fonts/MaterialSymbolsRounded.ttf');
  final bytes = await File.fromUri(fontUri).readAsBytes();
  final fontData = Future<ByteData>.value(ByteData.sublistView(bytes));

  for (final family in const <String>[
    'MaterialSymbolsRounded',
    'packages/material_symbols_icons/MaterialSymbolsRounded',
  ]) {
    final loader = FontLoader(family)..addFont(fontData);
    await loader.load();
  }
}

void main() {
  setUpAll(() async {
    TestWidgetsFlutterBinding.ensureInitialized();
    await _loadMaterialSymbolsRoundedFont();
  });

  group('BwIcon', () {
    final sizes = <BwIconSize, double>{
      BwIconSize.xs: BwSize.iconXs,
      BwIconSize.sm: BwSize.iconSm,
      BwIconSize.md: BwSize.iconMd,
      BwIconSize.lg: BwSize.iconLg,
      BwIconSize.xl: BwSize.iconXl,
      BwIconSize.xl2: BwSize.iconXl2,
      BwIconSize.xl3: BwSize.iconXl3,
    };

    for (final brightness in Brightness.values) {
      for (final locale in _locales) {
        for (final entry in sizes.entries) {
          testWidgets(
            '${entry.key.name} uses its token size in ${brightness.name} '
            '${locale.languageCode}',
            (tester) async {
              await _pump(
                tester,
                brightness: brightness,
                locale: locale,
                child: BwIcon(icon: Symbols.add_rounded, size: entry.key),
              );

              expect(
                tester.getSize(find.byType(BwIcon)),
                Size.square(entry.value),
              );
            },
          );
        }
      }
    }

    testWidgets('inherits size and colour from IconTheme', (tester) async {
      Color? expectedColor;

      await _pump(
        tester,
        child: Builder(
          builder: (context) {
            expectedColor = context.bw.colors.iconRoleBrand;
            return IconTheme(
              data: IconThemeData(
                size: BwSize.iconXl3,
                color: expectedColor,
              ),
              child: const BwIcon(icon: Symbols.add_rounded),
            );
          },
        ),
      );

      final glyph = tester.widget<Icon>(find.byType(Icon));
      expect(tester.getSize(find.byType(BwIcon)), Size.square(BwSize.iconXl3));
      expect(glyph.size, BwSize.iconXl3);
      expect(glyph.color, expectedColor);
    });

    testWidgets('filled uses the selected fill axis', (tester) async {
      await _pump(
        tester,
        child: const BwIcon(icon: Symbols.push_pin_rounded),
      );
      expect(tester.widget<Icon>(find.byType(Icon)).fill, isNull);

      await _pump(
        tester,
        child: const BwIcon(icon: Symbols.push_pin_rounded, filled: true),
      );

      expect(
        tester.widget<Icon>(find.byType(Icon)).fill,
        BwIconAxes.fillSelected,
      );
    });

    for (final brightness in Brightness.values) {
      for (final color in BwIconColor.values) {
        testWidgets(
          '${color.name} resolves from ${brightness.name} theme tokens',
          (tester) async {
            await _pump(
              tester,
              brightness: brightness,
              child: BwIcon(icon: Symbols.add_rounded, color: color),
            );

            final context = tester.element(find.byType(BwIcon));
            final glyph = tester.widget<Icon>(find.byType(Icon));
            expect(glyph.color, _resolveColor(context, color));
          },
        );
      }
    }

    testWidgets('directional icons flip exactly once in RTL only',
        (tester) async {
      await _pump(
        tester,
        child: const BwIcon(
          icon: Symbols.arrow_forward_rounded,
          directional: true,
        ),
      );

      var transform = tester.widget<Transform>(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(Transform),
        ),
      );
      expect(transform.transform.storage.first, isPositive);
      expect(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(Transform),
        ),
        findsOneWidget,
      );

      await _pump(
        tester,
        locale: const Locale('ar'),
        child: const BwIcon(
          icon: Symbols.arrow_forward_rounded,
          directional: true,
        ),
      );

      transform = tester.widget<Transform>(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(Transform),
        ),
      );
      expect(transform.transform.storage.first, isNegative);
      expect(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(Transform),
        ),
        findsOneWidget,
      );
      expect(
        Directionality.of(tester.element(find.byType(Icon))),
        TextDirection.ltr,
      );
    });

    testWidgets('non-directional icons never add a flip', (tester) async {
      await _pump(
        tester,
        locale: const Locale('ar'),
        child: const BwIcon(icon: Symbols.check_rounded),
      );

      expect(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(Transform),
        ),
        findsNothing,
      );
    });

    testWidgets('decorative icons are excluded from semantics', (tester) async {
      final semantics = tester.ensureSemantics();
      await _pump(
        tester,
        child: const BwIcon(icon: Symbols.search_rounded),
      );

      final outerExclude = tester.firstWidget<ExcludeSemantics>(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byType(ExcludeSemantics),
        ),
      );
      expect(outerExclude.excluding, isTrue);
      expect(
        find.descendant(
          of: find.byType(BwIcon),
          matching: find.byWidgetPredicate(
            (widget) =>
                widget is Semantics && widget.properties.label != null,
          ),
        ),
        findsNothing,
      );
      semantics.dispose();
    });

    testWidgets('labelled icons expose an image semantics node',
        (tester) async {
      final semantics = tester.ensureSemantics();
      await _pump(
        tester,
        child: const BwIcon(
          icon: Symbols.search_rounded,
          semanticLabel: 'Search',
        ),
      );

      final semanticsFinder = find.descendant(
        of: find.byType(BwIcon),
        matching: find.byWidgetPredicate(
          (widget) =>
              widget is Semantics && widget.properties.label == 'Search',
        ),
      );
      expect(semanticsFinder, findsOneWidget);

      final widget = tester.widget<Semantics>(semanticsFinder);
      expect(widget.properties.label, 'Search');
      expect(widget.properties.image, isTrue);
      expect(find.bySemanticsLabel('Search'), findsOneWidget);

      final node = tester.getSemantics(find.byType(BwIcon));
      expect(node.label, 'Search');
      // ignore: deprecated_member_use
      expect(node.hasFlag(SemanticsFlag.isImage), isTrue);
      // ignore: deprecated_member_use
      expect(node.hasFlag(SemanticsFlag.isFocusable), isFalse);
      semantics.dispose();
    });

    test('component token enums match icon.tokens.json', () {
      final tabletTokens = jsonDecode(
        File('components/icon/icon.tokens.json').readAsStringSync(),
      ) as Map<String, dynamic>;
      expect(
        tabletTokens[r'$extends'],
        '../../../3-web-components/components/icon/icon.tokens.json',
      );
      final webTokens = jsonDecode(
        File('../3-web-components/components/icon/icon.tokens.json')
            .readAsStringSync(),
      ) as Map<String, dynamic>;
      final iconTokens = webTokens['icon'] as Map<String, dynamic>;
      final sizeModes = (iconTokens['size'] as Map<String, dynamic>)
          .keys
          .where((key) => !key.startsWith(r'$'))
          .toSet();
      final colorModes = (iconTokens['color'] as Map<String, dynamic>)
          .keys
          .where((key) => !key.startsWith(r'$'))
          .toSet();

      expect(
        BwIconSize.values
            .map((size) => switch (size) {
                  BwIconSize.xl2 => '2xl',
                  BwIconSize.xl3 => '3xl',
                  _ => size.name,
                })
            .toSet(),
        sizeModes,
      );
      expect(
        BwIconColor.values
            .map((color) =>
                color == BwIconColor.defaultColor ? 'default' : color.name)
            .toSet(),
        colorModes,
      );
    });

    test('standalone status icons require text or a label', () {
      for (final color in const <BwIconColor>[
        BwIconColor.success,
        BwIconColor.warning,
        BwIconColor.error,
        BwIconColor.info,
      ]) {
        expect(
          () => BwIcon(
            icon: Symbols.info_rounded,
            size: BwIconSize.md,
            color: color,
          ),
          throwsA(
            isA<AssertionError>().having(
              (error) => error.message,
              'message',
              'status icons need text or a label',
            ),
          ),
        );
      }
    });
  });

  group('BwIcon goldens', () {
    testWidgets('size scale', (tester) async {
      await _pumpGolden(
        tester,
        Wrap(
          spacing: BwSpacing.lg,
          children: BwIconSize.values
              .map(
                (size) => BwIcon(
                  icon: Symbols.favorite_rounded,
                  size: size,
                ),
              )
              .toList(),
        ),
      );

      await expectLater(
        find.byKey(_goldenKey),
        matchesGoldenFile('goldens/icon/size_scale.png'),
      );
    });

    testWidgets('colour roles', (tester) async {
      await _pumpGolden(
        tester,
        Wrap(
          spacing: BwSpacing.lg,
          children: BwIconColor.values
              .map(
                (color) => BwIcon(
                  icon: Symbols.circle_rounded,
                  size: BwIconSize.lg,
                  color: color,
                  semanticLabel: color.name,
                ),
              )
              .toList(),
        ),
      );

      await expectLater(
        find.byKey(_goldenKey),
        matchesGoldenFile('goldens/icon/colors.png'),
      );
    });

    testWidgets('filled and outlined', (tester) async {
      await _pumpGolden(
        tester,
        const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            BwIcon(icon: Symbols.push_pin_rounded, size: BwIconSize.xl),
            SizedBox(width: BwSpacing.lg),
            BwIcon(
              icon: Symbols.push_pin_rounded,
              size: BwIconSize.xl,
              filled: true,
            ),
          ],
        ),
      );

      await expectLater(
        find.byKey(_goldenKey),
        matchesGoldenFile('goldens/icon/fill.png'),
      );
    });

    testWidgets('RTL directional arrow', (tester) async {
      await _pumpGolden(
        tester,
        const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Directionality(
              textDirection: TextDirection.ltr,
              child: BwIcon(
                icon: Symbols.arrow_forward_rounded,
                size: BwIconSize.xl,
                directional: true,
              ),
            ),
            SizedBox(width: BwSpacing.lg),
            Directionality(
              textDirection: TextDirection.rtl,
              child: BwIcon(
                icon: Symbols.arrow_forward_rounded,
                size: BwIconSize.xl,
                directional: true,
              ),
            ),
          ],
        ),
      );

      await expectLater(
        find.byKey(_goldenKey),
        matchesGoldenFile('goldens/icon/rtl.png'),
      );
    });
  });
}

Future<void> _pump(
  WidgetTester tester, {
  Widget? child,
  Brightness brightness = Brightness.light,
  Locale locale = const Locale('en'),
}) {
  return tester.pumpWidget(
    MaterialApp(
      locale: locale,
      supportedLocales: _locales,
      localizationsDelegates: const <LocalizationsDelegate<dynamic>>[
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: BwTabletTheme.light(locale),
      darkTheme: BwTabletTheme.dark(locale),
      themeMode:
          brightness == Brightness.light ? ThemeMode.light : ThemeMode.dark,
      home: Scaffold(body: Center(child: child)),
    ),
  );
}

Future<void> _pumpGolden(WidgetTester tester, Widget child) {
  return _pump(
    tester,
    child: RepaintBoundary(
      key: _goldenKey,
      child: ColoredBox(
        color: BwTabletTheme.light(const Locale('en')).scaffoldBackgroundColor,
        child: Padding(
          padding: const EdgeInsetsDirectional.all(BwSpacing.xl),
          child: child,
        ),
      ),
    ),
  );
}

Color _resolveColor(BuildContext context, BwIconColor color) => switch (color) {
      BwIconColor.defaultColor => context.bw.colors.iconDefault,
      BwIconColor.subtle => context.bw.colors.iconSubtle,
      BwIconColor.muted => context.bw.colors.iconSubtlest,
      BwIconColor.inverse => context.bw.colors.iconInverse,
      BwIconColor.brand => context.bw.colors.iconRoleBrand,
      BwIconColor.secondary => context.bw.colors.iconRoleSecondary,
      BwIconColor.success => context.bw.colors.iconRoleSuccess,
      BwIconColor.warning => context.bw.colors.iconRoleWarning,
      BwIconColor.error => context.bw.colors.iconRoleError,
      BwIconColor.info => context.bw.colors.iconRoleInfo,
    };
