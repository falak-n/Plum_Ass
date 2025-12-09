import { useEffect, useState } from 'react';
import { generateActionPlan } from '../services/aiService';

export default function Screen4ActionPlan({ benefit, category, onBack, onRestart }) {
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActionPlan = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const actionSteps = await generateActionPlan(benefit.title, category);
        setSteps(actionSteps);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Failed to generate action plan');
      }
    };

    loadActionPlan();
  }, [benefit.title, category]);

  const handleRegenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const actionSteps = await generateActionPlan(benefit.title, category);
      setSteps(actionSteps);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to regenerate action plan');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {benefit.title}
            </h1>
            <div className="mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {benefit.coverage}
              </span>
            </div>
            <p className="text-gray-600">
              {benefit.description}
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Action Plan
              </h2>
              {!isLoading && !error && (
                <button
                  onClick={handleRegenerate}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Regenerate
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Generating your action plan...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="mt-8 pt-6 border-t">
            <button
              onClick={onRestart}
              className="w-full bg-gray-600 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Start New Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

