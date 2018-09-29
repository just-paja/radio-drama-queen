import { connect } from 'react-redux';

import SoundLibraryStatus from '../components/SoundLibraryStatus';

import { getGallerySize } from '../../soundGallery/selectors';
import {
  countBoardSounds,
  countErrorSounds,
  countMemorySounds,
} from '../selectors';

const mapStateToProps = state => ({
  boardSounds: countBoardSounds(state),
  errorSounds: countErrorSounds(state),
  inMemorySounds: countMemorySounds(state),
  registeredSounds: getGallerySize(state),
});

const container = connect(mapStateToProps)(SoundLibraryStatus);

container.displayName = 'Connect(SoundLibraryStatus)';

export default container;
