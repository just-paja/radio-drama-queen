import Save from '@material-ui/icons/Save';

import { connect } from 'react-redux';

import LabelButton from '../../components/LabelButton';

import { workspaceSave } from '../actions';
import { getWorkspaceFilePath, isWorkspaceEmpty } from '../selectors';

const mapStateToProps = (state) => ({
  children: 'Save',
  disabled: isWorkspaceEmpty(state) || !getWorkspaceFilePath(state),
  icon: Save,
});

const mapDispatchToProps = {
  onClick: workspaceSave.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton);
