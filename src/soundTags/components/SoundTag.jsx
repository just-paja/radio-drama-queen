import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { SoundTag as SoundTagPropType } from '../proptypes'
import { tagStore } from '../store'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    background: 'none',
    border: 'none',
    color: theme.palette.text.hint,
    margin: 0,
    padding: 0,
    '&:hover': {
      color: theme.palette.text.primary
    }
  }
})

class SoundTagComponent extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { onClick, tag } = this.props
    if (onClick) {
      onClick(tag.name)
    }
  }

  render () {
    const { classes, tag } = this.props
    if (!tag) {
      return null
    }
    return (
      <button
        className={classes.button}
        onClick={this.handleClick}
        type='button'
      >
        #
        {tag.title || tag.name}
      </button>
    )
  }
}

SoundTagComponent.displayName = 'SoundTag'
SoundTagComponent.propTypes = {
  classes: Classes.isRequired,
  onClick: PropTypes.func,
  tag: SoundTagPropType
}
SoundTagComponent.defaultProps = {
  onClick: null,
  tag: null
}

function mapStateToProps (state, { tag }) {
  return {
    tag: tagStore.getObject(state, tag)
  }
}

export const SoundTag = connect(mapStateToProps)(
  withStyles(styles)(SoundTagComponent)
)
