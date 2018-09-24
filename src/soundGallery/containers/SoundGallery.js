import { connect } from 'react-redux';

import SoundGallery from '../components/SoundGallery';

import {
  getGallerySoundList,
} from '../selectors';

const mapStateToProps = state => ({
  sounds: getGallerySoundList(state),
});

const container = connect(mapStateToProps)(SoundGallery);

container.displayName = 'Connect(SoundGallery)';

export default container;
