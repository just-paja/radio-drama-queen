import { connect } from 'react-redux'

import { gallerySearch } from '../actions'
import { getSoundSearchValue, getErrorsFilter, getUsedFilter } from '../selectors'

import SoundGallerySearchForm from '../components/SoundGallerySearchForm'

const mapStateToProps = state => ({
  filterErrors: getErrorsFilter(state),
  filterUsed: getUsedFilter(state),
  search: getSoundSearchValue(state)
})

const mapDispatchToProps = {
  onFilterErrorsChange: gallerySearch.filterErrorsChange,
  onFilterUsedChange: gallerySearch.filterUsedChange,
  onChange: gallerySearch.change
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundGallerySearchForm)
