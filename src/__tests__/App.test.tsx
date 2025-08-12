import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Basic smoke test

describe('App', () => {
  it('renders header brand', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText(/EcoCart/)).toBeInTheDocument();
  });
});
