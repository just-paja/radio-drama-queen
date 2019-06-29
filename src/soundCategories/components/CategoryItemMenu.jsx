import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'

import { categoryRoutines } from '../actions'
import { connect } from 'react-redux'
import { Children } from '../../proptypes'
import { SoundMenu } from '../../sounds/components'

function CategoryItemMenuComponent ({ children, onRemove, soundUuid }) {
  return (
    <SoundMenu
      options={[
        { icon: Delete, label: 'Remove', onClick: onRemove }
      ]}
      soundUuid={soundUuid}
    >
      {children}
    </SoundMenu>
  )
}

CategoryItemMenuComponent.displaName = 'CategoryItemMenu'
CategoryItemMenuComponent.propTypes = {
  children: Children,
  onRemove: PropTypes.func.isRequired,
  soundUuid: PropTypes.string.isRequired
}

CategoryItemMenuComponent.defaultProps = {
  options: null
}

const mapDispatchToProps = {
  onRemove: categoryRoutines.soundRemove
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onRemove: () => dispatchProps.onRemove(ownProps.categoryUuid, ownProps.soundUuid)
  }
}

export const CategoryItemMenu = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(CategoryItemMenuComponent)
