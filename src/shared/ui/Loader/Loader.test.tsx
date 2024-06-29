import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './index';

describe('App', () => {
  it('Component loader should render correctly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
