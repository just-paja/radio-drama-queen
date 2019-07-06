import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Input from '../../components/Input'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { gallerySearch } from '../actions'
import { getSoundSearchValue, getErrorsFilter, getUsedFilter } from '../selectors'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(1),
    maxWidth: theme.breakpoints.values.sm
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
})

class GallerySearchComponent extends Component {
  constructor () {
    super()
    this.handleFilterErrorsChange = this.handleFilterErrorsChange.bind(this)
    this.handleFilterUsedChange = this.handleFilterUsedChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { onChange } = this.props
    onChange(event.target.value)
  }

  handleFilterErrorsChange (event) {
    const { onFilterErrorsChange } = this.props
    onFilterErrorsChange(event.target.checked)
  }

  handleFilterUsedChange (event) {
    const { onFilterUsedChange } = this.props
    onFilterUsedChange(event.target.checked)
  }

  render () {
    const { classes, filterErrors, filterUsed, search } = this.props
    return (
      <div className={classes.container}>
        <Input
          autoFocus
          className={classes.input}
          label='Sound search'
          input={{
            name: 'search',
            onChange: this.handleChange,
            value: search
          }}
          meta={{}}
          type='search'
        />
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.input}
              checked={filterUsed}
              name='filterUsed'
              onChange={this.handleFilterUsedChange}
            />
          )}
          label='Only unused'
        />
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.input}
              checked={filterErrors}
              name='filterErrors'
              onChange={this.handleFilterErrorsChange}
            />
          )}
          label='No errors'
        />
      </div>
    )
  }
}

GallerySearchComponent.displayName = 'GallerySearch'
GallerySearchComponent.propTypes = {
  classes: Classes.isRequired,
  filterErrors: PropTypes.bool,
  filterUsed: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFilterErrorsChange: PropTypes.func.isRequired,
  onFilterUsedChange: PropTypes.func.isRequired,
  search: PropTypes.string
}

GallerySearchComponent.defaultProps = {
  filterErrors: false,
  filterUsed: false,
  search: ''
}

const mapStateToProps = state => ({
  filterErrors: getErrorsFilter(state),
  filterUsed: getUsedFilter(state),
  search: getSoundSearchValue(state)
})

const mapDispatchToProps = {
  onFilterErrorsChange: gallerySearch.filterErrorsChange,
  onFilterUsedChange: gallerySearch.filterUsedChange,
  onChange: gallerySearch.change
}

export const GallerySearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GallerySearchComponent))
