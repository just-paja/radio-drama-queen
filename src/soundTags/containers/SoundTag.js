import { connect } from 'react-redux';

import SoundTag from '../components/SoundTag';

import { getTagByName } from '../selectors';

const mapStateToProps = (state, { tag }) => ({
  tag: getTagByName(state, tag),
});

export default connect(mapStateToProps)(SoundTag);
