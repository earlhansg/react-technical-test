import { useState } from "react";
import type { Book, NetworkRequestState } from "../../types/NetworkRequest";
import { BOOKS_DATA } from "../../data/books";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requestState, setRequestState] = useState<NetworkRequestState>({
    state: "success",
    data: BOOKS_DATA,
  });

  const searchBooks = async (term: string): Promise<Book[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const lowercaseTerm = term.toLowerCase();
    return BOOKS_DATA.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercaseTerm) ||
        book.author.toLowerCase().includes(lowercaseTerm)
    ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setRequestState({
        state: "error",
        message: "Please enter a search term",
      });
      return;
    }

    setRequestState({ state: "loading" });

    try {
      const results = await searchBooks(searchTerm);

      if (results.length === 0) {
        setRequestState({
          state: "error",
          message: "No books found matching your search",
        });
      } else {
        setRequestState({ state: "success", data: results });
      }
    } catch (error) {
      setRequestState({
        state: "error",
        message: "An error occurred while searching",
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Search</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books by title or author..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {requestState.state === "loading" ? (
            <div className="px-6 py-2 bg-blue-500 text-white rounded-md flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          )}
        </div>
      </form>

      {requestState.state === "error" && (
        <div className="text-red-600 mb-4">{requestState.message}</div>
      )}

      {requestState.state === "success" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requestState.data.map((book, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.rating !== undefined
                      ? `${book.rating}/5`
                      : "No rating"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
