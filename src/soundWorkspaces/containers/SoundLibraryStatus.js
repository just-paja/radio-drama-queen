import { connect } from 'react-redux'

import SoundLibraryStatus from '../components/SoundLibraryStatus'

import { getGallerySize } from '../../soundGallery/selectors'
import {
  countBoardSounds,
  countErrorSounds,
  countMemorySounds,
  countPlayingSounds,
  countTags
} from '../selectors'

const mapStateToProps = state => ({
  boardSounds: countBoardSounds(state),
  errorSounds: countErrorSounds(state),
  inMemorySounds: countMemorySounds(state),
  playingSounds: countPlayingSounds(state),
  registeredSounds: getGallerySize(state),
  tags: countTags(state)
})

const container = connect(mapStateToProps)(SoundLibraryStatus)

container.displayName = 'Connect(SoundLibraryStatus)'

export default container
