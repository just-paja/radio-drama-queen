import { connect } from 'react-redux';

import SoundCategory from '../components/SoundCategory';

import { getCategoryName, getCategorySoundUuids } from '../selectors';

const mapStateToProps = (state, { uuid }) => ({
  name: getCategoryName(state, uuid),
  sounds: getCategorySoundUuids(state, uuid),
});

export default connect(mapStateToProps)(SoundCategory);
