import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BarChart from '../components/Layout/BarChart';
import type { ChartData } from '../types';

// Mock data for testing
const mockChartData: ChartData[] = [
  { week: '2-8 Sep', value: 300 },
  { week: '9-15 Sep', value: 450 },
  { week: 'Last week', value: 200 },
  { week: 'This week', value: 250 }
];

const singleDataPoint: ChartData[] = [
  { week: 'Week 1', value: 100 }
];

const emptyData: ChartData[] = [];

const highValueData: ChartData[] = [
  { week: 'Week 1', value: 1000 },
  { week: 'Week 2', value: 800 },
  { week: 'Week 3', value: 1200 }
];

describe('BarChart', () => {
  it('renders chart title correctly', () => {
    render(<BarChart data={mockChartData} title="Weekly Revenue" />);

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Weekly Revenue')).toBeInTheDocument();
  });

  it('renders all data points with correct week labels', () => {
    render(<BarChart data={mockChartData} title="Test Chart" />);

    expect(screen.getByText('2-8 Sep')).toBeInTheDocument();
    expect(screen.getByText('9-15 Sep')).toBeInTheDocument();
    expect(screen.getByText('Last week')).toBeInTheDocument();
    expect(screen.getByText('This week')).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    render(<BarChart data={mockChartData} title="Test Chart" />);

    const container = screen.getByText('Test Chart').closest('div');
    expect(container).toHaveClass('bg-white', 'p-6', 'rounded-sm', 'shadow-sm');
  });

  it('applies correct CSS classes to title', () => {
    render(<BarChart data={mockChartData} title="Test Chart" />);

    const title = screen.getByText('Test Chart');
    expect(title).toHaveClass('text-lg', 'font-medium', 'text-[#212936]', 'mb-6');
  });

  it('renders Y-axis labels correctly', () => {
    render(<BarChart data={mockChartData} title="Test Chart" />);

    expect(screen.getByText('$800')).toBeInTheDocument();
    expect(screen.getByText('$600')).toBeInTheDocument();
    expect(screen.getByText('$400')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders correct number of bar elements', () => {
    const { container } = render(<BarChart data={mockChartData} title="Test Chart" />);

    // Each data point should have 2 divs (light background + dark foreground)
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    const darkBars = container.querySelectorAll('.bg-\\[\\#9B1C1C\\]');

    expect(lightBars).toHaveLength(4); // 4 data points
    expect(darkBars).toHaveLength(4); // 4 data points
  });

  it('calculates bar heights correctly based on max value', () => {
    const { container } = render(<BarChart data={mockChartData} title="Test Chart" />);

    // Max value is 450, so heights should be relative to this
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    
    // Check that bars have height styles applied
    expect(lightBars[0]).toHaveStyle('height: 66.66666666666666%'); // 300/450 * 100
    expect(lightBars[1]).toHaveStyle('height: 100%'); // 450/450 * 100 (max value)
    expect(lightBars[2]).toHaveStyle('height: 44.44444444444444%'); // 200/450 * 100
    expect(lightBars[3]).toHaveStyle('height: 55.55555555555556%'); // 250/450 * 100
  });

  it('dark bars are 80% of light bar heights', () => {
    const { container } = render(<BarChart data={mockChartData} title="Test Chart" />);

    const darkBars = container.querySelectorAll('.bg-\\[\\#9B1C1C\\]');
    
    // Dark bars should be 80% of the light bar heights
    expect(darkBars[0]).toHaveStyle('height: 53.33333333333333%'); // (300/450 * 100) * 0.8
    expect(darkBars[1]).toHaveStyle('height: 80%'); // (450/450 * 100) * 0.8
    expect(darkBars[2]).toHaveStyle('height: 35.55555555555556%'); // (200/450 * 100) * 0.8
    expect(darkBars[3]).toHaveStyle('height: 44.44444444444444%'); // (250/450 * 100) * 0.8
  });

  it('handles single data point correctly', () => {
    render(<BarChart data={singleDataPoint} title="Single Point Chart" />);

    expect(screen.getByText('Week 1')).toBeInTheDocument();
    
    const { container } = render(<BarChart data={singleDataPoint} title="Single Point Chart" />);
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    const darkBars = container.querySelectorAll('.bg-\\[\\#9B1C1C\\]');

    expect(lightBars).toHaveLength(1);
    expect(darkBars).toHaveLength(1);
    
    // Single point should be 100% height
    expect(lightBars[0]).toHaveStyle('height: 100%');
    expect(darkBars[0]).toHaveStyle('height: 80%');
  });

  it('handles empty data gracefully', () => {
    const { container } = render(<BarChart data={emptyData} title="Empty Chart" />);

    expect(screen.getByText('Empty Chart')).toBeInTheDocument();
    
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    const darkBars = container.querySelectorAll('.bg-\\[\\#9B1C1C\\]');

    expect(lightBars).toHaveLength(0);
    expect(darkBars).toHaveLength(0);
  });

  it('handles high values correctly', () => {
    const { container } = render(<BarChart data={highValueData} title="High Values Chart" />);

    // Max value is 1200
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    
    expect(lightBars[0]).toHaveStyle('height: 83.33333333333334%'); // 1000/1200 * 100
    expect(lightBars[1]).toHaveStyle('height: 66.66666666666666%'); // 800/1200 * 100
    expect(lightBars[2]).toHaveStyle('height: 100%'); // 1200/1200 * 100
  });

  it('applies correct bar styling classes', () => {
    const { container } = render(<BarChart data={mockChartData} title="Test Chart" />);

    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');
    const darkBars = container.querySelectorAll('.bg-\\[\\#9B1C1C\\]');

    // Check light bar classes
    lightBars.forEach(bar => {
      expect(bar).toHaveClass('w-12', 'bg-[#FBD5D5]', 'rounded-sm', 'mb-1');
    });

    // Check dark bar classes
    darkBars.forEach(bar => {
      expect(bar).toHaveClass('w-12', 'bg-[#9B1C1C]', 'rounded-sm', 'absolute', 'bottom-0');
    });
  });

  it('week labels have correct styling', () => {
    render(<BarChart data={mockChartData} title="Test Chart" />);

    const weekLabels = [
      screen.getByText('2-8 Sep'),
      screen.getByText('9-15 Sep'),
      screen.getByText('Last week'),
      screen.getByText('This week')
    ];

    weekLabels.forEach(label => {
      expect(label).toHaveClass('text-xs', 'text-[#68737D]', 'mt-2');
    });
  });

  it('maintains proper chart structure and layout', () => {
    const { container } = render(<BarChart data={mockChartData} title="Test Chart" />);

    // Check main chart container
    const chartContainer = container.querySelector('.flex.items-end.space-x-8.h-48.pl-8');
    expect(chartContainer).toBeInTheDocument();

    // Check Y-axis container
    const yAxisContainer = container.querySelector('.absolute.left-0.top-0.h-40');
    expect(yAxisContainer).toBeInTheDocument();
  });

  it('handles zero values correctly', () => {
    const zeroValueData: ChartData[] = [
      { week: 'Week 1', value: 0 },
      { week: 'Week 2', value: 100 }
    ];

    const { container } = render(<BarChart data={zeroValueData} title="With Zero" />);
    const lightBars = container.querySelectorAll('.bg-\\[\\#FBD5D5\\]');

    // Zero value should result in 0% height, 100 should be 100%
    expect(lightBars[0]).toHaveStyle('height: 0%');
    expect(lightBars[1]).toHaveStyle('height: 100%');
  });

  it('handles different title lengths', () => {
    const longTitle = "This is a very long chart title that might wrap to multiple lines";
    render(<BarChart data={mockChartData} title={longTitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('renders with custom week labels', () => {
    const customData: ChartData[] = [
      { week: 'Q1 2024', value: 300 },
      { week: 'Q2 2024', value: 450 }
    ];

    render(<BarChart data={customData} title="Quarterly Data" />);

    expect(screen.getByText('Q1 2024')).toBeInTheDocument();
    expect(screen.getByText('Q2 2024')).toBeInTheDocument();
  });
});