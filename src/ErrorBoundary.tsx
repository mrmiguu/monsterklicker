import { Component, PropsWithChildren } from 'react'
import { error, stringify } from './utils'

type State = {
  err?: Error
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromError(err: Error): State {
    // Update state so the next render will show the fallback UI.
    return { err }
  }

  componentDidCatch(err: Error, errInfo: any) {
    error(stringify({ err, errInfo }))
  }

  render() {
    const { err } = this.state

    if (err) {
      return (
        <div className="absolute w-full h-full bg-red-500">
          <pre className="text-3xl text-white whitespace-break-spaces">{err.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
