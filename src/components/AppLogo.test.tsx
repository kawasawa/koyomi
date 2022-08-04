import { render, screen } from '@testing-library/react';

import { AppLogo } from './AppLogo';

describe('AppLogo', () => {
  test('コンポーネントの描画', () => {
    render(<AppLogo className="" />);
    expect(screen.getByTestId('applogo__image')).toBeVisible();
    expect(screen.getByTestId('applogo__title')).toBeVisible();
  });
});
