import { useEffect, useState } from 'react';
import benefitsData from '../data/benefits.json';

export default function Screen3Benefits({ category, onSelect, onBack }) {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const categoryBenefits = benefitsData[category] || [];
    setBenefits(categoryBenefits);
  }, [category]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category} Benefits
          </h1>
          <p className="text-gray-600">
            Select a benefit to see how to avail it
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              onClick={() => onSelect(benefit)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h2>
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {benefit.coverage}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {benefit.description}
              </p>
              <div className="text-blue-600 font-medium flex items-center">
                View Action Plan
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

