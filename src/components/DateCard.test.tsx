import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { DateCard, DateCardProps } from './DateCard';

const props: DateCardProps = {
  title: 'test-title',
  value: 'test-value',
  kana: 'test-kana',
  summary1: 'test-summary1',
  summary2: 'test-summary2',
  balloon: 'test-balloon',
  url: 'test-url',
  icon: 'test-icon',
  image: 'test-image',
};

describe('DateCard', () => {
  const originalWindow = { ...window };

  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: () => jest.fn(),
      unobserve: () => jest.fn(),
      disconnect: () => jest.fn(),
    }));
  });

  afterEach(() => {
    window.IntersectionObserver = originalWindow.IntersectionObserver;
  });

  test('コンポーネントの描画', async () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<DateCard {...props} />);

    expect(screen.getByTestId('dateCard__title').textContent).toBe(props.title);
    expect(screen.getByTestId('dateCard__kana').textContent).toBe(props.kana);
    expect(screen.getByTestId('dateCard__value').textContent).toBe(props.value);
    expect(screen.getByTestId('dateCard__summary1').textContent).toBe(props.summary1);
    expect(screen.getByTestId('dateCard__summary2').textContent).toBe(props.summary2);
    expect(screen.getByTestId('dateCard__balloon').textContent).toBe(props.balloon);
    expect(screen.getByTestId('dateCard__icon').getAttribute('src')).toBe(props.icon);
    expect(screen.getByTestId('dateCard__image').getAttribute('src')).toBe(props.image);

    act(() => {
      fireEvent.click(screen.getByTestId('dateCard__actionArea'));
    });
    await waitFor(() => expect(mockOpen).toBeCalledWith(props.url, '_blank'));
  });
});
