import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

describe('Header', () => {
  test('コンポーネントの描画', async () => {
    render(<Header date={new Date()} />);
    expect(screen.getByTestId('header__appicon')).toBeDefined();
    expect(screen.getByTestId('header__apptitle')).toBeDefined();
    expect(screen.getByTestId('header__datepicker')).toBeVisible();
  });
});
