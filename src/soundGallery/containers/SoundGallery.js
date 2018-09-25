import { connect } from 'react-redux';

import SoundGallery from '../components/SoundGallery';

import { getGallerySize } from '../selectors';

const mapStateToProps = state => ({
  librarySize: getGallerySize(state),
});

const container = connect(mapStateToProps)(SoundGallery);

container.displayName = 'Connect(SoundGallery)';

export default container;
