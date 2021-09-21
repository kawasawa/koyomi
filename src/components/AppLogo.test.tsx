import { render, screen } from '@testing-library/react';

import AppLogo from './AppLogo';

describe('AppLogo', () => {
  test('コンポーネントの描画', () => {
    render(<AppLogo className="" />);
    expect(screen.getByTestId('app-logo')).toBeVisible();
    expect(screen.getByTestId('app-title')).toBeVisible();
  });
});
