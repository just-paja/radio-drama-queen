import PropTypes from 'prop-types'
import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

export class ListShortcuts extends React.PureComponent {
  constructor (props) {
    super(props)
    this.selectFirst = this.selectFirst.bind(this)
    this.selectLast = this.selectLast.bind(this)
    this.selectNext = this.selectNext.bind(this)
    this.selectPrev = this.selectPrev.bind(this)
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

  selectFirst () {
    this.handleFocus(0)
  }

  selectLast () {
    this.handleFocus(this.maxIndex)
  }

  selectNext () {
    this.handleFocus(Math.min(this.maxIndex, this.currentIndex + 1))
  }

  selectPrev () {
    this.handleFocus(Math.max(0, this.currentIndex - 1))
  }

  render () {
    const { disabled, horizontal } = this.props
    if (disabled) {
      return null
    }
    return (
      <React.Fragment>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['home']}
          onKeyEvent={this.selectFirst}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['end']}
          onKeyEvent={this.selectLast}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={[horizontal ? 'left' : 'up']}
          onKeyEvent={this.selectPrev}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={[horizontal ? 'right' : 'down']}
          onKeyEvent={this.selectNext}
        />
      </React.Fragment>
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
