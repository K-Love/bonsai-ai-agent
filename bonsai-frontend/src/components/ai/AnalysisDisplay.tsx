import React from 'react';
import { Analysis } from '@/lib/ai/agent';

interface AnalysisDisplayProps {
  analysis: Analysis;
  isLoading?: boolean;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ 
  analysis, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Bonsai Analysis</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">Species Analysis</h4>
          <p className="text-gray-600">{analysis.speciesAnalysis}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Health Assessment</h4>
          <p className="text-gray-600">{analysis.healthAssessment}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Care Recommendations</h4>
          <ul className="list-disc list-inside">
            {analysis.careRecommendations.map((rec, index) => (
              <li key={index} className="text-gray-600">{rec}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Market Value</h4>
          <p className="text-gray-600">${analysis.marketValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};