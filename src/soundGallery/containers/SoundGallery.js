import { connect } from 'react-redux'
import { getGalleryTarget } from '../selectors'
import { soundStore } from '../../sounds'

import SoundGallery from '../components/SoundGallery'

const mapStateToProps = state => ({
  librarySize: soundStore.getSize(state),
  target: getGalleryTarget(state)
})

const container = connect(mapStateToProps)(SoundGallery)

container.displayName = 'Connect(SoundGallery)'

export default container
