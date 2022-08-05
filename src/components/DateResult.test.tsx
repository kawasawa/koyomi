import { render, screen } from '@testing-library/react';

import { DateResult } from './DateResult';

jest.mock('./DateResultItem', () => ({
  DateResultItem: () => <div data-testid="dataResultItem"></div>,
}));

describe('DateResult', () => {
  test('コンポーネントの描画', () => {
    const date = new Date('1888/01/01');
    render(<DateResult date={date} />);

    expect(screen.queryByTestId('dataResult__alert')).toBeNull();
    expect(screen.getByTestId('dataResult__items')).toBeVisible();
    expect(screen.getByTestId('dataResult__items').childNodes.length).toBe(15);
  });

  test('東京地方時の警告', () => {
    const date = new Date('1887/12/31');
    render(<DateResult date={date} />);

    expect(screen.getByTestId('dataResult__alert')).toBeVisible();
  });
});
