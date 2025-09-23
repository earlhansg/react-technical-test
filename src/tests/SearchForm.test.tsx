// SearchForm.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '../components/SearchForm/SearchForm';

// Mock the books data
vi.mock('../../data/books', () => ({
  BOOKS_DATA: [
    { title: "Fear and Loathing in Las Vegas", author: "Hunter S. Thompson", rating: 4.5 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.0 },
    { title: "Moby Dick", author: "Herman Melville", rating: 3.5 },
    { title: "Pride and Prejudice", author: "Jane Austen", rating: 4.5 },
    { title: "Dune", author: "Frank Herbert", rating: 5.0 },
    { title: "Flowers in the Attic", author: "Virginia Andrews", rating: 1.0 },
    { title: "Moon People", author: "Dale M. Courtney", rating: 0.0 },
    { title: "The Da Vinci Code", author: "Dan Brown", rating: 2.5 },
  ]
}));

describe('SearchForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search form with initial elements', () => {
    render(<SearchForm />);

    expect(screen.getByRole('heading', { name: 'Book Search' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for books/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays all books initially', () => {
    render(<SearchForm />);

    expect(screen.getByText('Fear and Loathing in Las Vegas')).toBeInTheDocument();
    expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    expect(screen.getByText('Dune')).toBeInTheDocument();
  });

  it('updates search input value when typing', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    
    await user.type(searchInput, 'gatsby');
    
    expect(searchInput).toHaveValue('gatsby');
  });

  it('shows error message when submitting empty search term', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    
    await user.click(searchButton);

    expect(screen.getByText('Please enter a search term')).toBeInTheDocument();
  });

  it('shows error message when submitting whitespace-only search term', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, '   ');
    await user.click(searchButton);

    expect(screen.getByText('Please enter a search term')).toBeInTheDocument();
  });

  it('shows loading state during search', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'gatsby');
    await user.click(searchButton);

    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('filters books by title successfully', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'gatsby');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Fear and Loathing in Las Vegas')).not.toBeInTheDocument();
  });

  it('filters books by author successfully', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'thompson');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Fear and Loathing in Las Vegas')).toBeInTheDocument();
      expect(screen.getByText('Hunter S. Thompson')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('The Great Gatsby')).not.toBeInTheDocument();
  });

  it('performs case-insensitive search', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'GATSBY');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    });
  });

  it('shows error message when no books match the search', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'nonexistent book');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('No books found matching your search')).toBeInTheDocument();
    });
    
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays table headers correctly', () => {
    render(<SearchForm />);

    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Author' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Rating' })).toBeInTheDocument();
  });

  it('can submit form by pressing Enter', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);

    const searchInput = screen.getByPlaceholderText(/search for books/i);

    await user.type(searchInput, 'gatsby{enter}');

    await waitFor(() => {
      expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    });
  });
});