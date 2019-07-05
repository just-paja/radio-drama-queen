import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { CategoryContextMenu } from './CategoryContextMenu'
import { CategoryControls } from './CategoryControls'
import { CategoryItem } from './CategoryItem'
import { categoryRoutines } from '../actions'
import { CategoryName } from './CategoryName'
import { connect } from 'react-redux'
import { connectSoundDropTarget } from '../../sounds/containers'
import { withStyles } from '@material-ui/core/styles'
import { getCategoryName } from '../store'
import {
  getCategoryBoardUuid,
  getCategoryEditStatus,
  getCategorySoundUuids
} from '../selectors'

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

class CategoryComponent extends React.Component {
  render () {
    const {
      boardUuid,
      canDrop,
      classes,
      connectDropTarget,
      isOver,
      name,
      onSoundPickerOpen,
      sounds,
      uuid
    } = this.props
    const categoryName = name || 'Default'
    const droppable = connectDropTarget(
      <div>
        <Card
          className={classnames(classes.card, {
            [classes.canDrop]: isOver && canDrop
          })}
          tabIndex={0}
        >
          <CardContent className={classes.cardPadding}>
            <div className={classnames(classes.headlinePadding, classes.headlineControls)}>
              <CategoryName name={name} uuid={uuid} />
              <CategoryContextMenu
                boardUuid={boardUuid}
                uuid={uuid}
                onSoundPickerOpen={onSoundPickerOpen}
              />
            </div>
            <List className={classes.soundList} dense>
              {sounds.map(soundUuid => (
                <ListItem className={classes.removePadding} key={soundUuid}>
                  <CategoryItem categoryUuid={uuid} uuid={soundUuid} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions className={classes.categoryControls}>
            <CategoryControls uuid={uuid} />
          </CardActions>
        </Card>
      </div>
    )
    return (
      <React.Fragment>
        {droppable}
        <Snackbar
          open={canDrop && isOver}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message={`Drop audio files here to add to category ${categoryName}`}
        />
      </React.Fragment>
    )
  }
}

CategoryComponent.displayName = 'Category'
CategoryComponent.propTypes = {
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

CategoryComponent.defaultProps = {
  canDrop: null,
  edit: false,
  isOver: null,
  name: null
}

const mapStateToProps = (state, { uuid }) => ({
  boardUuid: getCategoryBoardUuid(state, uuid),
  edit: getCategoryEditStatus(state, uuid),
  name: getCategoryName(state, uuid),
  sounds: getCategorySoundUuids(state, uuid)
})

const mapDispatchToProps = {
  onDrop: categoryRoutines.soundDrop
}

CategoryComponent.displayName = 'Category'

export const Category = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectSoundDropTarget(withStyles(styles)(CategoryComponent)))
