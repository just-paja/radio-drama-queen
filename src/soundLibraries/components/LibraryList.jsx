import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { LibraryListItem } from './LibraryListItem'
import { libraryStore } from '../store'
import { SoundLibrary } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  body: {
    padding: theme.spacing()
  }
})

const LibraryListComponent = ({
  libraries,
  onSelect,
  selected
}) => (
  <List>
    {libraries.map(lib => (
      <LibraryListItem
        key={lib.url}
        library={lib}
        selected={lib.url === selected}
        onSelect={onSelect}
      />
    ))}
  </List>
)

LibraryListComponent.displayName = 'LibraryList'
LibraryListComponent.propTypes = {
  classes: Classes.isRequired,
  libraries: PropTypes.arrayOf(SoundLibrary).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string
}

LibraryListComponent.defaultProps = {
  selected: null
}

const mapStateToProps = state => ({
  libraries: libraryStore.getAll(state)
})

export const LibraryList = connect(
  mapStateToProps
)(withStyles(styles)(LibraryListComponent))
