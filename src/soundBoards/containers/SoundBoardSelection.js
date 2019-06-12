import { connect } from 'react-redux'

import SoundBoardSelection from '../components/SoundBoardSelection'

import { getBoardsWithStatus } from '../selectors'

const mapStateToProps = state => ({
  boards: getBoardsWithStatus(state)
})

const container = connect(mapStateToProps)(SoundBoardSelection)

container.displayName = 'Connect(SoundBoardSelection)'

export default container
