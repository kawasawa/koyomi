import { render, screen } from '@testing-library/react';

import { DateInput } from './DateInput';

describe('DateInput', () => {
  test('コンポーネントの描画', () => {
    render(<DateInput initialDate={new Date()} />);
    expect(screen.getByTestId('dateInput__picker')).toBeVisible();
  });
});
