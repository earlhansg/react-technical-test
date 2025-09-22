import { useState } from 'react';
import './App.css'
import FizzBuzz from './components/FizzBuzz/FizzBuzz';

type ActiveComponent = 'fizzbuzz' | 'search' | 'dashboard';
function App() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <button
              onClick={() => setActiveComponent('fizzbuzz')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeComponent === 'fizzbuzz'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Problem 1: FizzBuzz
            </button>
            <button
              onClick={() => setActiveComponent('search')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeComponent === 'search'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Problem 3: Search
            </button>
            <button
              onClick={() => setActiveComponent('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeComponent === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Problem 4: Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main>
        {activeComponent === 'fizzbuzz' && <FizzBuzz />}
      </main>
    </div>
  )
}

export default App
