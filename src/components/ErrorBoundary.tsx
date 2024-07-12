import { Component, ErrorInfo, ReactNode } from "react";
import style from "./ErrorBoundary.module.css";

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface Props {
  children?: ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error info:", errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 className={style.errorHeading}>Something went wrong.</h1>
          <p className={style.errorDetailsTitlte}>
            {this.state.error?.toString()}
          </p>
          <details className={style.errorDetails}>
            {this.state.errorInfo?.componentStack}
          </details>
          <button
            className={style.errorButton}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
