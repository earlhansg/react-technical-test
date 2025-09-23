// MetricCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MetricCard from '../components/Layout/MetricCard';
import type { MetricData } from '../types';

// Mock data for testing
const mockMetricData: MetricData = {
  label: 'Wasted spend (last 30 days)',
  value: '$2,539.45',
  subtitle: 'Test subtitle',
  linkText: 'View all'
};

const mockMetricDataWithoutLink: MetricData = {
  label: 'Spend (last 30 days)',
  value: '$40,492',
  subtitle: 'No link here'
};

describe('MetricCard', () => {
  it('renders all required elements correctly', () => {
    render(<MetricCard {...mockMetricData} />);

    expect(screen.getByText('Wasted spend (last 30 days)')).toBeInTheDocument();
    expect(screen.getByText('$2,539.45')).toBeInTheDocument();
    expect(screen.getByText('View all')).toBeInTheDocument();
  });

  it('renders without link text when linkText is not provided', () => {
    render(<MetricCard {...mockMetricDataWithoutLink} />);

    expect(screen.getByText('Spend (last 30 days)')).toBeInTheDocument();
    expect(screen.getByText('$40,492')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeInTheDocument(); // Button is always rendered
  });

  it('applies correct CSS classes and styling', () => {
    render(<MetricCard {...mockMetricData} />);

    const container = screen.getByText('Wasted spend (last 30 days)').parentElement;
    expect(container).toHaveClass('p-4');

    const label = screen.getByText('Wasted spend (last 30 days)');
    expect(label).toHaveClass('text-sm', 'text-[#68737D]', 'mb-1');

    const value = screen.getByText('$2,539.45');
    expect(value).toHaveClass('text-2xl', 'font-semibold', 'text-[#212936]');

    const linkButton = screen.getByText('View all');
    expect(linkButton).toHaveClass('text-sm', 'text-[#418D8E]', 'ml-2', 'cursor-pointer', 'font-medium');
  });

  it('renders button element with correct attributes', () => {
    render(<MetricCard {...mockMetricData} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View all');
    expect(button).toHaveClass('cursor-pointer');
  });

  it('handles empty linkText gracefully', () => {
    const dataWithEmptyLink = { ...mockMetricData, linkText: '' };
    render(<MetricCard {...dataWithEmptyLink} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  it('handles undefined linkText', () => {
    const dataWithUndefinedLink = { ...mockMetricData };
    delete dataWithUndefinedLink.linkText;
    
    render(<MetricCard {...dataWithUndefinedLink} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('button is clickable', async () => {
    const user = userEvent.setup();
    render(<MetricCard {...mockMetricData} />);

    const button = screen.getByRole('button', { name: 'View all' });
    
    // Test that button can be clicked (no onClick handler in component, but should be clickable)
    await user.click(button);
    expect(button).toBeInTheDocument(); // Button should still be there after click
  });

  it('renders with different metric values correctly', () => {
    const numericMetric: MetricData = {
      label: 'All insights',
      value: '18',
      subtitle: '',
      linkText: 'View all'
    };

    render(<MetricCard {...numericMetric} />);

    expect(screen.getByText('All insights')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('View all')).toBeInTheDocument();
  });

  it('handles long label text', () => {
    const longLabelData: MetricData = {
      label: 'This is a very long label that might wrap to multiple lines',
      value: '$1,000',
      subtitle: 'Test',
      linkText: 'Click here'
    };

    render(<MetricCard {...longLabelData} />);

    expect(screen.getByText('This is a very long label that might wrap to multiple lines')).toBeInTheDocument();
  });

  it('handles special characters in value', () => {
    const specialCharData: MetricData = {
      label: 'Special Value',
      value: '$2,539.45 (±5%)',
      subtitle: 'With special chars',
      linkText: 'View → all'
    };

    render(<MetricCard {...specialCharData} />);

    expect(screen.getByText('$2,539.45 (±5%)')).toBeInTheDocument();
    expect(screen.getByText('View → all')).toBeInTheDocument();
  });

  it('maintains proper layout structure', () => {
    render(<MetricCard {...mockMetricData} />);

    // Check that flex container exists
    const flexContainer = screen.getByText('$2,539.45').parentElement;
    expect(flexContainer).toHaveClass('flex', 'items-center');

    // Check that value and button are siblings in the flex container
    expect(flexContainer?.children).toHaveLength(2);
  });

  it('renders multiple MetricCards independently', () => {
    const { rerender } = render(<MetricCard {...mockMetricData} />);
    
    expect(screen.getByText('Wasted spend (last 30 days)')).toBeInTheDocument();
    
    rerender(<MetricCard {...mockMetricDataWithoutLink} />);
    
    expect(screen.getByText('Spend (last 30 days)')).toBeInTheDocument();
    expect(screen.queryByText('Wasted spend (last 30 days)')).not.toBeInTheDocument();
  });
});