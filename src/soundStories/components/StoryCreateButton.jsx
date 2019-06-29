import LabelButton from '../../components/LabelButton'
import Create from '@material-ui/icons/Create'

import { connect } from 'react-redux'
import { StoryCreateDialog } from './StoryCreateDialog'

const mapStateToProps = (state) => ({
  children: 'Create story',
  icon: Create
})

const mapDispatchToProps = {
  onClick: StoryCreateDialog.open
}

export const StoryCreateButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
