import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getModules } from '../selectors'
import { ModuleDetails } from './ModuleDetails'
import { ModuleListItem } from './ModuleListItem'
import { SoundModule } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  list: {
    width: '100%'
  }
})

class ModuleListComponent extends React.PureComponent {
  render () {
    const { classes, modules, onSelect, selectedModule } = this.props
    return (
      <>
        {selectedModule && (
          <ModuleDetails
            selectedModule={selectedModule}
            onSelect={onSelect}
          />
        )}
        <List className={classes.list}>
          {modules.map(module => (
            <ModuleListItem
              key={module.url}
              onSelect={onSelect}
              module={module}
              selectedModule={selectedModule && module.url === selectedModule.url}
            />
          ))}
        </List>
      </>
    )
  }
}

ModuleListComponent.displayName = 'ModuleList'
ModuleListComponent.propTypes = {
  classes: Classes.isRequired,
  modules: PropTypes.arrayOf(SoundModule).isRequired,
  selectedModule: SoundModule,
  onSelect: PropTypes.func.isRequired
}

ModuleListComponent.defaultProps = {
  parentModule: null,
  selectedModule: null
}

const mapStateToProps = (state, ownProps) => ({
  modules: getModules(state, ownProps.selectedModule && ownProps.selectedModule.url)
})

export const ModuleList = connect(
  mapStateToProps
)(withStyles(styles)(ModuleListComponent))
