import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditRounded from '@mui/icons-material/EditRounded';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { cssVars } from '@biowave/foundations';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import componentSource from './ButtonGroup.tsx?raw';
// @ts-expect-error Vite's raw loader supplies source text in tests.
import contextSource from './ButtonGroupContext.ts?raw';
import { renderWithBiowave } from '../../test/render';
import { Button } from '../button/Button';
import { buttonSizeTokens } from '../button/button.tokens';
import { IconButton } from '../icon-button/IconButton';
import { SplitButton } from '../split-button/SplitButton';
import {
  ButtonGroup,
  type ButtonGroupAlign,
  type ButtonGroupOrientation,
} from './ButtonGroup';

const orientations: ButtonGroupOrientation[] = ['horizontal', 'vertical'];
const aligns: ButtonGroupAlign[] = ['start', 'center', 'end', 'space-between', 'fill'];
const locales = ['en', 'ar'] as const;

function allCssRules(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) rules.push(rule.cssText);
    } catch {
      // The test environment has no cross-origin stylesheets.
    }
  }
  return rules.join('\n');
}

function cssRulesFor(element: Element, cssText = allCssRules()): string {
  const selectors = Array.from(element.classList)
    .filter((className) => className.startsWith('bw-'))
    .map((className) => `.${className}`);
  return cssText
    .split('\n')
    .filter((rule) => selectors.some((selector) => rule.includes(selector)))
    .join('\n');
}

describe('ButtonGroup layout', () => {
  it('renders each orientation and alignment in English and Arabic', () => {
    for (const locale of locales) {
      for (const orientation of orientations) {
        for (const align of aligns) {
          const view = renderWithBiowave(
            <ButtonGroup
              orientation={orientation}
              align={orientation === 'horizontal' ? align : undefined}
              aria-label="Actions"
            >
              <Button variant="outlined">Cancel</Button>
              <Button>Save</Button>
            </ButtonGroup>,
            { locale },
          );
          const group = screen.getByRole('group', { name: 'Actions' });
          const rules = cssRulesFor(group);
          expect(rules).toContain(cssVars.spacing.md);
          expect(rules).toContain(
            orientation === 'vertical' ? 'flex-direction: column-reverse' : 'flex-direction: row',
          );
          expect(document.documentElement.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr');
          view.unmount();
        }
      }
    }
  });

  it('uses group semantics only when an accessible label is provided', () => {
    const view = renderWithBiowave(
      <ButtonGroup>
        <Button variant="outlined">Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );
    expect(screen.queryByRole('group')).not.toBeInTheDocument();

    view.rerender(
      <ButtonGroup aria-label="Dialog actions">
        <Button variant="outlined">Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'Dialog actions' })).toBeInTheDocument();
  });

  it('applies the group size to Button, IconButton, and SplitButton children', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    renderWithBiowave(
      <ButtonGroup size="lg" aria-label="Actions">
        <Button size="sm" variant="outlined">Cancel</Button>
        <IconButton size="sm" icon={<EditRounded />} label="Edit" tooltip={false} />
        <SplitButton
          size="sm"
          variant="outlined"
          onClick={vi.fn()}
          options={[
            { label: 'One', onSelect: vi.fn() },
            { label: 'Two', onSelect: vi.fn() },
          ]}
        >
          Export
        </SplitButton>
      </ButtonGroup>,
    );

    for (const button of screen.getAllByRole('button')) {
      expect(cssRulesFor(button)).toContain(buttonSizeTokens.lg.height);
    }
    expect(warn.mock.calls.flat().join(' ')).toContain('the group size wins');
    warn.mockRestore();
  });

  it('keeps DOM and focus order while reversing only vertical visual order', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <ButtonGroup orientation="vertical" aria-label="Actions">
        <Button variant="outlined">Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group', { name: 'Actions' });
    expect(cssRulesFor(group)).toContain('flex-direction: column-reverse');
    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'Cancel',
      'Save',
    ]);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  });

  it('contains no raw colors, dimensions, durations, or font names', () => {
    const rawValue = /#[0-9a-f]{3,8}\b|\d+px|\d+ms|\bInter\b|\bIBM Plex\b/i;
    expect(componentSource).not.toMatch(rawValue);
    expect(contextSource).not.toMatch(rawValue);
  });
});

describe('ButtonGroup overflow', () => {
  it('moves the least-important Button and IconButton actions into the menu', async () => {
    const user = userEvent.setup();
    const edit = vi.fn();
    const cancel = vi.fn();
    renderWithBiowave(
      <ButtonGroup maxVisible={2} aria-label="Actions">
        <IconButton icon={<EditRounded />} label="Edit" onClick={edit} tooltip={false} />
        <Button variant="outlined" onClick={cancel}>Cancel</Button>
        <Button variant="outlined">Preview</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );

    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'More options' });
    expect(screen.getAllByRole('button').map((button) => button.getAttribute('aria-label') ?? button.textContent)).toEqual([
      'More options',
      'Preview',
      'Save',
    ]);

    await user.click(trigger);
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(edit).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(trigger).toHaveFocus());

    await user.click(trigger);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it('uses the localized default overflow label', () => {
    renderWithBiowave(
      <ButtonGroup maxVisible={1}>
        <Button variant="outlined">إلغاء</Button>
        <Button>حفظ</Button>
      </ButtonGroup>,
      { locale: 'ar' },
    );
    expect(screen.getByRole('button', { name: 'خيارات أخرى' })).toBeInTheDocument();
  });

  it('opens the overflow at the last item with ArrowUp', async () => {
    const user = userEvent.setup();
    renderWithBiowave(
      <ButtonGroup maxVisible={1}>
        <Button variant="outlined">First</Button>
        <Button variant="outlined">Second</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );
    const trigger = screen.getByRole('button', { name: 'More options' });
    trigger.focus();
    await user.keyboard('{ArrowUp}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Second' })).toHaveFocus());
  });
});

describe('ButtonGroup validation and accessibility', () => {
  it('warns for each invalid combination and keeps non-overflowable children visible', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    renderWithBiowave(
      <ButtonGroup orientation="vertical" align="space-between" size="sm" maxVisible={1}>
        <SplitButton
          onClick={vi.fn()}
          options={[
            { label: 'One', onSelect: vi.fn() },
            { label: 'Two', onSelect: vi.fn() },
          ]}
        >
          Export
        </SplitButton>
        <Button size="lg">First</Button>
        <Button>Second</Button>
      </ButtonGroup>,
    );
    const warnings = warn.mock.calls.flat().join(' ');
    expect(warnings).toContain('no more than one child');
    expect(warnings).toContain('supports at most 2 children');
    expect(warnings).toContain('align is ignored');
    expect(warnings).toContain('the group size wins');
    expect(warnings).toContain('keeping this child visible');
    expect(screen.getByRole('group', { name: 'Export' })).toBeInTheDocument();
    warn.mockRestore();
  });

  it('has no axe violations in light/dark and English/Arabic', async () => {
    for (const theme of ['light', 'dark'] as const) {
      for (const locale of locales) {
        const view = renderWithBiowave(
          <ButtonGroup aria-label="Actions">
            <Button variant="outlined">Cancel</Button>
            <Button>Save</Button>
          </ButtonGroup>,
          { theme, locale },
        );
        expect(
          (await axe(view.container, { rules: { 'color-contrast': { enabled: false } } })).violations,
        ).toEqual([]);
        view.unmount();
      }
    }
  }, 20_000);
});
