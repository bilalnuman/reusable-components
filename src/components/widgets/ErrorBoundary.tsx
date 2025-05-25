import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('🔴 Caught by ErrorBoundary:', error);
        console.log('🧱 Component Stack:', info.componentStack);
        this.setState({ error, errorInfo: info });
    }

    render() {
        const { hasError, error, errorInfo } = this.state;

        if (hasError) {
            return (
                <div style={{ padding: '1rem', color: 'crimson', whiteSpace: 'pre-wrap' }}>
                    <h2>{this.props.fallback}</h2>
                    {error && (
                        <>
                            <p><strong>Error:</strong> {error.message || String(error)}</p>
                            <pre>{error.stack}</pre>
                        </>
                    )}
                    {errorInfo && (
                        <>
                            <p><strong>Component Stack:</strong></p>
                            <pre>{errorInfo.componentStack}</pre>
                        </>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
