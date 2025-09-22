import './App.css'

function App() {
  return (
    <div className="p-4 text-white" style={{backgroundColor: '#3498db'}}>
      <h1 className="text-2xl font-bold">Themed React Component</h1>
      <p className="mt-2">Styling with custom colors and utility classes.</p>
      <button 
        className="mt-4 p-2 text-red-500 rounded transition-colors duration-200" 
        style={{backgroundColor: '#2ecc71'}}
      >
        Click me
      </button>
    </div>
  )
}

export default App
