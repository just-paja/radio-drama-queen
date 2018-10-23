import SaveAlt from '@material-ui/icons/SaveAlt';

import { connect } from 'react-redux';

import LabelButton from '../../components/LabelButton';

import { workspaceSave } from '../actions';
import { isWorkspaceEmpty } from '../selectors';

const mapStateToProps = (state) => ({
  children: 'Save As',
  disabled: isWorkspaceEmpty(state),
  icon: SaveAlt,
});

const mapDispatchToProps = {
  onClick: workspaceSave.dialogOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton);
