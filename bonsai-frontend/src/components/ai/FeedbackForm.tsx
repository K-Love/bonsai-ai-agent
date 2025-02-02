import React, { useState } from 'react';
import { Feedback } from '@/lib/ai/agent';

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => Promise<void>;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState<Feedback>({
    analysisAccuracy: 5,
    recommendationSuccess: true,
    userComments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(feedback);
      // Reset form
      setFeedback({
        analysisAccuracy: 5,
        recommendationSuccess: true,
        userComments: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Provide Feedback</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Analysis Accuracy (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={feedback.analysisAccuracy}
            onChange={(e) => setFeedback({
              ...feedback,
              analysisAccuracy: parseInt(e.target.value)
            })}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            Value: {feedback.analysisAccuracy}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Were the recommendations successful?
          </label>
          <div className="mt-1">
            <input
              type="checkbox"
              checked={feedback.recommendationSuccess}
              onChange={(e) => setFeedback({
                ...feedback,
                recommendationSuccess: e.target.checked
              })}
              className="mr-2"
            />
            <span className="text-sm text-gray-500">Yes</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Comments
          </label>
          <textarea
            value={feedback.userComments}
            onChange={(e) => setFeedback({
              ...feedback,
              userComments: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};