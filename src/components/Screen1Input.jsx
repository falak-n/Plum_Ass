import { useState } from 'react';

export default function Screen1Input({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Benefits Discovery
          </h1>
          <p className="text-gray-600">
            Tell us about your health-related need, and we'll help you find the right benefits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <label htmlFor="health-input" className="block text-sm font-medium text-gray-700 mb-2">
            What health-related need can we help you with?
          </label>
          <textarea
            id="health-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I have tooth pain, what can I do?"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={4}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Find Benefits
          </button>
        </form>
      </div>
    </div>
  );
}

