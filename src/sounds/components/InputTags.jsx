import Input from '../../components/Input'
import React from 'react'

import { connect } from 'react-redux'
import { tagStore } from '../../soundTags'
import { InputSelect } from '../../components/InputSelect'

const InputTagsComponent = ({ ...props }) => (
  <Input
    {...props}
    as={InputSelect}
    getOptionLabel={option => option.title}
    getOptionValue={option => option.name}
    isMulti
  />
)

function mapDispatchToProps (state) {
  return {
    options: tagStore.getAll(state)
  }
}

export const InputTags = connect(
  mapDispatchToProps
)(InputTagsComponent)
