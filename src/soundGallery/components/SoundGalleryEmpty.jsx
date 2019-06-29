import CanvasMessage from '../../components/CanvasMessage'
import CloudDownload from '@material-ui/icons/CloudDownload'
import LabelButton from '../../components/LabelButton'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { OpenLibraryDialog } from '../../soundLibraries/components'
import { connect } from 'react-redux'

const SoundGalleryEmptyComponent = ({ onLibraryOpen }) => (
  <CanvasMessage heading='Sound library is empty!'>
    <Typography gutterBottom>
      The sound library stores all the sounds. You can browse and filter here.
    </Typography>
    <LabelButton onClick={onLibraryOpen} icon={CloudDownload}>
      Download Library
    </LabelButton>
  </CanvasMessage>
)

SoundGalleryEmptyComponent.propTypes = {
  onLibraryOpen: PropTypes.func.isRequired
}

const mapStateToProps = undefined
const mapDispatchToProps = {
  onLibraryOpen: OpenLibraryDialog.open
}

export const SoundGalleryEmpty = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundGalleryEmptyComponent)
