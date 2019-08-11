import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getModules } from '../selectors'
import { ModuleListItem } from './ModuleListItem'
import { SoundModule } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class ModuleListComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleNavigateToParent = this.handleNavigateToParent.bind(this)
  }

  handleNavigateToParent () {
    this.props.onSelect({
      moduleUrl: this.props.selected.parent
    })
  }

  render () {
    const { modules, onSelect, selected } = this.props
    return (
      <List>
        {selected && (
          <ListItem button onClick={this.handleNavigateToParent}>
            <ListItemText>
              ...
            </ListItemText>
          </ListItem>
        )}
        {modules.map(module => (
          <ModuleListItem
            key={module.url}
            onSelect={onSelect}
            module={module}
            selected={selected && module.url === selected.url}
          />
        ))}
      </List>
    )
  }
}

ModuleListComponent.displayName = 'ModuleList'
ModuleListComponent.propTypes = {
  classes: Classes.isRequired,
  modules: PropTypes.arrayOf(SoundModule).isRequired,
  selected: SoundModule,
  onSelect: PropTypes.func.isRequired
}

ModuleListComponent.defaultProps = {
  parentModule: null,
  selected: null
}

const mapStateToProps = (state, ownProps) => ({
  modules: getModules(state, ownProps.selected && ownProps.selected.url)
})

export const ModuleList = connect(
  mapStateToProps
)(withStyles(styles)(ModuleListComponent))
