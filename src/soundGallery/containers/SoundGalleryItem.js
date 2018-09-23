import { connect } from 'react-redux';

import SoundGalleryItem from '../components/SoundGalleryItem';

import { gallerySound } from '../actions';
import { getGallerySound } from '../selectors';

const mapStateToProps = (state, { soundUuid }) => ({
  sound: getGallerySound(state, soundUuid),
});

const mapDispatchToProps = {
  onPlay: gallerySound.play,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundGalleryItem);
