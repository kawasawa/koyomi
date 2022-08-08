import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  test('コンポーネントの描画', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer__copyright')).toBeVisible();
  });
});
