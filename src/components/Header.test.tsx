import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

describe('Header', () => {
  test('コンポーネントの描画', async () => {
    render(
      <Header>
        <div data-testid="header__children"></div>
      </Header>
    );
    expect(screen.getByTestId('header__applogo--icon')).toBeDefined();
    expect(screen.getByTestId('header__applogo--title')).toBeDefined();
    expect(screen.getByTestId('header__children')).toBeVisible();
  });
});
