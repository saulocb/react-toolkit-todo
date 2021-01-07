import React from 'react'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<{},State> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      console.log()
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log()
      // You can also log the error to an error reporting service
      
    }
  
    render() {
      console.log()
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

  