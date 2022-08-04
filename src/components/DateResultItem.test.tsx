import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { DateResultItem, DateResultItemProps } from './DateResultItem';

const props: DateResultItemProps = {
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

describe('DateResultItem', () => {
  test('コンポーネントの描画', async () => {
    const mockOpen = jest.spyOn(window, 'open');

    render(<DateResultItem props={props} />);

    expect(screen.getByTestId('dateResultItem__title').textContent).toBe(props.title);
    expect(screen.getByTestId('dateResultItem__kana').textContent).toBe(props.kana);
    expect(screen.getByTestId('dateResultItem__value').textContent).toBe(props.value);
    expect(screen.getByTestId('dateResultItem__summary1').textContent).toBe(props.summary1);
    expect(screen.getByTestId('dateResultItem__summary2').textContent).toBe(props.summary2);
    expect(screen.getByTestId('dateResultItem__balloon').textContent).toBe(props.balloon);
    expect(screen.getByTestId('dateResultItem__icon').getAttribute('src')).toBe(props.icon);
    expect(screen.getByTestId('dateResultItem__image').getAttribute('src')).toBe(props.image);

    act(() => {
      fireEvent.click(screen.getByTestId('dateResultItem__actionArea'));
    });
    await waitFor(() => expect(mockOpen).toBeCalledWith(props.url, '_blank'));
  });
});
