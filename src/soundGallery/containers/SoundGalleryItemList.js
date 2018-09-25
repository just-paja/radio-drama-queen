import { connect } from 'react-redux';

import SoundGalleryItemList from '../components/SoundGalleryItemList';

import { gallerySound } from '../actions';

import { getGallerySoundList } from '../selectors';

const mapStateToProps = state => ({
  sounds: getGallerySoundList(state),
});

const mapDispatchToProps = {
  onSoundPlay: gallerySound.play,
};

const container = connect(mapStateToProps, mapDispatchToProps)(SoundGalleryItemList);

container.displayName = 'Connect(SoundGalleryItemList)';

export default container;
