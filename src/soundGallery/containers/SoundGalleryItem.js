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

const container = connect(mapStateToProps, mapDispatchToProps)(SoundGalleryItem);

container.displayName = 'Connect(SoundGalleryItem)';

export default container;
