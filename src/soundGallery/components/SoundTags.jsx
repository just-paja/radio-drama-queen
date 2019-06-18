import PropTypes from 'prop-types'
import React from 'react'
import SoundTag from '../../soundTags/containers/SoundTag'

import { Classes } from '../../proptypes'
import { SoundTag as SoundTagType } from '../../soundTags/proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  empty: {
    color: theme.palette.text.hint,
    fontSize: theme.typography.fontSize
  }
})

function renderTags (tags, onTagClick) {
  return tags.reduce((aggr, tag) => [
    ...aggr,
    <SoundTag
      key={tag}
      onClick={onTagClick}
      tag={tag}
    />,
    ' '
  ], [])
}

const SoundTagsComponent = ({ classes, onTagClick, tags }) => (
  <div className={classes.tags}>
    {tags && tags.length
      ? renderTags(tags, onTagClick)
      : <span className={classes.empty}>(No tags)</span>}
  </div>
)

SoundTagsComponent.propTypes = {
  classes: Classes.isRequired,
  onTagClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(SoundTagType).isRequired
}

export const SoundTags = withStyles(styles)(SoundTagsComponent)
