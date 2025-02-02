import React from 'react';
import { Recommendation } from '@/lib/ai/agent';

interface RecommendationCardProps {
  recommendation: Recommendation;
  isLoading?: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
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
      <h3 className="text-lg font-semibold mb-3">Care Recommendations</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">Immediate Actions</h4>
          <ul className="list-disc list-inside">
            {recommendation.immediateActions.map((action, index) => (
              <li key={index} className="text-gray-600">{action}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Long-term Plan</h4>
          <p className="text-gray-600">{recommendation.longTermPlan}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Maintenance Schedule</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-medium">Watering:</p>
              <p className="text-gray-600">{recommendation.maintenanceSchedule.watering}</p>
            </div>
            <div>
              <p className="font-medium">Pruning:</p>
              <p className="text-gray-600">{recommendation.maintenanceSchedule.pruning}</p>
            </div>
            <div>
              <p className="font-medium">Fertilizing:</p>
              <p className="text-gray-600">{recommendation.maintenanceSchedule.fertilizing}</p>
            </div>
            <div>
              <p className="font-medium">Repotting:</p>
              <p className="text-gray-600">{recommendation.maintenanceSchedule.repotting}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};