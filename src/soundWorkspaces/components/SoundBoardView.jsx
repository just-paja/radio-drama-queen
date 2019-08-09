import PropTypes from 'prop-types'
import React from 'react'

import { Board, NoBoards } from '../../soundBoards/components'
import { BoardShortcuts } from './BoardShortcuts'
import { boardStore } from '../../soundBoards'
import { connect } from 'react-redux'
import { getFocusedCategory, getFocusedSound } from '../selectors'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSidebar } from './WorkspaceSidebar'

const styles = theme => ({
  sidebar: {
    minWidth: theme.spacing(24)
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  },
  withHeader: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

class SoundBoardViewComponent extends React.PureComponent {
  renderContent () {
    const { board, focusedCategory, focusedSound, noBoards } = this.props
    if (noBoards) {
      return <NoBoards />
    }
    return board && (
      <Board
        focusedCategory={focusedCategory}
        focusedSound={focusedSound}
        uuid={board}
      />
    )
  }

  render () {
    const { board, classes } = this.props
    return (
      <div className={classes.view}>
        <WorkspaceSidebar />
        {this.renderContent()}
        <BoardShortcuts board={board} />
      </div>
    )
  }
}

SoundBoardViewComponent.displayName = 'SoundBoardView'
SoundBoardViewComponent.propTypes = {
  board: PropTypes.string,
  focusedCategory: PropTypes.string,
  focusedSound: PropTypes.string
}

SoundBoardViewComponent.defaultProps = {
  board: null
}

const mapStateToProps = (state, ownProps) => ({
  focusedCategory: getFocusedCategory(state),
  focusedSound: getFocusedSound(state),
  noBoards: boardStore.isEmpty(state)
})

export const SoundBoardView = connect(
  mapStateToProps
)(withStyles(styles)(SoundBoardViewComponent))
