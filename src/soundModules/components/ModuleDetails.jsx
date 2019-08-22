import ArrowUpward from '@material-ui/icons/ArrowUpward'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { LabelButton } from '../../components/LabelButton'
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
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick () {
    this.props.onSelect({
      moduleUrl: this.props.selectedModule.parent
    })
  }

  render () {
    const { classes, parentModule, selectedModule } = this.props
    return (
      <>
        <LabelButton
          icon={ArrowUpward}
          className={classes.box}
          onClick={this.handleButtonClick}
        >
          {parentModule ? parentModule.name : 'Root'}
        </LabelButton>
        <div className={classes.box}>
          <h2>{selectedModule.name}</h2>
          <div>Sounds: {selectedModule.sounds.length}</div>
          <div>Driver: {selectedModule.driver}</div>
        </div>
      </>
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
