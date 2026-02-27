import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import { HammingDistancePage } from '../HammingDistancePage';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <HammingDistancePage />
    </BrowserRouter>,
  );
};

describe('HammingDistancePage', () => {
  test('初期状態でkarolinとkathrinが入力され、計算できる', async () => {
    // Arrange
    const user = userEvent.setup();
    renderComponent();

    // Act
    const button = screen.getByRole('button', { name: /計算する/i });
    await user.click(button);

    // Assert
    expect(await screen.findByText(/距離 = 3/i)).toBeInTheDocument();

    const diffBadges = screen.getAllByText('diff');
    expect(diffBadges).toHaveLength(3);
  });

  test('文字列の長さが異なる場合にエラーメッセージが表示され、計算ボタンが無効になる', async () => {
    // Arrange
    const user = userEvent.setup();
    renderComponent();

    // Act
    const inputA = screen.getByLabelText(/文字列 A/i);
    await user.clear(inputA);
    await user.type(inputA, 'karo');

    // Assert
    expect(await screen.findByText('2つの文字列の長さが一致しません')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /計算する/i });
    expect(button).toBeDisabled();
  });
});
