import Input from '../../components/Input'
import React from 'react'

import { connect } from 'react-redux'
import { tagStore } from '../../soundTags'
import { InputSelect } from '../../components/InputSelect'

const InputTagsComponent = ({ ...props }) => (
  <Input
    {...props}
    as={InputSelect}
    isClearable={false}
    isCreatable
    getNewOptionData={(inputValue, optionLabel) => ({
      name: optionLabel,
      title: inputValue,
      isNew: true
    })}
    getOptionLabel={option => option.title}
    getOptionValue={option => option.name}
    formatCreateLabel={inputValue => `Create ${inputValue}`}
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
