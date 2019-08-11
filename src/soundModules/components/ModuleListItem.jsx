import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { SoundModule } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'
import { countModuleModules, countModuleSounds } from '../selectors'

const styles = theme => ({
  name: {
    textTransform: 'capitalize'
  },
  info: {
    fontSize: theme.spacing(3 / 2)
  }
})

class ModuleListItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onSelect({
      moduleUrl: this.props.module.url
    })
  }

  render () {
    const { classes, module, moduleCount, selected, soundCount } = this.props
    return (
      <ListItem button onClick={this.handleClick} selected={selected}>
        <ListItemText>
          <div className={classes.name}>
            {module.name}
            {' '}
            <span className={classes.info}>
              {moduleCount}/{soundCount}
            </span>
          </div>
        </ListItemText>
      </ListItem>
    )
  }
}

ModuleListItemComponent.displayName = 'ModuleListItem'
ModuleListItemComponent.propTypes = {
  classes: Classes.isRequired,
  module: SoundModule.isRequired,
  moduleCount: PropTypes.number,
  soundCount: PropTypes.number
}

ModuleListItemComponent.defaultProps = {
  moduleCount: 0,
  soundCount: 0
}

const mapStateToProps = (state, ownProps) => ({
  moduleCount: countModuleModules(state, ownProps.module.url),
  soundCount: countModuleSounds(state, ownProps.module.url)
})

const mapDispatchToProps = {
}

export const ModuleListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ModuleListItemComponent))
