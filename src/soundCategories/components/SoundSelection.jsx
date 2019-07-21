import React from 'react'

import { connect } from 'react-redux'
import { getFilteredSounds, getSearchFragments } from '../selectors'
import { SoundSelectionItem } from './SoundSelectionItem'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  selection: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }
})

function preventEventBubbling (event) {
  event.preventDefault()
  event.stopPropagation()
}

class SoundSelectionComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidUpdate (prevProps) {
    const { sounds } = this.props
    if (prevProps.sounds !== sounds) {
      this.props.input.onChange(
        this.value.filter(soundUuid => sounds.find(sound => sound.uuid === soundUuid))
      )
    }
  }

  get value () {
    const { value } = this.props.input
    return value || []
  }

  handleKeyDown (event) {
    if (event.key === 'Home') {
      preventEventBubbling(event)
      this.focusFirst()
    } else if (event.key === 'End') {
      preventEventBubbling(event)
      this.focusLast()
    }
  }

  focusFirst () {
    if (this.props.sounds.length) {
      this.props.onSoundFocus(0)
    }
  }

  focusLast () {
    if (this.props.sounds.length) {
      this.props.onSoundFocus(this.props.sounds.length - 1)
    }
  }

  handleSelect (soundUuid) {
    this.props.input.onChange(
      this.value.includes(soundUuid)
        ? this.value.filter(uuid => uuid !== soundUuid)
        : [...this.value, soundUuid]
    )
  }

  render () {
    const { classes, focusedSound, onSoundAdd, searchFragments, sounds } = this.props
    return (
      <div
        className={classes.selection}
        onKeyDown={this.handleKeyDown}
      >
        {sounds.map(sound => (
          <SoundSelectionItem
            onAdd={onSoundAdd}
            onSelect={this.handleSelect}
            searchFragments={searchFragments}
            sound={sound}
            key={sound.uuid}
            focused={focusedSound === sound.uuid}
            hoverAble={!focusedSound}
            selected={this.value.includes(sound.uuid)}
          />
        ))}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    searchFragments: getSearchFragments(state),
    sounds: getFilteredSounds(state)
  }
}

export const SoundSelection = withStyles(styles)(connect(
  mapStateToProps
)(SoundSelectionComponent))
