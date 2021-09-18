import { render, screen } from '@testing-library/react';

import Copyright from './Copyright';

describe('Copyright', () => {
  test('コンポーネントの描画', () => {
    render(<Copyright />);
    expect(screen.getByTestId('copyright')).toBeVisible();
    expect(screen.getByTestId('crator-page-url')).toBeVisible();
  });
});
