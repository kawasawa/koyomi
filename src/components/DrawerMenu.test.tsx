import { render, screen } from '@testing-library/react';

import { DrawerMenu } from './DrawerMenu';

describe('DrawerMenu', () => {
  test('コンポーネントの描画', () => {
    render(<DrawerMenu anchor="left" />);
    expect(screen.getByTestId('drawerMenu__button')).toBeVisible();
    expect(screen.queryByTestId('drawerMenu__list')).toBeNull();
  });

  test('コンポーネントの描画(ドロワー展開)', () => {
    render(<DrawerMenu anchor="left" />);
    screen.getByTestId('drawerMenu__button').click();
    expect(screen.getByTestId('drawerMenu__list')).toBeVisible();
  });
});
