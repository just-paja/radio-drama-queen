import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStory } from '../selectors'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  name: {
    alignItems: 'center',
    color: 'rgba(255,255,255,.33)',
    display: 'flex',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
})

const ActiveStoryComponent = ({ activeStory, classes }) => activeStory && (
  <div className={classes.name}>
    {activeStory.name}
  </div>
)

ActiveStoryComponent.propTypes = {
  activeStory: PropTypes.string,
  clsses: Classes.isRequired
}

ActiveStoryComponent.defaultProps = {
  activeStory: null
}

const mapStateToProps = state => ({
  activeStory: getActiveStory(state)
})

export const ActiveStory = connect(
  mapStateToProps
)(withStyles(styles)(ActiveStoryComponent))
