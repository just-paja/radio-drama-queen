import React from 'react'

import { Children, Classes } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    margin: 'auto'
  }
})

const CenterComponent = ({ children, classes }) => (
  <div className={classes.container}>
    {children}
  </div>
)

CenterComponent.displayName = 'StoryView'
CenterComponent.propTypes = {
  classes: Classes.isRequired,
  children: Children.isRequired
}

export const Center = withStyles(styles)(CenterComponent)
