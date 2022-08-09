import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

const mockUseTranslationT = jest.fn();

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useParams: jest.fn(),
  useTranslation: () => [mockUseTranslationT],
}));

jest.mock('./controls/JaDatePicker', () => ({
  JaDatePicker: () => <div data-testid="mock__datepicker"></div>,
}));

describe('Header', () => {
  test('コンポーネントの描画', async () => {
    render(<Header date={new Date()} />);
    expect(screen.getByTestId('header__appicon')).toBeDefined();
    expect(screen.getByTestId('header__apptitle')).toBeDefined();
    expect(screen.getByTestId('mock__datepicker')).toBeVisible();
  });
});
