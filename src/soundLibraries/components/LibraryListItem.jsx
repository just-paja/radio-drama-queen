import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { SoundLibrary } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'
import { countLibraryModules } from '../selectors'

const styles = theme => ({
  name: {
    textTransform: 'capitalize'
  },
  info: {
    fontSize: theme.spacing(3 / 2)
  }
})

// const SHORT_URL_LENGTH = 48

// function shortenUrl (url) {
//   if (url.length < SHORT_URL_LENGTH) {
//     return url
//   }
//   const length = Math.floor(SHORT_URL_LENGTH / 2)
//   const start = url.substr(0, length)
//   const end = url.substr(url.length - length)
//   return `${start}...${end}`
// }

class LibraryListItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onSelect(this.props.library.url)
  }

  render () {
    const { classes, library, moduleCount, selected } = this.props
    return (
      <ListItem button onClick={this.handleClick} selected={selected}>
        <ListItemText>
          <div className={classes.name}>
            {library.name}
            {' '}
            <span className={classes.info}>
              ({moduleCount})
            </span>
          </div>
        </ListItemText>
      </ListItem>
    )
  }
}

LibraryListItemComponent.displayName = 'LibraryListItem'
LibraryListItemComponent.propTypes = {
  classes: Classes.isRequired,
  library: SoundLibrary.isRequired,
  moduleCount: PropTypes.number.isRequired,
  selected: PropTypes.bool
}

LibraryListItemComponent.defaultProps = {
  selected: false
}

const mapStateToProps = (state, ownProps) => ({
  moduleCount: countLibraryModules(state, ownProps.library.url)
})

export const LibraryListItem = connect(
  mapStateToProps
)(withStyles(styles)(LibraryListItemComponent))
