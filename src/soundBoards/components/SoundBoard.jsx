import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SoundBoardCategory from './SoundBoardCategory'
import SoundBoardCategoryCreate from '../containers/SoundBoardCategoryCreate'
import SoundBoardRenameDialog from '../containers/SoundBoardRenameDialog'
import SoundBoardSpeedDial from '../containers/SoundBoardSpeedDial'
import Typography from '@material-ui/core/Typography'

import { categoryCreate, soundBoard } from '../actions'
import { connect } from 'react-redux'
import { connectSoundDropTarget } from '../../sounds/containers'
import { getBoardCategoryUuids, isCategoryCreateFormVisible } from '../selectors'
import { SoundBoardEmpty } from './SoundBoardEmpty'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  board: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  gridSpacing: {
    padding: theme.spacing(1),
    minWidth: 320,
    alignContent: 'start'
  },
  canDrop: {
    background: theme.palette.dropTarget
  }
})

const renderCategories = (categories, onSoundPickerOpen) =>
  categories.map(categoryUuid => (
    <SoundBoardCategory
      key={categoryUuid}
      onSoundPickerOpen={onSoundPickerOpen}
      uuid={categoryUuid}
    />
  ))

const renderCreateForm = uuid => (
  <SoundBoardCategory key='form'>
    <Card>
      <CardContent>
        <Typography variant='h5'>
          Create Category
        </Typography>
        <SoundBoardCategoryCreate board={uuid} />
      </CardContent>
    </Card>
  </SoundBoardCategory>
)

const renderSnackbar = (isOver, canDrop) => (
  <Snackbar
    open={canDrop && isOver}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    message='Drop sounds here to create a new category'
  />
)

class SoundBoardComponent extends Component {
  constructor () {
    super()
    this.handleSoundPickerOpen = this.handleSoundPickerOpen.bind(this)
  }

  handleSoundPickerOpen () {
    const { uuid, onSoundPickerOpen } = this.props
    onSoundPickerOpen({
      board: uuid
    })
  }

  render () {
    const {
      canDrop,
      categories,
      classes,
      connectDropTarget,
      isOver,
      onSoundPickerOpen,
      showCreateForm,
      uuid
    } = this.props
    const gridClasses = classnames(classes.grow, classes.gridSpacing, {
      [classes.canDrop]: isOver && canDrop
    })
    let content
    if (categories.length === 0 && !showCreateForm) {
      content = (<SoundBoardEmpty />)
    } else {
      content = []
      content.push(renderCategories(categories, onSoundPickerOpen))
      if (showCreateForm) {
        content.push(renderCreateForm(uuid))
      }
    }
    // Wrapping div is necessary for react-dnd
    return connectDropTarget(
      <div className={classes.board}>
        <SoundBoardRenameDialog boardUuid={uuid} />
        <Grid className={gridClasses} container>
          {content}
          <SoundBoardSpeedDial
            boardUuid={uuid}
            onSoundAdd={this.handleSoundPickerOpen}
          />
          {renderSnackbar(isOver, canDrop)}
        </Grid>
      </div>
    )
  };
};

SoundBoardComponent.displayName = 'SoundBoard'
SoundBoardComponent.propTypes = {
  canDrop: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  onSoundPickerOpen: PropTypes.func.isRequired,
  showCreateForm: PropTypes.bool,
  uuid: PropTypes.string
}

SoundBoardComponent.defaultProps = {
  canDrop: false,
  isOver: false,
  showCreateForm: false
}

const mapStateToProps = (state, { uuid }) => ({
  categories: getBoardCategoryUuids(state, uuid),
  showCreateForm: isCategoryCreateFormVisible(state)
})

const mapDispatchToProps = {
  onAdd: categoryCreate.formShow,
  onDrop: soundBoard.soundDrop
}

export const SoundBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectSoundDropTarget(withStyles(styles)(SoundBoardComponent)))
