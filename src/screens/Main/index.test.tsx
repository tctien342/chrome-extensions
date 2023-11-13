import { render, screen } from '@testing-library/react';

import { MainScreen } from './index';

test('renders learn react link', () => {
  render(<MainScreen />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});
