import { render, screen } from '@testing-library/react';
import * as ReactToastify from 'react-toastify';
import * as ReactRouterDom from 'react-router-dom';

import { getMoonIcon, getSeasonImage, getZodiacImage, Top } from './Top';
import JapaneseLunisolarCalendar from '../models/JapaneseLunisolarCalendar';

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

  test('二十四節気に該当する場合、正常にコンポーネントが表示されること', () => {
    const date = '2021-02-03';
    spyUseParams.mockReturnValue({ date });

    render(<Top />);

    expect(screen.getByTestId('mock__header')).toBeVisible();
    expect(screen.getByTestId('mock__footer')).toBeVisible();
    expect(screen.getByTestId('top_contents')).toBeVisible();
    //    expect(screen.queryByTestId('top__alert--age')).toBeNull();
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

describe('Methods', () => {
  const createDate = (year: number, month: number, day: number) => new Date(year, month - 1, day);

  const createLuna = (year: number, month: number, day: number) =>
    new JapaneseLunisolarCalendar(createDate(year, month, day));

  test('四季のイメージを取得', () => {
    expect(getSeasonImage('春')).toBeDefined();
    expect(getSeasonImage('夏')).toBeDefined();
    expect(getSeasonImage('秋')).toBeDefined();
    expect(getSeasonImage('冬')).toBeDefined();
    expect(() => getSeasonImage('')).toThrow(RangeError);
  });

  test('干支のイメージを取得', () => {
    expect(getZodiacImage('子')).toBeDefined();
    expect(getZodiacImage('丑')).toBeDefined();
    expect(getZodiacImage('寅')).toBeDefined();
    expect(getZodiacImage('卯')).toBeDefined();
    expect(getZodiacImage('辰')).toBeDefined();
    expect(getZodiacImage('巳')).toBeDefined();
    expect(getZodiacImage('午')).toBeDefined();
    expect(getZodiacImage('未')).toBeDefined();
    expect(getZodiacImage('申')).toBeDefined();
    expect(getZodiacImage('酉')).toBeDefined();
    expect(getZodiacImage('戌')).toBeDefined();
    expect(getZodiacImage('亥')).toBeDefined();
    expect(() => getZodiacImage('')).toThrow(RangeError);
  });

  test('月のアイコンを取得', () => {
    expect(getMoonIcon(createLuna(2021, 1, 1).lunaAge)).toBeDefined();
  });
});
