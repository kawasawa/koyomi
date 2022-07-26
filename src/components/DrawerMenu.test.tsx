import { render, screen } from '@testing-library/react';

import { DrawerMenu } from './DrawerMenu';

describe('DrawerMenu', () => {
  test('コンポーネントの描画', () => {
    render(<DrawerMenu anchor="left" />);
    expect(screen.getByTestId('menu-button')).toBeVisible();
    expect(screen.queryByTestId('menu-list')).toBeNull();
  });

  test('コンポーネントの描画(ドロワー展開)', () => {
    render(<DrawerMenu anchor="left" />);
    screen.getByTestId('menu-button').click();
    expect(screen.getByTestId('menu-list')).toBeVisible();
  });
});
