import PropTypes from 'prop-types'
import React from 'react'
import Edit from '@material-ui/icons/Edit'

import { connect } from 'react-redux'
import { ContextMenuControl, ContextMenuOptions } from '../../components'
import { Children } from '../../proptypes'
import { SoundEditDialog } from './SoundEditDialog'

class SoundMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit () {
    this.props.onEdit(this.props.soundUuid)
  }

  render () {
    const { children, options } = this.props
    return (
      <ContextMenuControl
        options={[
          { icon: Edit, label: 'Edit', onClick: this.handleEdit },
          ...options
        ]}
      >
        {children}
      </ContextMenuControl>
    )
  }
}

SoundMenuComponent.displaName = 'SoundMenu'
SoundMenuComponent.propTypes = {
  children: Children,
  options: ContextMenuOptions,
  onEdit: PropTypes.func.isRequired,
  soundUuid: PropTypes.string.isRequired
}

SoundMenuComponent.defaultProps = {
  options: null
}

const mapDispatchToProps = {
  onEdit: SoundEditDialog.open
}

export const SoundMenu = connect(undefined, mapDispatchToProps)(SoundMenuComponent)
