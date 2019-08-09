import React from 'react'
import MuiListItem from '@material-ui/core/ListItem'

import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  focusVisible: {
    '&.MuiListItem-root': {
      backgroundColor: 'transparent',
      ...theme.components.focus
    }
  }
})

export const ListItem = withStyles(styles)(React.forwardRef(({
  classes,
  children,
  ...other
}, ref) => (
  <MuiListItem classes={classes} ref={ref} {...other}>
    {children}
  </MuiListItem>
)))
