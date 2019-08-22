import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import React from 'react'

import { connect } from 'react-redux'
import { isAnyDialogOpen } from '../../dialogs'
import { noArgs } from '../../components'
import { OpenLibraryDialog } from '../../soundLibraries/components'

class GalleryShortcutsComponent extends React.PureComponent {
  render () {
    const { onLibraryAdd, openDialogs } = this.props
    if (openDialogs) {
      return null
    }
    return (
      <>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['l']}
          onKeyEvent={onLibraryAdd}
        />
      </>
    )
  }
}

GalleryShortcutsComponent.displayName = 'GalleryShortcuts'
GalleryShortcutsComponent.propTypes = {
  openDialogs: PropTypes.bool,
  onLibraryAdd: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    openDialogs: isAnyDialogOpen(state)
  }
}

const mapDispatchToProps = {
  onLibraryAdd: noArgs(OpenLibraryDialog.open)
}

export const GalleryShortcuts = connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryShortcutsComponent)
