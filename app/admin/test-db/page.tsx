"use client";

import React, { useState } from 'react';
import { testDatabaseConnection } from '@/app/actions/db-test';

export default function TestDBPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        try {
            const res = await testDatabaseConnection();
            setResult(res);
        } catch (err: any) {
            setResult({ success: false, error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Database Connection Test</h1>
            <p>Click the button below to test the connection to your Hostinger database.</p>

            <button
                onClick={runTest}
                className="btn btn-primary"
                disabled={loading}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
                {loading ? 'Testing...' : 'Test Connection'}
            </button>

            {result && (
                <div style={{ marginTop: '20px', padding: '20px', background: result.success ? '#d4edda' : '#f8d7da', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>Result: {result.success ? 'Success' : 'Failed'}</h3>
                    <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
