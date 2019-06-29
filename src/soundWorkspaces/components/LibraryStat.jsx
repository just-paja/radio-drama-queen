import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  '@keyframes flash': {
    '0%': {
      backgroundColor: 'rgba(0,0,0,.33)'
    },
    '50%': {
      backgroundColor: 'rgba(255,255,255,.05)'
    },
    '100%': {
      backgroundColor: 'rgba(0,0,0,.33)'
    }
  },
  stat: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.33)',
    borderRadius: theme.spacing(1 / 2),
    display: 'flex',
    height: 16,
    marginLeft: theme.spacing(1 / 2),
    padding: theme.spacing(1 / 2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    transition: 'all 0.1s ease-out',
    animationDuration: '0.3s',
    animationIterationCount: 'infinite'
  },
  icon: {
    marginRight: theme.spacing(1 / 2),
    width: theme.typography.fontSize
  },
  highlight: {
    animationName: '$flash'
  }
})

class LibraryStatComponent extends React.Component {
  state = {
    refresh: false
  }

  constructor (props) {
    super(props)
    this.blink = this.blink.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.number !== this.props.number) {
      global.requestAnimationFrame(this.blink)
    }
  }

  blink () {
    clearTimeout(this.blinkTimeout)
    if (this.state.highlight) {
      this.setState({ highlight: false })
    }
    this.setState({ highlight: true })
    this.blinkTimeout = setTimeout(() => {
      this.setState({ highlight: false })
    }, 300)
  }

  render () {
    const { classes, icon: Icon, number, title } = this.props
    return (
      <span
        className={classnames(classes.stat, {
          [classes.highlight]: this.state.highlight
        })}
        title={title}
      >
        <Icon className={classes.icon} />
        {' '}
        {number}
      </span>
    )
  }
}

LibraryStatComponent.displayName = 'LibraryStat'
LibraryStatComponent.propTypes = {
  classes: Classes.isRequired,
  icon: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export const LibraryStat = withStyles(styles)(LibraryStatComponent)
