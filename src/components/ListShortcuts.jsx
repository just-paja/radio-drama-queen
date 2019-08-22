import PropTypes from 'prop-types'
import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

export class ListShortcuts extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleSelectFirst = this.handleSelectFirst.bind(this)
    this.handleSelectLast = this.handleSelectLast.bind(this)
    this.handleSelectNext = this.handleSelectNext.bind(this)
    this.handleSelectPrev = this.handleSelectPrev.bind(this)
  }

  get currentIndex () {
    const searchIndex = this.props.focused || this.props.selected
    return this.props.items.indexOf(searchIndex)
  }

  get maxIndex () {
    return this.props.items.length - 1
  }

  handleFocus (index) {
    this.props.onFocus(this.props.items[index])
  }

  handleSelectFirst () {
    this.handleFocus(0)
  }

  handleSelectLast () {
    this.handleFocus(this.maxIndex)
  }

  handleSelectNext () {
    this.handleFocus(Math.min(this.maxIndex, this.currentIndex + 1))
  }

  handleSelectPrev () {
    this.handleFocus(Math.max(0, this.currentIndex - 1))
  }

  render () {
    const { disabled, horizontal } = this.props
    if (disabled) {
      return null
    }
    return (
      <>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['home']}
          onKeyEvent={this.handleSelectFirst}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['end']}
          onKeyEvent={this.handleSelectLast}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={[horizontal ? 'left' : 'up']}
          onKeyEvent={this.handleSelectPrev}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={[horizontal ? 'right' : 'down']}
          onKeyEvent={this.handleSelectNext}
        />
      </>
    )
  }
}

ListShortcuts.propTypes = {
  disabled: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFocus: PropTypes.func.isRequired,
  focused: PropTypes.string,
  selected: PropTypes.string,
  horizontal: PropTypes.bool
}

ListShortcuts.defaultProps = {
  disabled: false,
  horizontal: false
}
