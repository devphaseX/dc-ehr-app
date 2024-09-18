"use client";
import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: React.ComponentType<{ error: Error }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback: FallbackComponent } = this.props;

    if (hasError && error) {
      return <FallbackComponent error={error} />;
    }

    return children;
  }
}

// Default fallback component
const DefaultErrorComponent: React.FC<{ error: Error }> = ({ error }) => (
  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    <h2 className="text-lg font-bold mb-2">Oops, something went wrong!</h2>
    <p>
      We're sorry, but we couldn't load the content. Please try again later.
    </p>
    <p className="mt-2 text-sm">Error: {error.message}</p>
  </div>
);

export default ErrorBoundary;
export { DefaultErrorComponent };
