import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { PalindromePage } from '../PalindromePage';

describe('PalindromePage', () => {
  it('should render page title and input elements', () => {
    render(<PalindromePage />);
    expect(screen.getByRole('heading', { name: /Palindrome/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /ターゲット文字列/i })).toBeInTheDocument();
  });

  it('should process palindrome correctly and show result', async () => {
    const user = userEvent.setup();
    render(<PalindromePage />);

    const input = screen.getByRole('textbox', { name: /ターゲット文字列/i });

    // Clear initial input
    await user.clear(input);
    await user.type(input, 'madam');

    // Verify result is shown
    expect(await screen.findByText(/判定 = 回文/i)).toBeInTheDocument();
  });

  it('should process non-palindrome correctly and show result', async () => {
    const user = userEvent.setup();
    render(<PalindromePage />);

    const input = screen.getByRole('textbox', { name: /ターゲット文字列/i });

    await user.clear(input);
    await user.type(input, 'hello');

    // Verify result is shown
    expect(await screen.findByText(/判定 = 非回文/i)).toBeInTheDocument();
  });
});
