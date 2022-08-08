import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

jest.mock('./AppLogo', () => ({
  AppLogo: () => <div data-testid="mock__applogo"></div>,
}));
jest.mock('./DrawerMenu', () => ({
  DrawerMenu: () => <div data-testid="mock__drawermenu"></div>,
}));

describe('Header', () => {
  test('コンポーネントの描画', () => {
    render(
      <Header>
        <div data-testid="header__children"></div>
      </Header>
    );
    expect(screen.getByTestId('mock__applogo')).toBeVisible();
    expect(screen.getByTestId('mock__drawermenu')).toBeVisible();
    expect(screen.getByTestId('header__children')).toBeVisible();
  });
});
