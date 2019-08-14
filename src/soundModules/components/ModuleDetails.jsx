import ArrowUpward from '@material-ui/icons/ArrowUpward'
import LabelButton from '../../components/LabelButton'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { moduleStore } from '../store'
import { SoundModule } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  box: {
    padding: theme.spacing(2),
    flexGrow: 0
  }
})

class ModuleDetailsComponent extends React.Component {
  constructor (props) {
    super(props)
    this.navigateToParent = this.navigateToParent.bind(this)
  }

  navigateToParent () {
    this.props.onSelect({
      moduleUrl: this.props.selectedModule.parent
    })
  }

  render () {
    const { classes, parentModule, selectedModule } = this.props
    return (
      <React.Fragment>
        <LabelButton
          icon={ArrowUpward}
          className={classes.box}
          onClick={this.navigateToParent}
        >
          {parentModule ? parentModule.name : 'Root'}
        </LabelButton>
        <div className={classes.box}>
          <h2>{selectedModule.name}</h2>
          <div>Sounds: {selectedModule.sounds.length}</div>
          <div>Driver: {selectedModule.driver}</div>
        </div>
      </React.Fragment>
    )
  }
}

ModuleDetailsComponent.displayName = 'ModuleDetails'
ModuleDetailsComponent.propTypes = {
  classes: Classes.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedModule: SoundModule.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  parentModule: moduleStore.getObject(state, ownProps.selectedModule.parent)
})

export const ModuleDetails = connect(
  mapStateToProps
)(withStyles(styles)(ModuleDetailsComponent))
