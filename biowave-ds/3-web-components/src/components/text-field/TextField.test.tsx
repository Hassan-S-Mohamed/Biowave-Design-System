import * as React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import componentTokenSource from '../../../components/text-field/text-field.tokens.json';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldActionSource from './FieldAction.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldAddonSource from './FieldAddon.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldLabelSource from './FieldLabel.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import fieldSupportingSource from './FieldSupportingText.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import textFieldSource from './TextField.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import tokenMapSource from './text-field.tokens.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Icon, type MaterialSymbol } from '../icon';
import { TextField } from './TextField';
import {
  textFieldSizeTokens,
  textFieldStateTokens,
  textFieldTargetToken,
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

function symbol(name: MaterialSymbol, testId?: string) {
  return <Icon name={name} data-testid={testId} />;
}

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
  | 'border-width'
  | 'action-box'
  | 'action-inset',
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
  | 'required'
  | 'addon-background'
  | 'addon-text'
  | 'error-icon',
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
        actionBox: cssVariable(expected['action-box']),
        actionInset: cssVariable(expected['action-inset']),
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
        addonBackground: cssVariable(expected['addon-background']),
        addonText: cssVariable(expected['addon-text']),
        errorIcon: cssVariable(expected['error-icon']),
      });
    }
  });

  it('contains no raw colors, dimensions, durations, or font names in any field source', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    for (const sourceText of [
      fieldActionSource,
      fieldAddonSource,
      fieldLabelSource,
      fieldSupportingSource,
      textFieldSource,
      tokenMapSource,
    ]) {
      expect(sourceText).not.toMatch(rawValue);
      expect(sourceText).not.toContain('@mui/icons-material');
    }
    expect(textFieldSource).toContain("from '../icon'");
    expect(fieldLabelSource).toContain("from '../icon'");
    expect(fieldSupportingSource).toContain("from '../icon'");
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
              <TextField key={`${size}-area`} label={`${size} area`} size={size} multiline />,
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

  it('associates labels, keeps generated ids stable, and routes aria to the input', async () => {
    const user = userEvent.setup();
    const view = renderWithBiowave(
      <>
        <TextField
          label="Work email"
          aria-errormessage="email-error"
          aria-label="Company email"
          data-testid="email-field"
        />
        <TextField label="Employee code" hideLabel />
      </>,
    );
    const email = screen.getByRole('textbox', { name: 'Company email' });
    const code = screen.getByRole('textbox', { name: 'Employee code' });
    const originalId = email.id;
    const root = screen.getByTestId('email-field');

    expect(email).toHaveAttribute('aria-errormessage', 'email-error');
    expect(root).not.toHaveAttribute('aria-label');
    expect(root).not.toHaveAttribute('aria-errormessage');
    await user.click(screen.getByText('Work email'));
    expect(email).toHaveFocus();
    expect(code).toHaveAccessibleName('Employee code');

    view.rerender(
      <>
        <TextField
          label="Work email"
          aria-errormessage="email-error"
          aria-label="Company email"
          data-testid="email-field"
        />
        <TextField label="Employee code" hideLabel />
      </>,
    );
    expect(screen.getByRole('textbox', { name: 'Company email' })).toHaveAttribute(
      'id',
      originalId,
    );
  });

  it('links required, error, helper, counter, prefix, suffix, and caller descriptions', () => {
    const { container } = renderWithBiowave(
      <>
        <span id="form-hint">All fields are required</span>
        <TextField
          id="rate"
          label="Hourly rate"
          required
          error
          helperText="Enter a valid rate"
          defaultValue="42"
          maxLength={80}
          showCounter
          prefix="USD"
          suffix="SAR"
          aria-describedby="form-hint"
        />
      </>,
    );
    const input = screen.getByRole('textbox', { name: 'Hourly rate' });
    const counter = screen.getByText('2 / 80');
    const errorIcon = container.querySelector('.bw-text-field__error-icon');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'form-hint rate-supporting rate-counter rate-prefix rate-suffix',
    );
    expect(counter).toHaveAttribute('dir', 'ltr');
    expect(counter).not.toHaveAttribute('aria-live');
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(errorIcon).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.bw-text-field__prefix')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(container.querySelector('.bw-text-field__suffix')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('counts Unicode code points, preserves controlled values, and resets uncontrolled counters', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <form aria-label="note form">
        <TextField label="Note" defaultValue="أ😀" maxLength={5} showCounter />
        <button type="reset">Reset form</button>
      </form>,
    );
    const input = screen.getByRole('textbox', { name: 'Note' });
    expect(screen.getByText('2 / 5')).toBeInTheDocument();

    await user.type(input, 'ب');
    expect(screen.getByText('3 / 5')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset form' }));
    await waitFor(() => expect(screen.getByText('2 / 5')).toBeInTheDocument());
    expect(input).toHaveValue('أ😀');

    const controlled = renderWithBiowave(
      <TextField label="Code" value="123456" maxLength={4} showCounter onChange={() => {}} />,
    );
    expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('123456');
    expect(screen.getByText('6 / 4')).toBeInTheDocument();
    controlled.unmount();
  });

  it('preserves native disabled, read-only, multiline, resize, and decorative icon behavior', async () => {
    const user = userEvent.setup();
    const { container } = renderWithBiowave(
      <>
        <TextField label="Disabled" disabled />
        <TextField label="Read only" readOnly defaultValue="Copy me" />
        <TextField
          label="Reason"
          multiline
          resize="none"
          startAdornment={symbol('mail', 'mail-icon')}
          endAdornment={symbol('search', 'search-icon')}
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
    expect(screen.getByTestId('search-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(getComputedStyle(reason).resize).toBe('none');
    expect(readOnly.closest('.bw-text-field__field')).toHaveAttribute(
      'data-read-only',
      'true',
    );

    await user.tab();
    expect(readOnly).toHaveFocus();
    await user.tab();
    expect(reason).toHaveFocus();
  });

  it('ties hover, focus, error-focus, read-only, and disabled-required colors to their rules', () => {
    const { container } = renderWithBiowave(
      <>
        <TextField label="Error" error helperText="Fix this" startAdornment={symbol('mail')} />
        <TextField label="Disabled" disabled required />
        <TextField label="Read only" readOnly />
      </>,
    );
    const rules = allCssRules();
    const disabledRequired = screen.getAllByText('*')[0];

    expect(rules).toContain(':hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)');
    expect(rules).toContain(textFieldStateTokens.hover.border);
    expect(rules).toContain('.Mui-focused.Mui-error');
    expect(rules).toContain(textFieldStateTokens.focus.borderWidth);
    expect(rules).toContain(textFieldStateTokens.error.border);
    expect(rules).toContain(textFieldStateTokens['read-only'].border);
    expect(getComputedStyle(disabledRequired).color).toBe(
      textFieldStateTokens.disabled.required,
    );
    expect(container.querySelector('.bw-text-field__leading-icon')).not.toHaveStyle({
      color: textFieldStateTokens.error.errorIcon,
    });
  });
});

describe('TextField managed actions and add-ons', () => {
  it('sizes and insets the managed action for every field size at both review viewports', () => {
    const originalWidth = window.innerWidth;

    for (const viewport of [980, 1280]) {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: viewport });
      for (const size of sizes) {
        const view = renderWithBiowave(
          <TextField
            label={`${viewport}-${size}`}
            size={size}
            action={{ icon: symbol('search'), label: `Search ${size}`, onClick: () => {} }}
          />,
        );
        const action = screen.getByRole('button', { name: `Search ${size}` });
        const field = view.container.querySelector('.bw-text-field__field');
        const actionStyle = getComputedStyle(action);

        expect(actionStyle.inlineSize).toBe(textFieldSizeTokens[size].actionBox);
        expect(actionStyle.blockSize).toBe(textFieldSizeTokens[size].actionBox);
        expect(allCssRules()).toContain(textFieldTargetToken);
        expect(field).toBeInTheDocument();
        view.unmount();
      }
    }

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
  });

  it('disables field actions and end buttons while leaving help reachable', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <TextField
        label="Invite link"
        helpText="Share this URL"
        disabled
        action={{ icon: symbol('search'), label: 'Inspect', onClick: () => {} }}
        endButton={{ label: 'Copy', onClick: () => {} }}
      />,
    );
    const help = screen.getByRole('button', { name: 'More information about Invite link' });
    const action = screen.getByRole('button', { name: 'Inspect' });
    const endButton = screen.getByRole('button', { name: 'Copy' });

    expect(action).toBeDisabled();
    expect(endButton).toBeDisabled();
    expect(help).toBeEnabled();
    await user.tab();
    expect(help).toHaveFocus();
    await user.tab();
    expect(help).not.toHaveFocus();
  });

  it('clears controlled and uncontrolled values, fires callbacks, and retains focus', async () => {
    const user = userEvent.setup();
    const uncontrolledChange = vi.fn();
    const uncontrolledClear = vi.fn();
    const uncontrolled = renderWithBiowave(
      <TextField
        label="Search"
        defaultValue="Hassan"
        clearable
        onChange={uncontrolledChange}
        onClear={uncontrolledClear}
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Clear Search' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(uncontrolledChange).toHaveBeenCalledTimes(1);
    expect(uncontrolledClear).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: 'Clear Search' })).not.toBeInTheDocument();
    uncontrolled.unmount();

    const controlledChange = vi.fn();
    const controlledClear = vi.fn();
    function ControlledField() {
      const [fieldValue, setFieldValue] = React.useState('Wave');
      return (
        <TextField
          label="Controlled"
          value={fieldValue}
          clearable
          onChange={(event) => {
            controlledChange(event.currentTarget.value);
            setFieldValue(event.currentTarget.value);
          }}
          onClear={controlledClear}
        />
      );
    }
    renderWithBiowave(<ControlledField />);
    const controlledInput = screen.getByRole('textbox', { name: 'Controlled' });
    await user.click(screen.getByRole('button', { name: 'Clear Controlled' }));
    expect(controlledInput).toHaveValue('');
    expect(controlledInput).toHaveFocus();
    expect(controlledChange).toHaveBeenCalledWith('');
    expect(controlledClear).toHaveBeenCalledTimes(1);
  });

  it('hides clear when empty, read-only, or disabled', () => {
    renderWithBiowave(
      <>
        <TextField label="Empty" clearable />
        <TextField label="Read only" clearable readOnly value="Value" />
        <TextField label="Disabled" clearable disabled value="Value" />
      </>,
    );
    expect(screen.queryByRole('button', { name: /Clear/ })).not.toBeInTheDocument();
  });

  it('toggles password visibility, pressed state, localized label, and caret position', async () => {
    const user = userEvent.setup();
    renderWithBiowave(<TextField label="Password" type="password" defaultValue="secret" />);
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    act(() => {
      input.focus();
      input.setSelectionRange(1, 4);
    });
    const show = screen.getByRole('button', { name: 'Show password' });

    expect(input).toHaveAttribute('type', 'password');
    expect(show).toHaveAttribute('aria-pressed', 'false');
    await user.click(show);
    const hide = screen.getByRole('button', { name: 'Hide password' });
    expect(input).toHaveAttribute('type', 'text');
    expect(hide).toHaveAttribute('aria-pressed', 'true');
    expect(input).toHaveFocus();
    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(4);
  });

  it('opens help on focus and hover, links its content, and closes on Escape', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <TextField label="Work email" helpText="We send shift reminders here" />,
    );
    const help = screen.getByRole('button', {
      name: 'More information about Work email',
    });
    expect(help).toHaveAttribute('aria-describedby');

    await user.hover(help);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('We send shift reminders here');
    await user.unhover(help);
    await user.tab();
    expect(help).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('focuses the input from decorative icons and attached add-ons', () => {
    const { container } = renderWithBiowave(
      <TextField
        label="Website"
        prefix="https://"
        suffix=".com"
        startAdornment={symbol('mail')}
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Website' });
    const targets = [
      container.querySelector('.bw-text-field__leading-icon'),
      container.querySelector('.bw-text-field__prefix'),
      container.querySelector('.bw-text-field__suffix'),
    ];

    for (const target of targets) {
      act(() => input.blur());
      fireEvent.mouseDown(target as Element);
      expect(input).toHaveFocus();
    }
  });

  it('aligns multiline actions to the first line and keeps add-on text isolated in RTL', () => {
    const { container } = renderWithBiowave(
      <>
        <TextField
          label="Notes"
          multiline
          action={{ icon: symbol('search'), label: 'Search notes', onClick: () => {} }}
        />
        <TextField label="Rate" prefix="USD" suffix="SAR" showCounter maxLength={20} />
      </>,
      { locale: 'ar' },
    );
    const action = screen.getByRole('button', { name: 'Search notes' });
    const prefix = container.querySelector('.bw-text-field__prefix');
    const suffix = container.querySelector('.bw-text-field__suffix');

    expect(getComputedStyle(action).alignSelf).toBe('flex-start');
    expect(getComputedStyle(action).marginBlockStart).toContain('calc');
    expect(prefix).toHaveAttribute('dir', 'ltr');
    expect(suffix).toHaveAttribute('dir', 'ltr');
    expect(screen.getByText('0 / 20')).toHaveAttribute('dir', 'ltr');
  });

  it('keeps keyboard order help, input, trailing action, then end button', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <TextField
        label="Invite link"
        helpText="Share this URL"
        action={{ icon: symbol('search'), label: 'Inspect', onClick: () => {} }}
        endButton={{ label: 'Copy', onClick: () => {} }}
      />,
    );

    await user.tab();
    expect(screen.getByRole('button', { name: 'More information about Invite link' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('textbox', { name: 'Invite link' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Inspect' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Copy' })).toHaveFocus();
  });

  it('warns once for every invalid combination and applies every fallback', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { container } = renderWithBiowave(
      <>
        <TextField label="No limit" showCounter />
        <TextField label="Rows" rows={4} resize="none" />
        <TextField label="Area type" multiline type="email" />
        <TextField label="Unavailable" disabled readOnly />
        <TextField
          label="Password priority"
          type="password"
          action={{ icon: symbol('search'), label: 'Custom', onClick: () => {} }}
          clearable
          endAdornment={symbol('mail', 'ignored-adornment')}
        />
        <TextField label="Area add-ons" multiline prefix="A" suffix="B" endButton={{ label: 'Go', onClick: () => {} }} />
        <TextField label="Suffix priority" suffix="SAR" endButton={{ label: 'Copy', onClick: () => {} }} />
        <TextField label={<span>Rich label</span>} helpText="Help" />
      </>,
    );

    expect(warn).toHaveBeenCalledTimes(9);
    expect(screen.queryByText(/\/ undefined/)).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Rows' }).tagName).toBe('INPUT');
    expect(screen.getByRole('textbox', { name: 'Area type' }).tagName).toBe('TEXTAREA');
    expect(screen.getByRole('textbox', { name: 'Unavailable' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Custom' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('ignored-adornment')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.bw-text-field__prefix')).toHaveLength(0);
    expect(container.querySelectorAll('.bw-text-field__suffix')).toHaveLength(0);
    expect(screen.queryByRole('button', { name: /More information/ })).not.toBeInTheDocument();
    warn.mockRestore();
  });
});

describe('TextField accessibility', () => {
  it('has no axe violations in both themes and languages', async () => {
    for (const theme of themes) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <TextField
            label={locale === 'ar' ? 'البريد الإلكتروني للعمل' : 'Work email'}
            required
            error
            helperText={locale === 'ar' ? 'أدخل بريدًا صالحًا' : 'Enter a valid email'}
            helpText={locale === 'ar' ? 'لن نشارك العنوان' : 'We will not share this address'}
            prefix="https://"
            maxLength={80}
            showCounter
            clearable
            defaultValue="invalid"
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
  }, 20_000);
});
