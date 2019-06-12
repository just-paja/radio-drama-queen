import { connect } from 'react-redux'

import DeleteButton from '../../components/DeleteButton'

import { libraryWipe } from '../actions'

const mapStateToProps = () => ({
  children: 'Wipe Library'
})

const mapDispatchToProps = {
  onClick: libraryWipe.trigger
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
