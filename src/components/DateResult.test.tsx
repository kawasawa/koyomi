import { render, screen } from '@testing-library/react';
import * as ReactRedux from 'react-redux';

import { DateResult } from './DateResult';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => jest.fn(),
}));

describe('DateResult', () => {
  const spyUseSelector = jest.spyOn(ReactRedux, 'useSelector');

  afterEach(() => {
    spyUseSelector.mockClear();
  });

  test('コンポーネントの描画', () => {
    const date = new Date('1888-01-01');
    spyUseSelector.mockReturnValue({ date });
    render(<DateResult />);

    expect(screen.queryByTestId('data-result-alert')).toBeNull();
    expect(screen.getByTestId('data-result-list')).toBeVisible();
    expect(screen.getByTestId('data-result-list').childNodes.length).toBe(15);
  });

  test('東京地方時の警告', () => {
    const date = new Date('1887-12-31');
    spyUseSelector.mockReturnValue({ date });
    render(<DateResult />);

    expect(screen.getByTestId('data-result-alert')).toBeVisible();
  });
});
