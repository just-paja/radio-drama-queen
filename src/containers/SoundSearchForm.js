import { connect } from 'react-redux';

import { soundSearch } from '../actions';
import { getSoundSearchValue } from '../selectors';

import SoundSearchForm from '../components/SoundSearchForm';

const mapStateToProps = state => ({
  search: getSoundSearchValue(state),
});

const mapDispatchToProps = {
  onChange: soundSearch.change,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundSearchForm);
