'use client';

import { useState } from 'react';

export default function AITester() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testAI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'analyze-market',
                    query: 'What are the current trends in indoor bonsai trees?'
                }),
            });
            
            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error('Error testing AI:', error);
            setResult('Error occurred while testing AI');
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={testAI}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? 'Testing...' : 'Test AI Agent'}
            </button>
            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}