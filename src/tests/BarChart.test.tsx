import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BarChart from '../components/Layout/BarChart';
import type { ChartData } from '../types/ChartData';

// Mock the ResponsiveBar component from @nivo/bar
vi.mock('@nivo/bar', () => ({
  ResponsiveBar: vi.fn(({ data, keys, indexBy, colors, axisLeft, enableLabel, ariaLabel, barAriaLabel }) => (
    <div data-testid="responsive-bar" data-aria-label={ariaLabel}>
      <div data-testid="chart-keys">{keys?.join(',')}</div>
      <div data-testid="chart-indexby">{indexBy}</div>
      <div data-testid="chart-colors">{colors?.join(',')}</div>
      <div data-testid="chart-enable-label">{enableLabel?.toString()}</div>
      <div data-testid="y-axis-format">
        {axisLeft?.format ? axisLeft.format(400) : 'no-format'}
      </div>
      {data?.map((item: any, index: number) => (
        <div key={index} data-testid={`data-point-${index}`}>
          <span data-testid={`week-${index}`}>{item.week}</span>
          <span data-testid={`wasted-spend-${index}`}>{item.wastedSpend}</span>
          <span data-testid={`normal-spend-${index}`}>{item.normalSpend}</span>
        </div>
      ))}
    </div>
  ))
}));

const mockChartData: ChartData[] = [
  {
    week: "2-8 Sep",
    wastedSpend: 200,
    normalSpend: 400,
  },
  {
    week: "9-15 Sep",
    wastedSpend: 450,
    normalSpend: 300,
  },
  {
    week: "Last week",
    wastedSpend: 250,
    normalSpend: 200,
  },
  {
    week: "This week",
    wastedSpend: 200,
    normalSpend: 150,
  },
];

describe('BarChart', () => {
  it('renders chart title and ResponsiveBar component', () => {
    render(<BarChart chartData={mockChartData} title="Wasted spend by week" />);
    
    // Check title is rendered
    expect(screen.getByText('Wasted spend by week')).toBeInTheDocument();
    expect(screen.getByText('Wasted spend by week').tagName).toBe('H3');
    
    // Check ResponsiveBar is rendered
    const responsiveBar = screen.getByTestId('responsive-bar');
    expect(responsiveBar).toBeInTheDocument();
  });

  it('applies correct styling and passes correct chart configuration', () => {
    render(<BarChart chartData={mockChartData} title="Test Chart" />);
    
    // Check title styling
    const title = screen.getByText('Test Chart');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'text-[#212936]', 'mb-4');
    
    // Check chart configuration
    expect(screen.getByTestId('chart-keys')).toHaveTextContent('wastedSpend,normalSpend');
    expect(screen.getByTestId('chart-indexby')).toHaveTextContent('week');
    expect(screen.getByTestId('chart-colors')).toHaveTextContent('#9B1C1C,#FBD5D5');
    expect(screen.getByTestId('chart-enable-label')).toHaveTextContent('false');
  });

  it('formats Y-axis values with dollar sign and renders chart container with correct height', () => {
    const { container } = render(<BarChart chartData={mockChartData} title="Test Chart" />);
    
    // Check Y-axis formatting
    const yAxisFormat = screen.getByTestId('y-axis-format');
    expect(yAxisFormat).toHaveTextContent('$400');
    
    // Check container height
    const chartDiv = container.querySelector('div[style*="height: 400px"]');
    expect(chartDiv).toBeInTheDocument();
    expect(chartDiv).toHaveStyle('height: 400px');
  });

  it('renders all data points with correct values', () => {
    render(<BarChart chartData={mockChartData} title="Test Chart" />);
    
    // Check all data points are rendered
    const dataPoints = screen.getAllByTestId(/^data-point-/);
    expect(dataPoints).toHaveLength(4);

    // Check specific data values
    expect(screen.getByTestId('week-0')).toHaveTextContent('2-8 Sep');
    expect(screen.getByTestId('wasted-spend-0')).toHaveTextContent('200');
    expect(screen.getByTestId('normal-spend-0')).toHaveTextContent('400');

    expect(screen.getByTestId('week-1')).toHaveTextContent('9-15 Sep');
    expect(screen.getByTestId('wasted-spend-1')).toHaveTextContent('450');
    expect(screen.getByTestId('normal-spend-1')).toHaveTextContent('300');

    expect(screen.getByTestId('week-2')).toHaveTextContent('Last week');
    expect(screen.getByTestId('wasted-spend-2')).toHaveTextContent('250');
    expect(screen.getByTestId('normal-spend-2')).toHaveTextContent('200');

    expect(screen.getByTestId('week-3')).toHaveTextContent('This week');
    expect(screen.getByTestId('wasted-spend-3')).toHaveTextContent('200');
    expect(screen.getByTestId('normal-spend-3')).toHaveTextContent('150');
  });

  it('has correct accessibility attributes and validates data integrity', () => {
    render(<BarChart chartData={mockChartData} title="Test Chart" />);
    
    // Check accessibility
    const responsiveBar = screen.getByTestId('responsive-bar');
    expect(responsiveBar).toHaveAttribute('data-aria-label', 'Wasted spend by week chart');
    
    // Validate data integrity - check that totals match expected values
    const expectedTotals = [600, 750, 450, 350];
    
    for (let i = 0; i < 4; i++) {
      const wastedValue = parseInt(screen.getByTestId(`wasted-spend-${i}`).textContent || '0');
      const normalValue = parseInt(screen.getByTestId(`normal-spend-${i}`).textContent || '0');
      
      expect(wastedValue + normalValue).toBe(expectedTotals[i]);
      expect(wastedValue).toBeGreaterThan(0);
      expect(normalValue).toBeGreaterThan(0);
      
      // Ensure values are within chart's max scale (800)
      expect(wastedValue + normalValue).toBeLessThanOrEqual(800);
    }
  });
});