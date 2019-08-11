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
    color: theme.palette.infoData.contrastText,
    border: 'none',
    backgroundColor: theme.palette.infoData.dark,
    borderRadius: theme.spacing(1 / 2),
    boxSizing: 'content-box',
    fontSize: theme.spacing(7 / 4),
    display: 'flex',
    height: theme.spacing(3),
    marginLeft: theme.spacing(1 / 2),
    padding: 0,
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
    const { classes, icon: Icon, onClick, number, title } = this.props
    return (
      <button
        className={classnames(classes.stat, {
          [classes.highlight]: this.state.highlight
        })}
        disabled={!onClick}
        onClick={onClick}
        title={title}
      >
        <Icon className={classes.icon} />
        {' '}
        {number}
      </button>
    )
  }
}

LibraryStatComponent.displayName = 'LibraryStat'
LibraryStatComponent.propTypes = {
  classes: Classes.isRequired,
  icon: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
}

LibraryStatComponent.defaultProps = {
  onClick: null
}

export const LibraryStat = withStyles(styles)(LibraryStatComponent)
