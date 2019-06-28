import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { withStyles } from '@material-ui/core/styles'

import SoundCategoryName from './SoundCategoryName'
import SoundCategoryMenu from '../containers/SoundCategoryMenu'
import SoundCategoryControls from '../containers/SoundCategoryControls'
import SoundCategoryItem from '../containers/SoundCategoryItem'

const styles = theme => ({
  removePadding: {
    marginBottom: 0,
    marginTop: 0,
    padding: 0
  },
  soundList: {
    paddingBottom: 0
  },
  card: theme.components.card,
  canDrop: {
    background: theme.palette.dropTarget
  },
  cardPadding: {
    padding: 0
  },
  headlinePadding: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 0
  },
  headlineControls: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  categoryControls: {
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1 / 2),
    ...theme.components.cardSeparator
  }
})

class SoundCategory extends React.Component {
  render () {
    const {
      boardUuid,
      canDrop,
      classes,
      connectDropTarget,
      edit,
      isOver,
      name,
      onSoundPickerOpen,
      sounds,
      uuid
    } = this.props
    const categoryName = name || 'Default'
    return connectDropTarget(
      <div>
        <Card
          className={classnames(classes.card, {
            [classes.canDrop]: isOver && canDrop
          })}
        >
          <CardContent className={classes.cardPadding}>
            <div className={classnames(classes.headlinePadding, classes.headlineControls)}>
              <SoundCategoryName
                edit={edit}
                name={name}
                uuid={uuid}
              />
              <SoundCategoryMenu
                boardUuid={boardUuid}
                uuid={uuid}
                onSoundPickerOpen={onSoundPickerOpen}
              />
            </div>
            <List className={classes.soundList} dense>
              {sounds.map(soundUuid => (
                <ListItem className={classes.removePadding} key={soundUuid}>
                  <SoundCategoryItem uuid={soundUuid} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions className={classes.categoryControls}>
            <SoundCategoryControls uuid={uuid} />
          </CardActions>
        </Card>
        <Snackbar
          open={canDrop && isOver}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message={`Drop audio files here to add to category ${categoryName}`}
        />
      </div>
    )
  }
}

SoundCategory.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  isOver: PropTypes.bool,
  name: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  uuid: PropTypes.string.isRequired
}

SoundCategory.defaultProps = {
  canDrop: null,
  edit: false,
  isOver: null,
  name: null
}

export default withStyles(styles)(SoundCategory)
