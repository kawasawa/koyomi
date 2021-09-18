import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';

import Top from './Top';
import { LOG_E_INVALID_FORMAT, LOG_E_OUT_OF_RANGE } from '../constant';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: () => ({ push: jest.fn() }),
}));

jest.mock('../components/DateInput', () => {
  return () => <div data-testid="date-input"></div>;
});

jest.mock('../components/DateResult', () => {
  return () => <div data-testid="date-result"></div>;
});

jest.mock('../components/Copyright', () => {
  return () => <div data-testid="copyright"></div>;
});

describe('Top', () => {
  let spyUseParams: jest.SpyInstance;
  let spyConsoleInfo: jest.SpyInstance;
  let spyConsoleError: jest.SpyInstance;

  beforeAll(() => {
    spyUseParams = jest.spyOn(ReactRouterDom, 'useParams');
    spyConsoleInfo = jest.spyOn(global.console, 'info').mockImplementation((_) => _);
    spyConsoleError = jest.spyOn(global.console, 'error').mockImplementation((_) => _);
  });

  afterEach(() => {
    spyUseParams.mockClear();
    spyConsoleInfo.mockClear();
    spyConsoleError.mockClear();
  });

  test('コンポーネントの描画(日付指定なし)', () => {
    const date: string | undefined = undefined;
    spyUseParams.mockReturnValue({ date });
    render(<Top />);

    expect(screen.getByTestId('date-input')).toBeVisible();
    expect(screen.getByTestId('date-result')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();

    expect(spyConsoleError).not.toBeCalled();
  });

  test('コンポーネントの描画(日付指定あり)', () => {
    const date = '2021-01-01';
    spyUseParams.mockReturnValue({ date });
    render(<Top />);

    expect(screen.getByTestId('date-input')).toBeVisible();
    expect(screen.getByTestId('date-result')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();

    expect(spyConsoleError).not.toBeCalled();
    expect(spyConsoleInfo.mock.calls[0][0]).toContain(date);
  });

  test('日付の書式不正', () => {
    const date = 'yyyy-MM-dd';
    spyUseParams.mockReturnValue({ date });
    render(<Top />);

    expect(spyConsoleError).toBeCalled();
    expect(spyConsoleError.mock.calls[0][0]).toContain(LOG_E_INVALID_FORMAT);
  });

  test('日付の下限値超過', () => {
    const date = '1867-12-31';
    spyUseParams.mockReturnValue({ date });
    render(<Top />);

    expect(spyConsoleError).toBeCalled();
    expect(spyConsoleError.mock.calls[0][0]).toContain(LOG_E_OUT_OF_RANGE);
  });

  test('日付の上限値超過', () => {
    const date = '2100-01-01';
    spyUseParams.mockReturnValue({ date });
    render(<Top />);

    expect(spyConsoleError).toBeCalled();
    expect(spyConsoleError.mock.calls[0][0]).toContain(LOG_E_OUT_OF_RANGE);
  });
});
