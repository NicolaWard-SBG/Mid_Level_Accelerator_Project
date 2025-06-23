import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../footer';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© Copyright by Code First Girls 2023/i);
    expect(footerElement).toBeInTheDocument();
  });

  test('displays the correct copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© Copyright by Code First Girls 2023/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('has the correct class name', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© Copyright by Code First Girls 2023/i);
    expect(footerElement).toHaveClass('footer');
  });
});