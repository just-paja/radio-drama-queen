import Input from '../../components/Input'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import React from 'react'

import { boardDialog } from '../../dialogs'
import { boardRoutines } from '../../soundBoards/actions'
import { categoryRoutines } from '../actions'
import { Field, Form, reduxForm } from 'redux-form'
import { FORM_SOUND_ADD } from '../constants'
import { getFilteredSounds } from '../selectors'
import { SoundSelection } from './SoundSelection'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  search: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  selection: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    overflow: 'auto'
  }
})

class SoundAddDialogComponent extends React.Component {
  state = {
    focusedSound: null
  }

  constructor (props) {
    super(props)
    this.handleFocusSound = this.handleFocusSound.bind(this)
    this.handleSoundAdd = this.handleSoundAdd.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleResetFocus = this.handleResetFocus.bind(this)
    this.searchInputRef = React.createRef()
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  get focusedSoundUuid () {
    return this.resolveFocusedSound(this.state.focusedSound)
  }

  componentDidMount () {
    if (!this.focusedSoundUuid) {
      this.focusSelf()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.focusedSoundUuid && this.resolveFocusedSound(prevState.focusedSound)) {
      this.focusSelf()
    }
  }

  focusSelf () {
    // Note to self: This is pretty fragile chain
    this.searchInputRef.current.ref.current.ref.current.focus()
  }

  handleFocusSound (focusedSound) {
    this.setState({ focusedSound })
  }

  handleSoundAdd (sound) {
    const { board, focusedCategory } = this.props
    if (focusedCategory) {
      this.props.addToCategory({
        uuid: focusedCategory,
        sound
      })
    } else {
      this.props.addToBoard({
        uuid: board,
        sound
      })
    }
  }

  handleSubmitForm () {
    // if (this.focusedSoundUuid) {
    //   this.handleSoundAdd(this.focusedSoundUuid)
    // }
    this.props.handleSubmit()
    this.props.onClose()
  }

  handleMoveDown () {
    const { sounds } = this.props
    if (this.state.focusedSound === null) {
      if (sounds.length) {
        this.setState({ focusedSound: 0 })
      }
    } else if (this.state.focusedSound < sounds.length - 1) {
      this.setState({ focusedSound: this.state.focusedSound + 1 })
    }
  }

  handleMoveUp () {
    if (this.state.focusedSound !== null) {
      if (this.state.focusedSound === 0) {
        this.handleResetFocus()
      } else {
        this.setState({ focusedSound: this.state.focusedSound - 1 })
      }
    }
  }

  handleResetFocus () {
    this.setState({ focusedSound: null })
  }

  resolveFocusedSound (soundIndex) {
    if (soundIndex === null) {
      return null
    }
    const sound = this.props.sounds[soundIndex]
    return sound ? sound.uuid : null
  }

  render () {
    const { board, classes, handleSubmit } = this.props
    return (
      <Form
        className={classes.container}
        onSubmit={handleSubmit}
      >
        <div className={classes.search}>
          <Field
            component={Input}
            label='Filter sounds'
            name='filter'
            onFocus={this.handleResetFocus}
            ref={this.searchInputRef}
            forwardRef
          />
        </div>
        <div className={classes.selection}>
          <Field
            board={board}
            component={SoundSelection}
            focusedSound={this.focusedSoundUuid}
            name='sounds'
            onSoundFocus={this.handleFocusSound}
            onSoundAdd={this.handleSoundAdd}
          />
        </div>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['down']}
          onKeyEvent={this.handleMoveDown}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['up']}
          onKeyEvent={this.handleMoveUp}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['enter']}
          onKeyEvent={this.handleSubmitForm}
        />
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    sounds: getFilteredSounds(state)
  }
}

const mapDispatchToProps = {
  addToBoard: boardRoutines.soundAdd,
  addToCategory: categoryRoutines.soundAdd
}

export const SoundAddDialog = boardDialog({
  fullScreen: true,
  dialog: FORM_SOUND_ADD,
  submitLabel: 'Add sound',
  mapStateToProps,
  mapDispatchToProps,
  onSubmit: values => categoryRoutines.soundAdd(values.sounds)
})(reduxForm({
  form: FORM_SOUND_ADD
})(
  withStyles(styles)(SoundAddDialogComponent)
))
