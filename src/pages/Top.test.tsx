import { render, screen } from '@testing-library/react';
import * as ReactToastify from 'react-toastify';
import * as ReactRouterDom from 'react-router-dom';

import { Top } from './Top';

const mockUseHistoryPush = jest.fn();
const mockUseTranslationT = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: () => ({ push: mockUseHistoryPush }),
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useParams: jest.fn(),
  useTranslation: () => [mockUseTranslationT],
}));

jest.mock('../components', () => ({
  Header: () => <div data-testid="mock__header"></div>,
  Footer: () => <div data-testid="mock__footer"></div>,
  DateCard: () => <div data-testid="mock__datecard"></div>,
}));

describe('Top', () => {
  const originalWindow = { ...window };
  const spyToastInfo = jest.spyOn(ReactToastify.toast, 'info');
  const spyUseParams = jest.spyOn(ReactRouterDom, 'useParams');

  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({ observe: () => jest.fn() }));
  });

  afterEach(() => {
    window.IntersectionObserver = originalWindow.IntersectionObserver;
    spyToastInfo.mockClear();
    spyUseParams.mockClear();
    mockUseHistoryPush.mockClear();
  });

  test('日付の指定がない場合、正常にコンポーネントが表示されること', () => {
    const date: string | undefined = undefined;
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(screen.getByTestId('mock__header')).toBeVisible();
    expect(screen.getByTestId('mock__footer')).toBeVisible();
    expect(screen.getByTestId('top_contents')).toBeVisible();
    expect(screen.queryByTestId('top__alert--age')).toBeNull();
    expect(screen.queryByTestId('top__alert--tokyoLocalTime')).toBeNull();
    expect(spyToastInfo).not.toBeCalled();
    expect(mockUseHistoryPush).not.toBeCalled();
  });

  test('日本標準時の期間で指定された場合、正常にコンポーネントが表示されること', () => {
    const date = '1888-01-01';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(screen.getByTestId('mock__header')).toBeVisible();
    expect(screen.getByTestId('mock__footer')).toBeVisible();
    expect(screen.getByTestId('top_contents')).toBeVisible();
    expect(screen.getByTestId('top__alert--age')).toBeVisible();
    expect(screen.queryByTestId('top__alert--tokyoLocalTime')).toBeNull();
    expect(spyToastInfo).not.toBeCalled();
    expect(mockUseHistoryPush).not.toBeCalled();
  });

  test('東京地方時の期間で指定された場合、アラートが表示されること', () => {
    const date = '1887-12-31';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(screen.getByTestId('mock__header')).toBeVisible();
    expect(screen.getByTestId('mock__footer')).toBeVisible();
    expect(screen.getByTestId('top_contents')).toBeVisible();
    expect(screen.getByTestId('top__alert--age')).toBeVisible();
    expect(screen.getByTestId('top__alert--tokyoLocalTime')).toBeVisible();

    expect(spyToastInfo).not.toBeCalled();
    expect(mockUseHistoryPush).not.toBeCalled();
  });

  test('日付の書式不正', () => {
    const date = 'yyyy-MM-dd';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(spyToastInfo).toBeCalled();
    expect(mockUseHistoryPush).toBeCalled();
  });

  test('日付の下限値超過', () => {
    const date = '1867-12-31';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(spyToastInfo).toBeCalled();
    expect(mockUseHistoryPush).toBeCalled();
  });

  test('日付の上限値超過', () => {
    const date = '2100-01-01';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(spyToastInfo).toBeCalled();
    expect(mockUseHistoryPush).toBeCalled();
  });
});
