import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountsTable from '../components/Layout/AccountsTable'; // Adjust path as needed
import type { AccountData } from '../types';

// Mock data for testing
const mockAccountsData: AccountData[] = [
  {
    name: 'Globex Corporation',
    insights: 8,
    wastedSpend: '$2,103.50',
    spend: '$3,013.56',
    conv: 305,
    cpa: '$103.43',
    roas: '2%'
  },
  {
    name: 'Soylent Corp',
    insights: 3,
    wastedSpend: '$428.50',
    spend: '$1,204.56',
    conv: 105,
    cpa: '$115.43',
    roas: '2%'
  }
];

const singleAccount: AccountData[] = [
  {
    name: 'Single Company',
    insights: 5,
    wastedSpend: '$1,000.00',
    spend: '$2,000.00',
    conv: 150,
    cpa: '$50.00',
    roas: '3%'
  }
];

const emptyAccounts: AccountData[] = [];

describe('AccountsTable', () => {
  it('renders table title correctly', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Accounts requiring attention')).toBeInTheDocument();
  });

  it('applies correct CSS classes to title', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const title = screen.getByText('Accounts requiring attention');
    expect(title).toHaveClass('text-lg', 'font-medium', 'text-[#212936]', 'p-6', 'pb-4');
  });

  it('renders all table headers correctly', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const expectedHeaders = [
      'Insights',
      'Wasted spend',
      'Spend',
      'Conv.',
      'CPA',
      'ROAS'
    ];

    expectedHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('applies correct styling to table headers', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const headers = screen.getAllByRole('columnheader');
    
    headers.forEach(header => {
      if (header.textContent && header.textContent.trim() !== '') {
        expect(header).toHaveClass(
          'px-6',
          'py-3',
          'text-left',
          'text-xs',
          'font-medium',
          'text-[#68737D]',
          'uppercase',
          'tracking-wider'
        );
      }
    });
  });

  it('renders all account data correctly', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    // Check account names
    expect(screen.getByText('Globex Corporation')).toBeInTheDocument();
    expect(screen.getByText('Soylent Corp')).toBeInTheDocument();

    // Check insights values
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Check wasted spend
    expect(screen.getByText('$2,103.50')).toBeInTheDocument();
    expect(screen.getByText('$428.50')).toBeInTheDocument();

    // Check spend
    expect(screen.getByText('$3,013.56')).toBeInTheDocument();
    expect(screen.getByText('$1,204.56')).toBeInTheDocument();

    // Check conversions
    expect(screen.getByText('305')).toBeInTheDocument();
    expect(screen.getByText('105')).toBeInTheDocument();

    // Check CPA
    expect(screen.getByText('$103.43')).toBeInTheDocument();
    expect(screen.getByText('$115.43')).toBeInTheDocument();

    // Check ROAS
    const roasElements = screen.getAllByText('2%');
    expect(roasElements).toHaveLength(2);
  });

  it('renders correct number of table rows', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const rows = screen.getAllByRole('row');
    // Header row + 2 data rows
    expect(rows).toHaveLength(3);
  });

  it('renders insights with correct styling', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    const insightBadges = container.querySelectorAll('.bg-\\[\\#ECF5F7\\]');
    expect(insightBadges).toHaveLength(2);

    insightBadges.forEach(badge => {
      expect(badge).toHaveClass(
        'ml-2',
        'px-2',
        'py-1',
        'text-xs',
        'bg-[#ECF5F7]',
        'text-[#418D8E]',
        'rounded'
      );
    });
  });

  it('renders Actions buttons with correct styling', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const actionButtons = screen.getAllByText('Actions');
    expect(actionButtons).toHaveLength(2);

    actionButtons.forEach(button => {
      expect(button).toHaveClass('text-sm', 'text-[#418D8E]');
    });
  });

  it('renders dropdown icons for each row', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    // AiOutlineDown icons should be present
    const dropdownIcons = container.querySelectorAll('.text-\\[\\#418D8E\\]');
    // Each row has an Actions button and a dropdown icon with the same color class
    expect(dropdownIcons.length).toBeGreaterThanOrEqual(2);
  });

  it('applies hover effect to table rows', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    const dataRows = container.querySelectorAll('tbody tr');
    dataRows.forEach(row => {
      expect(row).toHaveClass('hover:bg-gray-50');
    });
  });

  it('applies correct styling to account names', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    const accountNames = [
      screen.getByText('Globex Corporation'),
      screen.getByText('Soylent Corp')
    ];

    accountNames.forEach(name => {
      expect(name).toHaveClass('text-sm', 'font-medium', 'text-[#212936]');
    });
  });

  it('applies correct styling to table data cells', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    const tableCells = container.querySelectorAll('tbody td');
    tableCells.forEach(cell => {
      expect(cell).toHaveClass('px-6', 'py-4', 'whitespace-nowrap');
    });
  });

  it('applies correct text styling to data values', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    // Test some specific data values
    const wastedSpendValue = screen.getByText('$2,103.50');
    const spendValue = screen.getByText('$3,013.56');
    const convValue = screen.getByText('305');

    [wastedSpendValue, spendValue, convValue].forEach(value => {
      expect(value).toHaveClass('text-sm', 'text-[#212936]');
    });
  });

  it('handles single account correctly', () => {
    render(<AccountsTable accounts={singleAccount} />);

    expect(screen.getByText('Single Company')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2); // Header + 1 data row
  });

  it('handles empty accounts array', () => {
    render(<AccountsTable accounts={emptyAccounts} />);

    expect(screen.getByText('Accounts requiring attention')).toBeInTheDocument();
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1); // Only header row
  });

  it('maintains table structure with overflow handling', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    const overflowContainer = container.querySelector('.overflow-x-auto');
    expect(overflowContainer).toBeInTheDocument();

    const table = container.querySelector('.min-w-full');
    expect(table).toBeInTheDocument();
  });

  it('applies correct border styling', () => {
    const { container } = render(<AccountsTable accounts={mockAccountsData} />);

    const headerRow = container.querySelector('thead tr');
    expect(headerRow).toHaveClass('border-b', 'border-gray-200');

    const tbody = container.querySelector('tbody');
    expect(tbody).toHaveClass('divide-y', 'divide-gray-200');
  });

  it('renders with different account data formats', () => {
    const customData: AccountData[] = [
      {
        name: 'Test Company Ltd.',
        insights: 0,
        wastedSpend: '$0.00',
        spend: '$10,000.00',
        conv: 1000,
        cpa: '$10.00',
        roas: '10%'
      }
    ];

    render(<AccountsTable accounts={customData} />);

    expect(screen.getByText('Test Company Ltd.')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
  });

  it('handles long company names correctly', () => {
    const longNameData: AccountData[] = [
      {
        name: 'Very Long Company Name That Might Wrap to Multiple Lines Inc.',
        insights: 1,
        wastedSpend: '$100.00',
        spend: '$200.00',
        conv: 50,
        cpa: '$4.00',
        roas: '5%'
      }
    ];

    render(<AccountsTable accounts={longNameData} />);

    expect(screen.getByText('Very Long Company Name That Might Wrap to Multiple Lines Inc.')).toBeInTheDocument();
  });

  it('maintains accessibility with proper table structure', () => {
    render(<AccountsTable accounts={mockAccountsData} />);

    // Check for proper table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(8); // Including empty headers
    expect(screen.getAllByRole('row')).toHaveLength(3); // Header + 2 data rows
  });
});