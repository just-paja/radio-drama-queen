import { connect } from 'react-redux';

import { gallerySearch } from '../actions';
import { getSoundSearchValue, getUsedFilter } from '../selectors';

import SoundGallerySearchForm from '../components/SoundGallerySearchForm';

const mapStateToProps = state => ({
  search: getSoundSearchValue(state),
  filterUsed: getUsedFilter(state),
});

const mapDispatchToProps = {
  onChange: gallerySearch.change,
  onFilterUsedChange: gallerySearch.filterUsedToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundGallerySearchForm);
