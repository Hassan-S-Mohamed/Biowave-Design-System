(function () {
  'use strict';

  // Biowave docs viewer (R-01). One engine for every docs page; each HTML file is a small generated shell:
  //   page 'component'   → <section>/components/<name>/<name>.html   reads <name>.md (one file, Parts A–F)
  //   page 'components'  → <section>/index.html                     Components List (from components/index.json)
  //   page 'foundations' → 2-foundations/index.html                 Foundation List
  //   page 'foundation'  → 2-foundations/foundation.html#<card>     guideline pages of one card
  // No component text lives here — names, summaries, parts, import lines and status come from each <name>.md header.
  const root = document.documentElement;
  const config = window.BIOWAVE_DOC;
  const PAGE = config.page || 'component';
  const ROOT = config.root || '../../../';
  const platform = config.platform || 'web';
  const SECTION = { web: '3-web-components', tablet: '4-tablet-components', mobile: '5-mobile-components' };

  const platformData = {
    web: {
      label: { en: 'Web', ar: 'الويب' },
      stack: 'React + MUI',
      defaultSize: 'md',
      sizes: [
        ['sm', 'size-control-height-sm'],
        ['md', 'size-control-height-md'],
        ['lg', 'size-control-height-lg'],
      ],
    },
    tablet: {
      label: { en: 'Tablet', ar: 'الجهاز اللوحي' },
      stack: 'Flutter + Material 3',
      defaultSize: 'lg',
      sizes: [
        ['sm', 'size-control-height-sm'],
        ['md', 'size-control-height-md'],
        ['lg', 'size-control-height-lg'],
        ['xl', 'size-control-height-xl'],
      ],
    },
    mobile: {
      label: { en: 'Mobile', ar: 'الهاتف' },
      stack: 'Flutter + Material 3',
      defaultSize: 'lg',
      sizes: [
        ['sm', 'size-control-height-sm'],
        ['md', 'size-control-height-md'],
        ['lg', 'size-control-height-lg'],
        ['xl', 'size-control-height-xl'],
      ],
    },
  };

  // Demo configuration only (the live previews are demo code, like the demo CSS). Text comes from the .md files.
  const demos = {
    button: { variants: ['filled', 'tonal', 'outlined', 'text'] },
    'icon-button': { variants: ['filled', 'tonal', 'outlined', 'text'] },
    'split-button': { variants: ['filled', 'tonal', 'outlined'] },
    'button-group': { variants: ['horizontal', 'vertical', 'overflow', 'fill'] },
    'text-field': { variants: ['single-line', 'multiline', 'adornment'] },
  };
  // Components with a real React build in 3-web-components/src — shown live (npm start) on their Web pages.
  const LIVE_REACT = ['button', 'icon-button', 'split-button', 'button-group', 'text-field'];
  let components = {}; // filled by loadComponents() from components/index.json + each <name>.md header

  const copy = {
    en: {
      accessibility: 'Accessibility',
      actionRan: 'Example action triggered',
      anatomy: 'Anatomy',
      built: 'Built',
      catalog: 'Component catalog',
      closeMenu: 'Close component menu',
      components: 'Components',
      details: 'Component details',
      language: 'Language',
      livePreview: 'Interactive preview',
      openMenu: 'Open component menu',
      overview: 'Overview',
      planned: 'Spec preview',
      platform: 'Platform',
      readSpec: 'Read full specification',
      sizes: 'Sizes',
      states: 'States',
      theme: 'Theme',
      variants: 'Variants',
      overviewLead: 'Inspect the component at its platform default size. The examples use the same semantic tokens as the production packages.',
      variantsLead: 'Compare the supported visual treatments and intended emphasis levels.',
      sizesLead: 'Control dimensions come directly from the shared platform tokens.',
      statesLead: 'Review the states that implementations and tests must cover.',
      a11yLead: 'Core keyboard, semantic, direction, and target-size requirements from the specification.',
      default: 'Default',
      hover: 'Hover',
      pressed: 'Pressed',
      focus: 'Focus visible',
      loading: 'Loading',
      disabled: 'Disabled',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      token: 'Height token',
      value: 'Resolved value',
      sample: 'Sample',
      defaultSize: 'Default',
      implementation: 'Implementation',
      specification: 'Specification',
      status: 'Status',
      stack: 'Platform stack',
      save: 'Save changes',
      cancel: 'Cancel',
      edit: 'Edit device',
      pin: 'Pin',
      export: 'Export report',
      moreOptions: 'More options',
      excel: 'Export as Excel',
      csv: 'Export as CSV',
      accessibleName: 'Uses a native button role and a concise accessible name. Decorative icons stay hidden from assistive technology.',
      keyboard: 'Tab moves focus; Enter or Space activates. Menus additionally support arrow keys and Escape.',
      focusText: 'Keyboard focus uses the shared focus color, width, and offset tokens and remains visible in both themes.',
      target: 'Meets the platform target minimum: 24px on Web and 48dp on touch platforms.',
      rtl: 'Logical layout mirrors in Arabic; only directional icons mirror.',
      motion: 'State transitions use motion tokens and become instant when reduced motion is requested.',
      variantsCopy: {
        filled: 'Highest emphasis for the main action.',
        tonal: 'Medium emphasis on a quiet container.',
        outlined: 'Secondary action with a visible boundary.',
        text: 'Lowest emphasis for inline or compact actions.',
        horizontal: 'Related actions in reading order.',
        vertical: 'Full-width actions for narrow surfaces.',
        overflow: 'Moves lower-priority actions into a menu.',
        fill: 'Distributes available width across actions.',
        'single-line': 'One line of text with a static label above.',
        multiline: 'Grows with the content for longer text.',
        adornment: 'Leading or trailing icon or text inside the field.',
      },
    },
    ar: {
      accessibility: 'إمكانية الوصول',
      actionRan: 'تم تشغيل الإجراء التجريبي',
      anatomy: 'التشريح',
      built: 'مبني',
      catalog: 'كتالوج المكوّنات',
      closeMenu: 'إغلاق قائمة المكوّنات',
      components: 'المكوّنات',
      details: 'تفاصيل المكوّن',
      language: 'اللغة',
      livePreview: 'معاينة تفاعلية',
      openMenu: 'فتح قائمة المكوّنات',
      overview: 'نظرة عامة',
      planned: 'معاينة المواصفات',
      platform: 'المنصة',
      readSpec: 'قراءة المواصفات الكاملة',
      sizes: 'الأحجام',
      states: 'الحالات',
      theme: 'المظهر',
      variants: 'الأنماط',
      overviewLead: 'افحص المكوّن بحجمه الافتراضي للمنصة. تستخدم الأمثلة الرموز الدلالية نفسها المستخدمة في حزم الإنتاج.',
      variantsLead: 'قارن المعالجات المرئية المدعومة ومستويات الأهمية المقصودة.',
      sizesLead: 'تأتي أبعاد عناصر التحكم مباشرة من رموز المنصة المشتركة.',
      statesLead: 'راجع الحالات التي يجب أن تغطيها عمليات التنفيذ والاختبارات.',
      a11yLead: 'متطلبات لوحة المفاتيح والدلالات والاتجاه وحجم الهدف الأساسية من المواصفات.',
      default: 'افتراضي',
      hover: 'تحويم',
      pressed: 'مضغوط',
      focus: 'تركيز مرئي',
      loading: 'تحميل',
      disabled: 'معطّل',
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
      token: 'رمز الارتفاع',
      value: 'القيمة النهائية',
      sample: 'مثال',
      defaultSize: 'افتراضي',
      implementation: 'التنفيذ',
      specification: 'المواصفات',
      status: 'الحالة',
      stack: 'تقنية المنصة',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      edit: 'تعديل الجهاز',
      pin: 'تثبيت',
      export: 'تصدير التقرير',
      moreOptions: 'خيارات إضافية',
      excel: 'تصدير كملف Excel',
      csv: 'تصدير كملف CSV',
      accessibleName: 'يستخدم دور الزر الأصلي واسماً مختصراً لقارئات الشاشة. تُخفى الأيقونات الزخرفية عن التقنيات المساعدة.',
      keyboard: 'ينقل Tab التركيز ويشغّل Enter أو Space الإجراء. وتدعم القوائم الأسهم وEscape أيضاً.',
      focusText: 'يستخدم تركيز لوحة المفاتيح رموز لون التركيز وعرضه وإزاحته ويبقى واضحاً في المظهرين.',
      target: 'يلبّي الحد الأدنى للهدف: 24px على الويب و48dp على منصات اللمس.',
      rtl: 'ينعكس التخطيط المنطقي في العربية، ولا تنعكس إلا الأيقونات الاتجاهية.',
      motion: 'تستخدم انتقالات الحالات رموز الحركة وتصبح فورية عند طلب تقليل الحركة.',
      variantsCopy: {
        filled: 'أعلى أهمية للإجراء الأساسي.',
        tonal: 'أهمية متوسطة على حاوية هادئة.',
        outlined: 'إجراء ثانوي بحد مرئي.',
        text: 'أقل أهمية للإجراءات النصية أو المدمجة.',
        horizontal: 'إجراءات مرتبطة مرتبة باتجاه القراءة.',
        vertical: 'إجراءات بعرض كامل للأسطح الضيقة.',
        overflow: 'ينقل الإجراءات الأقل أولوية إلى قائمة.',
        fill: 'يوزّع العرض المتاح بين الإجراءات.',
        'single-line': 'سطر نصي واحد مع تسمية ثابتة أعلاه.',
        multiline: 'يتمدد مع المحتوى للنصوص الأطول.',
        adornment: 'أيقونة أو نص في بداية الحقل أو نهايته.',
      },
    },
  };

  Object.assign(copy.en, {
    fieldLabel: 'Email', fieldPlaceholder: 'name@company.com', fieldHelper: 'We send the sign-in link here.', fieldErrorText: 'Enter a valid email address.',
    notesLabel: 'Notes', searchLabel: 'Search devices', fieldError: 'Error', readOnly: 'Read-only',
    liveReact: 'Live React component', liveReactNote: 'The real @biowave/web component from 3-web-components/src — click, type and tab through it.',
    color: 'Color',
    leadingIcon: 'Leading icon',
    trailingIcon: 'Trailing icon',
    controls: 'Preview controls',
    colorNames: { brand: 'Brand', secondary: 'Secondary', neutral: 'Neutral', error: 'Error', inverse: 'Inverse' },
    tonalNote: 'Tonal is not available with this color, so it renders as outlined (spec §1).',
    inverseNote: 'Inverse buttons are shown on the inverse surface they are designed for.',
    bothIconsNote: 'Use a leading or a trailing icon, not both. The other icon was turned off.',
    fallback: 'Not available · renders outlined',
    notAllowed: 'Not allowed',
    matrix: 'Color × variant',
    matrixLead: 'Every allowed combination, live. Cells marked “Not allowed” fall back to outlined in code.',
    keyboardFocus: 'Keyboard focus',
    guidelines: 'Guidelines',
    docsLoading: 'Loading documentation…',
    docsError: 'Documentation could not load. Open the docs with “npm run docs”.',
    docsEnglish: 'Documentation below is written in English.',
      statusNames: { plan: 'Plan', code: 'Code', figma: 'Figma', review: 'Review' },
      sourceFile: 'Open the component file',
      codeContract: 'Code contract',
      figmaContract: 'Figma contract',
      viewComponent: 'View Component',
      viewTokens: 'View Tokens',
      componentsList: 'Components List',
      foundationList: 'Foundation List',
      componentCrumb: 'Component',
      foundationCrumb: 'Foundation',
      sectionSwitch: 'Switch section',
      openTokens: 'Open the token preview',
      notGenerated: 'not generated (plan not Finished)',
    tabs: { overview: 'Overview', props: 'Props & tokens', variations: 'Variations', states: 'States & motion', usage: 'Usage', content: 'Content', platform: 'Platform', rtl: 'RTL', accessibility: 'Accessibility', changelog: 'Changelog' },
    leads: {
      overview: 'Inspect the component at its platform default size, then read what it is and how it is built.',
      props: 'The public API, dimensions and the tokens each part uses. This is the contract the code is reviewed against.',
      variations: 'Every option: emphasis, color, size and icons. Use the controls to change all examples at once.',
      states: 'Every interactive state, with the transitions and motion tokens implementations must follow.',
      usage: 'When to use the component, when to pick something else, and the do’s and don’ts.',
      content: 'How to write labels in English and Arabic.',
      platform: 'How the component differs between Web, Tablet and Mobile.',
      rtl: 'The same component in English (LTR) and Arabic (RTL), side by side. Only directional icons mirror.',
      accessibility: 'Keyboard, screen reader, focus, contrast and target-size requirements.',
      changelog: 'Version history of the guidelines and this platform’s spec, and related components.',
    },
  });

  Object.assign(copy.ar, {
    fieldLabel: 'البريد الإلكتروني', fieldPlaceholder: 'name@company.com', fieldHelper: 'نرسل رابط تسجيل الدخول إلى هنا.', fieldErrorText: 'أدخل بريداً إلكترونياً صحيحاً.',
    notesLabel: 'ملاحظات', searchLabel: 'البحث في الأجهزة', fieldError: 'خطأ', readOnly: 'للقراءة فقط',
    liveReact: 'مكوّن React مباشر', liveReactNote: 'مكوّن @biowave/web الحقيقي من 3-web-components/src — انقر واكتب وتنقّل بينه.',
    color: 'اللون',
    leadingIcon: 'أيقونة البداية',
    trailingIcon: 'أيقونة النهاية',
    controls: 'عناصر التحكم بالمعاينة',
    colorNames: { brand: 'العلامة', secondary: 'ثانوي', neutral: 'محايد', error: 'خطأ', inverse: 'معكوس' },
    tonalNote: 'النمط الهادئ غير متاح مع هذا اللون، لذا يُعرض كنمط محدد (المواصفات §1).',
    inverseNote: 'تُعرض الأزرار المعكوسة على السطح المعكوس المصمم لها.',
    bothIconsNote: 'استخدم أيقونة بداية أو نهاية، لا الاثنتين. تم إيقاف الأيقونة الأخرى.',
    fallback: 'غير متاح · يُعرض كنمط محدد',
    notAllowed: 'غير مسموح',
    matrix: 'اللون × النمط',
    matrixLead: 'كل التركيبات المسموحة بشكل حي. الخلايا "غير مسموح" تتحول إلى النمط المحدد في الكود.',
    keyboardFocus: 'تركيز لوحة المفاتيح',
    guidelines: 'الإرشادات',
    docsLoading: 'جارٍ تحميل التوثيق…',
    docsError: 'تعذر تحميل التوثيق. افتح التوثيق باستخدام "npm run docs".',
    docsEnglish: 'التوثيق أدناه مكتوب بالإنجليزية.',
      statusNames: { plan: 'الخطة', code: 'الكود', figma: 'فيجما', review: 'المراجعة' },
      sourceFile: 'فتح ملف المكوّن',
      codeContract: 'عقد الكود',
      figmaContract: 'عقد فيجما',
      viewComponent: 'عرض المكوّن',
      viewTokens: 'عرض الرموز',
      componentsList: 'قائمة المكوّنات',
      foundationList: 'قائمة الأسس',
      componentCrumb: 'المكوّنات',
      foundationCrumb: 'الأسس',
      sectionSwitch: 'تبديل القسم',
      openTokens: 'فتح معاينة الرموز',
      notGenerated: 'لم يُنشأ بعد (الخطة غير مكتملة)',
    tabs: { overview: 'نظرة عامة', props: 'الخصائص والرموز', variations: 'التنويعات', states: 'الحالات والحركة', usage: 'الاستخدام', content: 'المحتوى', platform: 'المنصة', rtl: 'الاتجاه RTL', accessibility: 'إمكانية الوصول', changelog: 'سجل التغييرات' },
    leads: {
      overview: 'افحص المكوّن بحجمه الافتراضي للمنصة، ثم اقرأ ما هو وكيف بُني.',
      props: 'الواجهة البرمجية والأبعاد والرموز التي يستخدمها كل جزء. هذا هو العقد الذي يُراجَع الكود على أساسه.',
      variations: 'كل الخيارات: الأهمية واللون والحجم والأيقونات. استخدم عناصر التحكم لتغيير كل الأمثلة مرة واحدة.',
      states: 'كل الحالات التفاعلية مع الانتقالات ورموز الحركة المطلوبة.',
      usage: 'متى تستخدم المكوّن، ومتى تختار غيره، وما يجب وما لا يجب.',
      content: 'كيفية كتابة التسميات بالإنجليزية والعربية.',
      platform: 'كيف يختلف المكوّن بين الويب والجهاز اللوحي والهاتف.',
      rtl: 'المكوّن نفسه بالإنجليزية (LTR) والعربية (RTL) جنباً إلى جنب. تنعكس الأيقونات الاتجاهية فقط.',
      accessibility: 'متطلبات لوحة المفاتيح وقارئ الشاشة والتركيز والتباين وحجم الهدف.',
      changelog: 'سجل إصدارات الإرشادات ومواصفات هذه المنصة، والمكوّنات المرتبطة.',
    },
  });

  const icons = {
    check: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6.5 12.5 3.4 3.4 7.6-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevron: '<svg class="demo-icon directional" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg class="demo-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    edit: '<svg class="demo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l11-11-4-4L4 16v4Zm9.8-13.8 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    external: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 5h5v5M12 12l7-7M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    add: '<svg class="demo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    arrow: '<svg class="demo-icon directional" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pin: '<svg class="demo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 4 8 0-1 5 3 3v2H6v-2l3-3-1-5Zm4 10v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const state = {
    component: 'button',
    tab: 'overview',
    lang: localStorage.getItem('bw-catalog-lang') || 'en',
    theme: localStorage.getItem('bw-catalog-theme') || 'light',
    color: 'brand',
    leading: false,
    trailing: false,
    iconNote: false,
  };

  const els = {
    brandSubtitle: document.querySelector('[data-brand-subtitle]'),
    platformTabs: document.querySelector('[data-platform-tabs]'),
    menuButton: document.querySelector('[data-menu-button]'),
    menu: document.querySelector('[data-menu]'),
    menuHeading: document.querySelector('[data-menu-heading]'),
    componentMenu: document.querySelector('[data-component-menu]'),
    eyebrow: document.querySelector('[data-eyebrow]'),
    title: document.querySelector('[data-title]'),
    description: document.querySelector('[data-description]'),
    status: document.querySelector('[data-status]'),
    platformBadge: document.querySelector('[data-platform-badge]'),
    tablist: document.querySelector('[data-detail-tabs]'),
    panel: document.querySelector('[data-panel]'),
    prefs: document.querySelector('[data-prefs]'),
    toast: document.querySelector('[data-toast]'),
  };

  function t(key) {
    return copy[state.lang][key];
  }

  // Theme + Language switches, shared by component pages and the home pages. Radio name → state key.
  const PREFS = {
    theme: { key: 'theme', storage: 'bw-catalog-theme', options: () => ['light', 'dark', 'system'].map((value) => [value, t(value)]) },
    language: { key: 'lang', storage: 'bw-catalog-lang', options: () => [['en', 'EN'], ['ar', 'عربي']] },
  };
  function prefsControls() {
    return Object.entries(PREFS).map(([name, pref]) => {
      const radios = pref.options().map(([value, label]) => `<label><input type="radio" name="${name}" value="${value}"${state[pref.key] === value ? ' checked' : ''}><span${name === 'language' ? ` lang="${value}"` : ''}>${label}</span></label>`).join('');
      return `<div class="toolbar-group${name === 'theme' ? ' theme-control' : ''}"><span class="toolbar-label">${t(name)}</span><div class="segmented">${radios}</div></div>`;
    }).join('');
  }

  const BUILT = ['Built', 'In review', 'Changes requested', 'Approved'];
  function isBuilt(component) {
    return BUILT.includes(components[component]?.code);
  }

  function parseHash() {
    const parts = window.location.hash.slice(1).split('/');
    const tab = parts.length > 1 ? parts[1] : parts[0]; // #props (old links: #button/props)
    const mapped = legacyTabs[tab] || tab;
    if (tabKeys.includes(mapped)) state.tab = mapped;
  }

  function writeHash(replace) {
    const value = `#${state.tab}`;
    if (window.location.hash === value) return;
    if (replace) history.replaceState(null, '', value);
    else history.pushState(null, '', value);
  }

  function statusText(component) {
    return isBuilt(component) ? t('built') : t('planned');
  }

  function renderPlatformTabs() {
    els.platformTabs.setAttribute('aria-label', t('platform'));
    els.platformTabs.innerHTML = Object.entries(platformData).map(([key, item]) => {
      const current = key === platform ? ' aria-current="page"' : '';
      return `<a class="platform-tab" href="${ROOT}${SECTION[key]}/components/${state.component}/${state.component}.html#${state.tab}"${current} data-platform-link="${key}">${item.label[state.lang]}</a>`;
    }).join('');
    // A component may exist on one platform only (e.g. Text field is Web-only so far): send that tab to the platform's Components List.
    els.platformTabs.querySelectorAll('[data-platform-link]').forEach(async (a) => {
      if (a.dataset.platformLink === platform) return;
      const ok = await fetch(a.getAttribute('href').split('#')[0], { method: 'HEAD', cache: 'no-store' }).then((r) => r.ok).catch(() => true);
      if (!ok) a.setAttribute('href', `${ROOT}${SECTION[a.dataset.platformLink]}/index.html`);
    });
  }

  function renderMenu() {
    els.menuHeading.textContent = t('components');
    els.componentMenu.setAttribute('aria-label', t('components'));
    els.menuButton.setAttribute('aria-label', els.menu.hidden ? t('openMenu') : t('closeMenu'));
    els.componentMenu.innerHTML = Object.entries(components).map(([key, item], index) => {
      const current = key === state.component ? ' aria-current="page"' : '';
      const builtClass = isBuilt(key) ? ' built' : '';
      return `<a href="../${key}/${key}.html#overview" data-component-link="${key}"${current}><span class="menu-index">${String(index + 1).padStart(2, '0')}</span><span>${item.name[state.lang]}</span><span class="menu-status${builtClass}">${statusText(key)}</span></a>`;
    }).join('');
  }

  // ---------- Playground options (from guidelines §4 of each component) ----------
  const allColors = ['brand', 'secondary', 'neutral', 'error', 'inverse'];
  const componentOptions = {
    button: { colors: allColors, defaultColor: 'brand', noTonal: ['neutral', 'inverse'], icons: ['leading', 'trailing'] },
    'icon-button': { colors: allColors, defaultColor: 'neutral', noTonal: ['neutral', 'inverse'], icons: [] },
    'split-button': { colors: ['brand', 'secondary', 'neutral'], defaultColor: 'brand', noTonal: ['neutral'], icons: ['leading'] },
    'button-group': { colors: [], defaultColor: 'brand', noTonal: [], icons: [] },
    'text-field': { colors: [], defaultColor: 'brand', noTonal: [], icons: [], states: ['default', 'hover', 'focus', 'fieldError', 'readOnly', 'disabled'] },
  };

  const tabKeys = ['overview', 'props', 'variations', 'states', 'usage', 'content', 'platform', 'rtl', 'accessibility', 'changelog'];
  const legacyTabs = { variants: 'variations', sizes: 'variations' };

  function options(component = state.component) {
    return componentOptions[component];
  }

  function renderTabs() {
    els.tablist.setAttribute('aria-label', t('details'));
    els.tablist.innerHTML = tabKeys.map((key) => `<button class="detail-tab" id="tab-${key}" type="button" role="tab" aria-selected="${key === state.tab}" aria-controls="panel" tabindex="${key === state.tab ? '0' : '-1'}" data-tab="${key}">${t('tabs')[key]}</button>`).join('');
  }

  function isFallback(variant, color, component = state.component) {
    return variant === 'tonal' && options(component).noTonal.includes(color);
  }

  function effectiveVariant(variant, color, component = state.component) {
    return isFallback(variant, color, component) ? 'outlined' : variant;
  }

  function sizeAttr(size) {
    return size ? ` data-s="${size}"` : '';
  }

  function demoButton(variant = 'filled', label = t('save'), opts = {}) {
    const color = opts.color || state.color;
    const v = effectiveVariant(variant, color, 'button');
    const lead = opts.leading ?? state.leading;
    const trail = !lead && (opts.trailing ?? state.trailing);
    return `<button class="demo-control" type="button" data-v="${v}" data-c="${color}"${sizeAttr(opts.size)} data-demo-action ${opts.extra || ''}>${lead ? icons.add : ''}<span class="demo-label">${label}</span>${trail ? icons.arrow : ''}</button>`;
  }

  function demoIconButton(variant = 'text', selected = false, opts = {}) {
    const color = opts.color || state.color;
    const v = effectiveVariant(variant, color, 'icon-button');
    return `<button class="demo-control icon-only${selected ? ' is-selected' : ''}" type="button" data-v="${v}" data-c="${color}"${sizeAttr(opts.size)} aria-label="${selected ? t('pin') : t('edit')}" aria-pressed="${selected}" data-icon-toggle>${selected ? icons.pin : icons.edit}</button>`;
  }

  function demoSplitButton(variant = 'filled', opts = {}) {
    const color = opts.color || state.color;
    const v = effectiveVariant(variant, color, 'split-button');
    const lead = opts.leading ?? state.leading;
    const attrs = `data-v="${v}" data-c="${color}"${sizeAttr(opts.size)}`;
    return `<div class="split-control"><button class="demo-control" type="button" ${attrs} data-demo-action>${lead ? icons.add : ''}<span class="demo-label">${t('export')}</span></button><button class="demo-control icon-only" type="button" ${attrs} aria-label="${t('moreOptions')}" aria-haspopup="menu" aria-expanded="false" data-split-trigger>${icons.chevron}</button><div class="split-menu" role="menu" data-split-menu hidden><button type="button" role="menuitem" data-demo-action>${t('excel')}</button><button type="button" role="menuitem" data-demo-action>${t('csv')}</button></div></div>`;
  }

  function demoButtonGroup(mode = 'horizontal', opts = {}) {
    const plain = { color: 'brand', leading: false, trailing: false, size: opts.size };
    const style = mode === 'vertical' ? ' style="flex-direction:column-reverse"' : '';
    const fillClass = mode === 'fill' ? ' is-fill' : '';
    if (mode === 'overflow') return `<div class="button-group-demo">${demoIconButton('outlined', false, { ...plain, color: 'neutral' })}${demoButton('filled', t('save'), plain)}</div>`;
    return `<div class="button-group-demo${fillClass}"${style}>${demoButton('outlined', t('cancel'), { ...plain, color: 'neutral' })}${demoButton('filled', t('save'), plain)}</div>`;
  }

  function demoTextField(variant = 'single-line', opts = {}) {
    const st = opts.state || 'default';
    const cls = `demo-field-box${st === 'hover' ? ' is-hover' : ''}${st === 'focus' ? ' is-focus' : ''}${st === 'fieldError' ? ' is-error' : ''}${st === 'readOnly' ? ' is-readonly' : ''}`;
    const dis = st === 'disabled' ? ' disabled' : '';
    const ro = st === 'readOnly' ? ' readonly' : '';
    const value = st === 'fieldError' ? 'hassan@biowave' : (st === 'readOnly' || st === 'disabled' ? 'hassan@biowave.io' : '');
    const helper = st === 'fieldError' ? t('fieldErrorText') : t('fieldHelper');
    const helperCls = st === 'fieldError' ? ' is-error' : '';
    const size = opts.size ? ` data-s="${opts.size}"` : '';
    if (variant === 'multiline') {
      return `<label class="demo-field${st === 'disabled' ? ' is-disabled' : ''}"${size}><span class="demo-field-label">${t('notesLabel')}</span><span class="${cls} is-multiline"><textarea rows="3"${dis}${ro} placeholder="${t('notesLabel')}"></textarea></span><span class="demo-field-helper"><span></span><span>0 / 120</span></span></label>`;
    }
    const lead = variant === 'adornment' ? icons.search || '' : '';
    const label = variant === 'adornment' ? t('searchLabel') : t('fieldLabel');
    return `<label class="demo-field${st === 'disabled' ? ' is-disabled' : ''}"${size}><span class="demo-field-label">${label}</span><span class="${cls}">${lead}<input type="${variant === 'adornment' ? 'search' : 'email'}" value="${value}" placeholder="${variant === 'adornment' ? t('searchLabel') : t('fieldPlaceholder')}"${dis}${ro}${st === 'fieldError' ? ' aria-invalid="true"' : ''}></span><span class="demo-field-helper${helperCls}"><span>${helper}</span></span></label>`;
  }

  function componentDemo(component = state.component, variant, opts = {}) {
    if (component === 'text-field') return demoTextField(variant || 'single-line', opts);
    if (component === 'button') return demoButton(variant || 'filled', opts.label || t('save'), opts);
    if (component === 'icon-button') return demoIconButton(variant || 'text', variant === 'tonal', opts);
    if (component === 'split-button') return demoSplitButton(variant || 'filled', opts);
    return demoButtonGroup(variant || 'horizontal', opts);
  }

  function demoColor() {
    return options().colors.length ? state.color : 'brand';
  }

  function surface(content, color = demoColor()) {
    return `<div class="demo-surface${color === 'inverse' ? ' is-inverse' : ''}"><div class="demo-cluster">${content}</div></div>`;
  }

  // ---------- Playground controls ----------
  function noteText() {
    const notes = [];
    if (state.tab === 'variations' && options().colors.length && options().noTonal.includes(state.color)) notes.push(t('tonalNote'));
    if (state.color === 'inverse' && options().colors.length) notes.push(t('inverseNote'));
    if (state.iconNote) notes.push(t('bothIconsNote'));
    return notes.join(' ');
  }

  function renderControls() {
    const opt = options();
    if (!opt.colors.length && !opt.icons.length) return '';
    const colorField = opt.colors.length
      ? `<label class="control-field"><span class="control-label">${t('color')}</span><select class="control-select" data-control="color">${opt.colors.map((c) => `<option value="${c}"${c === state.color ? ' selected' : ''}>${t('colorNames')[c]}</option>`).join('')}</select></label>`
      : '';
    const iconFields = opt.icons.map((k) => `<label class="control-switch"><input type="checkbox" role="switch" data-control="${k}"${state[k] ? ' checked' : ''}><span class="switch-track" aria-hidden="true"></span><span class="control-label">${t(k === 'leading' ? 'leadingIcon' : 'trailingIcon')}</span></label>`).join('');
    return `<div class="playground-controls" role="group" aria-label="${t('controls')}">${colorField}${iconFields}<p class="control-note" aria-live="polite">${noteText()}</p></div>`;
  }

  function wireControls() {
    els.panel.querySelectorAll('[data-control]').forEach((input) => input.addEventListener('change', () => {
      const key = input.dataset.control;
      state.iconNote = false;
      if (key === 'color') {
        state.color = input.value;
      } else {
        state[key] = input.checked;
        const other = key === 'leading' ? 'trailing' : 'leading';
        if (input.checked && state[other]) {
          state[other] = false;
          state.iconNote = true;
        }
      }
      renderPanel();
      els.panel.querySelector(`[data-control="${key}"]`)?.focus();
    }));
  }

  // ---------- Documentation (rendered from the markdown sources — never copied) ----------
  const docCache = new Map();
  let docRender = 0;

  // Every doc block reads the component's single file. src = part letter: 'g' → A Guidelines, 's' → B Spec, or 'A'…'F'.
  const PART_OF = { g: 'A', s: 'B' };
  function docUrl() {
    return `${state.component}.md`;
  }

  function slugOf(title) {
    return title.trim().toLowerCase().replace(/[^\p{L}\p{N}\- ]/gu, '').replace(/ /g, '-');
  }

  function parseSections(text) {
    const sections = [];
    let current = null;
    let part = null;
    let fenced = false;
    for (const line of text.split(/\r?\n/)) {
      if (/^```/.test(line)) fenced = !fenced;
      const partMatch = !fenced && /^## ([A-F]) · /.exec(line);
      if (partMatch) { part = partMatch[1]; current = null; continue; }
      if (!fenced && /^## /.test(line)) { part = null; current = null; continue; }
      const match = !fenced && part && /^### ([A-F]\d+) (.*)$/.exec(line);
      if (match) {
        current = { id: match[1], part, title: match[2], anchor: slugOf(`${match[1]} ${match[2]}`), lines: [] };
        sections.push(current);
      } else if (current) {
        if (!fenced && /^---\s*$/.test(line)) continue;
        current.lines.push(line);
      }
    }
    return sections;
  }

  function loadDoc(url) {
    if (!docCache.has(url)) {
      docCache.set(url, fetch(url, { cache: 'no-store' })
        .then((response) => { if (!response.ok) throw new Error(String(response.status)); return response.text(); })
        .then(parseSections)
        .catch((error) => { docCache.delete(url); throw error; }));
    }
    return docCache.get(url);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function resolveUrl(href, base) {
    try { return new URL(href, new URL(base, window.location.href)).href; } catch { return href; }
  }

  function inline(text, base) {
    const codes = [];
    let s = text.replace(/`([^`]+)`/g, (_, code) => { codes.push(code); return `\u0000${codes.length - 1}\u0000`; });
    s = escapeHtml(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img class="doc-img" src="${resolveUrl(src, base)}" alt="${alt}" loading="lazy" onerror="this.remove()">`);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${resolveUrl(href, base)}">${label}</a>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[Number(i)])}</code>`);
  }

  function markdown(src, base) {
    const lines = src.split('\n');
    const out = [];
    const listRe = /^\s*([-*]|\d+\.)\s+/;
    const isSep = (l) => /^[\s|:-]+$/.test(l) && /-{3,}/.test(l);
    const cells = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^```/.test(line)) {
        const buf = [];
        i += 1;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i += 1;
        out.push(`<pre class="doc-pre"><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
        continue;
      }
      if (/^\s*$/.test(line)) { i += 1; continue; }
      const heading = /^(#{1,6})\s+(.*)$/.exec(line);
      if (heading) {
        const level = Math.max(2, Math.min(heading[1].length, 6));
        out.push(`<h${level}>${inline(heading[2], base)}</h${level}>`);
        i += 1;
        continue;
      }
      if (/^\s*\|/.test(line) && i + 1 < lines.length && isSep(lines[i + 1])) {
        const head = cells(line);
        const rows = [];
        i += 2;
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
        out.push(`<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${head.map((c) => `<th>${inline(c, base)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c, base)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      if (listRe.test(line)) {
        const ordered = /^\s*\d+\./.test(line);
        const items = [];
        while (i < lines.length && listRe.test(lines[i])) {
          items.push(lines[i].replace(listRe, ''));
          i += 1;
          while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !listRe.test(lines[i])) items[items.length - 1] += ` ${lines[i++].trim()}`;
        }
        const tag = ordered ? 'ol' : 'ul';
        out.push(`<${tag}>${items.map((item) => `<li>${inline(item.replace(/^\[( |x)\]\s*/i, (_, x) => (x.trim() ? '☑ ' : '☐ ')), base)}</li>`).join('')}</${tag}>`);
        continue;
      }
      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
        out.push(`<blockquote>${inline(buf.join(' '), base)}</blockquote>`);
        continue;
      }
      if (/^\s*(---|\*\*\*)\s*$/.test(line)) { out.push('<hr>'); i += 1; continue; }
      const buf = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(```|#{1,6}\s|\s*\||>)/.test(lines[i]) && !listRe.test(lines[i])) buf.push(lines[i++]);
      if (!buf.length) buf.push(lines[i++]);
      out.push(`<p>${inline(buf.join(' '), base)}</p>`);
    }
    return out.join('');
  }

  function docs(list) {
    const note = state.lang === 'ar' ? `<p class="doc-lang-note">${t('docsEnglish')}</p>` : '';
    return `<div class="doc-stack">${note}${list.map(([src, match]) => `<section class="doc-block" data-doc-src="${src}" data-doc-match="${match}"><p class="doc-loading">${t('docsLoading')}</p></section>`).join('')}</div>`;
  }

  function hydrateDocs() {
    const renderId = ++docRender;
    els.panel.querySelectorAll('[data-doc-src]').forEach(async (block) => {
      const src = block.dataset.docSrc;
      const url = docUrl(src);
      try {
        const sections = await loadDoc(url);
        if (renderId !== docRender) return;
        const re = new RegExp(block.dataset.docMatch, 'i');
        const part = PART_OF[src] || src;
        const section = sections.find((s) => s.part === part && re.test(s.title));
        if (!section) { block.remove(); return; }
        const showImages = section.lines.join('\n');
        block.innerHTML = `<header class="doc-head"><h3>${escapeHtml(section.title)}</h3><a class="doc-source" href="${url}#${section.anchor}">${section.id} · ${part === 'A' ? t('guidelines') : t('specification')} ↗</a></header><div class="doc-prose" lang="en" dir="ltr">${markdown(showImages, url)}</div>`;
      } catch {
        if (renderId === docRender) block.innerHTML = `<p class="doc-error">${t('docsError')}</p>`;
      }
    });
  }

  // ---------- Tabs ----------
  function lead(key) {
    return `<h2 class="section-heading">${t('tabs')[key]}</h2><p class="section-lead">${t('leads')[key]}</p>`;
  }

  function renderOverview(item) {
    const inverse = demoColor() === 'inverse' ? ' is-inverse' : '';
    return `${lead('overview')}${renderControls()}<div class="overview-grid"><article class="preview-card"><div class="card-header"><span class="card-title">${t('livePreview')}</span><span class="live-indicator">${isBuilt(state.component) ? t('built') : t('planned')}</span></div><div class="preview-stage"><div class="device-surface${inverse}"><div class="demo-cluster">${componentDemo()}</div></div></div></article><aside class="info-stack"><article class="info-card"><p class="info-label">${t('anatomy')}</p><p class="info-value">${item.parts[state.lang]}</p></article><article class="info-card"><p class="info-label">${t('implementation')}</p><p class="info-value code-value">${inline(item.importName || '—', docUrl())}</p></article><article class="info-card"><p class="info-label">${t('stack')}</p><p class="info-value">${platformData[platform].stack}</p></article><article class="info-card"><p class="info-label">${t('status')}</p><p class="info-value">${['plan', 'code', 'figma', 'review'].map((k) => `${t('statusNames')[k]}: <strong>${escapeHtml(item[k] || '—')}</strong>`).join('<br>')}</p></article><a class="spec-link" href="${state.component}.md#b--spec">${t('readSpec')}${icons.external}</a><a class="spec-link" href="${state.component}.md">${t('sourceFile')}${icons.external}</a><a class="spec-link" href="${state.component}-contract.md">${t('codeContract')}${icons.external}</a><a class="spec-link" href="figma-${state.component}-contract.md">${t('figmaContract')}${icons.external}</a></aside></div>${liveReactCard()}${docs([['g', '^overview'], ['g', '^anatomy']])}`;
  }

  // ---------- Live React (npm start serves _docs/live.html through Vite) ----------
  function livePrefs() {
    return { lang: state.lang, theme: state.theme, color: options().colors.length ? state.color : 'brand' };
  }
  function liveReactCard() {
    if (platform !== 'web' || !LIVE_REACT.includes(state.component)) return '';
    const q = new URLSearchParams({ component: state.component, ...livePrefs() });
    return `<article class="preview-card live-react-card"><div class="card-header"><span class="card-title">${t('liveReact')}</span><span class="live-indicator">React + MUI</span></div><p class="section-lead">${t('liveReactNote')}</p><iframe class="live-react-frame" title="${t('liveReact')} · ${escapeHtml(components[state.component]?.name[state.lang] || state.component)}" src="${ROOT}_docs/live.html?${q}" loading="lazy" data-live-react></iframe></article>`;
  }
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.data?.type !== 'biowave:live-height') return;
    document.querySelectorAll('[data-live-react]').forEach((frame) => {
      if (frame.contentWindow === event.source) frame.style.height = `${Math.ceil(event.data.height)}px`;
    });
  });

  function renderProps() {
    return `${lead('props')}${docs([['s', '^api'], ['s', '^dimension'], ['s', '^token'], ['s', '^example']])}`;
  }

  function renderMatrix(item) {
    const opt = options();
    if (!opt.colors.length) return '';
    const head = demos[state.component].variants.map((v) => `<th scope="col">${v}</th>`).join('');
    const rows = opt.colors.map((color) => {
      const cellsHtml = demos[state.component].variants.map((v) => {
        if (isFallback(v, color)) return `<td class="matrix-cell${color === 'inverse' ? ' is-inverse' : ''}"><span class="matrix-na">${t('notAllowed')}</span></td>`;
        return `<td class="matrix-cell${color === 'inverse' ? ' is-inverse' : ''}">${componentDemo(state.component, v, { color })}</td>`;
      }).join('');
      return `<tr${color === state.color ? ' class="is-current"' : ''}><th scope="row">${t('colorNames')[color]}</th>${cellsHtml}</tr>`;
    }).join('');
    return `<h3 class="sub-heading">${t('matrix')}</h3><p class="section-lead">${t('matrixLead')}</p><div class="matrix-wrap"><table class="matrix"><thead><tr><th scope="col">${t('color')}</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderSizesTable() {
    const css = getComputedStyle(root);
    const rows = platformData[platform].sizes.map(([name, token]) => {
      const value = parseFloat(css.getPropertyValue(`--bw-${token}`)) || '—';
      const defaultMark = name === platformData[platform].defaultSize ? ` · ${t('defaultSize')}` : '';
      const sample = surface(componentDemo(state.component, undefined, { size: name }));
      return `<tr><td><strong>${name}</strong>${defaultMark}</td><td><code>${token}</code></td><td>${value}${platform === 'web' ? 'px' : 'dp'}</td><td>${sample}</td></tr>`;
    }).join('');
    return `<h3 class="sub-heading">${t('sizes')}</h3><p class="section-lead">${t('sizesLead')}</p><div class="size-table-wrap"><table class="size-table"><thead><tr><th>${t('sizes')}</th><th>${t('token')}</th><th>${t('value')}</th><th>${t('sample')}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderVariations(item) {
    const cards = demos[state.component].variants.map((variant) => {
      const badge = options().colors.length && isFallback(variant, state.color) ? `<p class="fallback-badge">${t('fallback')}</p>` : '';
      return `<article class="variant-card"><div><h3>${variant}</h3><p>${t('variantsCopy')[variant]}</p>${badge}</div>${surface(componentDemo(state.component, variant))}</article>`;
    }).join('');
    return `${lead('variations')}${renderControls()}<div class="variant-grid">${cards}</div>${renderMatrix(item)}${renderSizesTable()}${docs([['g', '^options']])}`;
  }

  function stateDemo(key) {
    if (state.component === 'text-field') return demoTextField('single-line', { state: key });
    let demo = componentDemo();
    if (key === 'loading') {
      return demo
        .replace('<button class="demo-control', '<button aria-busy="true" class="demo-control')
        .replace('</button>', `<span class="spinner" aria-hidden="true"></span><span class="visually-hidden">${t('loading')}</span></button>`);
    }
    if (key === 'focus') demo = demo.replace('demo-control', 'demo-control is-focus');
    if (key === 'hover') demo = demo.replace('demo-control', 'demo-control is-hover');
    if (key === 'pressed') demo = demo.replace('demo-control', 'demo-control is-pressed');
    if (key === 'disabled') demo = demo.replace('<button class="demo-control', '<button disabled class="demo-control');
    return demo;
  }

  function renderStates() {
    const states = options().states || ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];
    const grid = states.map((key) => `<article class="state-card"><div><h3>${t(key)}</h3><p>${key === 'loading' ? t('motion') : key === 'focus' ? t('focusText') : t('statesLead')}</p></div>${surface(stateDemo(key))}</article>`).join('');
    return `${lead('states')}${renderControls()}<div class="state-grid">${grid}</div>${docs([['s', '^states'], ['g', '^states']])}`;
  }

  function demoInLanguage(lang) {
    const previous = state.lang;
    state.lang = lang;
    const html = componentDemo();
    state.lang = previous;
    return html;
  }

  function renderRtl() {
    const pair = ['en', 'ar'].map((lang) => `<article class="rtl-card"><div class="card-header"><span class="card-title">${lang === 'ar' ? 'RTL · العربية' : 'LTR · English'}</span></div><div class="preview-stage" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" lang="${lang}">${surface(demoInLanguage(lang))}</div></article>`).join('');
    return `${lead('rtl')}${renderControls()}<div class="rtl-grid">${pair}</div>${docs([['s', '^rtl']])}`;
  }

  function renderAccessibility() {
    const items = [t('accessibleName'), t('keyboard'), t('focusText'), t('target'), t('rtl'), t('motion')];
    return `${lead('accessibility')}<div class="a11y-grid"><article class="a11y-card"><h3>WCAG 2.2 AA</h3><ul class="check-list">${items.map((text) => `<li><span class="check-icon">${icons.check}</span><span>${text}</span></li>`).join('')}</ul></article><article class="a11y-card"><h3>${t('keyboardFocus')}</h3>${surface(stateDemo('focus'))}</article></div>${docs([['g', '^accessib'], ['s', '^accessib']])}`;
  }

  function renderPanel() {
    const item = components[state.component];
    const renderers = {
      overview: renderOverview,
      props: renderProps,
      variations: renderVariations,
      states: renderStates,
      usage: () => `${lead('usage')}${docs([['g', '^usage'], ['g', '^do and']])}`,
      content: () => `${lead('content')}${docs([['g', '^content']])}`,
      platform: () => `${lead('platform')}${docs([['g', '^platform']])}`,
      rtl: renderRtl,
      accessibility: renderAccessibility,
      changelog: () => `${lead('changelog')}${docs([['F', '^changes from'], ['F', '^guidelines changelog'], ['F', '^spec changelog'], ['g', '^related']])}`,
    };
    els.panel.setAttribute('aria-labelledby', `tab-${state.tab}`);
    els.panel.innerHTML = renderers[state.tab](item);
    wireDemos();
    wireControls();
    hydrateDocs();
    markMissingContracts();
  }

  // Contracts exist only after the plan is Finished (npm run contract). Show missing ones as "not generated".
  function markMissingContracts() {
    els.panel.querySelectorAll('a.spec-link[href$="-contract.md"]').forEach(async (a) => {
      const ok = await fetch(a.getAttribute('href'), { method: 'HEAD', cache: 'no-store' }).then((r) => r.ok).catch(() => false);
      if (ok) return;
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.classList.add('is-missing');
      a.textContent = `${a.textContent} — ${t('notGenerated')}`;
    });
  }

  function renderPage() {
    const item = components[state.component];
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    root.dataset.platform = platform;
    if (state.theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = state.theme;

    els.brandSubtitle.textContent = `${t('catalog')} · ${platformData[platform].label[state.lang]}`;
    els.eyebrow.textContent = `${platformData[platform].label[state.lang]} · ${platformData[platform].stack}`;
    els.title.textContent = item.name[state.lang];
    els.description.textContent = item.description[state.lang];
    els.status.textContent = statusText(state.component);
    els.status.classList.toggle('built', isBuilt(state.component));
    els.platformBadge.textContent = platformData[platform].label[state.lang];
    els.prefs.innerHTML = prefsControls();
    document.title = `${item.name[state.lang]} · ${platformData[platform].label[state.lang]} · Biowave`;

    renderPlatformTabs();
    renderMenu();
    renderTabs();
    renderPanel();
  }

  function setMenu(open, focusFirst) {
    els.menu.hidden = !open;
    els.menuButton.setAttribute('aria-expanded', String(open));
    els.menuButton.setAttribute('aria-label', open ? t('closeMenu') : t('openMenu'));
    if (open && focusFirst) els.componentMenu.querySelector('a')?.focus();
  }

  function selectComponent(component) {
    state.component = component;
    state.tab = 'overview';
    state.color = componentOptions[component].defaultColor;
    state.iconNote = false;
    writeHash(false);
    renderPage();
    setMenu(false, false);
    els.title.focus({ preventScroll: true });
  }

  function selectTab(tab, moveFocus) {
    state.tab = tab;
    writeHash(false);
    renderTabs();
    renderPanel();
    if (moveFocus) document.querySelector(`[data-tab="${tab}"]`)?.focus();
  }

  let toastTimer;
  function announce(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { els.toast.hidden = true; }, 1800);
  }

  function wireDemos() {
    els.panel.querySelectorAll('[data-demo-action]').forEach((button) => button.addEventListener('click', () => announce(t('actionRan'))));
    els.panel.querySelectorAll('[data-icon-toggle]').forEach((button) => button.addEventListener('click', () => {
      const selected = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-selected', selected);
      button.innerHTML = selected ? icons.pin : icons.edit;
    }));
    els.panel.querySelectorAll('[data-split-trigger]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      const menu = button.parentElement.querySelector('[data-split-menu]');
      const open = menu.hidden;
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open) menu.querySelector('[role="menuitem"]')?.focus();
    }));
    els.panel.querySelectorAll('[data-split-menu]').forEach((menu) => {
      menu.addEventListener('keydown', (event) => {
        if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
        const current = items.indexOf(document.activeElement);
        const change = event.key === 'ArrowDown' ? 1 : -1;
        items[(current + change + items.length) % items.length].focus();
      });
      menu.querySelectorAll('[role="menuitem"]').forEach((item) => item.addEventListener('click', () => {
        menu.hidden = true;
        menu.parentElement.querySelector('[data-split-trigger]')?.setAttribute('aria-expanded', 'false');
      }));
    });
  }

  // ---------- Component data from the .md files ----------
  function parseHeader(text) {
    const header = {};
    for (const line of text.split(/\r?\n/)) {
      if (/^## /.test(line)) break;
      const m = /^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*$/.exec(line);
      if (m && m[1] !== '---') header[m[1]] = m[2];
    }
    return header;
  }

  async function loadComponents(base = '../') {
    const list = await fetch(`${base}index.json`, { cache: 'no-store' }).then((r) => { if (!r.ok) throw new Error(`components/index.json ${r.status}`); return r.json(); });
    const entries = await Promise.all(list.components.map(async (key) => {
      const text = await fetch(`${base}${key}/${key}.md`, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : ''));
      const h = parseHeader(text);
      const [en, ar] = (h.Component || key).split('·').map((x) => x.trim());
      const plain = (v) => (v || '').replace(/\*\*/g, '').trim();
      return [key, {
        name: { en: en || key, ar: ar || en || key },
        description: { en: h.Summary || '', ar: h['Summary (ar)'] || h.Summary || '' },
        parts: { en: h.Parts || '', ar: h['Parts (ar)'] || h.Parts || '' },
        importName: h.Import || '',
        plan: plain(h.Plan), code: plain(h.Code), figma: plain(h['Figma build']), review: plain(h.Review),
      }];
    }));
    components = Object.fromEntries(entries);
  }

  // ---------- Home pages (layout: 2-foundations/figma-doc-kit.md › Home pages) ----------
  const FOUNDATION_CARDS = [
    { key: 'devices', title: { en: 'Devices', ar: 'الأجهزة' }, guides: ['devices'], anchor: '' },
    { key: 'typography', title: { en: 'Typography', ar: 'الطباعة' }, guides: ['typography'], anchor: 'typography' },
    { key: 'colors', title: { en: 'Colors', ar: 'الألوان' }, guides: ['colors'], anchor: 'colors' },
    { key: 'layout', title: { en: 'Layout', ar: 'التخطيط' }, guides: ['grid', 'spacing'], anchor: 'grid' },
    { key: 'icons', title: { en: 'Icons', ar: 'الأيقونات' }, guides: ['icons', 'logos', 'illustration'], anchor: '' },
    { key: 'object-styles', title: { en: 'Object Styles', ar: 'أنماط العناصر' }, guides: ['radius', 'border', 'elevation'], anchor: 'radius' },
    { key: 'tokens', title: { en: 'Tokens', ar: 'الرموز' }, guides: ['tokens'], anchor: '' },
    { key: 'motion', title: { en: 'Motion', ar: 'الحركة' }, guides: ['motion'], anchor: 'motion' },
    { key: 'accessibility', title: { en: 'Accessibility', ar: 'إمكانية الوصول' }, guides: ['a11y'], anchor: '' },
    { key: 'content', title: { en: 'Content', ar: 'المحتوى' }, guides: ['content'], anchor: '' },
  ];

  const FOUNDATION_PREVIEW = {
    devices: '<div class="fp-devices"><span class="fp-phone"></span><span class="fp-phone"></span><span class="fp-tablet"></span><span class="fp-desktop"></span></div>',
    typography: '<span class="fp-type">Aa</span>',
    colors: `<div class="fp-ramps">${['brand', 'success', 'error', 'warning'].map((r) => `<div class="fp-ramp">${['subtle', 'default', 'hover', 'pressed'].map((s) => `<span style="background:var(--bw-color-background-${r}-${s})"></span>`).join('')}</div>`).join('')}</div>`,
    layout: '<div class="fp-layout"><span class="fp-frame"></span><span class="fp-redline fp-redline-x">1244</span><span class="fp-redline fp-redline-y">1244</span></div>',
    icons: '<svg class="fp-icon-grid" viewBox="0 0 96 96" aria-hidden="true"><rect x="8" y="8" width="80" height="80"/><rect x="20" y="20" width="56" height="56" rx="10"/><circle cx="48" cy="48" r="30"/><line x1="8" y1="8" x2="88" y2="88"/><line x1="88" y1="8" x2="8" y2="88"/></svg>',
    'object-styles': '<div class="fp-objects"><span class="fp-square"></span><span class="fp-rounded"></span><span class="fp-circle"></span></div>',
    tokens: '<div class="fp-tokens"><span class="fp-bubble">●▲<br>●■</span><span class="fp-arrow">⟷</span><span class="fp-bubble">&lt;/&gt;</span></div>',
    motion: '<svg class="fp-curve" viewBox="0 0 120 80" aria-hidden="true"><path d="M8 72 C 48 72, 56 8, 112 8"/><circle cx="8" cy="72" r="4"/><circle cx="112" cy="8" r="4"/></svg>',
    accessibility: '<div class="fp-a11y"><span class="fp-focus">Aa</span><span class="fp-contrast">4.5 : 1</span></div>',
    content: '<div class="fp-content"><span class="fp-chip" lang="en">Save changes</span><span class="fp-chip" lang="ar" dir="rtl">حفظ التغييرات</span></div>',
  };

  const LOGO = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5.6 7.5A8 8 0 0 1 18.4 7.5"/><path d="M4.2 12a8 8 0 0 1 1.1-3.3M19.8 12a8 8 0 0 0-1.1-3.3"/><path d="M7.5 18.5A9 9 0 0 1 6.5 12a5.5 5.5 0 0 1 11 0v1"/><path d="M9.5 20a11 11 0 0 1-1-8 3.5 3.5 0 0 1 7 0v2.5a6 6 0 0 1-1 3.3"/><path d="M12 12v2.5a9 9 0 0 0 1.5 5"/><path d="M17.3 16.3a10 10 0 0 1-.8 3.2"/></svg>`;
  function homeHeader(current, suffix = '') {
    const sections = [
      { key: 'foundations', label: t('foundationCrumb'), href: `${ROOT}2-foundations/index.html` },
      { key: 'components', label: t('componentCrumb'), href: `${ROOT}${SECTION[platform]}/index.html` },
    ];
    const active = sections.find((s) => s.key === current);
    const items = sections.map((s) => (s.key === current
      ? `<a role="menuitem" href="${s.href}" aria-current="page"><span>${s.label}</span>${icons.check}</a>`
      : `<a role="menuitem" href="${s.href}"><span>${s.label}</span></a>`)).join('');
    const tail = suffix ? `<span aria-hidden="true">/</span><span>${suffix}</span>` : '';
    const switcher = `<div class="home-switch"><button class="home-switch-button" type="button" aria-haspopup="menu" aria-expanded="false" data-home-switch>${active.label}${icons.chevronDown}</button><div class="menu-popover component-menu" role="menu" data-home-switch-menu hidden>${items}</div></div>`;
    return `<header class="home-header"><nav class="home-crumb" aria-label="${t('sectionSwitch')}"><a class="home-brand" href="${ROOT}2-foundations/index.html"><span class="brand-mark">${LOGO}</span><span>Biowave DS</span></a><span aria-hidden="true">/</span>${switcher}${tail}</nav><a class="home-link" href="${ROOT}2-foundations/index.html">biowave.ds</a></header>`;
  }

  function cycleFocus(container, key) {
    const links = Array.from(container.querySelectorAll('a'));
    const change = key === 'ArrowDown' ? 1 : -1;
    links[(links.indexOf(document.activeElement) + change + links.length) % links.length].focus();
  }

  function bindHomeSwitch() {
    const parts = () => ({ button: document.querySelector('[data-home-switch]'), menu: document.querySelector('[data-home-switch-menu]') });
    const setOpen = (open, focusItem) => {
      const { button, menu } = parts();
      if (!button) return;
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open && focusItem) (menu.querySelector('[aria-current]') || menu.querySelector('a')).focus();
    };
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-home-switch]')) setOpen(parts().menu.hidden, true);
      else if (!event.target.closest('.home-switch')) setOpen(false, false);
    });
    document.addEventListener('focusout', (event) => {
      if (event.target.closest('.home-switch') && !event.relatedTarget?.closest('.home-switch')) setOpen(false, false);
    });
    document.addEventListener('keydown', (event) => {
      const { button, menu } = parts();
      if (!button || menu.hidden) return;
      if (event.key === 'Escape') {
        setOpen(false, false);
        button.focus();
      } else if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        cycleFocus(menu, event.key);
      }
    });
  }
  const homeTitle = (title, lead = '') => `<div class="home-title"><h1>${title}</h1><div class="home-actions">${lead}${prefsControls()}</div></div>`;
  const homeFooter = () => `<footer class="home-footer"><span class="brand-mark">${LOGO}</span><span>Biowave DS</span></footer>`;
  const homeCard = (preview, title, href, label) => `<article class="home-card"><div class="home-preview" data-platform="${platform}">${preview}</div><div class="home-card-body"><h2>${title}</h2><a href="${href}">${label} <span aria-hidden="true">↗</span></a></div></article>`;

  function applyPrefs() {
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    root.dataset.platform = 'web';
    if (state.theme === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = state.theme;
  }

  async function renderHome() {
    applyPrefs();
    const main = document.querySelector('[data-home]');
    if (PAGE === 'components') {
      await loadComponents('components/');
      const platformLinks = Object.entries(platformData).map(([key, item]) => `<a class="platform-tab" href="${ROOT}${SECTION[key]}/index.html"${key === platform ? ' aria-current="page"' : ''}>${item.label[state.lang]}</a>`).join('');
      const cards = Object.entries(components).map(([key, item]) => {
        state.color = componentOptions[key]?.defaultColor || 'brand';
        const preview = demos[key] ? `<div class="demo-cluster">${componentDemo(key, undefined, { size: platformData[platform].defaultSize, color: state.color })}</div>` : `<span class="home-placeholder">${item.name[state.lang]}</span>`;
        return homeCard(preview, item.name[state.lang], `components/${key}/${key}.html#overview`, t('viewComponent'));
      }).join('');
      main.innerHTML = `${homeHeader('components')}${homeTitle(t('componentsList'), `<nav class="platform-tabs" aria-label="${t('platform')}">${platformLinks}</nav>`)}<div class="home-grid">${cards}</div>${homeFooter()}`;
      document.title = `${t('componentsList')} · ${platformData[platform].label[state.lang]} · Biowave`;
    } else if (PAGE === 'foundations') {
      const cards = FOUNDATION_CARDS.map((c) => homeCard(FOUNDATION_PREVIEW[c.key], c.title[state.lang], `foundation.html#${c.key}`, t('viewTokens'))).join('');
      main.innerHTML = `${homeHeader('foundations')}${homeTitle(t('foundationList'))}<div class="home-grid">${cards}</div>${homeFooter()}`;
      document.title = `${t('foundationList')} · Biowave`;
    } else if (PAGE === 'foundation') {
      const key = window.location.hash.slice(1) || 'colors';
      const card = FOUNDATION_CARDS.find((c) => c.key === key) || FOUNDATION_CARDS[0];
      const blocks = await Promise.all(card.guides.map(async (g) => {
        const url = `guidelines/${g}.md`;
        const text = await fetch(url, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : `> ${t('docsError')}`));
        return `<section class="doc-block"><header class="doc-head"><h3>${g}.md</h3><a class="doc-source" href="${url}">${t('guidelines')} ↗</a></header><div class="doc-prose" lang="en" dir="ltr">${markdown(text, url)}</div></section>`;
      }));
      const tokensLink = card.anchor ? `<a class="spec-link" href="preview/index.html#${card.anchor}">${t('openTokens')}${icons.external}</a>` : '';
      main.innerHTML = `${homeHeader('foundations', card.title[state.lang])}${homeTitle(card.title[state.lang], `<a class="platform-tab" href="index.html">← ${t('foundationList')}</a>`)}<div class="foundation-body">${tokensLink}<div class="doc-stack">${blocks.join('')}</div></div>${homeFooter()}`;
      document.title = `${card.title[state.lang]} · Biowave`;
      window.onhashchange = () => renderHome();
    }
  }

  // The controls are re-rendered on every change, so focus goes back to the chosen radio for keyboard users.
  document.addEventListener('change', async (event) => {
    const pref = PREFS[event.target.name];
    if (!pref || event.target.type !== 'radio') return;
    state[pref.key] = event.target.value;
    localStorage.setItem(pref.storage, event.target.value);
    await (PAGE === 'component' ? renderPage() : renderHome());
    document.querySelector(`input[name="${event.target.name}"]:checked`)?.focus();
  });

  if (PAGE !== 'component') {
    bindHomeSwitch();
    renderHome().catch((error) => { document.querySelector('[data-home]').innerHTML = `<p class="doc-error">${t('docsError')} (${escapeHtml(String(error.message || error))})</p>`; });
    return;
  }

  els.menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenu(els.menu.hidden, true);
  });


  els.tablist.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (tab) selectTab(tab.dataset.tab, false);
  });

  els.tablist.addEventListener('keydown', (event) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const tabs = Array.from(els.tablist.querySelectorAll('[data-tab]'));
    const current = tabs.findIndex((tab) => tab.dataset.tab === state.tab);
    const direction = root.dir === 'rtl' ? -1 : 1;
    let next = current;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key === 'ArrowRight') next = (current + direction + tabs.length) % tabs.length;
    else next = (current - direction + tabs.length) % tabs.length;
    selectTab(tabs[next].dataset.tab, true);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu')) setMenu(false, false);
    document.querySelectorAll('[data-split-menu]:not([hidden])').forEach((menu) => {
      if (!event.target.closest('.split-control')) {
        menu.hidden = true;
        menu.parentElement.querySelector('[data-split-trigger]')?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!els.menu.hidden) {
      setMenu(false, false);
      els.menuButton.focus();
    }
    document.querySelectorAll('[data-split-menu]:not([hidden])').forEach((menu) => {
      menu.hidden = true;
      const trigger = menu.parentElement.querySelector('[data-split-trigger]');
      trigger?.setAttribute('aria-expanded', 'false');
      trigger?.focus();
    });
  });

  els.componentMenu.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    cycleFocus(els.componentMenu, event.key);
  });

  window.addEventListener('popstate', () => {
    parseHash();
    if (!componentOptions[state.component].colors.includes(state.color)) state.color = componentOptions[state.component].defaultColor;
    renderPage();
  });

  async function boot() {
    await loadComponents();
    state.component = config.component;
    parseHash();
    state.color = componentOptions[state.component]?.defaultColor || 'brand';
    writeHash(true);
    renderPage();
  }
  boot().catch((error) => { els.panel.innerHTML = `<p class="doc-error">${t('docsError')} (${escapeHtml(String(error.message || error))})</p>`; });
})();
