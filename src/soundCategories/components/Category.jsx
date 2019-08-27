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
import { CategoryName } from './CategoryName'
import { categoryRoutines } from '../actions'
import { connect } from 'react-redux'
import { connectSoundDropTarget } from '../../sounds/containers'
import { focusable } from '../../components'
import { categoryStore, getCategoryName } from '../store'
import { SoundAddDialog } from './SoundAddDialog'
import { soundRoutines } from '../../sounds/actions'
import { withStyles } from '@material-ui/core/styles'
import {
  getCategoryBoardUuid,
  getCategoryEditStatus,
  getCategoryExclusiveStatus,
  getCategoryLoopStatus,
  getCategoryMutedStatus,
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

class CategoryComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  get focusedIndex () {
    return this.props.sounds.findIndex(soundUuid => soundUuid === this.props.focusedSound)
  }

  deleteFocusedItem () {
    const { category, focusedSound } = this.props
    if (focusedSound) {
      this.props.onSoundRemove({
        uuid: category.uuid,
        sound: focusedSound
      })
    } else if (this.props.sounds.length === 0) {
      this.props.onRemove(category.uuid)
    }
  }

  focusSoundIndex (soundIndex) {
    const soundUuid = this.props.sounds[soundIndex]
    if (soundUuid && this.props.focusedSound !== soundUuid) {
      this.props.onSoundFocus(soundUuid)
    }
  }

  focusFirst () {
    this.focusSoundIndex(0)
  }

  focusLast () {
    this.focusSoundIndex(this.props.sounds.length - 1)
  }

  handleKeyDown (event) {
    if (event.key === 'ArrowDown') {
      this.moveDown()
    } else if (event.key === 'ArrowUp') {
      this.moveUp()
    } else if (event.key === 'End') {
      this.focusLast()
    } else if (event.key === 'Home') {
      this.focusFirst()
    } else if (event.key === 'Delete') {
      this.deleteFocusedItem()
    } else if (['a', 'A'].includes(event.key)) {
      event.preventDefault()
      this.openSoundAddDialog()
    } else if (['e', 'E'].includes(event.key)) {
      this.handleExclusiveToggle()
    } else if (['l', 'L'].includes(event.key)) {
      this.handleLoopToggle()
    } else if (['m', 'M'].includes(event.key)) {
      this.handleMuteToggle()
    } else if (['s', 'S'].includes(event.key)) {
      this.props.onStop(this.props.uuid)
    } else if (event.key === '+') {
      this.increaseVolume()
    } else if (event.key === '-') {
      this.decreaseVolume()
    }
  }

  handleExclusiveToggle () {
    this.toggle('exclusive', 'onExclusiveOn', 'onExclusiveOff')
  }

  handleLoopToggle () {
    this.toggle('loop', 'onLoopOn', 'onLoopOff')
  }

  handleMuteToggle () {
    this.toggle('muted', 'onMute', 'onUnmute')
  }

  toggle (prop, onOn, onOff) {
    return this.props[prop]
      ? this.props[onOff](this.props.uuid)
      : this.props[onOn](this.props.uuid)
  }

  handleFocus () {
    if (!this.props.focused) {
      this.props.onFocus(this.props.uuid)
    }
  }

  decreaseVolume () {
    const { category } = this.props
    if (category.volume > 0) {
      this.props.onVolumeChange(category.uuid, Math.max(category.volume - 5, 0))
    }
  }

  increaseVolume () {
    const { category } = this.props
    if (category.volume < 100) {
      this.props.onVolumeChange(category.uuid, Math.min(category.volume + 5, 100))
    }
  }

  moveDown () {
    const { focusedSound, sounds } = this.props
    if (!focusedSound) {
      this.focusSoundIndex(0)
    }
    const nextPosition = this.focusedIndex + 1
    if (nextPosition < sounds.length) {
      this.focusSoundIndex(nextPosition)
    }
  }

  moveUp () {
    const { focusedSound, sounds } = this.props
    if (!focusedSound) {
      this.focusSoundIndex(sounds.length - 1)
    }
    const nextPosition = this.focusedIndex - 1
    if (nextPosition >= 0) {
      this.focusSoundIndex(nextPosition)
    } else {
      this.handleFocus()
    }
  }

  openSoundAddDialog () {
    this.props.onSoundAdd()
  }

  render () {
    const {
      boardUuid,
      canDrop,
      classes,
      connectDropTarget,
      focusedSound,
      focusableRef,
      isOver,
      name,
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
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          ref={focusableRef}
          tabIndex={0}
        >
          <CardContent className={classes.cardPadding}>
            <div className={classnames(classes.headlinePadding, classes.headlineControls)}>
              <CategoryName name={name} uuid={uuid} />
              <CategoryContextMenu
                boardUuid={boardUuid}
                uuid={uuid}
              />
            </div>
            <List className={classes.soundList} dense>
              {sounds.map(soundUuid => (
                <ListItem className={classes.removePadding} key={soundUuid}>
                  <CategoryItem
                    categoryUuid={uuid}
                    focused={focusedSound === soundUuid}
                    uuid={soundUuid}
                  />
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
      <>
        {droppable}
        <Snackbar
          open={canDrop && isOver}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message={`Drop audio files here to add to category ${categoryName}`}
        />
      </>
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
  focusedSound: PropTypes.string,
  isOver: PropTypes.bool,
  name: PropTypes.string,
  onSoundRemove: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
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
  category: categoryStore.getObject(state, uuid),
  edit: getCategoryEditStatus(state, uuid),
  exclusive: getCategoryExclusiveStatus(state, uuid),
  loop: getCategoryLoopStatus(state, uuid),
  muted: getCategoryMutedStatus(state, uuid),
  name: getCategoryName(state, uuid),
  sounds: getCategorySoundUuids(state, uuid)
})

const mapDispatchToProps = {
  onDrop: categoryRoutines.soundDrop,
  onExclusiveOff: categoryRoutines.exclusiveOff,
  onExclusiveOn: categoryRoutines.exclusiveOn,
  onFocus: categoryRoutines.focus,
  onLoopOff: categoryRoutines.loopOff,
  onLoopOn: categoryRoutines.loopOn,
  onMute: categoryRoutines.mute,
  onRemove: categoryRoutines.remove,
  onSoundAdd: SoundAddDialog.open,
  onSoundFocus: soundRoutines.focus,
  onSoundRemove: categoryRoutines.soundRemove,
  onStop: categoryRoutines.stop,
  onUnmute: categoryRoutines.unmute,
  onVolumeChange: categoryRoutines.setVolume
}

CategoryComponent.displayName = 'Category'

export const Category = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectSoundDropTarget(
  withStyles(styles)(
    focusable(CategoryComponent)
  )
))
