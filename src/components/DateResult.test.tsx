import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { DateResult, DateResultProps } from './DateResult';

const props: DateResultProps = {
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

describe('DateResult', () => {
  const originalWindow = { ...window };

  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({ observe: () => jest.fn() }));
  });

  afterEach(() => {
    window.IntersectionObserver = originalWindow.IntersectionObserver;
  });

  test('コンポーネントの描画', async () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<DateResult props={props} />);

    expect(screen.getByTestId('dateResult__title').textContent).toBe(props.title);
    expect(screen.getByTestId('dateResult__kana').textContent).toBe(props.kana);
    expect(screen.getByTestId('dateResult__value').textContent).toBe(props.value);
    expect(screen.getByTestId('dateResult__summary1').textContent).toBe(props.summary1);
    expect(screen.getByTestId('dateResult__summary2').textContent).toBe(props.summary2);
    expect(screen.getByTestId('dateResult__balloon').textContent).toBe(props.balloon);
    expect(screen.getByTestId('dateResult__icon').getAttribute('src')).toBe(props.icon);
    expect(screen.getByTestId('dateResult__image').getAttribute('src')).toBe(props.image);

    act(() => {
      fireEvent.click(screen.getByTestId('dateResult__actionArea'));
    });
    await waitFor(() => expect(mockOpen).toBeCalledWith(props.url, '_blank'));
  });
});
