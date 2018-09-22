import { connect } from 'react-redux';

import SoundGallery from '../components/SoundGallery';

import {
  getGallerySoundList,
} from '../selectors';

const mapStateToProps = state => ({
  sounds: getGallerySoundList(state),
});

export default connect(mapStateToProps)(SoundGallery);
