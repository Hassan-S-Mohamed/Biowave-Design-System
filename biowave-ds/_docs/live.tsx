// Live React preview for the docs (npm start). Loaded by _docs/live.html inside an iframe on every Web component page.
// Renders the REAL components from 3-web-components/src — no copies, no demo CSS. Demo labels only live here.
// URL: live.html?component=<name>&lang=en|ar&theme=light|dark|system&color=<color>
// The parent page (viewer.js) posts { type: 'biowave:prefs', lang, theme, color } on every change; we post back our height.
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import AddRounded from '@mui/icons-material/AddRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import EditRounded from '@mui/icons-material/EditRounded';
import PushPinRounded from '@mui/icons-material/PushPinRounded';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import {
  BiowaveProvider,
  Button,
  ButtonGroup,
  IconButton,
  SplitButton,
  TextField,
  type ButtonColor,
  type ThemePreference,
} from '../3-web-components/src';

type Lang = 'en' | 'ar';
interface Prefs { component: string; lang: Lang; theme: ThemePreference; color: string }

const copy = {
  en: {
    save: 'Save changes', cancel: 'Cancel', next: 'Next', add: 'Add user', delete: 'Delete',
    edit: 'Edit device', pin: 'Pin', export: 'Export report', excel: 'Export as Excel', csv: 'Export as CSV', pdf: 'Export as PDF',
    more: 'More actions', loading: 'Saving…',
    variants: 'Variants', sizes: 'Sizes', states: 'States', icons: 'Icons', toggle: 'Toggle', layouts: 'Layouts',
    email: 'Email', name: 'Full name', notes: 'Notes', search: 'Search devices', code: 'Employee ID',
    helper: 'We send the sign-in link here.', errorText: 'Enter a valid email address.', notesHelper: 'Visible to admins only.',
    disabled: 'Disabled', readOnly: 'Read-only', unknown: 'No live React component for this page yet.',
  },
  ar: {
    save: 'حفظ التغييرات', cancel: 'إلغاء', next: 'التالي', add: 'إضافة مستخدم', delete: 'حذف',
    edit: 'تعديل الجهاز', pin: 'تثبيت', export: 'تصدير التقرير', excel: 'تصدير Excel', csv: 'تصدير CSV', pdf: 'تصدير PDF',
    more: 'إجراءات أخرى', loading: 'جارٍ الحفظ…',
    variants: 'الأنماط', sizes: 'الأحجام', states: 'الحالات', icons: 'الأيقونات', toggle: 'تبديل', layouts: 'التخطيطات',
    email: 'البريد الإلكتروني', name: 'الاسم الكامل', notes: 'ملاحظات', search: 'البحث في الأجهزة', code: 'الرقم الوظيفي',
    helper: 'نرسل رابط تسجيل الدخول إلى هنا.', errorText: 'أدخل بريداً إلكترونياً صحيحاً.', notesHelper: 'يظهر للمسؤولين فقط.',
    disabled: 'معطّل', readOnly: 'للقراءة فقط', unknown: 'لا يوجد مكوّن React مباشر لهذه الصفحة بعد.',
  },
} as const;

const sizes = ['sm', 'md', 'lg'] as const;
const noTonal = ['neutral', 'inverse'];

function Row({ title, children, column }: { title: string; children: React.ReactNode; column?: boolean }) {
  return (
    <section style={{ display: 'grid', gap: 'var(--bw-spacing-sm)' }}>
      <h3 style={{ margin: 0, font: 'inherit', fontSize: 'var(--bw-font-size-label-sm)', fontWeight: 600, color: 'var(--bw-color-text-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 'var(--bw-spacing-md)', alignItems: column ? 'stretch' : 'center' }}>{children}</div>
    </section>
  );
}

function ButtonDemo({ t, color }: { t: (typeof copy)[Lang]; color: ButtonColor }) {
  const [loading, setLoading] = React.useState(false);
  const run = () => { setLoading(true); window.setTimeout(() => setLoading(false), 1600); };
  return (
    <>
      <Row title={t.variants}>
        {(['filled', 'tonal', 'outlined', 'text'] as const).map((v) => (
          <Button key={v} variant={noTonal.includes(color) && v === 'tonal' ? 'outlined' : v} color={color}>{t.save}</Button>
        ))}
      </Row>
      <Row title={t.sizes}>{sizes.map((s) => <Button key={s} size={s} color={color}>{t.save}</Button>)}</Row>
      <Row title={t.icons}>
        <Button color={color} startIcon={<AddRounded />}>{t.add}</Button>
        <Button color={color} variant="outlined" endIcon={<ArrowForwardRounded className="bw-icon-directional" />}>{t.next}</Button>
      </Row>
      <Row title={t.states}>
        <Button color={color} loading={loading} loadingLabel={t.loading} onClick={run}>{t.save}</Button>
        <Button color={color} disabled>{t.disabled}</Button>
      </Row>
    </>
  );
}

function IconButtonDemo({ t, color }: { t: (typeof copy)[Lang]; color: ButtonColor }) {
  const [pinned, setPinned] = React.useState(false);
  return (
    <>
      <Row title={t.variants}>
        {(['filled', 'tonal', 'outlined', 'text'] as const).map((v) => (
          <IconButton key={v} variant={noTonal.includes(color) && v === 'tonal' ? 'outlined' : v} color={color} icon={<EditRounded />} label={t.edit} />
        ))}
      </Row>
      <Row title={t.sizes}>{sizes.map((s) => <IconButton key={s} size={s} variant="outlined" color={color} icon={<EditRounded />} label={t.edit} />)}</Row>
      <Row title={t.toggle}>
        <IconButton toggle selected={pinned} onClick={() => setPinned((p) => !p)} variant="tonal" color={noTonal.includes(color) ? 'brand' : color} icon={<PushPinOutlined />} selectedIcon={<PushPinRounded />} label={t.pin} />
      </Row>
      <Row title={t.states}>
        <IconButton color={color} variant="filled" loading loadingLabel={t.loading} icon={<DeleteOutlineRounded />} label={t.delete} />
        <IconButton color={color} variant="filled" disabled icon={<DeleteOutlineRounded />} label={t.delete} />
      </Row>
    </>
  );
}

function SplitButtonDemo({ t, color }: { t: (typeof copy)[Lang]; color: string }) {
  const c = (['brand', 'secondary', 'neutral'].includes(color) ? color : 'brand') as 'brand' | 'secondary' | 'neutral';
  const options = [{ label: t.excel, onSelect: () => {} }, { label: t.csv, onSelect: () => {} }, { label: t.pdf, onSelect: () => {}, disabled: true }];
  return (
    <>
      <Row title={t.variants}>
        {(['filled', 'tonal', 'outlined'] as const).map((v) => (
          <SplitButton key={v} variant={c === 'neutral' && v === 'tonal' ? 'outlined' : v} color={c} options={options} menuLabel={t.more} onClick={() => {}}>{t.export}</SplitButton>
        ))}
      </Row>
      <Row title={t.sizes}>{sizes.map((s) => <SplitButton key={s} size={s} color={c} options={options} menuLabel={t.more} onClick={() => {}}>{t.export}</SplitButton>)}</Row>
      <Row title={t.states}>
        <SplitButton color={c} startIcon={<AddRounded />} options={options} menuLabel={t.more} onClick={() => {}}>{t.add}</SplitButton>
        <SplitButton color={c} disabled options={options} menuLabel={t.more} onClick={() => {}}>{t.disabled}</SplitButton>
      </Row>
    </>
  );
}

function ButtonGroupDemo({ t }: { t: (typeof copy)[Lang] }) {
  return (
    <>
      <Row title={t.layouts}>
        <ButtonGroup aria-label={t.save}>
          <Button variant="outlined" color="neutral">{t.cancel}</Button>
          <Button>{t.save}</Button>
        </ButtonGroup>
        <ButtonGroup aria-label={t.export} maxVisible={2} overflowLabel={t.more}>
          <Button variant="text" color="neutral">{t.delete}</Button>
          <Button variant="outlined" color="neutral">{t.cancel}</Button>
          <Button>{t.save}</Button>
        </ButtonGroup>
      </Row>
      <Row title={t.sizes}>
        {sizes.map((s) => (
          <ButtonGroup key={s} size={s} aria-label={t.save}>
            <Button variant="outlined" color="neutral">{t.cancel}</Button>
            <Button>{t.save}</Button>
          </ButtonGroup>
        ))}
      </Row>
      <Row title="vertical · fill" column>
        <ButtonGroup orientation="vertical" aria-label={t.save}>
          <Button variant="outlined" color="neutral">{t.cancel}</Button>
          <Button>{t.save}</Button>
        </ButtonGroup>
        <ButtonGroup align="fill" aria-label={t.save}>
          <Button variant="outlined" color="neutral">{t.cancel}</Button>
          <Button>{t.save}</Button>
        </ButtonGroup>
      </Row>
    </>
  );
}

function TextFieldDemo({ t }: { t: (typeof copy)[Lang] }) {
  const [email, setEmail] = React.useState('hassan@biowave');
  const invalid = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--bw-spacing-lg)', inlineSize: '100%' };
  return (
    <>
      <Row title={t.states}>
        <div style={grid}>
          <TextField label={t.name} placeholder={t.name} required />
          <TextField label={t.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={invalid} helperText={invalid ? t.errorText : t.helper} />
          <TextField label={t.search} hideLabel placeholder={t.search} startAdornment={<SearchRounded />} />
          <TextField label={t.code} defaultValue="BW-10428" readOnly helperText={t.readOnly} />
          <TextField label={t.code} defaultValue="BW-10428" disabled helperText={t.disabled} />
          <TextField label={t.notes} multiline minRows={3} maxLength={120} showCounter helperText={t.notesHelper} />
        </div>
      </Row>
      <Row title={t.sizes}>
        <div style={grid}>{sizes.map((s) => <TextField key={s} size={s} label={`${t.name} · ${s}`} placeholder={t.name} />)}</div>
      </Row>
    </>
  );
}

function Showcase({ prefs }: { prefs: Prefs }) {
  const t = copy[prefs.lang];
  const color = (prefs.color || 'brand') as ButtonColor;
  const inverse = color === 'inverse';
  const demos: Record<string, React.ReactNode> = {
    button: <ButtonDemo t={t} color={color} />,
    'icon-button': <IconButtonDemo t={t} color={color} />,
    'split-button': <SplitButtonDemo t={t} color={color} />,
    'button-group': <ButtonGroupDemo t={t} />,
    'text-field': <TextFieldDemo t={t} />,
  };
  return (
    <main style={{
      display: 'grid', gap: 'var(--bw-spacing-xl)', padding: 'var(--bw-spacing-xl)', fontFamily: 'var(--bw-font-family)',
      background: inverse ? 'var(--bw-color-background-inverse-default)' : 'transparent', borderRadius: 'var(--bw-radius-xl)',
    }}>
      {demos[prefs.component] ?? <p style={{ margin: 0 }}>{t.unknown}</p>}
    </main>
  );
}

function readPrefs(): Prefs {
  const q = new URLSearchParams(window.location.search);
  const lang = q.get('lang') === 'ar' ? 'ar' : 'en';
  const theme = (['light', 'dark', 'system'].includes(q.get('theme') || '') ? q.get('theme') : 'light') as ThemePreference;
  return { component: q.get('component') || 'button', lang, theme, color: q.get('color') || 'brand' };
}

function App() {
  const [prefs, setPrefs] = React.useState<Prefs>(readPrefs);
  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'biowave:prefs') return;
      setPrefs((p) => ({ ...p, ...event.data.prefs }));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
  // BiowaveProvider sets <html lang/dir> and MUI writes <html data-theme>, which tokens.css follows.
  return (
    <BiowaveProvider locale={prefs.lang} theme={prefs.theme}>
      <Showcase prefs={prefs} />
    </BiowaveProvider>
  );
}

// Tell the docs page how tall we are so the iframe never scrolls.
const report = () => window.parent?.postMessage({ type: 'biowave:live-height', height: document.documentElement.scrollHeight }, window.location.origin);
new ResizeObserver(report).observe(document.body);

createRoot(document.getElementById('live-root')!).render(<App />);
