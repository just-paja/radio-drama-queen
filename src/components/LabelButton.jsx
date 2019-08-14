import Button from '@material-ui/core/Button'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  }
})

const LabelButtonComponent = ({
  children,
  buttonComponent: ButtonComponent,
  icon: IconComponent,
  classes,
  ...props
}) => (
  <ButtonComponent {...props}>
    {IconComponent && <IconComponent className={classnames(classes.leftIcon)} />}
    {children}
  </ButtonComponent>
)

LabelButtonComponent.propTypes = {
  buttonComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}

LabelButtonComponent.defaultProps = {
  buttonComponent: Button,
  children: null,
  icon: null
}

export const LabelButton = withStyles(styles)(LabelButtonComponent)
