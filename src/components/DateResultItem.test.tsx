import { render, screen } from '@testing-library/react';

import DateResultItem, { DateResultItemProps } from './DateResultItem';

describe('DateResultItem', () => {
  test('コンポーネントの描画', () => {
    const props: DateResultItemProps = {
      title: 'test-title-001',
      value: 'test-value-001',
      kana: 'test-kana-001',
      summary1: 'test-summary1-001',
      summary2: 'test-summary2-001',
      balloon: 'test-balloon-001',
      url: 'test-url-001',
      icon: 'test-icon-001',
      image: 'test-image-001',
    };
    render(<DateResultItem props={props} />);

    expect(screen.getByTestId('data-result-title').textContent).toBe(props.title);
    expect(screen.getByTestId('data-result-kana').textContent).toBe(props.kana);
    expect(screen.getByTestId('data-result-value').textContent).toBe(props.value);
    expect(screen.getByTestId('data-result-summary1').textContent).toBe(props.summary1);
    expect(screen.getByTestId('data-result-summary2').textContent).toBe(props.summary2);
    expect(screen.getByTestId('data-result-balloon').textContent).toBe(props.balloon);
    expect(screen.getByTestId('data-result-url').getAttribute('href')).toBe(props.url);
    expect(screen.getByTestId('data-result-icon').getAttribute('src')).toBe(props.icon);
    expect(screen.getByTestId('data-result-image').getAttribute('src')).toBe(props.image);
  });
});
