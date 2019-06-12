import { connect } from 'react-redux'

import SoundGalleryItem from '../components/SoundGalleryItem'

import { gallerySound } from '../actions'
import { getGallerySound, getGalleryTarget } from '../selectors'

const mapStateToProps = (state, { soundUuid }) => ({
  sound: getGallerySound(state, soundUuid),
  target: getGalleryTarget(state)
})

const mapDispatchToProps = {
  onPlay: gallerySound.play
}

const container = connect(mapStateToProps, mapDispatchToProps)(SoundGalleryItem)

container.displayName = 'Connect(SoundGalleryItem)'

export default container
