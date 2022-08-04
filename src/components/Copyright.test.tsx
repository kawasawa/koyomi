import { render, screen } from '@testing-library/react';

import { Copyright } from './Copyright';

describe('Copyright', () => {
  test('コンポーネントの描画', () => {
    render(<Copyright />);
    expect(screen.getByTestId('copyright__area')).toBeVisible();
    expect(screen.getByTestId('copyright__url')).toBeVisible();
  });
});
