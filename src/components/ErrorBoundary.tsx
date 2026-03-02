/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 */

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          color: '#FF6EC7',
          fontFamily: 'monospace',
          padding: '20px',
        }}>
          <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Something went wrong</h1>
          <pre style={{
            maxWidth: '600px',
            overflow: 'auto',
            padding: '20px',
            background: '#1a1a2e',
            borderRadius: '8px',
            color: '#00FFFF',
            fontSize: '12px',
          }}>
            {this.state.error?.message}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}
