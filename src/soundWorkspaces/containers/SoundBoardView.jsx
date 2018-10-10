import { connect } from 'react-redux';

import SoundBoardView from '../components/SoundBoardView';

import { workspace } from '../actions';

import * as constants from '../constants';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onSoundPickerOpen: payload => workspace.selectView(constants.VIEW_LIBRARY, {
    target: payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBoardView);
