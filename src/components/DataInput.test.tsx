import { render, screen } from '@testing-library/react';

import { DateInput } from './DateInput';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({ date: new Date() }),
}));

describe('DateInput', () => {
  test('コンポーネントの描画', () => {
    render(<DateInput />);
    expect(screen.getByTestId('date-picker')).toBeVisible();
  });
});
