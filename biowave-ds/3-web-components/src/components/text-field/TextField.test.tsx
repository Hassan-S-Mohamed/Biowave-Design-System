import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import componentTokenSource from '../../../components/text-field/text-field.tokens.json';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldLabelSource from './FieldLabel.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldSupportingSource from './FieldSupportingText.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import textFieldSource from './TextField.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './text-field.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { TextField } from './TextField';
import {
  textFieldSizeTokens,
  textFieldStateTokens,
  type TextFieldSize,
  type TextFieldState,
} from './text-field.tokens';

const sizes: TextFieldSize[] = ['sm', 'md', 'lg'];
const states: TextFieldState[] = [
  'default',
  'hover',
  'focus',
  'error',
  'disabled',
  'read-only',
];
const themes = ['light', 'dark'] as const;
const locales = ['en', 'ar'] as const;

interface TokenLeaf {
  $value: string;
}

type SourceSizeTokens = Record<
  | 'height'
  | 'padding-inline'
  | 'gap'
  | 'label-gap'
  | 'supporting-gap'
  | 'icon'
  | 'radius'
  | 'border-width',
  TokenLeaf
>;

type SourceStateTokens = Record<
  | 'background'
  | 'border'
  | 'border-width'
  | 'label'
  | 'input'
  | 'placeholder'
  | 'icon'
  | 'supporting'
  | 'counter'
  | 'required',
  TokenLeaf
>;

const source = componentTokenSource['text-field'] as unknown as {
  size: Record<TextFieldSize, SourceSizeTokens>;
  state: Record<TextFieldState, SourceStateTokens>;
};

function cssVariable({ $value }: TokenLeaf): string {
  return `var(--bw-${$value.slice(1, -1).replaceAll('.', '-')})`;
}

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // The test environment has no readable cross-origin stylesheets.
    }
  }
  return rules.join('\n');
}

describe('TextField token contract', () => {
  it('matches every component-token alias', () => {
    for (const size of sizes) {
      const expected = source.size[size];
      expect(textFieldSizeTokens[size]).toMatchObject({
        height: cssVariable(expected.height),
        paddingInline: cssVariable(expected['padding-inline']),
        gap: cssVariable(expected.gap),
        labelGap: cssVariable(expected['label-gap']),
        supportingGap: cssVariable(expected['supporting-gap']),
        icon: cssVariable(expected.icon),
        radius: cssVariable(expected.radius),
        borderWidth: cssVariable(expected['border-width']),
      });
    }

    for (const state of states) {
      const expected = source.state[state];
      expect(textFieldStateTokens[state]).toEqual({
        background: cssVariable(expected.background),
        border: cssVariable(expected.border),
        borderWidth: cssVariable(expected['border-width']),
        label: cssVariable(expected.label),
        input: cssVariable(expected.input),
        placeholder: cssVariable(expected.placeholder),
        icon: cssVariable(expected.icon),
        supporting: cssVariable(expected.supporting),
        counter: cssVariable(expected.counter),
        required: cssVariable(expected.required),
      });
    }
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    for (const sourceText of [
      textFieldSource,
      fieldLabelSource,
      fieldSupportingSource,
      tokenMapSource,
    ]) {
      expect(sourceText).not.toMatch(rawValue);
    }
  });
});

describe('TextField rendering and semantics', () => {
  it('renders every size and type in both themes and languages', () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <>
            {sizes.flatMap((size) => [
              <TextField key={`${size}-input`} label={`${size} input`} size={size} />,
              <TextField
                key={`${size}-area`}
                label={`${size} area`}
                size={size}
                multiline
              />,
            ])}
          </>,
          { theme, locale },
        );

        expect(view.container.querySelectorAll('input')).toHaveLength(sizes.length);
        for (const size of sizes) {
          expect(screen.getByRole('textbox', { name: `${size} area` }).tagName).toBe(
            'TEXTAREA',
          );
        }
        expect(document.documentElement).toHaveAttribute('lang', locale);
        expect(document.documentElement).toHaveAttribute(
          'dir',
          locale === 'ar' ? 'rtl' : 'ltr',
        );
        view.unmount();
      }
    }
  });

  it('associates visible and hidden labels and keeps generated ids stable', async () => {
    const user = userEvent.setup();
    const view = renderWithBiowave(
      <>
        <TextField label="Work email" />
        <TextField label="Employee code" hideLabel />
      </>,
    );
    const email = screen.getByRole('textbox', { name: 'Work email' });
    const code = screen.getByRole('textbox', { name: 'Employee code' });
    const originalId = email.id;

    await user.click(screen.getByText('Work email'));
    expect(email).toHaveFocus();
    expect(code).toHaveAccessibleName('Employee code');

    view.rerender(
      <>
        <TextField label="Work email" />
        <TextField label="Employee code" hideLabel />
      </>,
    );
    expect(screen.getByRole('textbox', { name: 'Work email' })).toHaveAttribute('id', originalId);
  });

  it('links required, error, helper, counter, and caller descriptions', () => {
    renderWithBiowave(
      <>
        <span id="form-hint">All fields are required</span>
        <TextField
          id="email"
          label="Work email"
          required
          error
          helperText="Enter a valid work email"
          defaultValue="bad"
          maxLength={80}
          showCounter
          aria-describedby="form-hint"
        />
      </>,
    );
    const input = screen.getByRole('textbox', { name: 'Work email' });
    const counter = screen.getByText('3 / 80');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'form-hint email-supporting email-counter',
    );
    expect(counter).toHaveAttribute('dir', 'ltr');
    expect(counter).not.toHaveAttribute('aria-live');
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('updates an uncontrolled counter and counts Unicode code points', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <TextField
        label="Note"
        defaultValue="أ😀"
        maxLength={5}
        showCounter
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Note' });
    expect(screen.getByText('2 / 5')).toBeInTheDocument();

    await user.type(input, 'ب');
    expect(screen.getByText('3 / 5')).toBeInTheDocument();
    expect(input).toHaveValue('أ😀ب');
  });

  it('does not truncate a supplied controlled value', () => {
    renderWithBiowave(
      <TextField label="Code" value="123456" maxLength={4} showCounter onChange={() => {}} />,
    );
    expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('123456');
    expect(screen.getByText('6 / 4')).toBeInTheDocument();
  });

  it('preserves native disabled, read-only, multiline, and adornment behavior', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <>
        <TextField label="Disabled" disabled />
        <TextField label="Read only" readOnly defaultValue="Copy me" />
        <TextField
          label="Reason"
          multiline
          startAdornment={<MailOutlineRounded data-testid="mail-icon" />}
          endAdornment={<button type="button">Clear reason</button>}
        />
      </>,
      { locale: 'ar' },
    );
    const disabled = screen.getByRole('textbox', { name: 'Disabled' });
    const readOnly = screen.getByRole('textbox', { name: 'Read only' });
    const reason = screen.getByRole('textbox', { name: 'Reason' });

    expect(disabled).toBeDisabled();
    expect(readOnly).toHaveAttribute('readonly');
    expect(reason.tagName).toBe('TEXTAREA');
    expect(screen.getByTestId('mail-icon').parentElement).toHaveAttribute('aria-hidden', 'true');

    await user.tab();
    expect(readOnly).toHaveFocus();
    await user.tab();
    expect(reason).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Clear reason' })).toHaveFocus();
  });

  it('emits every state token, including focus and error-focus borders', () => {
    renderWithBiowave(
      <TextField
        label="Work email"
        error
        helperText="Enter a valid email"
        startAdornment={<MailOutlineRounded />}
      />,
    );
    const rules = allCssRules();

    for (const state of states) {
      expect(rules).toContain(textFieldStateTokens[state].background);
      expect(rules).toContain(textFieldStateTokens[state].border);
    }
    expect(rules).toContain(textFieldStateTokens.focus.borderWidth);
    expect(rules).toContain(textFieldStateTokens.error.border);
  });

  it('warns once for every invalid combination and applies fallbacks', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    renderWithBiowave(
      <>
        <TextField label="No limit" showCounter />
        <TextField label="Rows" rows={4} />
        <TextField label="Area type" multiline type="email" />
        <TextField label="Unavailable" disabled readOnly />
      </>,
    );

    expect(warn).toHaveBeenCalledTimes(4);
    expect(screen.queryByText(/\/ undefined/)).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Rows' }).tagName).toBe('INPUT');
    expect(screen.getByRole('textbox', { name: 'Area type' }).tagName).toBe('TEXTAREA');
    expect(screen.getByRole('textbox', { name: 'Unavailable' })).toBeDisabled();
    warn.mockRestore();
  });

  it('has no axe violations in both themes and languages', async () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <TextField
            label={locale === 'ar' ? 'البريد الإلكتروني للعمل' : 'Work email'}
            required
            error
            helperText={locale === 'ar' ? 'أدخل بريدًا صالحًا' : 'Enter a valid email'}
            maxLength={80}
            showCounter
          />,
          { theme, locale },
        );
        expect(
          (
            await axe(view.container, {
              rules: { 'color-contrast': { enabled: false } },
            })
          ).violations,
        ).toEqual([]);
        view.unmount();
      }
    }
  });
});
