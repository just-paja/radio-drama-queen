import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LabelIcon from '@material-ui/icons/Label'
import MemoryIcon from '@material-ui/icons/Memory'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types'
import React from 'react'
import WarningIcon from '@material-ui/icons/Warning'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { soundStore } from '../../sounds'
import { LibraryStat } from './LibraryStat'
import { MainMenu } from './MainMenu'
import { StopAllButton } from '../../sounds/components'
import { WorkspaceSelection } from './WorkspaceSelection'
import { withStyles } from '@material-ui/core/styles'
import {
  countBoardSounds,
  countErrorSounds,
  countMemorySounds,
  countPlayingSounds,
  countTags
} from '../selectors'

const mapStateToProps = state => ({
  boardSounds: countBoardSounds(state),
  errorSounds: countErrorSounds(state),
  inMemorySounds: countMemorySounds(state),
  playingSounds: countPlayingSounds(state),
  registeredSounds: soundStore.getSize(state),
  tags: countTags(state)
})

const styles = theme => ({
  header: {
    background: '#2f2f2f',
    color: 'white',
    cursor: 'default',
    display: 'flex',
    fontSize: theme.typography.fontSize,
    justifyContent: 'flex-end',
    left: 0,
    padding: 0,
    paddingRight: theme.spacing(1 / 2),
    right: 0,
    top: 0,
    userSelect: 'none',
    zIndex: 1200
  },
  icons: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  stopAllButton: {
    marginRight: 'auto',
    marginLeft: theme.spacing(1)
  }
})

const WorkspaceStatusComponent = ({
  boardSounds,
  classes,
  errorSounds,
  inMemorySounds,
  playingSounds,
  registeredSounds,
  tags
}) => (
  <header className={classes.header}>
    <MainMenu />
    <WorkspaceSelection />
    <StopAllButton className={classes.stopAllButton} />
    <span className={classes.icons}>
      <LibraryStat number={playingSounds} icon={PlayArrowIcon} title='Playing' />
      <LibraryStat number={tags} icon={LabelIcon} title='Tags' />
      <LibraryStat number={errorSounds} icon={WarningIcon} title='Sound errors' />
      <LibraryStat number={inMemorySounds} icon={MemoryIcon} title='Sounds ready to play' />
      <LibraryStat number={boardSounds} icon={DashboardIcon} title='Sounds on board' />
      <LibraryStat number={registeredSounds} icon={AllInclusiveIcon} title='Registered sounds' />
    </span>
  </header>
)

WorkspaceStatusComponent.displayName = 'WorkspaceStatus'

WorkspaceStatusComponent.propTypes = {
  boardSounds: PropTypes.number.isRequired,
  classes: Classes.isRequired,
  errorSounds: PropTypes.number.isRequired,
  inMemorySounds: PropTypes.number.isRequired,
  playingSounds: PropTypes.number.isRequired,
  registeredSounds: PropTypes.number.isRequired,
  tags: PropTypes.number.isRequired
}

export const WorkspaceStatus = connect(mapStateToProps)(
  withStyles(styles)(WorkspaceStatusComponent)
)
