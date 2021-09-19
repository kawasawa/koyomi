import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

import Router from './Router';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Switch: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Route: (props: RouteProps) => <div data-testid={`${props.path}`}>{JSON.stringify(props)}</div>,
}));

describe('Router', () => {
  const getTestName = () => expect.getState().currentTestName.split(' ')[1];

  test('/:date?', () => {
    const path = getTestName();
    render(<Router />);

    const props = JSON.parse(screen.getByTestId(path).textContent!) as RouteProps;
    expect(props.path).toBe(path);
    expect(props.exact).toBe(true);
  });
});
