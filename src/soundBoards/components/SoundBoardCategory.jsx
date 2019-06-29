import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React from 'react'

import { Category } from '../../soundCategories/components'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridItem: {
    margin: theme.spacing(1)
  }
})

const SoundBoardCategory = ({
  classes,
  children,
  onSoundPickerOpen,
  uuid
}) => (
  <Grid xs={12} sm={6} md={4} lg={3} xl={2} item elevation={0}>
    <div className={classes.gridItem}>
      {uuid
        ? <Category onSoundPickerOpen={onSoundPickerOpen} uuid={uuid} />
        : children
      }
    </div>
  </Grid>
)

SoundBoardCategory.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onSoundPickerOpen: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  uuid: PropTypes.string
}

SoundBoardCategory.defaultProps = {
  children: null,
  uuid: null
}

export default withStyles(styles)(SoundBoardCategory)
