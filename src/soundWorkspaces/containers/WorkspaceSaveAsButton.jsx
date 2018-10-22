import SaveAlt from '@material-ui/icons/SaveAlt';

import { connect } from 'react-redux';

import LabelButton from '../../components/LabelButton';

import { workspaceSave } from '../actions';

const mapStateToProps = () => ({
  children: 'Save As',
  icon: SaveAlt,
});

const mapDispatchToProps = {
  onClick: workspaceSave.dialogOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton);
