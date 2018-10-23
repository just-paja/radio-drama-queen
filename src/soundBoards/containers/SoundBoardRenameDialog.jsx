import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import SoundBoardRenameDialog from '../components/SoundBoardRenameDialog';

import { boardRename } from '../actions';
import { FORM_BOARD_RENAME } from '../constants';
import { getBoardName, isBoardRenameDialogVisible } from '../selectors';

const mapStateToProps = (state, { boardUuid }) => ({
  open: isBoardRenameDialogVisible(state),
  initialValues: {
    name: getBoardName(state, boardUuid),
  },
});

const mapDispatchToProps = {
  onClose: boardRename.close,
  onSubmit: (values, dispatch, props) => boardRename.submit(props.boardUuid, values.name),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_BOARD_RENAME,
})(SoundBoardRenameDialog));
