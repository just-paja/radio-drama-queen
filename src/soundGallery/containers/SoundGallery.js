import { connect } from 'react-redux'

import SoundGallery from '../components/SoundGallery'

import { getGallerySize, getGalleryTarget } from '../selectors'

const mapStateToProps = state => ({
  librarySize: getGallerySize(state),
  target: getGalleryTarget(state)
})

const container = connect(mapStateToProps)(SoundGallery)

container.displayName = 'Connect(SoundGallery)'

export default container
