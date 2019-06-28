import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import IconButton from '@material-ui/core/IconButton'

import { withStyles } from '@material-ui/core/styles'

import { Classes, ClassName } from '../../proptypes'

const styles = theme => ({
  button: {
    height: theme.spacing(4),
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: theme.spacing(4)
  },
  icon: {
    height: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(2)
  }
})

const SoundCategoryIconButton = ({ className, classes, icon: Icon, ...props }) => (
  <IconButton
    className={classnames(classes.button, className)}
    {...props}
  >
    <Icon className={classes.icon} />
  </IconButton>
)

SoundCategoryIconButton.propTypes = {
  classes: Classes.isRequired,
  className: ClassName,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired
}

SoundCategoryIconButton.defaultProps = {
  className: null
}

export default withStyles(styles)(SoundCategoryIconButton)
