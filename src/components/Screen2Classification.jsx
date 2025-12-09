import { useEffect, useState } from 'react';
import { classifyHealthNeed } from '../services/aiService';

export default function Screen2Classification({ userInput, onComplete, onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const classify = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const category = await classifyHealthNeed(userInput);
        setTimeout(() => {
          setIsLoading(false);
          onComplete(category);
        }, 500);
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Failed to classify your need');
      }
    };

    classify();
  }, [userInput, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {isLoading ? (
            <>
              <div className="mb-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Analyzing your need...
              </h2>
              <p className="text-gray-600">
                We're classifying your request to find the best benefits for you
              </p>
            </>
          ) : error ? (
            <>
              <div className="mb-4 text-red-600">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Classification Error
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={onBack}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

