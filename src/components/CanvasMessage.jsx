import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Center } from './Center'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  messageSize: {
    maxWidth: 600
  }
})

const CanvasMessage = ({ children, classes, heading }) => (
  <Center>
    <Paper className={classes.messageSize} elevation={0}>
      <Typography variant='h2' gutterBottom>
        {heading}
      </Typography>
      <div>
        {children}
      </div>
    </Paper>
  </Center>
)

CanvasMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  heading: PropTypes.node.isRequired
}

export default withStyles(styles)(CanvasMessage)
