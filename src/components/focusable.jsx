import PropTypes from 'prop-types'
import React from 'react'

export function focusable (Component) {
  return class Focusable extends React.PureComponent {
    static propTypes = {
      focusable: PropTypes.bool
    }

    static defaultProps = {
      focusable: false
    }

    focusableRef = React.createRef()

    componentDidMount () {
      if (this.props.focused) {
        this.focusSelf()
      }
    }

    componentDidUpdate () {
      if (this.props.focused) {
        this.focusSelf()
      }
    }

    focusSelf () {
      this.focusableRef.current.focus()
    }

    render () {
      return <Component {...this.props} focusableRef={this.focusableRef} />
    }
  }
}
