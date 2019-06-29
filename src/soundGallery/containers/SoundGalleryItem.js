import SoundGalleryItem from '../components/SoundGalleryItem'

import { connect } from 'react-redux'
import { gallerySound } from '../actions'
import { getGalleryTarget } from '../selectors'
import { soundStore } from '../../sounds'

const mapStateToProps = (state, { soundUuid }) => ({
  sound: soundStore.getFirst(state, soundUuid),
  target: getGalleryTarget(state)
})

const mapDispatchToProps = {
  onPlay: gallerySound.play
}

const container = connect(mapStateToProps, mapDispatchToProps)(SoundGalleryItem)

container.displayName = 'Connect(SoundGalleryItem)'

export default container
