import React, { useState } from 'react';
import { AnalysisDisplay } from '@/components/ai/AnalysisDisplay';
import { RecommendationCard } from '@/components/ai/RecommendationCard';
import { FeedbackForm } from '@/components/ai/FeedbackForm';
import { BonsaiData, HealthMetrics, CareEvent } from '@/types/bonsai';
import { Analysis, Recommendation, Feedback } from '@/lib/ai/agent';

export default function AIAnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state for bonsai data input
  const [bonsaiData, setBonsaiData] = useState<BonsaiData>({
    species: '',
    age: 0,
    health: {
      soilMoisture: 0,
      leafColor: '',
      trunkHealth: '',
      pestPresence: false,
      lastInspection: new Date()
    },
    careHistory: [],
    acquisitionDate: new Date(),
    lastMaintenanceDate: new Date()
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call analyze endpoint
      const analysisResponse = await fetch('/api/agent/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bonsaiData),
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }

      const analysisData = await analysisResponse.json();
      setAnalysis(analysisData);

      // Get recommendations based on analysis
      const recommendationResponse = await fetch('/api/agent/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ analysis: analysisData }),
      });

      if (!recommendationResponse.ok) {
        throw new Error('Recommendation failed');
      }

      const recommendationData = await recommendationResponse.json();
      setRecommendation(recommendationData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFeedbackSubmit = async (feedback: Feedback) => {
    try {
      const response = await fetch('/api/agent/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      alert('Thank you for your feedback!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Bonsai AI Analysis
            </h1>
            <p className="mt-2 text-gray-600">
              Get expert analysis and care recommendations for your bonsai
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Bonsai Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Species
                </label>
                <input
                  type="text"
                  value={bonsaiData.species}
                  onChange={(e) => setBonsaiData({
                    ...bonsaiData,
                    species: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={bonsaiData.age}
                  onChange={(e) => setBonsaiData({
                    ...bonsaiData,
                    age: parseInt(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {/* Add more form fields as needed */}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Bonsai'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalysisDisplay analysis={analysis} isLoading={isAnalyzing} />
              {recommendation && (
                <RecommendationCard 
                  recommendation={recommendation} 
                  isLoading={isAnalyzing} 
                />
              )}
            </div>
          )}

          {/* Feedback Form */}
          {analysis && recommendation && (
            <div className="mt-8">
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}