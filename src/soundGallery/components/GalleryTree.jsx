import PropTypes from 'prop-types'
import React from 'react'

import { browseRoutines } from '../actions'
import { connect } from 'react-redux'
import { getBrowserLibrary, getBrowserModule } from '../selectors'
import { LibraryList } from '../../soundLibraries/components'
import { ModuleList } from '../../soundModules/components'
import { SoundModule } from '../../soundModules/proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    background: '#f0f0f0',
    display: 'flex',
    flexGrow: 1,
    maxWidth: theme.spacing(24),
    minWidth: theme.spacing(16)
  }
})

function GalleryTreeComponent ({
  classes,
  selectedLibrary,
  selectedModule,
  onLibrarySelect,
  onModuleSelect
}) {
  return (
    <div className={classes.box}>
      <div className={classes.column}>
        <LibraryList
          onSelect={onLibrarySelect}
          selected={selectedLibrary}
        />
      </div>
      <div className={classes.column}>
        <ModuleList
          onSelect={onModuleSelect}
          library={selectedLibrary}
          selected={selectedModule}
        />
      </div>
    </div>
  )
}

GalleryTreeComponent.displayName = 'GalleryTree'
GalleryTreeComponent.propTypes = {
  onLibrarySelect: PropTypes.func.isRequired,
  onModuleSelect: PropTypes.func.isRequired,
  selectedLibrary: PropTypes.string,
  selectedModule: SoundModule
}

GalleryTreeComponent.defaultProps = {
  selectedLibrary: null,
  selectedModule: null
}

function mapStateToProps (state) {
  return {
    selectedLibrary: getBrowserLibrary(state),
    selectedModule: getBrowserModule(state)
  }
}

const mapDispatchToProps = {
  onLibrarySelect: browseRoutines.selectLibrary,
  onModuleSelect: browseRoutines.selectModule
}

export const GalleryTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GalleryTreeComponent))
