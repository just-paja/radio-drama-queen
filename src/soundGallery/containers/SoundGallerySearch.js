import { connect } from 'react-redux';

import { gallerySearch } from '../actions';
import { getSoundSearchValue } from '../selectors';

import SoundGallerySearchForm from '../components/SoundGallerySearchForm';

const mapStateToProps = state => ({
  search: getSoundSearchValue(state),
});

const mapDispatchToProps = {
  onChange: gallerySearch.change,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundGallerySearchForm);
